import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';
const { PDFParse } = require('pdf-parse');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const EMBEDDING_MODEL = 'nomic-embed-text';
const DATABASE_URL = process.env.DATABASE_URL || '';
const sql = neon(DATABASE_URL);

// Base path for the PDF library
const LIB_PATH = '/home/parzival/Downloads/vector database';

async function setupTable() {
    console.log("Ensuring knowledge_base table exists with pgvector...");
    try {
        await sql`CREATE EXTENSION IF NOT EXISTS vector`;
        await sql`
            CREATE TABLE IF NOT EXISTS knowledge_base (
                id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                content TEXT,
                metadata JSONB,
                embedding vector(768),
                created_at TIMESTAMPTZ DEFAULT NOW()
            )
        `;
        await sql`CREATE INDEX IF NOT EXISTS knowledge_embedding_idx ON knowledge_base USING ivfflat (embedding vector_cosine_ops)`;
        console.log("✅ Table ready.");
    } catch (e) {
        console.error("❌ Table setup failed:", e);
    }
}

async function embedText(text: string): Promise<number[]> {
    try {
        const res = await fetch(`${OLLAMA_URL}/api/embeddings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: EMBEDDING_MODEL,
                prompt: text.substring(0, 8192)
            })
        });
        if (!res.ok) throw new Error(`Ollama error: ${res.status}`);
        const data = await res.json() as { embedding: number[] };
        return data.embedding;
    } catch (e) {
        console.error("Embedding failed:", e);
        return [];
    }
}

async function addChunk(content: string, metadata: any) {
    const embedding = await embedText(content);
    if (embedding.length === 0) return;

    const embeddingSql = `[${embedding.join(',')}]`;
    try {
        await sql`
            INSERT INTO knowledge_base (content, metadata, embedding)
            VALUES (${content}, ${JSON.stringify(metadata)}, ${embeddingSql}::vector)
        `;
    } catch (e) {
        console.error("Insert failed:", e);
    }
}

function chunkText(text: string, size: number = 1500, overlap: number = 200): string[] {
    const chunks: string[] = [];
    let start = 0;
    while (start < text.length) {
        const end = Math.min(start + size, text.length);
        chunks.push(text.substring(start, end));
        start += (size - overlap);
    }
    return chunks;
}

async function processPdf(filePath: string, category: string) {
    console.log(`Processing: [${category}] ${path.basename(filePath)}...`);
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const parser = new PDFParse({ data: dataBuffer });
        const data = await parser.getText();
        const chunks = chunkText(data.text);
        const totalPages = data.numPages || 1; // Corrected key for PDFParse
        
        console.log(`  Extracted text (${totalPages} pages), created ${chunks.length} chunks.`);
        
        for (let i = 0; i < chunks.length; i++) {
            if (i % 10 === 0) process.stdout.write(`.`);
            // Approximate page mapping
            const pageNum = Math.floor(i / (chunks.length / totalPages)) + 1;
            
            await addChunk(chunks[i], {
                source: path.basename(filePath),
                category,
                page: pageNum,
                type: 'pdf'
            });
        }
        console.log(`\n  ✅ Ingested ${path.basename(filePath)}`);
    } catch (e) {
        console.error(`  ❌ Failed to process ${filePath}:`, e);
    }
}

async function walkDir(dir: string, category: string = 'general') {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            await walkDir(fullPath, file);
        } else if (file.toLowerCase().endsWith('.pdf')) {
            await processPdf(fullPath, category);
        }
    }
}

async function main() {
    await setupTable();
    if (!fs.existsSync(LIB_PATH)) {
        console.error(`Library path not found: ${LIB_PATH}`);
        return;
    }
    await walkDir(LIB_PATH);
    console.log("\n🚀 Intelligence Ingestion Complete.");
}

main().catch(console.error);

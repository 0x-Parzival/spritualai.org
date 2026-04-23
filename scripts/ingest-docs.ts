import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const EMBEDDING_MODEL = 'nomic-embed-text';
const sql = neon(process.env.DATABASE_URL || '');

async function embedText(text: string): Promise<number[]> {
  const res = await fetch(`${OLLAMA_URL}/api/embeddings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: EMBEDDING_MODEL,
      prompt: text
    })
  });
  if (!res.ok) throw new Error(`Ollama error: ${res.status}`);
  const data = await res.json();
  return data.embedding;
}

async function addKnowledge(content: string, metadata: any = {}) {
  try {
    const embedding = await embedText(content);
    const embeddingSql = `[${embedding.join(',')}]`;
    
    await sql`
      INSERT INTO knowledge_base (content, metadata, embedding)
      VALUES (${content}, ${JSON.stringify(metadata)}, ${embeddingSql}::vector)
    `;
    console.log(`Ingested: ${metadata.source} (${content.substring(0, 50)}...)`);
  } catch (e) {
    console.error(`Error ingesting ${metadata.source}:`, e);
  }
}

function chunkText(text: string, size: number = 1000): string[] {
  const chunks: string[] = [];
  let current = 0;
  while (current < text.length) {
    chunks.push(text.substring(current, current + size));
    current += size - 100;
  }
  return chunks;
}

async function ingestFile(filePath: string) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf-8');
  const chunks = chunkText(content);
  for (const chunk of chunks) {
    await addKnowledge(chunk, { source: path.basename(filePath), path: filePath });
  }
}

async function main() {
  const rootDocs = ['README.md', 'gemini.md', 'SOUL.md', 'IDENTITY.md', 'GROQ_AI_INTEGRATION.md'];
  for (const doc of rootDocs) {
    await ingestFile(path.resolve(__dirname, '../', doc));
  }

  const docsDir = path.resolve(__dirname, '../docs');
  if (fs.existsSync(docsDir)) {
    const files = fs.readdirSync(docsDir);
    for (const file of files) {
      if (file.endsWith('.md')) {
        await ingestFile(path.join(docsDir, file));
      }
    }
  }

  console.log("Ingestion complete.");
}

main().catch(console.error);

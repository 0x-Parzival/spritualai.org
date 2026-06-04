// src/lib/ai.ts — Stub for synthesis system
// Supports both old (messages[], prompt) and new (prompt) call signatures
// TODO: Implement actual AI calls for book/product synthesis

export async function callAI(promptOrMessages: string | any[], _prompt?: string): Promise<string> {
  const prompt = typeof promptOrMessages === 'string' ? promptOrMessages : _prompt || '';
  console.warn('callAI stub called with:', prompt.slice(0, 100));
  return JSON.stringify({ stub: true, message: 'AI synthesis not yet implemented' });
}

export async function callAIForJSON<T = any>(promptOrMessages: string | any[], _prompt?: string): Promise<T> {
  const prompt = typeof promptOrMessages === 'string' ? promptOrMessages : _prompt || '';
  console.warn('callAIForJSON stub called with:', prompt.slice(0, 100));
  return { stub: true, message: 'AI synthesis not yet implemented' } as T;
}

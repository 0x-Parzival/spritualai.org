// src/lib/id-generator.ts

export const ARCHETYPE_SYMBOLS: Record<string, string> = {
  sovereign: 'Ω',
  architect: 'Σ',
  seeker: 'Ψ',
  catalyst: 'Δ',
  visionary: 'Φ',
  teacher: 'Λ',
  shadow: 'Θ', // Fallback
};

/**
 * Generates a high-fidelity Cosmic Serial Number (CSN).
 * Format: SAI-[Sequence]-[MBTI]-[Symbol]-[Hash]
 * Example: SAI-2847-INTJ-Ψ-7A3F
 */
export async function generateCSN(
  sequenceNumber: number, 
  mbti: string, 
  archetype: string
): Promise<{ csn: string; hash: string }> {
  const symbol = ARCHETYPE_SYMBOLS[archetype.toLowerCase()] || ARCHETYPE_SYMBOLS.seeker;
  
  // Hash from sequence + mbti + timestamp
  const raw = `${sequenceNumber}${mbti}${Date.now()}`;
  
  // In Node.js environment, we use crypto module if crypto.subtle is not available
  // But Next.js Edge/Server usually has crypto.subtle or we can use crypto.createHash
  
  let hash = "";
  try {
    const { createHash } = await import('crypto');
    hash = createHash('sha256').update(raw).digest('hex').slice(0, 4).toUpperCase();
  } catch (e) {
    // Fallback for edge environments
    const encoder = new TextEncoder();
    const data = encoder.encode(raw);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    hash = Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
      .slice(0, 4)
      .toUpperCase();
  }
  
  return {
    csn: `SAI-${sequenceNumber}-${mbti}-${symbol}-${hash}`,
    hash
  };
}

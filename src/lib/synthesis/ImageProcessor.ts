/**
 * Handles high-quality visual synthesis using Pexels/Unsplash APIs.
 */
export async function fetchHighQualityImage(prompt: string): Promise<string> {
  const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
  const CLEAN_PROMPT = `${prompt} spiritual minimalist sacred`.trim();

  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(CLEAN_PROMPT)}&orientation=portrait&per_page=1`,
      {
        headers: {
          Authorization: PEXELS_API_KEY || ''
        }
      }
    );

    if (!res.ok) throw new Error('Pexels API failure');
    
    const data = await res.json();
    if (data.photos && data.photos.length > 0) {
      // Always return the original high-resolution version for premium quality
      return data.photos[0].src.original;
    }

    return 'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg'; // Fallback
  } catch (err) {
    console.error('Image fetch error:', err);
    return 'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg';
  }
}

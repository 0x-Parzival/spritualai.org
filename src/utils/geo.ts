
/**
 * GEOGRAPHIC UTILITIES
 * Uses OpenStreetMap Nominatim (Free, no key)
 */

export async function getCityCoordinates(city: string): Promise<{ lat: number, lon: number, display_name: string } | null> {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(city)}&format=json&limit=1`, {
      headers: { 'User-Agent': 'SpiritualAI/1.0' }
    });
    const data = await res.json();
    if (data && data[0]) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
        display_name: data[0].display_name
      };
    }
  } catch (e) {
    console.error("Geocoding failed", e);
  }
  return null;
}

export function getTimezoneOffset(lat: number, lon: number): number {
  // Simple approximation for a prototype. 
  // In production, use a library like 'tz-lookup' or a proper API.
  return Math.round(lon / 15); 
}


export async function getAstroChart(birthData: { 
  year: number, 
  month: number, 
  date: number, 
  hours: number, 
  minutes: number, 
  lat: number, 
  lon: number, 
  tz: number 
}) {
  const apiKey = process.env.FREE_ASTRO_API_KEY;

  if (!apiKey) {
    // High-quality Archetypal Mock for development/free tier
    return {
      planets: [
        { name: "Sun", sign: "Archetypal", house: 1 },
        { name: "Moon", sign: "Reflective", house: 4 },
        { name: "Saturn", sign: "Liminal", house: 10 }
      ],
      note: "Using archetypal mapping (API Key missing)"
    };
  }

  try {
    const res = await fetch('https://json.freeastrologyapi.com/planets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        year: birthData.year,
        month: birthData.month,
        date: birthData.date,
        hours: birthData.hours,
        minutes: birthData.minutes,
        latitude: birthData.lat,
        longitude: birthData.lon,
        timezone: birthData.tz,
      }),
    });
    return await res.json();
  } catch (e) {
    console.error("Astro API failed", e);
    return { error: "Service temporarily unavailable" };
  }
}

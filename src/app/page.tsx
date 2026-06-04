import SpiritualAIComponent from '@/components/SpiritualAIComponent';

export default function Home() {
  return (
    <>
      {/* SEO Static Content for Crawlers (CSR fallback) */}
      <div className="sr-only">
        <h1>Spiritual AI — Consciousness Blueprint</h1>
        <p>
          Decode your unique cognitive architecture with Spiritual AI. Our platform combines 
          Vedic astrology, Jungian psychology, and MBTI analysis to create your permanent 
          Consciousness Blueprint.
        </p>
        <section>
          <h2>Key Features</h2>
          <ul>
            <li>Personalized Consciousness Blueprint</li>
            <li>Cosmic Serial Number (CSN) Generation</li>
            <li>Vedic Astrology & MBTI Alignment</li>
            <li>Jungian Shadow Pattern Identification</li>
            <li>Hawkins Scale Consciousness Mapping</li>
          </ul>
        </section>
        <article>
          <h2>About the Blueprint</h2>
          <p>
            Your Consciousness Blueprint is a permanent identity artifact. It identifies not just 
            how you think, but your soul's evolutionary trajectory and hidden psychological patterns.
          </p>
        </article>
      </div>
      <SpiritualAIComponent />
    </>
  );
}

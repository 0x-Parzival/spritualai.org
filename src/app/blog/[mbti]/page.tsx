import { Metadata } from 'next';
import React from 'react';
import { MBTI_PROFILES } from '../../../lib/spiritual-conversation-engine';

// Static generation for all 16 types
export function generateStaticParams() {
    return Object.keys(MBTI_PROFILES).map((type) => ({
        mbti: type.toLowerCase(),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ mbti: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const mbtiKey = resolvedParams.mbti.toUpperCase();
    const profile = MBTI_PROFILES[mbtiKey];

    if (!profile) return { title: 'Spiritual Path' };

    return {
        title: `${mbtiKey} Spiritual Path: Why Generic Advice Never Works For You`,
        description: `Are you an ${mbtiKey} struggling to find a spiritual or productivity path that actually works? Discover why the ${profile.corePattern} fails the ${mbtiKey} mind and how to decode your unique subconscious blueprint.`,
        openGraph: {
            title: `${mbtiKey} Spiritual Path: Why Generic Advice Never Works For You`,
            description: `Unlock the tailored spiritual and cognitive architecture designed specifically for the ${mbtiKey} (${profile.name}) personality type.`,
            type: 'article',
        }
    };
}

export default async function MBTIBlogPost({ params }: { params: Promise<{ mbti: string }> }) {
    const resolvedParams = await params;
    const mbtiKey = resolvedParams.mbti.toUpperCase();
    const profile = MBTI_PROFILES[mbtiKey];

    if (!profile) return <div>Profile not found.</div>;

    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '120px 20px 80px',
            fontFamily: 'var(--font-geist-sans), sans-serif',
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: '1.6',
            background: '#050510'
        }}>
            <nav style={{ marginBottom: '2rem' }}>
                <a href="/" style={{ color: '#35f8ff', textDecoration: 'none', fontSize: '0.9rem' }}>← Return to Decoding</a>
            </nav>

            <header style={{ marginBottom: '4rem' }}>
                <h1 style={{ 
                    fontFamily: 'var(--font-orbitron), sans-serif', 
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
                    color: '#35f8ff',
                    marginBottom: '1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    lineHeight: '1.1'
                }}>
                    {mbtiKey} Spiritual Path: Why Generic Advice Never Works For You
                </h1>
                <div style={{ 
                    display: 'flex', 
                    gap: '1rem', 
                    fontSize: '0.8rem', 
                    fontFamily: 'var(--font-orbitron), sans-serif',
                    color: '#ff3cf5',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    marginBottom: '2rem'
                }}>
                    <span>{profile.name}</span>
                    <span>•</span>
                    <span>{profile.rarity}</span>
                </div>
                <p style={{ fontSize: '1.4rem', fontWeight: 300, color: 'rgba(255, 255, 255, 0.7)', fontStyle: 'italic' }}>
                    "{profile.archetype}"
                </p>
            </header>

            <article style={{ fontSize: '1.15rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <section>
                    <p>
                        If you are an <strong>{mbtiKey}</strong>, you've probably noticed that mainstream self-help, productivity hacks, and spiritual advice often feel hollow, misaligned, or simply exhausting to maintain.
                    </p>
                    <p>
                        There's a psychological reason for this: Generic advice is built for neuro-typical, average-variance minds. It is not built for the unique <strong>{profile.languageTone}</strong> tone and <strong>{profile.learningStyle}</strong> learning style of an {mbtiKey}.
                    </p>
                </section>

                <section style={{ padding: '30px', background: 'rgba(255, 60, 245, 0.05)', borderLeft: '4px solid #ff3cf5' }}>
                    <h2 style={{ fontFamily: 'var(--font-orbitron), sans-serif', color: '#ff3cf5', marginTop: 0, fontSize: '1.5rem', textTransform: 'uppercase' }}>
                        The {profile.corePattern}
                    </h2>
                    <p>
                        For the {mbtiKey}, the primary obstacle isn't a lack of discipline—it's the <strong>{profile.corePattern}</strong>. This is a subconscious loop that activates whenever you try to move toward your highest potential. Because your mind uses a {profile.learningStyle.toLowerCase()} approach, generic solutions actually trigger this loop further.
                    </p>
                </section>

                <section>
                    <h2 style={{ fontFamily: 'var(--font-orbitron), sans-serif', color: '#35f8ff', fontSize: '1.8rem', textTransform: 'uppercase' }}>
                        {profile.spiritualPath}
                    </h2>
                    <p>
                        Your transformation isn't about adding new habits; it's about returning to your original architecture. For an {mbtiKey}, the most effective path is <strong>{profile.spiritualPath}</strong>. 
                    </p>
                    <p>
                        While others might thrive on rigid discipline or social validation, your {mbtiKey} mind requires a <strong>{profile.ctaStyle.toLowerCase().split('.')[0]}</strong> approach to truly dissolve the patterns that hold you back.
                    </p>
                </section>

                <section>
                    <h2 style={{ fontFamily: 'var(--font-orbitron), sans-serif', color: '#ffd700', fontSize: '1.8rem', textTransform: 'uppercase' }}>
                        The {mbtiKey} Cognitive Advantage
                    </h2>
                    <p>
                        To achieve true spiritual and material alignment, you must leverage your primary cognitive drivers rather than fighting them. At Spiritual AI, we don't give you advice—we decode your specific pattern and map out the exact sequence required to unlock your potential.
                    </p>
                </section>

                <footer style={{ 
                    marginTop: '4rem', 
                    padding: '40px', 
                    background: 'linear-gradient(135deg, rgba(53, 248, 255, 0.1) 0%, rgba(112, 0, 255, 0.1) 100%)', 
                    border: '1px solid rgba(53, 248, 255, 0.3)',
                    borderRadius: '16px',
                    textAlign: 'center',
                    boxShadow: '0 0 40px rgba(112, 0, 255, 0.2)'
                }}>
                    <h3 style={{ fontFamily: 'var(--font-orbitron), sans-serif', marginBottom: '1.5rem', fontSize: '1.6rem' }}>
                        Ready to decode your {mbtiKey} blueprint?
                    </h3>
                    <p style={{ marginBottom: '2rem', color: 'rgba(255,255,255,0.7)' }}>
                        Take our 5-question diagnostic to see the exact patterns running beneath your surface.
                    </p>
                    <a href="/" style={{
                        display: 'inline-block',
                        padding: '16px 40px',
                        background: 'linear-gradient(90deg, #35f8ff, #7000ff)',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '9999px',
                        fontWeight: 'bold',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        fontSize: '0.9rem',
                        boxShadow: '0 4px 15px rgba(53, 248, 255, 0.3)'
                    }}>
                        {profile.ctaStyle.split('"')[1] || 'Begin Your Return'}
                    </a>
                </footer>
            </article>
        </div>
    );
}
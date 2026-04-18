"use client";

import React, { useState, useRef } from 'react';
import LandingPageV2 from './LandingPageV2';
import MBTIQuizV2 from './MBTIQuizV2';
import PersonalityResultV2 from './PersonalityResultV2';
import AIChatV2 from './AIChatV2';
import OceanBackground from '../../OceanBackground';
import InfinitePetals from '../../InfinitePetals';

export default function V2Homepage() {
    const [personality, setPersonality] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const scrollToPage = (pageIndex: number) => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: pageIndex * window.innerHeight,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div 
            ref={containerRef}
            style={{ 
                height: '100vh', 
                overflowY: 'auto', 
                scrollSnapType: 'y mandatory',
                position: 'relative'
            }}
        >
            <div style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
                <OceanBackground />
                <InfinitePetals />
            </div>

            <LandingPageV2 onStart={() => scrollToPage(1)} />
            
            <MBTIQuizV2 onComplete={(result) => {
                setPersonality(result);
                scrollToPage(2);
            }} />

            {personality && (
                <PersonalityResultV2 
                    personality={personality} 
                    onChatClick={() => scrollToPage(3)} 
                />
            )}

            {personality && (
                <AIChatV2 personality={personality} />
            )}
        </div>
    );
}

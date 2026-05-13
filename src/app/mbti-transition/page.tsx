"use client";

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import PortalResult from '@/components/PortalResult/PortalResult';
import SpaceBackground from '@/components/SpaceBackground';
import styles from '../discover/discover.module.css';

function TransitionContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const mbti = searchParams.get('mbti')?.toUpperCase() || 'INFP';
    const redirect = searchParams.get('redirect') || '/blueprint';
    
    // We need to override the behavior of PortalResult to redirect to our desired page
    // and potentially start automatically.
    
    return (
        <div className={styles.container}>
            <SpaceBackground />
            <div className="fog-container">
                <div className="fog-layer-horizon"></div>
                <div className="fog-layer-mid"></div>
                <div className="fog-layer-upper"></div>
            </div>
            <PortalResult mbtiType={mbti} autoStart={true} customRedirect={redirect} />
            
            <style jsx global>{`
                /* Force start the portal automatically */
                #portalButton {
                    display: none !important;
                }
            `}</style>
        </div>
    );
}

export default function MBTITransitionPage() {
    return (
        <Suspense fallback={<div>Loading transition...</div>}>
            <TransitionContent />
        </Suspense>
    );
}

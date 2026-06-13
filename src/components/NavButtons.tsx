"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import styles from './NavButtons.module.css';

export default function NavButtons() {
    const { isSignedIn, user: clerkUser } = useUser();

    return (
        <>
            {/* About the Guide Button (Top Left) */}
            <div className={styles.creatorSection}>
                <Link href="/creator" className={styles.navLinkContrast} aria-label="About the Guide">
                    <div className={styles.iconWrapper} style={{ border: 'none', background: 'transparent' }} aria-hidden="true">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </div>
                    <span>About the Guide →</span>
                </Link>
            </div>

            {/* How This Works / My Profile Button (Top Right) */}
            <div className={styles.contactSection}>
                {isSignedIn ? (
                    <Link href="/profile" className={styles.contactSectionButton} style={{ textDecoration: 'none' }} aria-label="View Profile">
                        <span className={styles.navLinkContrast}>My Profile</span>
                        <div className={styles.contactIconWrapper}>
                            {clerkUser?.imageUrl ? (
                                <img 
                                    src={clerkUser.imageUrl} 
                                    alt="Profile" 
                                    style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} 
                                />
                            ) : (
                                <div style={{ background: 'rgba(255,255,255,0.1)', width: '100%', height: '100%', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👤</div>
                            )}
                        </div>
                    </Link>
                ) : (
                    <Link href="/how-it-works" className={styles.contactSectionButton} style={{ textDecoration: 'none' }} aria-label="How This Works">
                        <span className={styles.navLinkContrast}>How This Works</span>
                        <div className={styles.contactIconWrapper} style={{ background: 'transparent', padding: '4px' }}>
                            <Image
                                src="/images/logo.png"
                                alt="Lotus"
                                width={40}
                                height={40}
                                className={styles.iconImage}
                                style={{ filter: 'brightness(1.5) saturate(1.2)' }}
                            />
                        </div>
                    </Link>
                )}
            </div>
        </>
    );
}

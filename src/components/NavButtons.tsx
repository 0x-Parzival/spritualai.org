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
                <Link href="/creator" className={styles.navLinkContrast}>
                    <div className={styles.iconWrapper}>
                        <Image
                            src="/images/moon.png"
                            alt="Guide"
                            width={40}
                            height={40}
                            className={styles.iconImage}
                        />
                    </div>
                    <span>About the Guide →</span>
                </Link>
            </div>

            {/* How This Works / My Profile Button (Top Right) */}
            <div className={styles.contactSection}>
                {isSignedIn ? (
                    <Link href="/profile" className={styles.contactSectionButton} style={{ textDecoration: 'none' }}>
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
                    <Link href="/how-it-works" className={styles.contactSectionButton} style={{ textDecoration: 'none' }}>
                        <span className={styles.navLinkContrast}>How This Works</span>
                        <div className={styles.contactIconWrapper}>
                            <Image
                                src="/images/logo.png"
                                alt="Logo"
                                width={40}
                                height={40}
                                className={styles.iconImage}
                            />
                        </div>
                    </Link>
                )}
            </div>
        </>
    );
}

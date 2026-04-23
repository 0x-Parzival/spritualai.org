"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUser, SignInButton } from '@clerk/nextjs';
import styles from './NavButtons.module.css';

export default function NavButtons() {
    const { isSignedIn, user: clerkUser } = useUser();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

            {/* How This Works / Menu Button (Top Right) */}
            <div className={styles.contactSection}>
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className={styles.contactSectionButton}
                >
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
                </button>
            </div>

            {/* Sidebar Overlay */}
            <div
                className={`${styles.sidebarOverlay} ${isSidebarOpen ? styles.active : ''}`}
                onClick={() => setIsSidebarOpen(false)}
            />

            {/* Sidebar Panel */}
            <div className={`${styles.contactSidebarPanel} ${isSidebarOpen ? styles.active : ''}`}>
                <div className={styles.sidebarHeader}>
                    <h3>Menu</h3>
                    <button className={styles.closeBtn} onClick={() => setIsSidebarOpen(false)}>×</button>
                </div>

                <div className={styles.sidebarContent}>
                    {/* PROFILE SECTION */}
                    <div style={{ marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>
                        {isSignedIn ? (
                            <Link href="/profile" className={styles.contactLink} style={{ background: 'rgba(255,255,255,0.05)' }}>
                                <div className={styles.linkIcon}>
                                    {clerkUser?.imageUrl ? (
                                        <img src={clerkUser.imageUrl} alt="User" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                                    ) : (
                                        <span>👤</span>
                                    )}
                                </div>
                                <div className={styles.linkDetails}>
                                    <span className={styles.linkLabel} style={{ color: '#4FD1C5' }}>My Profile</span>
                                    <span className={styles.linkValue}>{clerkUser?.fullName || 'View Purchases'}</span>
                                </div>
                            </Link>
                        ) : (
                            <SignInButton mode="modal">
                                <button className={styles.contactLink} style={{ width: '100%', textAlign: 'left', background: 'rgba(255,255,255,0.05)', cursor: 'pointer' }}>
                                    <span className={styles.linkIcon}>👤</span>
                                    <div className={styles.linkDetails}>
                                        <span className={styles.linkLabel}>MY PROFILE</span>
                                        <span className={styles.linkValue}>Login / Sign Up</span>
                                    </div>
                                </button>
                            </SignInButton>
                        )}
                    </div>

                    <Link href="/mission" className={styles.contactLink} style={{ marginBottom: '20px', background: 'rgba(255,255,255,0.02)' }}>
                        <span className={styles.linkIcon}>🚀</span>
                        <div className={styles.linkDetails}>
                            <span className={styles.linkLabel} style={{ color: '#FCD34D' }}>OUR MISSION</span>
                            <span className={styles.linkValue}>Spiritual AI World</span>
                        </div>
                    </Link>

                    <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#6b7280', marginBottom: '15px', paddingLeft: '10px' }}>Contact Us</h4>

                    <a href="https://wa.me/7457852306" target="_blank" rel="noopener noreferrer" className={`${styles.contactLink} ${styles.whatsapp}`}>
                        <span className={styles.linkIcon}>💬</span>
                        <div className={styles.linkDetails}>
                            <span className={styles.linkLabel}>WhatsApp</span>
                            <span className={styles.linkValue}>+7457852306</span>
                        </div>
                    </a>

                    <a href="mailto:admin@spiritualai.store" className={styles.contactLink}>
                        <span className={styles.linkIcon}>✉️</span>
                        <div className={styles.linkDetails}>
                            <span className={styles.linkLabel}>Email</span>
                            <span className={styles.linkValue}>admin@spiritualai.store</span>
                        </div>
                    </a>

                    <a href="https://discord.gg/sF9V5rX3bH" target="_blank" rel="noopener noreferrer" className={`${styles.contactLink} ${styles.discord}`}>
                        <span className={styles.linkIcon}>🎮</span>
                        <div className={styles.linkDetails}>
                            <span className={styles.linkLabel}>Discord</span>
                            <span className={styles.linkValue}>Join Community</span>
                        </div>
                    </a>

                    <a href="https://www.instagram.com/spiritual_ai.official/" target="_blank" rel="noopener noreferrer" className={`${styles.contactLink} ${styles.instagram}`}>
                        <span className={styles.linkIcon}>📸</span>
                        <div className={styles.linkDetails}>
                            <span className={styles.linkLabel}>Instagram</span>
                            <span className={styles.linkValue}>@spiritual_ai.official</span>
                        </div>
                    </a>
                </div>
            </div>
        </>
    );
}

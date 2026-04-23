"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Instagram, MessageSquare } from 'lucide-react';
import styles from './SocialLinks.module.css';

const SOCIALS = [
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/company/spiritualai',
        icon: <Linkedin size={20} />,
        color: '#0077B5'
    },
    {
        name: 'Instagram',
        url: 'https://www.instagram.com/spiritualai.store',
        icon: <Instagram size={20} />,
        color: '#E4405F'
    },
    {
        name: 'Discord',
        url: 'https://discord.gg/rrdzEPYRvr',
        icon: <MessageSquare size={20} />,
        color: '#5865F2'
    }
];

export default function SocialLinks() {
    return (
        <div className={styles.container}>
            <div className={styles.linksWrapper}>
                {SOCIALS.map((social, idx) => (
                    <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialBtn}
                        style={{ '--hover-color': social.color } as any}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={{ y: -2, scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className={styles.iconGlow} style={{ backgroundColor: social.color }} />
                        <span className={styles.icon}>{social.icon}</span>
                        <span className={styles.name}>{social.name}</span>
                        <div className={styles.reflection} />
                    </motion.a>
                ))}
            </div>
        </div>
    );
}

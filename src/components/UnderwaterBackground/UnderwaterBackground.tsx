"use client";

import React from 'react';
import styles from './UnderwaterBackground.module.css';

const UnderwaterBackground: React.FC = () => {
    return (
        <div className={styles.underwaterContainer}>
            <div className={styles.surface}></div>
            <div className={styles.caustics}></div>
            <div className={styles.bg}></div>
            <div className={styles.sun}>
                <div className={styles.sun_layer1}></div>
                <div className={styles.sun_layer2}></div>
                <div className={styles.sun_layer3}></div>
            </div>

            <svg className={styles.svgHidden}>
                <filter id="noise1">
                    <feTurbulence type="turbulence" baseFrequency=".05" numOctaves="1" seed="3" stitchTiles='stitch' />
                    <feDisplacementMap in="SourceGraphic" scale="10" />
                </filter>
            </svg>
        </div>
    );
};

export default UnderwaterBackground;

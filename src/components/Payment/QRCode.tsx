"use client";

import { QRCodeSVG } from 'qrcode.react';

interface QRCodeProps {
    value: string;
    size?: number;
    className?: string;
}

export default function QRCode({ value, size = 180, className = "" }: QRCodeProps) {
    return (
        <div className={`bg-white p-3 rounded-xl inline-block ${className}`}>
            <QRCodeSVG
                value={value}
                size={size}
                level="L" // Low error correction is fine for clean display, scans faster
                includeMargin={false}
                className="w-full h-full"
            />
        </div>
    );
}

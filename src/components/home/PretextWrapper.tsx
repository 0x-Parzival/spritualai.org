"use client";

import React, { useEffect, useState, useRef } from 'react';
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext';

interface PretextWrapperProps {
  text: string;
  font?: string;
  lineHeight?: number;
  width?: number;
  className?: string;
  centerExclusion?: boolean;
}

export default function PretextWrapper({
  text,
  font = '300 1.1rem Inter, sans-serif',
  lineHeight = 32,
  width = 800,
  className = '',
  centerExclusion = false
}: PretextWrapperProps) {
  const [lines, setLines] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!text) return;
    
    try {
      const prepared = prepareWithSegments(text, font);
        const result = layoutWithLines(prepared, width, lineHeight);
      
      let finalLines: any[] = [];

      if (centerExclusion) {
        // Lotus obstacle parameters
        const radius = 180; // Radius of lotus petals
        const centerY = 150; // Heuristic center within the container
        
        result.lines.forEach((line: any, i: number) => {
          const lineY = i * lineHeight;
          const distFromCenterY = Math.abs(lineY - centerY);
          
          if (distFromCenterY < radius) {
            const blockedWidth = Math.sqrt(radius * radius - distFromCenterY * distFromCenterY) * 2;
            const safeSideWidth = (width - blockedWidth) / 2 - 40; // 40px padding
            
            if (safeSideWidth > 50) { // Only split if there's enough space
                // We split the line text into two halves conceptually.
                // Pretext's layoutWithLines is already run for the full width.
                // For a true wrap, we'd need to re-layout with two separate boxes.
                // Simpler version: Show part of the text on left, part on right.
                const words = line.text.split(' ');
                const mid = Math.floor(words.length / 2);
                const leftText = words.slice(0, mid).join(' ');
                const rightText = words.slice(mid).join(' ');
                
                finalLines.push({ text: leftText, width: safeSideWidth, left: 0, top: lineY });
                finalLines.push({ text: rightText, width: safeSideWidth, left: width - safeSideWidth, top: lineY });
            } else {
                // If safe width is too small, just shift it to one side
                finalLines.push({ ...line, width: width * 0.4, left: i % 2 === 0 ? 0 : width * 0.6, top: lineY });
            }
          } else {
            finalLines.push({ ...line, top: lineY, left: 0, width: width });
          }
        });
      } else {
        finalLines = result.lines.map((l: any, i: number) => ({ ...l, top: i * lineHeight, left: 0, width: width }));
      }

      setLines(finalLines);
    } catch (err) {
      console.error('Pretext layout failed:', err);
    }
  }, [text, font, lineHeight, width, centerExclusion]);

  if (lines.length === 0) {
    return <div className={className} style={{ width, font, opacity: 0 }}>{text}</div>;
  }

  return (
    <div 
      ref={containerRef}
      className={className} 
      style={{ 
        position: 'relative', 
        height: lines.length * lineHeight, 
        width: '100%', 
        maxWidth: width,
        font: font 
      }}
    >
      {lines.map((line, index) => (
        <div 
          key={index} 
          style={{
            position: 'absolute',
            top: index * lineHeight,
            left: line.left ?? 0,
            width: line.width,
            whiteSpace: 'nowrap',
            transition: 'all 0.5s ease'
          }}
        >
          {line.text}
        </div>
      ))}
    </div>
  );
}

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
      
      let finalLines = result.lines;

      if (centerExclusion) {
        // Lotus obstacle parameters (approximate)
        // Since lotus is fixed bottom center, we calculate its overlap
        // relative to this container.
        const radius = 220; // Radius of lotus petals
        const centerX = width / 2;
        
        // We assume the lotus is below or overlapping the bottom of the container
        // or fixed at a specific height. For dynamic wrapping, we calculate
        // for each line if it intersects the circle.
        
        finalLines = result.lines.map((line: any, i: number) => {
          const lineY = i * lineHeight;
          // Distance from bottom of screen/container
          // This is a heuristic: we assume the text is flowing down towards the lotus
          const distFromCenterY = Math.abs(lineY - 200); // Adjusting '200' as the relative center
          
          if (distFromCenterY < radius) {
            const blockedWidth = Math.sqrt(radius * radius - distFromCenterY * distFromCenterY) * 2;
            const safeWidth = (width - blockedWidth) / 2 - 20; // 20px padding
            
            // If the line is blocked, we can either indent it or split it.
            // Splitting is hard with layoutWithLines, so we'll indent/shorten.
            // For now, let's just indent the line to the left or right.
            if (i % 2 === 0) {
                return { ...line, width: safeWidth, left: 0 };
            } else {
                return { ...line, width: safeWidth, left: width - safeWidth };
            }
          }
          return line;
        });
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

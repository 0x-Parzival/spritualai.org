"use client";

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext';

interface PretextWrapperProps {
  text: string;
  font?: string;
  lineHeight?: number;
  width?: number;
  className?: string;
  centerExclusion?: boolean;
  align?: 'left' | 'center' | 'right';
  style?: React.CSSProperties;
}

export default function PretextWrapper({
  text,
  font = '300 1.1rem Inter, sans-serif',
  lineHeight = 32,
  width = 800,
  className = '',
  centerExclusion = false,
  align = 'center',
  style = {}
}: PretextWrapperProps) {
  const [lines, setLines] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPos, setScrollPos] = useState(0);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);

  // Measure text once
  const prepared = useMemo(() => {
    if (!text || !isClient) return null;
    try {
        return prepareWithSegments(text, font);
    } catch (e) {
        console.error("Pretext prepare failed", e);
        return null;
    }
  }, [text, font, isClient]);

  useEffect(() => {
    if (!centerExclusion) return;
    
    const handleScroll = () => {
        setScrollPos(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [centerExclusion]);

  useEffect(() => {
    if (!prepared || !containerRef.current) return;
    
    try {
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Lotus is fixed at bottom center
      const lotusRadius = 240; // Increased radius
      const lotusCenterX = window.innerWidth / 2;
      const lotusCenterY = viewportHeight - 80; // Approximate lotus center in viewport

      const result = layoutWithLines(prepared, width, lineHeight);
      let finalLines: any[] = [];

      if (centerExclusion) {
        result.lines.forEach((line: any, i: number) => {
          const lineTopInViewport = rect.top + (i * lineHeight);
          
          // Distance from this line to the lotus center
          const dy = lineTopInViewport - lotusCenterY;
          const dist = Math.abs(dy);
          
          if (dist < lotusRadius) {
            // Calculate horizontal "hole" width at this Y level
            const holeHalfWidth = Math.sqrt(lotusRadius * lotusRadius - dy * dy);
            const safeSideWidth = (width / 2) - holeHalfWidth - 20; 

            if (safeSideWidth > 30) {
              const words = line.text.split(' ');
              const mid = Math.floor(words.length / 2);
              const leftText = words.slice(0, mid).join(' ');
              const rightText = words.slice(mid).join(' ');
              
              finalLines.push({ text: leftText, width: safeSideWidth, left: 0, top: i * lineHeight });
              finalLines.push({ text: rightText, width: safeSideWidth, left: width - safeSideWidth, top: i * lineHeight });
            } else {
              // Push to one side if too narrow
              finalLines.push({ ...line, width: width * 0.4, left: i % 2 === 0 ? 0 : width * 0.6, top: i * lineHeight });
            }
          } else {
            finalLines.push({ ...line, top: i * lineHeight, left: 0, width: width });
          }
        });
      } else {
        finalLines = result.lines.map((l: any, i: number) => ({ ...l, top: i * lineHeight, left: 0, width: width }));
      }

      setLines(finalLines);
    } catch (err) {
      console.error('Pretext layout failed:', err);
    }
  }, [prepared, width, lineHeight, centerExclusion, scrollPos]);

  if (lines.length === 0) {
    return <div ref={containerRef} className={className} style={{ width: `${width}px`, font: font, opacity: '0' }}>{text}</div>;
  }

  return (
    <div 
      ref={containerRef}
      className={className} 
      style={{ 
        position: 'relative', 
        height: `${lines.length * lineHeight}px`, 
        width: '100%', 
        maxWidth: `${width}px`,
        font: font,
        margin: align === 'center' ? '0 auto' : '0',
        minHeight: `${lineHeight}px`,
        textAlign: align,
        ...style
      }}
    >
      {lines.map((line, index) => (
        <div 
          key={index} 
          style={{
            position: 'absolute',
            top: line.top,
            left: line.left ?? 0,
            width: line.width,
            whiteSpace: 'nowrap',
            transition: 'all 0.15s ease-out', // Smoother transition
            pointerEvents: 'none',
            color: 'inherit',
            display: 'flex',
            justifyContent: align === 'center' ? 'center' : (align === 'right' ? 'flex-end' : 'flex-start')
          }}
        >
          {line.text}
        </div>
      ))}
    </div>
  );
}

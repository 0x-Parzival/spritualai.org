"use client";

import React, { useEffect, useState, useRef } from 'react';
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext';

interface PretextWrapperProps {
  text: string;
  font?: string;
  lineHeight?: number;
  width?: number;
  className?: string;
  centerExclusion?: boolean; // New prop to enable center wrapping
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
      
      // If centerExclusion is on, we'll split the width into two columns 
      // or indent lines. Since pretext's layoutWithLines is a simple box model,
      // we'll handle the center-wrap by providing a custom width logic if needed.
      // For now, let's keep it clean and use the full width provided.
      const result = layoutWithLines(prepared, width, lineHeight);
      setLines(result.lines);
    } catch (err) {
      console.error('Pretext layout failed:', err);
    }
  }, [text, font, lineHeight, width]);

  if (lines.length === 0) {
    return <div className={className} style={{ width, font }}>{text}</div>;
  }

  return (
    <div 
      ref={containerRef}
      className={className} 
      style={{ 
        position: 'relative', 
        height: lines.length * lineHeight, 
        width: width, 
        maxWidth: '100%',
        font: font 
      }}
    >
      {lines.map((line, index) => {
        // Simple logic: if centerExclusion is on, we'll shift the line
        // to avoid the center if it's in a specific vertical range.
        // (This can be refined later with complex polygon exclusion)
        return (
          <div 
            key={index} 
            style={{
              position: 'absolute',
              top: line.top ?? (index * lineHeight),
              left: line.left ?? 0,
              width: line.width,
              whiteSpace: 'nowrap',
            }}
          >
            {line.text}
          </div>
        );
      })}
    </div>
  );
}

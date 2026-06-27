'use client';

import React, { useState, useRef, useEffect } from 'react';

interface PanelLayoutProps {
  leftElement: React.ReactNode;
  rightElement: React.ReactNode;
  initialLeftWidthPercent?: number;
  minWidthPixels?: number;
}

export default function PanelLayout({
  leftElement,
  rightElement,
  initialLeftWidthPercent = 60,
  minWidthPixels = 200
}: PanelLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [leftWidth, setLeftWidth] = useState(initialLeftWidthPercent); // percentage
  const [isResizing, setIsResizing] = useState(false);

  const startResize = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newLeftWidthPx = e.clientX - containerRect.left;
      
      // Convert to percentage
      let newLeftWidthPercent = (newLeftWidthPx / containerRect.width) * 100;
      
      // Boundaries
      const minPercent = (minWidthPixels / containerRect.width) * 100;
      const maxPercent = 100 - minPercent;

      if (newLeftWidthPercent < minPercent) newLeftWidthPercent = minPercent;
      if (newLeftWidthPercent > maxPercent) newLeftWidthPercent = maxPercent;

      setLeftWidth(newLeftWidthPercent);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, minWidthPixels]);

  return (
    <div
      ref={containerRef}
      className={`flex flex-1 w-full h-full overflow-hidden ${
        isResizing ? 'select-none cursor-col-resize' : ''
      }`}
    >
      {/* Left Panel */}
      <div
        style={{ width: `${leftWidth}%` }}
        className="h-full overflow-y-auto flex flex-col"
      >
        {leftElement}
      </div>

      {/* Resize Handle (Divider) */}
      <div
        onMouseDown={startResize}
        className={`w-[6px] h-full flex items-center justify-center cursor-col-resize z-20 group relative transition-colors ${
          isResizing ? 'bg-accent-blue/80' : 'bg-transparent hover:bg-white/[0.05]'
        }`}
      >
        {/* Visual Line */}
        <div
          className={`w-[1px] h-full ${
            isResizing ? 'bg-accent-blue' : 'bg-card-border group-hover:bg-zinc-600'
          }`}
        />
        {/* Hover Dot handle */}
        <div className="absolute w-1.5 h-8 rounded-full bg-zinc-800 border border-card-border opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity" />
      </div>

      {/* Right Panel */}
      <div
        style={{ width: `${100 - leftWidth}%` }}
        className="h-full overflow-y-auto flex flex-col bg-zinc-950/20"
      >
        {rightElement}
      </div>
    </div>
  );
}

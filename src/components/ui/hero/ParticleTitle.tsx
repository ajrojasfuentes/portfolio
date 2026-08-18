"use client";

import React, { useRef, useEffect } from "react";

interface Particle {
  x: number;
  y: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
  color: string;
}

export default function ParticleTitle({ text = "Anthony Rojas" }: { text?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Fixed internal resolution for consistent particle physics
    const internalWidth = 800;
    const internalHeight = 300;
    
    // Scale for high DPI displays (Retina)
    const pixelRatio = window.devicePixelRatio || 1;
    
    canvas.width = internalWidth * pixelRatio;
    canvas.height = internalHeight * pixelRatio;
    
    // We don't set fixed inline styles for width/height so Tailwind's w-full handles responsive scaling
    ctx.scale(pixelRatio, pixelRatio);

    // 1. Draw text on a temporary canvas to extract pixel positions
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = internalWidth;
    tempCanvas.height = internalHeight;
    const tCtx = tempCanvas.getContext("2d", { willReadFrequently: true });
    if (!tCtx) return;

    tCtx.fillStyle = "white";
    tCtx.font = "900 150px Inter, system-ui, sans-serif";
    tCtx.textAlign = "left";
    tCtx.textBaseline = "top";
    tCtx.fillText("Anthony", 0, 10);
    tCtx.fillText("Rojas", 0, 150);

    const imageData = tCtx.getImageData(0, 0, internalWidth, internalHeight);
    const data = imageData.data;
    const particles: Particle[] = [];

    // Gradient colors: from-purple-400 (c084fc) to to-cyan-400 (22d3ee)
    const c1 = { r: 192, g: 132, b: 252 };
    const c2 = { r: 34, g: 211, b: 238 };

    // Sample pixels (gap determines particle density)
    const gap = 4;
    for (let y = 0; y < internalHeight; y += gap) {
      for (let x = 0; x < internalWidth; x += gap) {
        const index = (y * internalWidth + x) * 4;
        const alpha = data[index + 3]!;
        
        if (alpha > 128) {
          // Calculate color based on horizontal position (gradient)
          const t = x / internalWidth;
          const r = Math.round(c1.r + (c2.r - c1.r) * t);
          const g = Math.round(c1.g + (c2.g - c1.g) * t);
          const b = Math.round(c1.b + (c2.b - c1.b) * t);
          
          particles.push({
            x: x + (Math.random() - 0.5) * 100, // Initial explosion effect
            y: y + (Math.random() - 0.5) * 100,
            ox: x,
            oy: y,
            vx: 0,
            vy: 0,
            color: `rgb(${r}, ${g}, ${b})`
          });
        }
      }
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      // Calculate mouse position relative to the internal resolution
      const scaleX = internalWidth / rect.width;
      const scaleY = internalHeight / rect.height;
      
      mouseX = (e.clientX - rect.left) * scaleX;
      mouseY = (e.clientY - rect.top) * scaleY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let animationFrameId: number;

    const draw = () => {
      // Clear the canvas
      ctx.clearRect(0, 0, internalWidth, internalHeight);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]!;

        // Repulsion from mouse
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        const maxDist = 80; // Radius of mouse interaction
        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          const angle = Math.atan2(dy, dx);
          p.vx -= Math.cos(angle) * force * 4;
          p.vy -= Math.sin(angle) * force * 4;
        }

        // Spring force returning to original position
        p.vx += (p.ox - p.x) * 0.1;
        p.vy += (p.oy - p.y) * 0.1;

        // Friction to slow down
        p.vx *= 0.8;
        p.vy *= 0.8;

        p.x += p.vx;
        p.y += p.vy;

        // Draw the particle
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 2, 2);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [text]);

  return (
    <div className="relative w-full max-w-2xl mx-auto lg:mx-0 flex flex-col items-center lg:items-start">
      <canvas 
        ref={canvasRef} 
        className="w-full h-auto cursor-crosshair touch-none"
        style={{ maxWidth: '800px' }}
      />
      <span className="sr-only">{text}</span>
    </div>
  );
}

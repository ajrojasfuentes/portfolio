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

export default function ParticleTitle({
  text = "Anthony Rojas",
}: {
  text?: string;
}): React.ReactNode {
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
        const alpha = data[index + 3] ?? 0;

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
            color: `rgb(${r}, ${g}, ${b})`,
          });
        }
      }
    }

    let mouseX = -1000;
    let mouseY = -1000;
    let isVisible = true;
    let isRunning = false;
    let animationFrameId: number | null = null;

    const requestDraw = (): void => {
      if (!isRunning && isVisible) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    const handleMouseMove = (e: MouseEvent): void => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = internalWidth / rect.width;
      const scaleY = internalHeight / rect.height;

      mouseX = (e.clientX - rect.left) * scaleX;
      mouseY = (e.clientY - rect.top) * scaleY;
      requestDraw();
    };

    const handleMouseLeave = (): void => {
      mouseX = -1000;
      mouseY = -1000;
      requestDraw();
    };

    canvas.addEventListener("mousemove", handleMouseMove, { passive: true });
    canvas.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // IntersectionObserver to sleep rendering when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            requestDraw();
          } else if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId);
            isRunning = false;
            animationFrameId = null;
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const draw = (): void => {
      if (!isVisible) {
        isRunning = false;
        animationFrameId = null;
        return;
      }

      ctx.clearRect(0, 0, internalWidth, internalHeight);
      let totalMotion = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!p) continue;

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
        const distX = p.ox - p.x;
        const distY = p.oy - p.y;
        p.vx += distX * 0.1;
        p.vy += distY * 0.1;

        // Friction to slow down
        p.vx *= 0.8;
        p.vy *= 0.8;

        p.x += p.vx;
        p.y += p.vy;

        totalMotion += Math.abs(p.vx) + Math.abs(p.vy) + Math.abs(distX) + Math.abs(distY);

        // Draw the particle
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 2, 2);
      }

      // If particles have settled and mouse is out, go idle to save CPU/battery
      if (mouseX === -1000 && mouseY === -1000 && totalMotion < 0.05) {
        isRunning = false;
        animationFrameId = null;
        return;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    requestDraw();

    return (): void => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      observer.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [text]);

  return (
    <div className="relative mx-auto flex w-full max-w-2xl flex-col items-center lg:mx-0 lg:items-start">
      <canvas
        ref={canvasRef}
        className="h-auto w-full cursor-crosshair touch-none"
        style={{ maxWidth: "800px" }}
      />
      <span className="sr-only">{text}</span>
    </div>
  );
}

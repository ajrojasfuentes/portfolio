import React, { useEffect, useRef, useState } from 'react';
import { ACCENTS, hexToRgba } from '@/lib/constants';

const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
};

export const KnowledgeGraphBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let frameId: number;
    const nodeColors = [ACCENTS.home, ACCENTS.publications, ACCENTS.experience];

    let nodes: Node[] = [];

    const isMobile = window.innerWidth < 768;
    const NODE_COUNT = isMobile ? 35 : 70;
    const MAX_CONNECTION_DISTANCE = isMobile ? 80 : 120;

    const initNodes = () => {
      nodes = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push(new Node(window.innerWidth, window.innerHeight));
      }
    };

    const resizeAndInit = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      ctx.scale(dpr, dpr);
      initNodes();
    };

    class Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 1.5 + 1;
        this.color = nodeColors[Math.floor(Math.random() * nodeColors.length)] || '#ffffff';
      }
      update(w: number, h: number) {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }
      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(this.color, 0.55);
        ctx.fill();
      }
    }

    resizeAndInit();
    window.addEventListener('resize', resizeAndInit);

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i]!.x - nodes[j]!.x;
          const dy = nodes[i]!.y - nodes[j]!.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_CONNECTION_DISTANCE) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(148, 163, 184, ${0.14 * (1 - dist / 130)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(nodes[i]!.x, nodes[i]!.y);
            ctx.lineTo(nodes[j]!.x, nodes[j]!.y);
            ctx.stroke();
          }
        }
      }
      nodes.forEach((n) => n.draw(ctx));
    };

    const animate = () => {
      nodes.forEach((n) => n.update(window.innerWidth, window.innerHeight));
      render();
      frameId = requestAnimationFrame(animate);
    };

    if (reducedMotion) {
      render();
    } else {
      animate();
    }

    return () => {
      window.removeEventListener('resize', resizeAndInit);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10"
      style={{ background: 'var(--color-bg)' }}
    />
  );
};

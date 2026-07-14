import React, { useState, useEffect } from 'react';
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

export const NebulaBackground = () => {
  const reducedMotion = useReducedMotion();

  // If reduced motion is enabled, we just show static blobs instead of animated ones.
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      <div 
        className={`absolute rounded-full w-[45vw] h-[45vw] blur-[120px] mix-blend-screen opacity-40 ${reducedMotion ? '' : 'animate-blob'}`}
        style={{ 
          background: hexToRgba(ACCENTS.home, 0.4),
          top: '-10%', left: '-10%',
          animationDuration: '25s'
        }}
      />
      <div 
        className={`absolute rounded-full w-[40vw] h-[40vw] blur-[120px] mix-blend-screen opacity-40 ${reducedMotion ? '' : 'animate-blob'}`}
        style={{ 
          background: hexToRgba(ACCENTS.publications, 0.4),
          top: '20%', right: '-10%',
          animationDuration: '30s',
          animationDelay: '2s'
        }}
      />
      <div 
        className={`absolute rounded-full w-[50vw] h-[50vw] blur-[120px] mix-blend-screen opacity-30 ${reducedMotion ? '' : 'animate-blob'}`}
        style={{ 
          background: hexToRgba(ACCENTS.experience, 0.3),
          bottom: '-20%', left: '20%',
          animationDuration: '35s',
          animationDelay: '4s'
        }}
      />
    </div>
  );
};

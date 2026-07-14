import React, { useEffect, useRef } from 'react';

// The main App component acting as the space background container
export default function SpaceNebulaBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Entity arrays and objects
    let stars = [];
    let planets = [];
    let shootingStars = [];
    let ufo = null;

    // Time-based spawn tracking
    let lastShootingStarTime = performance.now();
    let nextShootingStarDelay = 20000 + Math.random() * 40000; // 20s to 1m
    let lastUfoTime = performance.now();
    let nextUfoDelay = 60000 + Math.random() * 120000; // 1m to 3m

    // Mouse interaction state
    let mouse = { x: null, y: null, radius: 150 };

    const STAR_COUNT = 100; // Even less agglomerated
    const MAX_CONNECTION_DISTANCE = 85; // Further connection distance tolerance
    const PLANET_COUNT = 5;

    // Handle mouse events for interactivity
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    const initPlanets = () => {
      planets = [];
      const types = ['geoid', 'saturn', 'crescent', 'lunar'];
      for (let i = 0; i < PLANET_COUNT; i++) {
        planets.push({
          x: Math.random() * (canvas.width - 100) + 50,
          y: Math.random() * (canvas.height - 100) + 50,
          radius: Math.random() * 20 + 15, // Significantly bigger planets
          vx: (Math.random() - 0.5) * 0.05,
          vy: (Math.random() - 0.5) * 0.05,
          type: types[i % 4],
          ringAngle: Math.random() * Math.PI,
          ringTilt: Math.random() * 0.2 + 0.1, 
          squashX: Math.random() * 0.2 + 0.8, // Geoid squash
          squashY: Math.random() * 0.2 + 0.8,
          rotation: Math.random() * Math.PI * 2, // For crescent orientation
          rotationAngle: 0.03 * Math.PI * 2, // New: track rotation
          rotationSpeed: (0.55 - 0.5) * 0.02, // New: rotation speed
        });
      }
    };

    const resizeAndInit = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initPlanets();
      initStars();
    };

    const initStars = () => {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push(createStar());
      }
    };

    const createStar = (x = null, y = null) => {
      return {
        x: x !== null ? x : Math.random() * canvas.width,
        y: y !== null ? y : Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.05, // Much slower base movement
        vy: (Math.random() - 0.5) * 0.05,
        baseVx: (Math.random() - 0.5) * 0.05,
        baseVy: (Math.random() - 0.5) * 0.05,
      };
    };

    const render = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Update & Draw Planets
      ctx.lineWidth = 1;
      planets.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotationAngle += p.rotationSpeed; // Apply rotation

        // Bounce on borders
        if (p.x - p.radius < 0) { p.x = p.radius; p.vx *= -1; }
        if (p.x + p.radius > canvas.width) { p.x = canvas.width - p.radius; p.vx *= -1; }
        if (p.y - p.radius < 0) { p.y = p.radius; p.vy *= -1; }
        if (p.y + p.radius > canvas.height) { p.y = canvas.height - p.radius; p.vy *= -1; }

        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';

        if (p.type === 'geoid') {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotationAngle);
            ctx.beginPath();
            ctx.ellipse(0, 0, p.radius * p.squashX, p.radius * p.squashY, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        } else if (p.type === 'saturn') {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotationAngle * 0.4);
            ctx.beginPath();
            ctx.arc(0, 0, p.radius * 0.8, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.ellipse(0, 0, p.radius * 2.2, p.radius * 2.2 * p.ringTilt, p.ringAngle, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.ellipse(0, 0, p.radius * 2.6, p.radius * 2.6 * p.ringTilt, p.ringAngle, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        } else if (p.type === 'crescent') {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.beginPath();
            ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
            ctx.fill();
            // Use destination-out to cut out the shape
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(p.radius * 0.35, 0, p.radius * 0.80, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over';
            ctx.restore();
        } else if (p.type === 'lunar') {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotationAngle);
            // Draw main planet
            ctx.beginPath();
            ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
            ctx.fill();
            // Draw moon orbiting
            const moonDist = p.radius + 10;
            const moonX = Math.cos(p.rotationAngle * 2) * moonDist;
            const moonY = Math.sin(p.rotationAngle * 2) * moonDist;
            ctx.beginPath();
            ctx.arc(moonX, moonY, p.radius * 0.3, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
      });

      // 2. Update & Draw Stars & Constellations
      ctx.lineWidth = 0.5;
      for (let i = 0; i < stars.length; i++) {
        let star = stars[i];

        // Aleatoric wandering (reduced noise)
        star.vx += (Math.random() - 0.5) * 0.02;
        star.vy += (Math.random() - 0.5) * 0.02;

        // Dampen back to base velocity heavily to keep them slower
        star.vx = star.vx * 0.98 + star.baseVx * 0.02;
        star.vy = star.vy * 0.98 + star.baseVy * 0.02;

        star.x += star.vx;
        star.y += star.vy;

        // Wrap around screen edges
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Mouse Interactivity
        if (mouse.x !== null) {
          const dx = star.x - mouse.x;
          const dy = star.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            // Repel effect (much harder to move / gentler response)
            const force = (mouse.radius - dist) / mouse.radius;
            star.x += (dx / dist) * force * 0.05; // Harder to move
            star.y += (dy / dist) * force * 0.05;

            // Connect to mouse pointer
            ctx.beginPath();
            ctx.strokeStyle = `rgba(147, 197, 253, ${force * 0.4})`;
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }

        // Draw Dynamic Graph Connections
        for (let j = i + 1; j < stars.length; j++) {
          const dx = star.x - stars[j].x;
          const dy = star.y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_CONNECTION_DISTANCE) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - dist / MAX_CONNECTION_DISTANCE) * 0.25})`;
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }

        // Draw Individual Star
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Shooting Stars (Timed Spawns)
      if (now - lastShootingStarTime > nextShootingStarDelay) { 
        lastShootingStarTime = now;
        nextShootingStarDelay = 20000 + Math.random() * 40000; // 20s to 1m

        const types = ['straight', 'curve', 'spiral'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        let startX, startY, targetX, targetY;
        const edge = Math.floor(Math.random() * 4);
        if (edge === 0) { startX = Math.random() * canvas.width; startY = -50; targetX = Math.random() * canvas.width; targetY = canvas.height + 50; } // Top
        else if (edge === 1) { startX = canvas.width + 50; startY = Math.random() * canvas.height; targetX = -50; targetY = Math.random() * canvas.height; } // Right
        else if (edge === 2) { startX = Math.random() * canvas.width; startY = canvas.height + 50; targetX = Math.random() * canvas.width; targetY = -50; } // Bottom
        else { startX = -50; startY = Math.random() * canvas.height; targetX = canvas.width + 50; targetY = Math.random() * canvas.height; } // Left

        const angle = Math.atan2(targetY - startY, targetX - startX);

        shootingStars.push({
          x: startX,
          y: startY,
          history: [],
          speed: Math.random() * 3 + 4,
          angle: angle,
          baseAngle: angle,
          curveAmount: (Math.random() - 0.5) * 0.015,
          type: type,
          time: 0,
          opacity: 1,
          maxLength: type === 'spiral' ? 35 : 20
        });
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        let ss = shootingStars[i];
        ss.time += 1;
        
        // Save current position
        ss.history.push({ x: ss.x, y: ss.y });
        if (ss.history.length > ss.maxLength) {
          ss.history.shift(); 
        }

        // Update position based on trajectory type
        if (ss.type === 'straight') {
            ss.x += Math.cos(ss.angle) * ss.speed;
            ss.y += Math.sin(ss.angle) * ss.speed;
        } else if (ss.type === 'curve') {
            ss.angle += ss.curveAmount;
            ss.x += Math.cos(ss.angle) * ss.speed;
            ss.y += Math.sin(ss.angle) * ss.speed;
        } else if (ss.type === 'spiral') {
            const mainX = Math.cos(ss.baseAngle) * ss.speed;
            const mainY = Math.sin(ss.baseAngle) * ss.speed;
            
            const perpAngle = ss.baseAngle + Math.PI / 2;
            const spiralRadius = 15;
            const offsetX = Math.cos(perpAngle) * Math.sin(ss.time * 0.2) * spiralRadius;
            const offsetY = Math.sin(perpAngle) * Math.sin(ss.time * 0.2) * spiralRadius;
            
            if (ss.baseX === undefined) { ss.baseX = ss.x; ss.baseY = ss.y; }
            ss.baseX += mainX;
            ss.baseY += mainY;
            
            ss.x = ss.baseX + offsetX;
            ss.y = ss.baseY + offsetY;
        }
        
        // Fade out
        if (ss.y > canvas.height * 0.8 || ss.x < 0 || ss.x > canvas.width) {
           // Removed opacity fade to keep fully opaque
        }

        if (ss.x < -200 || ss.x > canvas.width + 200 || ss.y > canvas.height + 200 || ss.y < -200) {
          shootingStars.splice(i, 1);
          continue;
        }

        // Draw curved tail
        if (ss.history.length > 1) {
          ctx.beginPath();
          ctx.lineWidth = 2;
          ctx.lineCap = 'round';
          ctx.moveTo(ss.history[0].x, ss.history[0].y);
          for (let j = 1; j < ss.history.length; j++) {
            ctx.lineTo(ss.history[j].x, ss.history[j].y);
          }
          ctx.lineTo(ss.x, ss.y);

          const oldest = ss.history[0];
          const gradient = ctx.createLinearGradient(ss.x, ss.y, oldest.x, oldest.y);
          gradient.addColorStop(0, `rgba(255, 255, 255, 1)`); // Solid opacity
          gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
          
          ctx.strokeStyle = gradient;
          ctx.stroke();
        }
        
        // Draw head
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, 1)`; // Solid opacity
        ctx.arc(ss.x, ss.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Little UFO (Timed Spawns)
      if (!ufo && now - lastUfoTime > nextUfoDelay) { 
        lastUfoTime = now;
        nextUfoDelay = 60000 + Math.random() * 120000; // 1 to 3 minutes

        const edge = Math.floor(Math.random() * 4); // 0: Top, 1: Right, 2: Bottom, 3: Left
        let startX, startY, targetX, targetY;
        
        if (edge === 0) {
            startX = Math.random() * canvas.width; startY = -50;
            targetX = Math.random() * canvas.width; targetY = canvas.height + 50;
        } else if (edge === 1) {
            startX = canvas.width + 50; startY = Math.random() * canvas.height;
            targetX = -50; targetY = Math.random() * canvas.height;
        } else if (edge === 2) {
            startX = Math.random() * canvas.width; startY = canvas.height + 50;
            targetX = Math.random() * canvas.width; targetY = -50;
        } else {
            startX = -50; startY = Math.random() * canvas.height;
            targetX = canvas.width + 50; targetY = Math.random() * canvas.height;
        }

        const dx = targetX - startX;
        const dy = targetY - startY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const speed = 1.2;

        ufo = {
          x: startX,
          y: startY,
          vx: (dx / dist) * speed,
          vy: (dy / dist) * speed,
          time: 0,
        };
      }

      if (ufo) {
        ufo.x += ufo.vx;
        ufo.y += ufo.vy;
        ufo.time += 0.08;
        
        const wobbleX = Math.cos(ufo.time * 0.8) * 3;
        const wobbleY = Math.sin(ufo.time) * 3;
        
        const renderX = ufo.x + wobbleX;
        const renderY = ufo.y + wobbleY;

        // White Body
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'; 
        ctx.beginPath();
        ctx.ellipse(renderX, renderY, 12, 4, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // White Dome
        ctx.fillStyle = 'rgba(255, 255, 255, 1)'; 
        ctx.beginPath();
        ctx.arc(renderX, renderY - 2, 5, Math.PI, 0);
        ctx.fill();
        
        // Navigation Lights (White)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'; 
        ctx.beginPath();
        ctx.arc(renderX - 7, renderY + 1, 1.5, 0, Math.PI * 2);
        ctx.arc(renderX, renderY + 1.5, 1.5, 0, Math.PI * 2);
        ctx.arc(renderX + 7, renderY + 1, 1.5, 0, Math.PI * 2);
        ctx.fill();

        if (ufo.x < -100 || ufo.x > canvas.width + 100 || ufo.y < -100 || ufo.y > canvas.height + 100) {
          ufo = null;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Initialization
    window.addEventListener('resize', resizeAndInit);
    resizeAndInit();
    render();

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', resizeAndInit);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#030014]">
      {/* 
        Injecting custom slow keyframes for the "imperceptible" nebula movement.
        Using Tailwind's arbitrary values for the blur since we need massive blur radii.
      */}
      <style>
        {`
          @keyframes drift-1 {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            50% { transform: translate(2vw, 3vh) scale(1.05); }
          }
          @keyframes drift-2 {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            50% { transform: translate(-3vw, 2vh) scale(1.1); }
          }
          @keyframes drift-3 {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            50% { transform: translate(2vw, -2vh) scale(0.95); }
          }
          @keyframes drift-4 {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            50% { transform: translate(-2vw, -3vh) scale(1.05); }
          }
          
          .nebula-1 { animation: drift-1 40s ease-in-out infinite; }
          .nebula-2 { animation: drift-2 55s ease-in-out infinite; }
          .nebula-3 { animation: drift-3 45s ease-in-out infinite; }
          .nebula-4 { animation: drift-4 60s ease-in-out infinite; }
        `}
      </style>

      {/* 
        Nebula Elements
        We use absolutely positioned divs with massive blurs and low opacity.
        The colors chosen (purple, blue, pink, green) overlap and mix softly.
      */}
      
      {/* Purple Nebula (Top Left) */}
      <div className="nebula-1 absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-purple-900/30 blur-[120px] pointer-events-none mix-blend-screen" />
      
      {/* Blue Nebula (Top Right) */}
      <div className="nebula-2 absolute top-[-10%] right-[-20%] w-[70vw] h-[70vw] rounded-full bg-indigo-800/20 blur-[130px] pointer-events-none mix-blend-screen" />
      
      {/* Pink Nebula (Bottom Left) */}
      <div className="nebula-3 absolute bottom-[-20%] left-[10%] w-[50vw] h-[50vw] rounded-full bg-fuchsia-900/20 blur-[100px] pointer-events-none mix-blend-screen" />
      
      {/* Green/Teal Nebula (Bottom Right) */}
      <div className="nebula-4 absolute bottom-[0%] right-[0%] w-[60vw] h-[60vw] rounded-full bg-emerald-900/10 blur-[140px] pointer-events-none mix-blend-screen" />

      {/* The Stars Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 pointer-events-none"
      />

      {/* 
        Foreground Content 
        Place your actual layout or text here. 
        z-20 ensures it stays above both the nebulas and the canvas stars.
      */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full p-8 select-none">
        <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.3em] text-white/90 uppercase text-center mb-4 mix-blend-plus-lighter">
          Stellar Void
        </h1>
        <p className="text-sm md:text-base text-white/50 tracking-widest font-light max-w-md text-center">
          An immersive dark mode experience powered by Astro & Tailwind CSS.
        </p>
      </div>
    </div>
  );
}
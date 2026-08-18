import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const DURATION = 2;

export type GlowHorizonVariant = "top" | "bottom" | "left" | "right";

const VARIANTS: Record<
  GlowHorizonVariant,
  {
    axis: "x" | "y";
    scaleAxis: "scaleX" | "scaleY";
    enterPct: string;
    restPct: string;
  }
> = {
  top: { axis: "y", scaleAxis: "scaleY", enterPct: "-100%", restPct: "-50%" },
  bottom: { axis: "y", scaleAxis: "scaleY", enterPct: "100%", restPct: "50%" },
  left: { axis: "x", scaleAxis: "scaleX", enterPct: "100%", restPct: "50%" },
  right: { axis: "x", scaleAxis: "scaleX", enterPct: "-100%", restPct: "-50%" },
};

function FloatingStars() {
  const [mounted, setMounted] = React.useState(false);
  const [stars, setStars] = React.useState<any[]>([]);

  React.useEffect(() => {
    const generatedStars = Array.from({ length: 40 }).map(() => ({
      top: Math.random() * 100 + "%",
      left: Math.random() * 100 + "%",
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 30 + 30, // Very slow: 30s to 60s
      xMove: (Math.random() - 0.5) * 150,
      yMove: (Math.random() - 0.5) * 150,
      baseOpacity: Math.random() * 0.5 + 0.1,
    }));
    setStars(generatedStars);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)`,
          }}
          initial={{ opacity: star.baseOpacity, x: 0, y: 0 }}
          animate={{
            opacity: [star.baseOpacity, 1, star.baseOpacity],
            x: star.xMove,
            y: star.yMove,
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function Arc({
  variant,
  color,
  size,
  initialOffset,
  blur,
  boxShadow,
  delay,
}: {
  variant: GlowHorizonVariant;
  color: string;
  size: string;
  initialOffset?: string;
  blur?: number;
  boxShadow?: string;
  delay: number;
}) {
  const scale = parseFloat(size) / 100;
  const { axis, enterPct } = VARIANTS[variant];
  const sign = enterPct.startsWith("-") ? -1 : 1;
  const startPct = initialOffset
    ? `${sign * Math.abs(parseFloat(initialOffset) - 50)}%`
    : undefined;

  return (
    <motion.div
      aria-hidden
      className="absolute inset-0 rounded-[100%]"
      style={{
        scale,
        background: color,
        ...(blur !== undefined && { filter: `blur(${blur}px)` }),
        ...(boxShadow && { boxShadow }),
      }}
      initial={startPct ? { [axis]: startPct } : false}
      {...(startPct ? { animate: { [axis]: 0 } } : {})}
      transition={{ duration: DURATION, ease: EASE, delay }}
    />
  );
}

export default function HeroBackground() {
  // Fade out smoothly, but wait until 300px of scroll before starting
  const { scrollY } = useScroll();
  const fadeStart = 500;
  const fadeEnd = 1000;

  const scrollOpacity = useTransform(scrollY, [fadeStart, fadeEnd], [1, 0]);
  const pointerEvents = useTransform(
    scrollY,
    [fadeStart, fadeEnd],
    ["auto", "none"]
  );
  const scrollBlur = useTransform(
    scrollY,
    [fadeStart, fadeEnd],
    ["blur(0px)", "blur(20px)"]
  );
  const linesOpacity = useTransform(scrollY, [fadeStart, fadeEnd], [0, 0.4]);
  // Parallax effect starts immediately but moves smoothly over the longer distance
  const scrollYMove = useTransform(scrollY, [0, fadeEnd], [0, -350]);

  const variant: GlowHorizonVariant = "top";
  const { axis, scaleAxis, enterPct, restPct } = VARIANTS[variant];

  return (
    <motion.div
      style={{
        opacity: scrollOpacity,
        filter: scrollBlur,
        pointerEvents: pointerEvents as any,
        y: scrollYMove,
      }}
      className="fixed inset-0 z-0 overflow-hidden bg-black"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          opacity: linesOpacity,
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,1) 2px, rgba(0,0,0,1) 4px)",
        }}
      />
      <FloatingStars />
      <motion.div
        className="absolute inset-0 h-full w-full"
        animate={{
          opacity: [0.85, 1, 0.85],
          filter: [
            "brightness(1) hue-rotate(0deg)",
            "brightness(1.25) hue-rotate(25deg)",
            "brightness(1) hue-rotate(0deg)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.5, 1],
        }}
      >
        <motion.div
          className="absolute h-full w-full"
          style={{ isolation: "isolate" }}
          initial={{
            [axis]: enterPct,
            [scaleAxis]: 1.5,
            opacity: 0,
            filter: "blur(15px)",
          }}
          animate={{
            [axis]: restPct,
            [scaleAxis]: 1,
            opacity: 1,
            filter: "blur(0px)",
          }}
          transition={{ duration: DURATION, ease: EASE }}
        >
          <Arc
            variant={variant}
            color="#FFFFFF"
            size="132%"
            blur={3}
            boxShadow="0px 0px 30px 0px #ffffffb5"
            delay={1.2}
          />
          <Arc
            variant={variant}
            color="#A558FB"
            size="124%"
            initialOffset="10%"
            blur={45}
            delay={0.6}
          />
          <Arc
            variant={variant}
            color="#4922E5"
            size="130%"
            initialOffset="10%"
            blur={35}
            delay={0}
          />
          <Arc
            variant={variant}
            color="#000"
            size="120%"
            initialOffset="10%"
            blur={51}
            delay={0}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

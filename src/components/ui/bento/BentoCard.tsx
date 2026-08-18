import React, { type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface BentoCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  children,
  className,
  glowColor = "rgba(124, 58, 237, 0.15)",
  ...motionProps
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2 }}
      className={cn(
        "group relative flex min-h-0 flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/20 p-6 shadow-xl shadow-black/30 backdrop-blur-xl transition-shadow duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-indigo-500/10 md:p-8",
        className
      )}
      {...motionProps}
    >
      {/* Background Noise Texture */}
      <div
        className="texture-noise pointer-events-none absolute inset-0 z-0 opacity-[0.12] mix-blend-soft-light"
      />

      {/* Internal ambient glow */}
      <div
        className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full opacity-20 blur-3xl transition-opacity duration-700 group-hover:opacity-40"
        style={{ background: glowColor }}
      />

      {/* Subtle Inner Ring */}
      <div className="pointer-events-none absolute inset-0 z-10 rounded-[2rem] ring-1 ring-white/10 ring-inset" />

      {/* Content wrapper */}
      <div className="relative z-20 flex h-full min-h-0 flex-col">
        {children}
      </div>
    </motion.div>
  );
};

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  HeartHandshake,
  Rocket,
  CalendarDays,
  ArrowRight,
  MousePointerClick,
  Flag,
} from "lucide-react";

const CATEGORIES: Record<
  string,
  { label: string; icon: React.ElementType; color: string; glow: string }
> = {
  job: {
    label: "Job",
    icon: Briefcase,
    color: "#38bdf8",
    glow: "rgba(56, 189, 248, 0.4)",
  },
  volunteering: {
    label: "Volunteering",
    icon: HeartHandshake,
    color: "#f472b6",
    glow: "rgba(244, 114, 182, 0.4)",
  },
  project: {
    label: "Project",
    icon: Rocket,
    color: "#34d399",
    glow: "rgba(52, 211, 153, 0.4)",
  },
  milestone: {
    label: "Milestone",
    icon: Flag,
    color: "#fbbf24",
    glow: "rgba(251, 191, 36, 0.4)",
  },
};

export interface TimelineEntry {
  id: string;
  role: string;
  company: string;
  period: string;
  category: string;
  shortDesc?: string;
  bodyHtml: string;
}

interface FlipCardProps {
  entry: TimelineEntry;
  index: number;
  isFlipped: boolean;
  onFlip: () => void;
}

const MilestoneNode = ({
  entry,
  index,
}: {
  entry: TimelineEntry;
  index: number;
}): React.ReactNode => {
  const cat = CATEGORIES.milestone ?? {
    label: "Milestone",
    icon: Flag,
    color: "#fbbf24",
    glow: "rgba(251, 191, 36, 0.4)",
  };
  const Icon = cat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1, type: "spring" }}
      className="relative z-30 w-full py-2"
    >
      <div
        className="absolute top-1/2 left-[24px] z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 shadow-xl md:left-[60px] md:h-10 md:w-10"
        style={{
          borderColor: cat.color,
          backgroundColor: "var(--color-bg)",
          boxShadow: `0 0 20px ${cat.glow}`,
        }}
      >
        <Icon className="h-4 w-4 md:h-5 md:w-5" style={{ color: cat.color }} />
      </div>

      <div className="ml-[50px] w-[calc(100%-66px)] md:ml-[100px] md:w-auto md:pr-4">
        <div
          className="inline-flex flex-col rounded-xl border px-4 py-3 shadow-lg backdrop-blur-md"
          style={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border-soft)",
          }}
        >
          <span className="text-sm leading-tight font-bold text-white md:text-base">
            {entry.role}
          </span>
          <span className="mt-0.5 font-mono text-[10px] text-slate-400 capitalize md:text-xs">
            {entry.period} • {entry.company}
          </span>
          {entry.shortDesc && (
            <p className="mt-2 max-w-2xl text-[11px] leading-relaxed text-slate-300 md:text-xs">
              {entry.shortDesc}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const FlipCard = ({ entry, index, isFlipped, onFlip }: FlipCardProps): React.ReactNode => {
  const cat =
    CATEGORIES[entry.category] ??
    CATEGORIES.job ?? {
      label: "Job",
      icon: Briefcase,
      color: "#38bdf8",
      glow: "rgba(56, 189, 248, 0.4)",
    };
  const Icon = cat.icon;

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onFlip();
    }
  };

  return (
    <div className="group relative z-20 w-full py-2">
      {/* Spine Point */}
      <div
        className="absolute top-1/2 left-[24px] z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 transition-all duration-300 md:left-[60px] md:h-4 md:w-4"
        style={{
          borderColor: cat.color,
          backgroundColor: "var(--color-bg)",
          boxShadow: isFlipped ? `0 0 15px ${cat.glow}` : "none",
        }}
      />

      {/* Connector Line */}
      <div
        className="absolute top-1/2 left-[24px] z-0 h-[2px] w-[26px] -translate-y-1/2 md:left-[60px] md:w-[40px]"
        style={{
          backgroundImage: `linear-gradient(to right, ${cat.color}60, transparent)`,
        }}
      />

      {/* 3D Flip Card */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
        className="ml-[50px] w-[calc(100%-66px)] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-sky-400 md:mr-8 md:ml-[100px] md:w-auto md:max-w-[800px]"
        style={{ perspective: "1500px" }}
        onClick={onFlip}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={isFlipped}
        aria-label={`Ver detalles de ${entry.role} en ${entry.company}`}
      >
        <motion.div
          className="relative w-full"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* FRONT FACE */}
          <div
            className="relative min-h-[200px] w-full overflow-hidden rounded-2xl border transition-colors group-hover:border-white/20"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border-soft)",
            }}
          >
            {/* Top Accent Bar */}
            <div
              className="absolute top-0 left-0 h-1 w-full"
              style={{ backgroundColor: cat.color }}
            />
            <div
              className="absolute top-0 left-0 h-24 w-full opacity-[0.04]"
              style={{
                background: `linear-gradient(to bottom, ${cat.color}, transparent)`,
              }}
            />

            <div className="flex flex-col p-4 md:p-5">
              {/* Header */}
              <div className="mb-3 flex items-start justify-between md:mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border shadow-inner md:h-10 md:w-10"
                    style={{
                      backgroundColor: "var(--color-surface-2)",
                      borderColor: "var(--color-border-soft)",
                    }}
                  >
                    <Icon
                      className="h-4 w-4 md:h-5 md:w-5"
                      style={{ color: cat.color }}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm leading-tight font-bold text-white md:text-base">
                      {entry.role}
                    </h3>
                    <p
                      className="text-xs font-medium md:text-sm"
                      style={{ color: cat.color }}
                    >
                      {entry.company}
                    </p>
                  </div>
                </div>
                <span
                  className="ml-2 shrink-0 rounded-md border px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase md:px-2.5 md:py-1 md:text-[10px]"
                  style={{
                    color: cat.color,
                    borderColor: `${cat.color}30`,
                    backgroundColor: `${cat.color}10`,
                  }}
                >
                  {cat.label}
                </span>
              </div>

              {/* Duration Badge */}
              <div
                className="mb-3 inline-flex w-fit items-center gap-2 rounded-lg border px-2.5 py-1.5 md:mb-4 md:px-3 md:py-2"
                style={{
                  backgroundColor: "var(--color-surface-2)",
                  borderColor: "var(--color-border-soft)",
                }}
              >
                <CalendarDays
                  className="h-3 w-3 md:h-4 md:w-4"
                  style={{ color: cat.color }}
                />
                <span className="font-mono text-xs text-slate-300 md:text-sm">
                  {entry.period}
                </span>
              </div>

              {/* Short Description & Interactive Hint */}
              <div className="mt-auto flex items-end justify-between gap-2 md:gap-4">
                {entry.shortDesc && (
                  <p className="max-w-[85%] text-xs leading-relaxed text-slate-400 md:text-sm">
                    {entry.shortDesc}
                  </p>
                )}
                <div className="flex shrink-0 flex-col items-center gap-1 opacity-50 transition-opacity group-hover:opacity-100">
                  <MousePointerClick className="h-4 w-4 animate-bounce text-slate-300 md:h-5 md:w-5" />
                </div>
              </div>
            </div>
          </div>

          {/* BACK FACE (Details) */}
          <div
            className="absolute inset-0 h-full w-full overflow-hidden rounded-2xl border"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background:
                "linear-gradient(to bottom right, var(--color-surface-2), var(--color-surface))",
              borderColor: `${cat.color}30`,
            }}
          >
            {/* Watermark Icon */}
            <Icon
              className="pointer-events-none absolute -right-10 -bottom-10 h-48 w-48 rotate-12 opacity-[0.03]"
              style={{ color: cat.color }}
            />

            <div className="flex h-full flex-col p-6">
              <div
                className="mb-4 flex shrink-0 items-center gap-2 border-b pb-3"
                style={{ borderColor: "var(--color-border-soft)" }}
              >
                <Icon className="h-4 w-4" style={{ color: cat.color }} />
                <h4 className="text-sm font-semibold text-white">
                  In-depth Details
                </h4>
              </div>

              {/* Rendered MDX content */}
              <div
                className="prose prose-invert prose-sm max-w-none flex-grow overflow-y-auto pr-2 text-sm leading-relaxed text-slate-300"
                dangerouslySetInnerHTML={{ __html: entry.bodyHtml }}
              />

              <div className="mt-4 flex shrink-0 items-center justify-center gap-2 pt-3 text-center font-mono text-xs text-slate-500">
                <ArrowRight className="h-3 w-3 rotate-180" /> Click to revert
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default function ExperienceTimeline({
  entries,
}: {
  entries: TimelineEntry[];
}): React.ReactNode {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const handleFlip = (id: string): void => {
    setActiveCardId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="relative w-full">
      <div className="relative flex w-full flex-col gap-8">
        {/* Vertical Spine Line */}
        <div
          className="absolute top-0 bottom-0 left-[24px] z-0 w-[2px] -translate-x-1/2 overflow-hidden rounded-full md:left-[60px]"
          style={{ backgroundColor: "var(--color-border-soft)" }}
        >
          {/* Animated Energy Flow */}
          <motion.div
            className="absolute left-1/2 h-64 w-[4px] -translate-x-1/2 rounded-full opacity-80"
            style={{
              background:
                "linear-gradient(to bottom, transparent, #c084fc, #38bdf8, transparent)",
              filter: "blur(2px)",
            }}
            animate={{ top: ["-20%", "120%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Timeline Cards */}
        {entries.map((entry, index) =>
          entry.category === "milestone" ? (
            <MilestoneNode key={entry.id} entry={entry} index={index} />
          ) : (
            <FlipCard
              key={entry.id}
              entry={entry}
              index={index}
              isFlipped={activeCardId === entry.id}
              onFlip={() => handleFlip(entry.id)}
            />
          )
        )}
      </div>
    </div>
  );
}

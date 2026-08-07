import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, HeartHandshake, Rocket, CalendarDays, ArrowRight, MousePointerClick, Flag } from 'lucide-react';

const CATEGORIES: Record<string, { label: string; icon: React.ElementType; color: string; glow: string }> = {
  job: {
    label: 'Job',
    icon: Briefcase,
    color: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.4)',
  },
  volunteering: {
    label: 'Volunteering',
    icon: HeartHandshake,
    color: '#f472b6',
    glow: 'rgba(244, 114, 182, 0.4)',
  },
  project: {
    label: 'Project',
    icon: Rocket,
    color: '#34d399',
    glow: 'rgba(52, 211, 153, 0.4)',
  },
  milestone: {
    label: 'Milestone',
    icon: Flag,
    color: '#fbbf24',
    glow: 'rgba(251, 191, 36, 0.4)',
  }
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

const MilestoneNode = ({ entry, index }: { entry: TimelineEntry; index: number }) => {
  const cat = CATEGORIES.milestone!;
  const Icon = cat.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1, type: "spring" }}
      className="relative w-full z-30 py-2"
    >
      <div 
        className="absolute left-[24px] md:left-[60px] top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border-2 shadow-xl z-10"
        style={{ borderColor: cat.color, backgroundColor: 'var(--color-bg)', boxShadow: `0 0 20px ${cat.glow}` }}
      >
        <Icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: cat.color }} />
      </div>

      <div className="ml-[50px] md:ml-[100px] w-[calc(100%-66px)] md:w-auto md:pr-4">
        <div className="px-4 py-3 rounded-xl border inline-flex flex-col shadow-lg backdrop-blur-md"
             style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border-soft)' }}>
          <span className="text-white font-bold text-sm md:text-base leading-tight">{entry.role}</span>
          <span className="text-slate-400 text-[10px] md:text-xs font-mono mt-0.5 capitalize">{entry.period} • {entry.company}</span>
          {entry.shortDesc && (
            <p className="text-slate-300 text-[11px] md:text-xs mt-2 leading-relaxed max-w-2xl">
              {entry.shortDesc}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const FlipCard = ({ entry, index, isFlipped, onFlip }: FlipCardProps) => {
  const cat = CATEGORIES[entry.category] || CATEGORIES.job!;
  const Icon = cat.icon;

  return (
    <div className="relative w-full z-20 group py-2">
      {/* Spine Point */}
      <div
        className="absolute left-[24px] md:left-[60px] top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full border-4 z-10 transition-all duration-300"
        style={{
          borderColor: cat.color,
          backgroundColor: 'var(--color-bg)',
          boxShadow: isFlipped ? `0 0 15px ${cat.glow}` : 'none',
        }}
      />

      {/* Connector Line */}
      <div
        className="absolute left-[24px] md:left-[60px] top-1/2 -translate-y-1/2 h-[2px] z-0 w-[26px] md:w-[40px]"
        style={{
          backgroundImage: `linear-gradient(to right, ${cat.color}60, transparent)`,
        }}
      />

      {/* 3D Flip Card */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
        className="ml-[50px] md:ml-[100px] w-[calc(100%-66px)] md:w-auto md:mr-8 md:max-w-[800px] cursor-pointer"
        style={{ perspective: '1500px' }}
        onClick={onFlip}
      >
        <motion.div
          className="w-full relative"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 20 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* FRONT FACE */}
          <div
            className="relative w-full min-h-[200px] rounded-2xl border overflow-hidden transition-colors group-hover:border-white/20"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border-soft)',
            }}
          >
            {/* Top Accent Bar */}
            <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: cat.color }} />
            <div
              className="absolute top-0 left-0 w-full h-24 opacity-[0.04]"
              style={{ background: `linear-gradient(to bottom, ${cat.color}, transparent)` }}
            />

            <div className="p-4 md:p-5 flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-start mb-3 md:mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 md:w-10 md:h-10 rounded-xl border flex items-center justify-center shadow-inner shrink-0"
                    style={{ backgroundColor: 'var(--color-surface-2)', borderColor: 'var(--color-border-soft)' }}
                  >
                    <Icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: cat.color }} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm md:text-base leading-tight">{entry.role}</h3>
                    <p className="text-xs md:text-sm font-medium" style={{ color: cat.color }}>{entry.company}</p>
                  </div>
                </div>
                <span
                  className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 md:px-2.5 md:py-1 rounded-md border shrink-0 ml-2"
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
                className="inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 md:px-3 md:py-2 w-fit mb-3 md:mb-4 border"
                style={{ backgroundColor: 'var(--color-surface-2)', borderColor: 'var(--color-border-soft)' }}
              >
                <CalendarDays className="w-3 h-3 md:w-4 md:h-4" style={{ color: cat.color }} />
                <span className="text-xs md:text-sm font-mono text-slate-300">{entry.period}</span>
              </div>

              {/* Short Description & Interactive Hint */}
              <div className="flex items-end justify-between gap-2 md:gap-4 mt-auto">
                {entry.shortDesc && (
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-[85%]">{entry.shortDesc}</p>
                )}
                <div className="flex flex-col items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity shrink-0">
                  <MousePointerClick className="w-4 h-4 md:w-5 md:h-5 text-slate-300 animate-bounce" />
                </div>
              </div>
            </div>
          </div>

          {/* BACK FACE (Details) */}
          <div
            className="absolute inset-0 w-full h-full rounded-2xl border overflow-hidden"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: 'linear-gradient(to bottom right, var(--color-surface-2), var(--color-surface))',
              borderColor: `${cat.color}30`,
            }}
          >
            {/* Watermark Icon */}
            <Icon
              className="absolute -bottom-10 -right-10 w-48 h-48 opacity-[0.03] rotate-12 pointer-events-none"
              style={{ color: cat.color }}
            />

            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b shrink-0" style={{ borderColor: 'var(--color-border-soft)' }}>
                <Icon className="w-4 h-4" style={{ color: cat.color }} />
                <h4 className="text-white font-semibold text-sm">In-depth Details</h4>
              </div>

              {/* Rendered MDX content */}
              <div
                className="flex-grow overflow-y-auto pr-2 text-slate-300 text-sm leading-relaxed prose prose-invert max-w-none prose-sm"
                dangerouslySetInnerHTML={{ __html: entry.bodyHtml }}
              />

              <div className="mt-4 pt-3 text-xs text-slate-500 font-mono text-center flex justify-center items-center gap-2 shrink-0">
                <ArrowRight className="w-3 h-3 rotate-180" /> Click to revert
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default function ExperienceTimeline({ entries }: { entries: TimelineEntry[] }) {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const handleFlip = (id: string) => {
    setActiveCardId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full relative">
      <div className="relative w-full flex flex-col gap-8">
        {/* Vertical Spine Line */}
        <div
          className="absolute left-[24px] md:left-[60px] top-0 bottom-0 w-[2px] -translate-x-1/2 z-0 rounded-full overflow-hidden"
          style={{ backgroundColor: 'var(--color-border-soft)' }}
        >
          {/* Animated Energy Flow */}
          <motion.div
            className="absolute left-1/2 w-[4px] h-64 -translate-x-1/2 rounded-full opacity-80"
            style={{
              background: 'linear-gradient(to bottom, transparent, #c084fc, #38bdf8, transparent)',
              filter: 'blur(2px)',
            }}
            animate={{ top: ['-20%', '120%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Timeline Cards */}
        {entries.map((entry, index) => (
          entry.category === 'milestone' ? (
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
        ))}
      </div>
    </div>
  );
}

import React from "react";
import { BentoCard } from "./BentoCard";
import {
  Sparkles,
  MapPin,
  Terminal,
  ArrowUpRight,
  Cpu,
  Layers,
} from "lucide-react";


interface ProfileProps {
  name: string;
  titles: string[];
  description?: string | undefined;
  location?: string | undefined;
  statusText?: string | undefined;
}

export const HeroBioCard: React.FC<{ profile: ProfileProps }> = ({
  profile,
}) => {
  const {
    description,
    location = "Alajuela, Costa Rica",
    statusText = "Open to works and projects",
  } = profile;

  const coreSkills = [
    {
      label: "AI & Multi-Agent Systems",
      icon: Sparkles,
      color: "text-purple-400 border-purple-500/20 bg-purple-500/10",
    },
    {
      label: "CERN LHCb Research",
      icon: Cpu,
      color: "text-teal-400 border-teal-500/20 bg-teal-500/10",
    },
    {
      label: "Real-Time Data Platforms",
      icon: Terminal,
      color: "text-sky-400 border-sky-500/20 bg-sky-500/10",
    },
    {
      label: "Full-Stack Architecture",
      icon: Layers,
      color: "text-amber-400 border-amber-500/20 bg-amber-500/10",
    },
  ];

  return (
    <BentoCard
      glowColor="rgba(56, 189, 248, 0.15)"
      className="flex-1 justify-between"
    >
      {/* Header bar */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal-500" />
          </span>
          <span className="font-mono text-xs font-medium tracking-wider text-teal-300 uppercase">
            {statusText}
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <MapPin size={13} className="text-indigo-400" />
            {location}
          </span>
          <span className="text-white/20">|</span>
          <span className="text-indigo-400/80">LATAM / UTC-6</span>
        </div>
      </div>

      {/* Main Headline & Description */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl leading-snug font-bold tracking-tight text-white md:text-2xl">
            Architecting{" "}
            <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-teal-300 bg-clip-text text-transparent">
              Intelligent Systems
            </span>
            , Data Platforms & Scalable AI
          </h2>
        </div>

        <p className="text-sm leading-relaxed font-light text-slate-300 md:text-base">
          {description ||
            "Engineering intelligent systems and solutions through robust software, scalable data platforms, and production-grade AI. Driven by automation, grounded in computer engineering, improved with cutting-edge scientific research, and committed to technical excellence."}
        </p>

        {/* Specialization pills with Framer Motion */}
        <div className="flex flex-wrap gap-2 pt-2">
          {coreSkills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <span
                key={skill.label}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 font-mono text-xs tracking-wide ${skill.color} shadow-sm transition-all hover:scale-105`}
                style={{
                  animation: `fade-scale-in 0.3s ease-out ${0.1 * index}s both`,
                }}
              >
                <Icon size={12} />
                {skill.label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Quick Action Navigation Links */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
        <span className="font-mono text-[11px] text-slate-400">
          System Core:{" "}
          <span className="text-indigo-300">
            Production-Ready & High-Concurrency
          </span>
        </span>

        <div className="flex items-center gap-4">
          <a
            href="#experience"
            className="group/link flex items-center gap-1 font-mono text-xs text-slate-300 transition-colors hover:text-teal-300"
          >
            Experience
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            />
          </a>
          <a
            href="#projects"
            className="group/link flex items-center gap-1 font-mono text-xs text-slate-300 transition-colors hover:text-purple-300"
          >
            Projects
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </BentoCard>
  );
};

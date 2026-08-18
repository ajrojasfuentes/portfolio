import React from "react";
import { BentoCard } from "./BentoCard";
import { Atom, Trophy, Zap, ShieldCheck, ArrowRight } from "lucide-react";


interface HighlightItem {
  icon: React.ElementType;
  tag: string;
  tagColor: string;
  title: string;
  desc: string;
  link: string;
  borderColor: string;
}

export const HeroHighlightsCard: React.FC = () => {
  const highlights: HighlightItem[] = [
    {
      icon: Atom,
      tag: "CERN • GANU-Lab",
      tagColor: "text-purple-400 border-purple-500/30 bg-purple-500/10",
      title: "LHCb Generative AI",
      desc: "Fast ML simulation models & uncertainty estimation for high-energy particle physics.",
      link: "#publications",
      borderColor: "hover:border-purple-500/40",
    },
    {
      icon: Trophy,
      tag: "ICPC World Finals '24",
      tagColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
      title: "Global Algorithmic Finalist",
      desc: "Astana, Kazakhstan • Regional Champion representing Costa Rica & LATAM.",
      link: "#accomplishments",
      borderColor: "hover:border-amber-500/40",
    },
    {
      icon: Zap,
      tag: "CriticalRiver Inc.",
      tagColor: "text-teal-400 border-teal-500/30 bg-teal-500/10",
      title: "Real-Time Data Platforms",
      desc: "Zero-config event pipelines, Redis, Azure, DBT & enterprise automated ingestion.",
      link: "#experience",
      borderColor: "hover:border-teal-500/40",
    },
    {
      icon: ShieldCheck,
      tag: "Full-Stack Enterprise",
      tagColor: "text-sky-400 border-sky-500/30 bg-sky-500/10",
      title: "APAMAN ERP / EHR",
      desc: "Complete hospital & administrative platform with robust role-based access control.",
      link: "#projects",
      borderColor: "hover:border-sky-500/40",
    },
  ];

  return (
    <BentoCard glowColor="rgba(168, 85, 247, 0.15)" className="flex-1">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold tracking-wider text-slate-300 uppercase">
            Key Impact & Core Highlights
          </span>
        </div>
        <span className="font-mono text-[11px] text-slate-500">
          SELECTED MILESTONES
        </span>
      </div>

      {/* 2x2 Grid of Highlights */}
      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
        {highlights.map((item, index) => {
          const Icon = item.icon;
          return (
            <a
              key={item.title}
              href={item.link}
              className={`group/card relative flex flex-col justify-between rounded-xl border border-white/10 bg-slate-950/40 p-4 transition-all duration-300 hover:-translate-y-[3px] hover:scale-[1.01] ${item.borderColor} hover:bg-slate-900/60 hover:shadow-lg`}
              style={{
                animation: `fade-slide-up 0.4s ease-out ${0.08 * index + 0.1}s both`,
              }}
            >
              <div>
                <div className="mb-2.5 flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-[10px] font-medium tracking-wide ${item.tagColor}`}
                  >
                    <Icon size={11} />
                    {item.tag}
                  </span>
                  <ArrowRight
                    size={13}
                    className="text-slate-500 transition-transform duration-300 group-hover/card:translate-x-1 group-hover/card:text-white"
                  />
                </div>

                <h3 className="font-mono text-sm font-semibold text-white transition-colors group-hover/card:text-indigo-200">
                  {item.title}
                </h3>

                <p className="mt-1 line-clamp-2 text-xs leading-relaxed font-light text-slate-400">
                  {item.desc}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </BentoCard>
  );
};

import React from "react";
import { BentoCard } from "./BentoCard";
import {
  Sparkles,
  Flame,
  Layers,
  Bot,
  Cpu,
  Zap,
  Database,
  Server,
  Workflow,
  Share2,
  Code2,
  Rocket,
  Terminal,
  Palette,
  HardDrive,
  FileCode,
  Braces,
  Binary,
  Table,
  Shield,
  Boxes,
} from "lucide-react";


interface SkillItem {
  name: string;
  icon: React.ElementType;
}

interface SkillCategory {
  title: string;
  badgeColor: string;
  borderColor: string;
  iconColor: string;
  skills: SkillItem[];
}

export const HeroSkillsCard: React.FC = () => {
  const skillCategories: SkillCategory[] = [
    {
      title: "AI & ML",
      badgeColor: "text-purple-400 border-purple-500/30 bg-purple-500/10",
      borderColor: "hover:border-purple-500/30",
      iconColor: "text-purple-400",
      skills: [
        { name: "PyTorch", icon: Flame },
        { name: "TensorFlow", icon: Layers },
        { name: "LangChain / LLMs", icon: Sparkles },
        { name: "Hugging Face", icon: Bot },
        { name: "Scikit-Learn", icon: Cpu },
      ],
    },
    {
      title: "Data",
      badgeColor: "text-teal-400 border-teal-500/30 bg-teal-500/10",
      borderColor: "hover:border-teal-500/30",
      iconColor: "text-teal-400",
      skills: [
        { name: "Apache Spark", icon: Zap },
        { name: "BigQuery", icon: Database },
        { name: "Redis", icon: Server },
        { name: "DBT", icon: Workflow },
        { name: "Apache Beam", icon: Share2 },
      ],
    },
    {
      title: "Full-Stack",
      badgeColor: "text-sky-400 border-sky-500/30 bg-sky-500/10",
      borderColor: "hover:border-sky-500/30",
      iconColor: "text-sky-400",
      skills: [
        { name: "React / Next.js", icon: Code2 },
        { name: "Astro", icon: Rocket },
        { name: "FastAPI / Node", icon: Terminal },
        { name: "Tailwind CSS", icon: Palette },
        { name: "PostgreSQL", icon: HardDrive },
      ],
    },
    {
      title: "Lenguajes",
      badgeColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
      borderColor: "hover:border-amber-500/30",
      iconColor: "text-amber-400",
      skills: [
        { name: "Python", icon: FileCode },
        { name: "TypeScript", icon: Braces },
        { name: "C++", icon: Binary },
        { name: "SQL", icon: Table },
        { name: "Rust", icon: Shield },
      ],
    },
  ];

  return (
    <BentoCard
      glowColor="rgba(168, 85, 247, 0.15)"
      className="h-full flex-1 justify-between"
    >
      {/* Header */}
      <div className="mb-3.5 flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-md border border-purple-500/30 bg-purple-500/10 px-2.5 py-1 font-mono text-xs font-semibold text-purple-300">
            <Boxes size={13} className="text-purple-400" />
            SKILLS & STACK
          </div>
        </div>
        <span className="font-mono text-[11px] tracking-wider text-slate-500">
          4 CATEGORIES • 20 CORE TECHS
        </span>
      </div>

      {/* 4 Category Columns Grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {skillCategories.map((category, catIdx) => (
          <div
            key={category.title}
            className={`flex flex-col justify-between rounded-xl border border-white/5 bg-slate-950/40 p-3 transition-all duration-300 ${category.borderColor} hover:bg-slate-900/50`}
          >
            {/* Category Header */}
            <div className="mb-2.5 border-b border-white/5 pb-1.5">
              <span
                className={`inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wide ${category.badgeColor}`}
              >
                {category.title}
              </span>
            </div>

            {/* 5 Skill Items */}
            <div className="space-y-1.5">
              {category.skills.map((skill, skillIdx) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2 rounded-lg px-2 py-1 font-mono text-xs text-slate-300 transition-all hover:translate-x-0.5 hover:bg-white/5 hover:text-white"
                    style={{
                      animation: `fade-slide-left 0.3s ease-out ${0.04 * (catIdx * 5 + skillIdx)}s both`,
                    }}
                  >
                    <Icon
                      size={13}
                      className={`${category.iconColor} shrink-0`}
                    />
                    <span className="truncate text-[11px] font-light tracking-tight">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </BentoCard>
  );
};

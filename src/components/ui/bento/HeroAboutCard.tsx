import React from "react";
import { BentoCard } from "./BentoCard";
import { Sparkles, MapPin, User, Cpu, Layers, Terminal } from "lucide-react";
import { motion } from "framer-motion";

interface ProfileProps {
  name: string;
  titles: string[];
  description?: string | undefined;
  location?: string | undefined;
}

export const HeroAboutCard: React.FC<{ profile: ProfileProps }> = ({
  profile,
}) => {
  const { location = "Alajuela, Costa Rica" } = profile;

  const corePillars = [
    {
      label: "AI & ML",
      icon: Sparkles,
      color: "text-purple-300 border-purple-500/25 bg-purple-500/10",
    },
    {
      label: "Scientific Research",
      icon: Cpu,
      color: "text-teal-300 border-teal-500/25 bg-teal-500/10",
    },
    {
      label: "Data",
      icon: Layers,
      color: "text-sky-300 border-sky-500/25 bg-sky-500/10",
    },
    {
      label: "Full-Stack",
      icon: Terminal,
      color: "text-amber-300 border-amber-500/25 bg-amber-500/10",
    },
  ];

  return (
    <BentoCard
      glowColor="rgba(56, 189, 248, 0.15)"
      className="h-full min-h-0 flex-1 justify-between"
    >
      {/* Header bar */}
      <div className="mb-3 flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-md border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-1 font-mono text-xs font-semibold text-indigo-300">
            <User size={13} className="text-indigo-400" />
            ABOUT ME
          </div>
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

      {/* Main Narrative Content (Flex area with min-h-0) */}
      <div className="flex min-h-0 flex-1 flex-col space-y-2.5">
        <h2 className="shrink-0 text-lg leading-snug font-bold tracking-tight text-white md:text-xl">
          Hello! I'm{" "}
          <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-teal-300 bg-clip-text text-transparent">
            Anthony Rojas
          </span>
        </h2>

        {/* Scrollable / Formatted Narrative Container */}
        <div className="min-h-0 flex-1 space-y-3.5 overflow-y-auto pr-3 text-[13.5px] leading-[1.75] font-light text-slate-300 md:text-[14.5px]">
          <p>
            An{" "}
            <strong className="font-medium text-white">
              AI Engineer, Data Engineer, and Full-Stack Developer
            </strong>
            . My professional philosophy centers on designing intelligent,
            adaptable solutions built on robust, scalable software, with a
            constant focus on optimization, quality, and clean data flow
            management. Driven by a passion for automating workflows and
            grounded in a solid foundation of algorithms, systems design, and
            computer architecture, I'm committed to technical excellence and
            continuous innovation. I take pride in turning complex problems into
            creative, innovative solutions — there's no challenge I can't solve,
            and no solution I can't reach.
          </p>

          <p>
            I hold a{" "}
            <strong className="font-medium text-white">
              B.S. in Computer Engineering
            </strong>{" "}
            from the Costa Rica Institute of Technology (TEC) and am currently
            pursuing an{" "}
            <strong className="font-medium text-white">
              MBA in AI and Data Science
            </strong>{" "}
            at ENEB. That same academic rigor carries into elite algorithmic
            problem-solving — I was recognized as a{" "}
            <strong className="font-medium text-teal-300">
              2024 ICPC World Finalist and Regional Champion
            </strong>
            . I've also proven my ability to translate complex theoretical
            research into efficient, production-ready systems, working as an{" "}
            <strong className="font-medium text-purple-300">
              AI Engineer and ML Research Scientist at CERN's LHCb Experiment
            </strong>{" "}
            and co-authoring a paper presented at the 7th IEEE BIP Conference
            2025, bridging cutting-edge research with applied engineering.
          </p>

          <p>
            In industry, I've designed end-to-end software solutions and
            automated data pipelines across sectors, comfortable working the
            full stack from data flow to API layer. As a Data Engineer at{" "}
            <strong className="font-medium text-white">
              CriticalRiver Inc.
            </strong>
            , I built real-time pipelines and secure REST APIs; as a Software
            Engineer at{" "}
            <strong className="font-medium text-white">APAMAN</strong>, I put my
            full-stack skills to the test, building a comprehensive ERP platform
            from scratch. Whether engineering fault-tolerant systems under
            production load, automating data workflows, or architecting robust
            full-stack platforms, I'm dedicated to carrying innovative solutions
            from research to production, turning ideas into reality.
          </p>
        </div>
      </div>

      {/* Footer Pillars with Framer Motion (Shrink-0 to prevent clipping) */}
      <div className="mt-3 flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-2.5">
        <div className="flex flex-wrap gap-2">
          {corePillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.span
                key={pillar.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * index, duration: 0.25 }}
                whileHover={{ scale: 1.04 }}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 font-mono text-[11px] tracking-tight ${pillar.color} shadow-sm backdrop-blur-md transition-all`}
              >
                <Icon size={12} />
                {pillar.label}
              </motion.span>
            );
          })}
        </div>
      </div>
    </BentoCard>
  );
};

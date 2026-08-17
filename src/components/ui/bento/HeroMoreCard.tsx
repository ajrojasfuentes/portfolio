import React from "react";
import { BentoCard } from "./BentoCard";
import { RotateCw, ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const HeroMoreCard: React.FC = () => {
  const handleFlipCard = () => {
    const badgeCard = document.getElementById("badge-card");
    if (badgeCard) {
      badgeCard.classList.toggle("is-flipped");

      // On smaller screens, smoothly scroll to ID card
      if (window.innerWidth < 1024) {
        document
          .getElementById("badge-container")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const navLinks = [
    {
      label: "Experience",
      href: "#experience",
      color: "hover:text-sky-300 hover:border-sky-500/40",
    },
    {
      label: "Projects",
      href: "#projects",
      color: "hover:text-amber-300 hover:border-amber-500/40",
    },
    {
      label: "Publications",
      href: "#publications",
      color: "hover:text-purple-300 hover:border-purple-500/40",
    },
    {
      label: "Certifications",
      href: "#certifications",
      color: "hover:text-rose-300 hover:border-rose-500/40",
    },
    {
      label: "Accomplishments",
      href: "#accomplishments",
      color: "hover:text-emerald-300 hover:border-emerald-500/40",
    },
  ];

  return (
    <BentoCard
      glowColor="rgba(168, 85, 247, 0.15)"
      className="shrink-0 justify-between p-5 md:p-6"
    >
      <div className="my-auto flex flex-col justify-center gap-3.5">
        {/* Top Row: Invitation + "Get in Touch" Flip Button */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="max-w-md space-y-1">
            <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-purple-300 uppercase">
              <Sparkles size={13} className="text-purple-400" />
              Let's Collaborate
            </div>
            <p className="text-xs leading-relaxed font-light text-slate-300 md:text-sm">
              Interested in discussing AI research, real-time data platforms, or
              full-stack software? Let's connect.
            </p>
          </div>

          {/* Get in Touch Button (Flips IDCard) */}
          <motion.button
            type="button"
            onClick={handleFlipCard}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group/btn inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl border border-indigo-500/40 bg-gradient-to-r from-indigo-600/30 via-purple-600/30 to-teal-600/30 px-5 py-2.5 font-mono text-xs font-semibold tracking-wider text-white uppercase shadow-lg shadow-indigo-500/15 backdrop-blur-md transition-all duration-300 hover:border-indigo-400 hover:from-indigo-600/40 hover:to-teal-600/40 hover:shadow-indigo-500/30"
          >
            <span>Get in Touch</span>
            <RotateCw
              size={13}
              className="text-indigo-300 transition-transform duration-500 group-hover/btn:rotate-180"
            />
          </motion.button>
        </div>

        {/* Bottom Row: Stylized Portfolio Navigation Links */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3">
          <span className="font-mono text-[11px] tracking-wider text-slate-500 uppercase">
            Explore Portfolio:
          </span>

          <div className="flex flex-wrap items-center gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`group/nav inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-slate-300 transition-all duration-200 ${link.color} hover:bg-white/10`}
              >
                {link.label}
                <ArrowUpRight
                  size={11}
                  className="text-slate-400 transition-transform duration-200 group-hover/nav:translate-x-0.5 group-hover/nav:-translate-y-0.5 group-hover/nav:text-white"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </BentoCard>
  );
};

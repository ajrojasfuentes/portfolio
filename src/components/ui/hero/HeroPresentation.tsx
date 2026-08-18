"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import TerminalTypewriter from "./TerminalTypewriter";
import ParticleTitle from "./ParticleTitle";

export default function HeroPresentation() {
  const handleScrollDown = () => {
    // Scroll to the next section (about me) smoothly, plus a little extra offset
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      const topOffset =
        aboutSection.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: topOffset + 2, behavior: "smooth" });
    }
  };

  return (
    <div className="relative z-10 flex w-full flex-col items-center justify-center space-y-8 text-center lg:items-start lg:text-left">
      {/* 1. Name Title & Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex w-full flex-col items-center lg:items-start"
      >
        <ParticleTitle text="Anthony Rojas" />
        <p className="mt-2 font-mono text-lg font-medium tracking-wider text-emerald-400 sm:text-xl">
          ajrojasfuentes.dev
        </p>
      </motion.div>

      {/* 2. Terminal Typewriter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="flex w-full justify-center lg:justify-start"
      >
        <TerminalTypewriter />
      </motion.div>

      {/* 3. Closing Phrase */}
      <motion.div
        initial={{ opacity: 0, filter: "blur(5px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <p className="text-xl font-light tracking-wide text-gray-300 italic sm:text-2xl">
          "Deep Down in a Universe of Possibilities"
        </p>
      </motion.div>

      {/* 4. Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute -bottom-24 left-1/2 -translate-x-1/2 transform lg:-bottom-32"
      >
        <button
          onClick={handleScrollDown}
          className="flex flex-col items-center justify-center text-gray-400 transition-colors duration-300 hover:text-white focus:outline-none"
          aria-label="Scroll to next section"
        >
          <span className="mb-2 text-sm tracking-widest uppercase opacity-70">
            Explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="h-8 w-8 opacity-80" />
          </motion.div>
        </button>
      </motion.div>
    </div>
  );
}

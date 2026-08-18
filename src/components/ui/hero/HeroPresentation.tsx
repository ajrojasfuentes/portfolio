"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import TerminalTypewriter from "./TerminalTypewriter";
import ParticleTitle from "./ParticleTitle";

export default function HeroPresentation() {
  const handleScrollDown = () => {
    // Scroll to the next section (about me) smoothly
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center lg:items-start space-y-8 w-full z-10 text-center lg:text-left relative">
      
      {/* 1. Name Title & Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full flex flex-col items-center lg:items-start"
      >
        <ParticleTitle text="Anthony Rojas" />
        <p className="mt-2 text-lg sm:text-xl font-medium text-emerald-400 tracking-wider font-mono">
          ajrojasfuentes.dev
        </p>
      </motion.div>

      {/* 2. Terminal Typewriter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="w-full flex justify-center lg:justify-start"
      >
        <TerminalTypewriter />
      </motion.div>

      {/* 3. Closing Phrase */}
      <motion.div
        initial={{ opacity: 0, filter: "blur(5px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <p className="text-xl sm:text-2xl font-light text-gray-300 italic tracking-wide">
          "Deep Down in a Universe of Possibilities"
        </p>
      </motion.div>

      {/* 4. Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute -bottom-24 lg:-bottom-32 left-1/2 transform -translate-x-1/2"
      >
        <button
          onClick={handleScrollDown}
          className="flex flex-col items-center justify-center text-gray-400 hover:text-white transition-colors duration-300 focus:outline-none"
          aria-label="Scroll to next section"
        >
          <span className="text-sm tracking-widest uppercase mb-2 opacity-70">Explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="w-8 h-8 opacity-80" />
          </motion.div>
        </button>
      </motion.div>

    </div>
  );
}

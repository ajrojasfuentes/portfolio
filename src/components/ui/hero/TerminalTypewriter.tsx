"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const PARAGRAPHS = [
  "AI Engineer, Data Engineer, and Full-Stack Developer. I design automated data pipelines, build production-grade AI systems, and architect end-to-end software platforms.",
  "Bridging theoretical computer science with elite software engineering and modern AI. Building custom, production-ready systems engineered for uncompromising optimization, scalability, and uptime.",
  "I work with organizations to turn bold ideas into robust, valuable, production-ready infrastructure, bringing scientific depth, fresh innovation, and relentless execution to help teams de-risk complex technical challenges.",
  "I empower startups and enterprises to unlock their full potential, turning problems into innovation, and ideas into reality.",
];

const TYPING_SPEED = 40; // ms per character
const PAUSE_DURATION = 3000; // ms to wait after typing finishes

export default function TerminalTypewriter(): React.ReactNode {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  // Typewriter effect logic
  useEffect(() => {
    const currentFullText = PARAGRAPHS[currentIndex] || "";

    if (shouldReduceMotion) {
      // Instantly show the full text if reduced motion is preferred
      setDisplayedText(currentFullText);
      setIsTyping(false);

      const timer = setTimeout((): void => {
        setCurrentIndex((prev) => (prev + 1) % PARAGRAPHS.length);
        setIsTyping(true);
      }, PAUSE_DURATION);
      return (): void => clearTimeout(timer);
    }

    let charIndex = 0;
    setIsTyping(true);
    setDisplayedText(""); // Reset text

    const typingInterval = setInterval((): void => {
      setDisplayedText(currentFullText.slice(0, charIndex + 1));
      charIndex++;

      if (charIndex === currentFullText.length) {
        clearInterval(typingInterval);
        setIsTyping(false);
        // Wait before moving to the next paragraph
        setTimeout((): void => {
          setCurrentIndex((prev) => (prev + 1) % PARAGRAPHS.length);
        }, PAUSE_DURATION);
      }
    }, TYPING_SPEED);

    return (): void => {
      clearInterval(typingInterval);
    };
  }, [currentIndex, shouldReduceMotion]);

  return (
    <div className="relative h-32 w-full max-w-md overflow-hidden rounded-lg bg-transparent font-mono text-sm text-gray-300 sm:text-base">
      <div className="relative h-full" aria-live="polite">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{
              opacity: 0,
              y: shouldReduceMotion ? 0 : 20,
              filter: "blur(4px)",
            }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{
              opacity: 0,
              y: shouldReduceMotion ? 0 : -20,
              filter: "blur(8px)",
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 flex items-start"
          >
            <div className="flex w-full">
              <span className="mr-2 font-bold text-emerald-400">{">"}</span>
              <p className="m-0 flex-1 leading-relaxed">
                {displayedText}
                {isTyping && (
                  <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-emerald-400 align-middle" />
                )}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

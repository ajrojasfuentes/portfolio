import { useState, useEffect } from "react";
import type { Variants } from "framer-motion";

export function useReducedMotionVariants(baseVariants: Variants): Variants {
  const [reduced, setReduced] = useState<boolean>(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);

    const handler = (e: MediaQueryListEvent): void => setReduced(e.matches);
    mql.addEventListener("change", handler);
    return (): void => mql.removeEventListener("change", handler);
  }, []);

  if (reduced) {
    // Return empty transitions for all variant states
    const empty: Variants = {};
    for (const key of Object.keys(baseVariants)) {
      empty[key] = {};
    }
    return empty;
  }

  return baseVariants;
}

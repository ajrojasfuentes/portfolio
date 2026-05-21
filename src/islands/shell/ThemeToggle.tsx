import { useState, useEffect } from "react";

export default function ThemeToggle(): React.JSX.Element {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const initial = saved || (prefersLight ? "light" : "dark");
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggle = (): void => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="p-1.5 rounded-md hover:bg-[var(--color-interactive-hover)] transition-colors"
        style={{ opacity: 0 }}
      >
        <span className="text-[var(--color-text-secondary)]">☀️</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="p-1.5 rounded-md hover:bg-[var(--color-interactive-hover)] active:bg-[var(--color-interactive-active)] transition-colors"
      title={theme === "dark" ? "Light mode" : "Dark mode"}
    >
      <span className="text-[var(--color-text-secondary)] text-sm" role="img" aria-hidden="true">
        {theme === "dark" ? "☀️" : "🌙"}
      </span>
    </button>
  );
}

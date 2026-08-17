import React, { useState, useEffect } from "react";
import { Menu, X, Terminal } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ease-in-out ${
        scrolled
          ? "border-b border-white/5 bg-slate-950/60 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a
          href="#home"
          className="group flex items-center gap-2 transition-transform duration-300 hover:scale-[1.02]"
        >
          <Terminal
            size={20}
            className="text-teal-400 opacity-80 transition-opacity group-hover:opacity-100"
          />
          <span className="font-mono text-lg font-bold tracking-tight text-slate-200 transition-colors group-hover:text-white">
            ajrojasfuentes<span className="text-teal-500/70">.dev</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="group relative py-2 font-mono text-sm font-bold tracking-widest text-slate-400 transition-colors hover:text-teal-300"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-teal-400 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </div>

        <button
          className="p-2 text-slate-300 transition-colors hover:text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <div
        className={`absolute top-full left-0 w-full overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          open
            ? "max-h-96 border-b border-white/5 opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-2 bg-slate-950/90 px-6 py-4 shadow-2xl backdrop-blur-2xl">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center border-b border-white/5 py-3 font-mono text-sm font-bold tracking-widest text-slate-400 transition-all duration-300 last:border-b-0 hover:pl-2 hover:text-teal-300"
            >
              <span className="mr-3 text-xs text-teal-500/50">&gt;</span>
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

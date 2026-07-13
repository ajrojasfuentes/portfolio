import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { NAV_LINKS, ACCENTS, hexToRgba } from '@/lib/constants';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-3 backdrop-blur-md' : 'py-6'}`}
      style={{
        backgroundColor: scrolled ? hexToRgba('#090D16', 0.85) : 'transparent',
        borderBottom: scrolled ? '1px solid var(--color-border-soft)' : '1px solid transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3">
          <span
            className="font-display font-bold text-sm w-9 h-9 rounded-xl flex items-center justify-center text-slate-950 shrink-0 shadow-lg"
            style={{ background: `linear-gradient(135deg, ${ACCENTS.home}, ${ACCENTS.publications})` }}
          >
            AR
          </span>
          <span className="font-display font-semibold text-white hidden sm:block">Anthony Rojas Fuentes</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a key={link.name} href={link.href} className="font-mono text-xs uppercase tracking-wide text-slate-400 hover:text-white transition-colors">
              {link.name}
            </a>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors hover:bg-white/5"
            style={{ borderColor: hexToRgba(ACCENTS.home, 0.4), color: ACCENTS.home }}
          >
            <Download size={14} /> Resume
          </a>
        </div>

        <button className="md:hidden text-slate-200" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden mt-4 mx-6 rounded-2xl border p-4 flex flex-col gap-1 shadow-2xl" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border-soft)' }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-mono text-sm uppercase tracking-wide text-slate-300 py-3 border-b last:border-b-0 hover:text-teal-400 transition-colors"
              style={{ borderColor: 'var(--color-border-soft)' }}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';

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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled 
          ? 'py-3 bg-slate-950/60 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]' 
          : 'py-6 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group transition-transform duration-300 hover:scale-[1.02]">
          <Terminal size={20} className="text-teal-400 opacity-80 group-hover:opacity-100 transition-opacity" />
          <span className="font-mono font-bold text-lg tracking-tight text-slate-200 group-hover:text-white transition-colors">
            ajrojasfuentes<span className="text-teal-500/70">.dev</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="relative font-mono font-bold text-sm tracking-widest text-slate-400 hover:text-teal-300 transition-colors py-2 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-teal-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
            </a>
          ))}
        </div>

        <button 
          className="md:hidden text-slate-300 hover:text-white transition-colors p-2" 
          onClick={() => setOpen(!open)} 
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <div 
        className={`md:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-96 opacity-100 border-b border-white/5' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-slate-950/90 backdrop-blur-2xl px-6 py-4 flex flex-col gap-2 shadow-2xl">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-mono font-bold text-sm tracking-widest text-slate-400 py-3 border-b border-white/5 last:border-b-0 hover:text-teal-300 hover:pl-2 transition-all duration-300 flex items-center"
            >
              <span className="text-teal-500/50 mr-3 text-xs">&gt;</span>{link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

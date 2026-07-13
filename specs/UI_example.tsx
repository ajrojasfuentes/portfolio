import React, { useState, useEffect, useRef } from 'react';
import {
  Github, Linkedin, Mail, ExternalLink, Code2, Layers, ChevronDown, Menu, X,
  MapPin, Copy, Check, ArrowUpRight, GitBranch, Award, FileText, BookOpen,
  GraduationCap, Sparkles, Star, Calendar, Activity, Network, Users,
  ShieldCheck, FlaskConical, Database, Download,
} from 'lucide-react';

/* ============================================================
   DESIGN TOKENS
   "Research Console" system — dark lab/instrument aesthetic.
   ============================================================ */
const ACCENTS = {
  home: '#2DD4BF',            // teal
  projects: '#F5A623',        // amber
  publications: '#A78BFA',    // violet
  experience: '#38BDF8',      // sky
  certifications: '#FB7185',  // rose
  accomplishments: '#34D399', // emerald
};

const hexToRgba = (hex, alpha = 1) => {
  let clean = hex.replace('#', '');
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const ICONS = {
  Github, Linkedin, Mail, ExternalLink, Code2, BookOpen, FlaskConical,
  Database, Network, Activity, Sparkles, Award, FileText, GitBranch,
  GraduationCap, Users, Star, ShieldCheck,
};

/* ============================================================
   CONTENT (placeholder data)
   ============================================================ */
const DATA = {
  person: {
    firstName: 'Anthony',
    fullName: 'Anthony Rojas Fuentes',
    initials: 'AR',
    roles: ['Software Engineer', 'Data Automation & AI Engineer', 'Scientific Researcher'],
    tagline: 'I build systems that automate data, learn from it, and hold up under peer review.',
    location: 'Cartago, Costa Rica',
    availability: 'Open to engineering roles & research collaborations',
  },

  about: {
    paragraphs: [
      "I'm a software engineer working at the intersection of data automation, applied AI, and scientific research. My day-to-day ranges from building resilient ETL pipelines and shipping machine learning models to production, to designing experiments and writing up findings for peer review.",
      "I care about systems that are reproducible — whether that's a data pipeline that never silently fails, or a research result that someone else can independently replicate.",
    ],
    focusAreas: ['ETL & Data Pipelines', 'Applied Machine Learning', 'MLOps & Automation', 'Research & Publication'],
    stats: [
      { value: '4+', label: 'Years in engineering' },
      { value: '12', label: 'Pipelines automated' },
      { value: '3', label: 'Papers published' },
      { value: '6', label: 'Certifications' },
    ],
  },

  skills: [
    { category: 'Languages & Core', items: ['Python', 'TypeScript', 'SQL', 'Bash', 'R'] },
    { category: 'AI & Machine Learning', items: ['PyTorch', 'scikit-learn', 'LangChain', 'Hugging Face', 'spaCy'] },
    { category: 'Data & Automation', items: ['Apache Airflow', 'dbt', 'Kafka', 'Pandas', 'n8n'] },
    { category: 'Infra & Tools', items: ['Docker', 'AWS', 'PostgreSQL', 'Git', 'Jupyter'] },
  ],

  contact: {
    email: 'anthony.rojas@example.com',
    location: 'Cartago, Costa Rica',
    links: [
      { label: 'GitHub', href: 'https://github.com/anthonyrojasf', icon: 'Github' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/anthonyrojasfuentes', icon: 'Linkedin' },
      { label: 'Google Scholar', href: '#', icon: 'BookOpen' },
      { label: 'ORCID · 0000-0000-0000-0000', href: '#', icon: 'FlaskConical' },
    ],
  },

  liveSystems: [
    { label: 'etl-daily-ingest', detail: 'pipeline', status: 'running', tone: 'ok' },
    { label: 'churn-predictor-v3', detail: 'model · 98.4% acc', status: 'stable', tone: 'ok' },
    { label: 'citation-graph-nlp', detail: 'research', status: 'in review', tone: 'warn' },
  ],

  projects: [
    {
      id: 'aurora-etl',
      icon: 'Database',
      title: 'Aurora ETL — Autonomous Pipeline Orchestrator',
      category: 'Data Automation',
      status: 'In Production',
      description: 'A self-healing ETL framework that ingests data from 20+ sources, auto-detects schema drift, and retries failures without human intervention.',
      tech: ['Python', 'Airflow', 'PostgreSQL', 'Docker'],
      links: { github: '#', demo: '#' },
    },
    {
      id: 'citegraph',
      icon: 'Network',
      title: 'CiteGraph — Research Recommendation Engine',
      category: 'Applied AI',
      status: 'Research Prototype',
      description: 'An NLP system that builds a citation knowledge graph from scientific papers and recommends related work using embedding similarity and graph traversal.',
      tech: ['Python', 'PyTorch', 'Neo4j', 'FastAPI'],
      links: { github: '#', demo: '#' },
    },
    {
      id: 'sentinelml',
      icon: 'Activity',
      title: 'SentinelML — Predictive Maintenance Dashboard',
      category: 'Machine Learning',
      status: 'In Production',
      description: 'A real-time monitoring dashboard that predicts equipment failure from sensor telemetry, cutting unplanned downtime for a manufacturing client by 30%.',
      tech: ['React', 'Python', 'XGBoost', 'Kafka'],
      links: { github: '#', demo: '#' },
    },
    {
      id: 'labassist',
      icon: 'Sparkles',
      title: 'LabAssist — LLM Research Copilot',
      category: 'AI Tooling',
      status: 'Open Source',
      description: 'A tool that helps research teams summarize papers, extract structured data from PDFs, and draft literature reviews using retrieval-augmented generation.',
      tech: ['TypeScript', 'LangChain', 'OpenAI API', 'Astro'],
      links: { github: '#', demo: '#' },
    },
  ],

  publications: [
    {
      id: 'pub-1',
      type: 'Journal Article',
      title: 'Automated Schema Drift Detection in Streaming ETL Pipelines Using Statistical Process Control',
      authors: 'Anthony Rojas Fuentes, J. Méndez',
      venue: 'Journal of Data Engineering Practice, 2025',
      summary: 'Proposes a lightweight statistical method for detecting schema drift in real-time data pipelines before it causes downstream failures, validated on production-scale industrial datasets.',
      link: '#',
    },
    {
      id: 'pub-2',
      type: 'Conference Paper',
      title: 'Graph-Based Retrieval for Scientific Literature Recommendation',
      authors: 'Anthony Rojas Fuentes, M. Alvarado, D. Solis',
      venue: 'Latin American Conference on AI Research (LACAIR), 2024',
      summary: "Introduces a hybrid embedding and graph-traversal approach for recommending related scientific papers, outperforming citation-only baselines on precision@10.",
      link: '#',
    },
    {
      id: 'pub-3',
      type: 'Preprint',
      title: "Reproducibility Challenges in Applied Machine Learning Pipelines: A Practitioner's Survey",
      authors: 'Anthony Rojas Fuentes',
      venue: 'arXiv preprint, 2026',
      summary: 'A survey of common reproducibility failures in production ML systems, drawing on practitioner interviews and proposing a practical reproducibility checklist.',
      link: '#',
    },
  ],

  experience: [
    {
      id: 'exp-1',
      role: 'Data Automation & AI Engineer',
      company: 'Nimbus Data Labs',
      period: '2023 — Present',
      description: 'Design and maintain automated data pipelines processing 2M+ records daily. Lead the deployment of internal ML models for demand forecasting and anomaly detection.',
    },
    {
      id: 'exp-2',
      role: 'Software Engineer',
      company: 'Vantage Systems',
      period: '2021 — 2023',
      description: 'Built backend services and internal tooling for a fintech platform, and introduced CI/CD practices that cut deployment time from days to hours.',
    },
    {
      id: 'exp-3',
      role: 'Research Assistant, Applied AI Lab',
      company: 'Costa Rica Institute of Technology',
      period: '2020 — 2021',
      description: "Designed experiments on graph-based recommendation systems, co-authored two papers, and built the lab's shared data-processing toolkit.",
    },
    {
      id: 'exp-4',
      role: 'Junior Software Developer',
      company: 'Bridgeline Softworks',
      period: '2019 — 2020',
      description: 'Developed and maintained RESTful APIs, contributed to database schema design, and supported front-end feature delivery for client web applications.',
    },
  ],

  certifications: [
    { id: 'cert-1', name: 'AWS Certified Machine Learning – Specialty', issuer: 'Amazon Web Services', date: '2025', credentialId: 'AWS-ML-2025-04812' },
    { id: 'cert-2', name: 'TensorFlow Developer Certificate', issuer: 'Google / TensorFlow', date: '2024', credentialId: 'TF-DEV-2024-19273' },
    { id: 'cert-3', name: 'Deep Learning Specialization', issuer: 'DeepLearning.AI · Coursera', date: '2023', credentialId: 'DLAI-SPEC-88213' },
    { id: 'cert-4', name: 'Professional Data Engineer', issuer: 'Google Cloud', date: '2023', credentialId: 'GCP-PDE-2023-55021' },
    { id: 'cert-5', name: 'Docker & Kubernetes for Data Pipelines', issuer: 'Linux Foundation', date: '2022', credentialId: 'LF-DK-2022-30198' },
    { id: 'cert-6', name: 'Applied Data Science with Python', issuer: 'University of Michigan · Coursera', date: '2021', credentialId: 'UMICH-ADS-11045' },
  ],

  accomplishments: {
    stats: [
      { value: '3', label: 'Papers published / in review' },
      { value: '70%', label: 'Less manual pipeline maintenance' },
      { value: '1st', label: 'Place, LatAm AI Hackathon 2024' },
      { value: '200+', label: 'GitHub stars on open-source tools' },
    ],
    items: [
      { icon: 'Award', title: '1st Place — LatAm AI Hackathon 2024', description: "Won first place for CiteGraph, a research-recommendation prototype built in 48 hours.", date: '2024' },
      { icon: 'Star', title: 'Speaker, DataConf Costa Rica', description: '"Reproducibility in Production ML" — a talk on keeping pipelines and results auditable.', date: '2024' },
      { icon: 'FileText', title: 'Peer Reviewer', description: 'Ongoing reviewer for the Journal of Data Engineering Practice.', date: '2025 — Present' },
      { icon: 'GitBranch', title: 'Open-Source Maintainer', description: 'Maintains an Airflow plugin for schema-drift detection with 200+ GitHub stars.', date: '2023 — Present' },
      { icon: 'GraduationCap', title: 'Merit Scholarship Recipient', description: 'Awarded for academic performance throughout the Computer Engineering program.', date: '2018 — 2021' },
      { icon: 'Users', title: 'Mentor, Regional Coding Bootcamp', description: 'Mentors students from underrepresented backgrounds entering software careers.', date: '2022 — Present' },
    ],
  },
};

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Projects', href: '#projects' },
  { name: 'Publications', href: '#publications' },
  { name: 'Experience', href: '#experience' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Accomplishments', href: '#accomplishments' },
];

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

    html, body { scroll-behavior: smooth; }

    .portfolio-shell {
      --bg: #090D16;
      --surface: #10182B;
      --surface-2: #16203A;
      --border-soft: rgba(255,255,255,0.08);
      --border-strong: rgba(255,255,255,0.16);
      --text-primary: #E9EEF9;
      --text-secondary: #93A0BD;
      --text-muted: #5C6685;
      --font-display: 'Space Grotesk', sans-serif;
      --font-body: 'IBM Plex Sans', sans-serif;
      --font-mono: 'IBM Plex Mono', monospace;
      background: var(--bg);
      font-family: var(--font-body);
    }
    .font-display { font-family: var(--font-display); }
    .font-mono { font-family: var(--font-mono); }

    .portfolio-shell section[id] { scroll-margin-top: 96px; }

    .portfolio-shell ::selection { background: #2DD4BF; color: #06110F; }

    .portfolio-shell ::-webkit-scrollbar { width: 10px; }
    .portfolio-shell ::-webkit-scrollbar-track { background: var(--bg); }
    .portfolio-shell ::-webkit-scrollbar-thumb { background: var(--surface-2); border-radius: 8px; border: 2px solid var(--bg); }

    .portfolio-shell a:focus-visible,
    .portfolio-shell button:focus-visible {
      outline: 2px solid #2DD4BF;
      outline-offset: 3px;
      border-radius: 6px;
    }

    @media (prefers-reduced-motion: reduce) {
      .portfolio-shell *, .portfolio-shell *::before, .portfolio-shell *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }
  `}</style>
);

const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
};

const KnowledgeGraphBackground = () => {
  const canvasRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frameId;
    const nodeColors = [ACCENTS.home, ACCENTS.publications, ACCENTS.experience];

    let nodes = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Keep existing particles within bounds on resize
      nodes.forEach(n => {
        if (n.x > canvas.width) n.x = canvas.width;
        if (n.y > canvas.height) n.y = canvas.height;
      });

      // Recalculate node count
      const count = Math.min(70, Math.floor((canvas.width * canvas.height) / 22000));
      while (nodes.length < count) {
        nodes.push(new Node(canvas.width, canvas.height));
      }
    };

    class Node {
      constructor(w, h) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 1.5 + 1;
        this.color = nodeColors[Math.floor(Math.random() * nodeColors.length)];
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(this.color, 0.55);
        ctx.fill();
      }
    }

    // Initialize
    resize();
    window.addEventListener('resize', resize);

    const drawFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(148, 163, 184, ${0.14 * (1 - dist / 130)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      nodes.forEach((n) => n.draw());
    };

    const animate = () => {
      nodes.forEach((n) => n.update());
      drawFrame();
      frameId = requestAnimationFrame(animate);
    };

    if (reducedMotion) {
      drawFrame();
    } else {
      animate();
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10"
      style={{ background: 'var(--bg)' }}
    />
  );
};

const Reveal = ({ children, delay = 0, className = '' }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      return;
    }
    const node = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    if (node) observer.observe(node);
    return () => { if (node) observer.unobserve(node); };
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const TiltCard = ({ children, className = '' }) => {
  const ref = useRef(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');
  const reducedMotion = useReducedMotion();

  const handleMove = (e) => {
    if (reducedMotion || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    if (width === 0 || height === 0) return;
    
    const x = (e.clientX - left - width / 2) / 22;
    const y = -(e.clientY - top - height / 2) / 22;
    const rotateX = Math.max(-8, Math.min(8, y));
    const rotateY = Math.max(-8, Math.min(8, x));
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };
  
  const handleLeave = () => setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{ transform, transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
};

const Eyebrow = ({ label, color }) => (
  <div className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase mb-4" style={{ color }}>
    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
    {label}
  </div>
);

const SectionHeading = ({ eyebrow, title, subtitle, color }) => (
  <Reveal>
    <div className="mb-14">
      <Eyebrow label={eyebrow} color={color} />
      <div className="flex items-center gap-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white">{title}</h2>
        <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${hexToRgba(color, 0.5)}, transparent)` }} />
      </div>
      {subtitle && <p className="text-slate-400 mt-4 max-w-2xl">{subtitle}</p>}
    </div>
  </Reveal>
);

const Tag = ({ children, color }) => (
  <span
    className="font-mono text-xs px-2.5 py-1 rounded-md border inline-block"
    style={{
      color: color || 'var(--text-secondary)',
      borderColor: color ? hexToRgba(color, 0.35) : 'var(--border-soft)',
      backgroundColor: color ? hexToRgba(color, 0.08) : 'rgba(255,255,255,0.03)',
    }}
  >
    {children}
  </span>
);

const CopyEmailButton = ({ email }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setCopied(false);
    }
  };
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-2 px-5 py-3 rounded-full border text-sm font-medium transition-colors hover:bg-white/5"
      style={{ borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}
    >
      {copied ? <Check size={16} style={{ color: ACCENTS.home }} /> : <Copy size={16} />}
      {copied ? 'Copied' : 'Copy email'}
    </button>
  );
};

const Nav = ({ person }) => {
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
        borderBottom: scrolled ? '1px solid var(--border-soft)' : '1px solid transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3">
          <span
            className="font-display font-bold text-sm w-9 h-9 rounded-xl flex items-center justify-center text-slate-950 shrink-0 shadow-lg"
            style={{ background: `linear-gradient(135deg, ${ACCENTS.home}, ${ACCENTS.publications})` }}
          >
            {person.initials}
          </span>
          <span className="font-display font-semibold text-white hidden sm:block">{person.fullName}</span>
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
        <div className="md:hidden mt-4 mx-6 rounded-2xl border p-4 flex flex-col gap-1 shadow-2xl" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-soft)' }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-mono text-sm uppercase tracking-wide text-slate-300 py-3 border-b last:border-b-0 hover:text-teal-400 transition-colors"
              style={{ borderColor: 'var(--border-soft)' }}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

const Hero = ({ person, liveSystems }) => (
  <section id="home" className="relative min-h-[86vh] flex items-center pt-20">
    {/* Background Decorative Blur Orbs */}
    <div
      className="absolute pointer-events-none rounded-full"
      style={{ width: 560, height: 560, left: '20%', top: '25%', background: hexToRgba(ACCENTS.home, 0.16), filter: 'blur(120px)' }}
    />
    <div
      className="absolute pointer-events-none rounded-full"
      style={{ width: 460, height: 460, right: '5%', top: '55%', background: hexToRgba(ACCENTS.publications, 0.14), filter: 'blur(110px)' }}
    />

    <div className="grid md:grid-cols-2 gap-14 items-center w-full relative z-10">
      <div>
        <Reveal>
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-mono text-xs mb-6"
            style={{ borderColor: hexToRgba(ACCENTS.home, 0.35), color: ACCENTS.home, backgroundColor: hexToRgba(ACCENTS.home, 0.08) }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: ACCENTS.home }} />
            {person.availability}
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] text-white mb-5">
            {person.fullName}
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <div className="flex flex-wrap gap-2 mb-6">
            {person.roles.map((role, i) => (
              <Tag key={role} color={[ACCENTS.home, ACCENTS.projects, ACCENTS.publications][i % 3]}>{role}</Tag>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <p className="text-lg text-slate-300 max-w-lg leading-relaxed mb-8">{person.tagline}</p>
        </Reveal>

        <Reveal delay={260}>
          <div className="flex flex-wrap gap-4 mb-10">
            <a
              href="#projects"
              className="px-6 py-3 rounded-full font-semibold text-slate-950 transition-transform hover:scale-[1.03] shadow-lg shadow-teal-900/20"
              style={{ backgroundColor: ACCENTS.home }}
            >
              View Projects
            </a>
            <a href="#contact" className="px-6 py-3 rounded-full border font-medium transition-colors hover:bg-white/5" style={{ borderColor: 'var(--border-strong)' }}>
              Get in Touch
            </a>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <div className="flex items-center gap-2 text-slate-400 text-sm font-mono">
            <MapPin size={16} /> {person.location}
          </div>
        </Reveal>
      </div>

      <Reveal delay={200} className="hidden md:block perspective-1000">
        {/* 3D Interactive Card applied here */}
        <TiltCard className="w-full max-w-sm mx-auto">
          <div className="relative rounded-2xl border p-6 bg-surface-base shadow-2xl backdrop-blur-sm" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-soft)' }}>
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-slate-400">Live Systems</span>
              <Activity size={16} style={{ color: ACCENTS.home }} />
            </div>
            <div className="space-y-3">
              {liveSystems.map((sys) => (
                <div
                  key={sys.label}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 border transition-colors hover:border-teal-500/30"
                  style={{ backgroundColor: 'var(--surface-2)', borderColor: 'var(--border-soft)' }}
                >
                  <div>
                    <p className="font-mono text-xs text-slate-200">{sys.label}</p>
                    <p className="font-mono text-[10px] text-slate-500 uppercase">{sys.detail}</p>
                  </div>
                  <span
                    className="flex items-center gap-1.5 font-mono text-[10px] uppercase"
                    style={{ color: sys.tone === 'ok' ? ACCENTS.accomplishments : ACCENTS.projects }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ backgroundColor: sys.tone === 'ok' ? ACCENTS.accomplishments : ACCENTS.projects }}
                    />
                    {sys.status}
                  </span>
                </div>
              ))}
            </div>
            <p className="font-mono text-[10px] text-slate-500 mt-5">auto-refreshed · 99.9% uptime</p>
          </div>
        </TiltCard>
      </Reveal>
    </div>

    <a href="#about" className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-500 hidden md:block animate-bounce hover:text-white transition-colors" aria-label="Scroll to About">
      <ChevronDown size={28} />
    </a>
  </section>
);

const About = ({ about, skills }) => (
  <section id="about" className="py-20">
    <SectionHeading eyebrow="Profile" title="About" color={ACCENTS.home} />

    <div className="grid md:grid-cols-5 gap-6">
      <Reveal className="md:col-span-3">
        <div className="rounded-2xl border p-8 h-full hover:border-teal-500/30 transition-colors duration-500" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-soft)' }}>
          <Layers size={26} style={{ color: ACCENTS.home }} className="mb-5" />
          {about.paragraphs.map((p, i) => (
            <p key={`para-${i}`} className="text-slate-300 leading-relaxed mb-4 last:mb-0">{p}</p>
          ))}
          <div className="flex flex-wrap gap-2 mt-6">
            {about.focusAreas.map((f, i) => <Tag key={`focus-${i}`}>{f}</Tag>)}
          </div>
        </div>
      </Reveal>

      <Reveal delay={120} className="md:col-span-2">
        <div className="grid grid-cols-2 gap-4 h-full">
          {about.stats.map((s, i) => (
            <div
              key={`stat-${i}`}
              className="rounded-2xl border p-5 flex flex-col justify-center hover:bg-surface-2 transition-colors duration-300"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-soft)' }}
            >
              <span className="font-display text-3xl font-bold text-white">{s.value}</span>
              <span className="text-xs text-slate-400 mt-1">{s.label}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </div>

    <Reveal delay={160}>
      <div className="mt-10">
        <h3 className="font-display text-lg font-semibold text-white mb-6">Technical Toolkit</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((group, idx) => (
            <div key={`skill-group-${idx}`} className="rounded-xl border p-5 hover:border-teal-500/20 transition-colors" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-soft)' }}>
              <p className="font-mono text-[11px] uppercase tracking-wider mb-3" style={{ color: ACCENTS.home }}>{group.category}</p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item, i) => <Tag key={`item-${idx}-${i}`}>{item}</Tag>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  </section>
);

const ContactBlock = ({ contact }) => (
  <section id="contact" className="py-20">
    <SectionHeading
      eyebrow="Reach Out"
      title="Contact"
      color={ACCENTS.home}
      subtitle="The fastest way to reach me is email — I usually reply within a day or two."
    />
    <div className="grid md:grid-cols-5 gap-8">
      <Reveal className="md:col-span-2">
        <div className="rounded-2xl border p-6 h-full transition-colors hover:border-teal-500/20" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-soft)' }}>
          <p className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-4">Contact Info</p>
          <a href={`mailto:${contact.email}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 mb-4 text-slate-200 hover:text-white transition-colors break-all">
            <Mail size={18} style={{ color: ACCENTS.home }} /> {contact.email}
          </a>
          <div className="flex items-center gap-3 mb-6 text-slate-200">
            <MapPin size={18} style={{ color: ACCENTS.home }} /> {contact.location}
          </div>
          <div className="flex flex-col gap-3">
            {contact.links.map((link, i) => {
              const Icon = ICONS[link.icon] || ExternalLink;
              return (
                <a key={`link-${i}`} href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors">
                  <Icon size={16} /> {link.label}
                </a>
              );
            })}
          </div>
        </div>
      </Reveal>

      <Reveal delay={120} className="md:col-span-3">
        <div
          className="relative rounded-2xl border p-8 h-full flex flex-col justify-center overflow-hidden"
          style={{ backgroundColor: 'var(--surface)', borderColor: hexToRgba(ACCENTS.home, 0.3) }}
        >
          {/* Internal Glow Effect */}
          <div
            className="absolute -right-10 -top-10 w-40 h-40 rounded-full pointer-events-none"
            style={{ background: hexToRgba(ACCENTS.home, 0.15), filter: 'blur(60px)' }}
          />
          <h3 className="font-display text-2xl font-bold text-white mb-3 relative">Have a project or research idea?</h3>
          <p className="text-slate-400 mb-6 relative max-w-md">
            I'm currently open to full-time engineering roles, contract automation work, and research collaborations.
          </p>
          <div className="flex flex-wrap gap-3 relative">
            <a
              href={`mailto:${contact.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-slate-950 transition-transform hover:scale-105"
              style={{ backgroundColor: ACCENTS.home }}
            >
              <Mail size={18} /> Send an email
            </a>
            <CopyEmailButton email={contact.email} />
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

const ProjectCard = ({ project }) => {
  const Icon = ICONS[project.icon] || Code2;
  return (
    <TiltCard className="h-full w-full">
      <div
        className="rounded-2xl border overflow-hidden flex flex-col h-full bg-surface-base shadow-xl"
        style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-soft)' }}
      >
        <div className="relative h-36 flex items-center justify-center overflow-hidden" style={{ backgroundColor: 'var(--surface-2)' }}>
          {/* Subtle grid pattern background */}
          <div
            className="absolute inset-0 opacity-50"
            style={{ backgroundImage: `repeating-linear-gradient(45deg, ${hexToRgba(ACCENTS.projects, 0.08)} 0px, ${hexToRgba(ACCENTS.projects, 0.08)} 1px, transparent 1px, transparent 14px)` }}
          />
          {/* Decorative glow behind icon */}
          <div className="absolute w-20 h-20 rounded-full" style={{ background: hexToRgba(ACCENTS.projects, 0.2), filter: 'blur(30px)' }}></div>
          <Icon size={40} style={{ color: ACCENTS.projects }} className="relative z-10 drop-shadow-md" />
          
          <span
            className="absolute top-3 right-3 font-mono text-[10px] uppercase px-2 py-1 rounded-full border z-10 backdrop-blur-sm"
            style={{ color: ACCENTS.projects, borderColor: hexToRgba(ACCENTS.projects, 0.4), backgroundColor: hexToRgba(ACCENTS.projects, 0.1) }}
          >
            {project.status}
          </span>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <p className="font-mono text-[11px] uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>{project.category}</p>
          <h3 className="font-display text-lg font-bold text-white mb-2">{project.title}</h3>
          <p className="text-sm text-slate-400 mb-5 flex-1">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tech.map((t, i) => <Tag key={`${project.id}-tech-${i}`}>{t}</Tag>)}
          </div>
          <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border-soft)' }}>
            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
              <Github size={16} /> Code
            </a>
            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm transition-colors hover:brightness-125" style={{ color: ACCENTS.projects }}>
              Details <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </TiltCard>
  );
};

const ProjectsSection = ({ projects }) => (
  <section id="projects" className="py-20">
    <SectionHeading
      eyebrow="Selected Work"
      title="Projects"
      color={ACCENTS.projects}
      subtitle="A mix of production automation systems and applied AI prototypes."
    />
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 perspective-1000">
      {projects.map((p, i) => (
        <Reveal key={p.id} delay={i * 100}>
           <ProjectCard project={p} />
        </Reveal>
      ))}
    </div>
  </section>
);

const PublicationItem = ({ pub, delay }) => (
  <Reveal delay={delay}>
    <div className="rounded-2xl border p-6 md:p-7 transition-colors hover:border-violet-500/30" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-soft)' }}>
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <Tag color={ACCENTS.publications}>{pub.type}</Tag>
        <span className="font-mono text-xs text-slate-500 flex items-center gap-1.5">
          <Calendar size={13} /> {pub.venue}
        </span>
      </div>
      <h3 className="font-display text-xl font-bold text-white mb-2">{pub.title}</h3>
      <p className="text-sm text-slate-400 mb-3">{pub.authors}</p>
      <p className="text-slate-300 leading-relaxed mb-5">{pub.summary}</p>
      <a href={pub.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium hover:underline transition-all" style={{ color: ACCENTS.publications }}>
        View publication <ArrowUpRight size={15} />
      </a>
    </div>
  </Reveal>
);

const PublicationsSection = ({ publications }) => (
  <section id="publications" className="py-20">
    <SectionHeading
      eyebrow="Research & Publications"
      title="Publications"
      color={ACCENTS.publications}
      subtitle="Peer-reviewed and preprint work on data systems and applied AI."
    />
    <div className="flex flex-col gap-6 max-w-4xl">
      {publications.map((p, i) => <PublicationItem key={p.id} pub={p} delay={i * 100} />)}
    </div>
  </section>
);

const ExperienceSection = ({ experience }) => (
  <section id="experience" className="py-20">
    <SectionHeading eyebrow="Career Timeline" title="Experience" color={ACCENTS.experience} />
    <div className="max-w-3xl">
      <div className="relative border-l-2 ml-3 md:ml-0" style={{ borderColor: 'var(--border-soft)' }}>
        {experience.map((exp, i) => (
          <Reveal key={exp.id} delay={i * 100}>
            <div className="mb-10 ml-8 relative last:mb-0 group">
              {/* Timeline Dot with Pulse effect on hover */}
              <div
                className="absolute -left-[41px] top-1 w-4 h-4 rounded-full border-2 transition-transform duration-300 group-hover:scale-125 group-hover:bg-sky-400/20"
                style={{ backgroundColor: 'var(--bg)', borderColor: ACCENTS.experience }}
              />
              <div className="rounded-2xl border p-6 transition-colors group-hover:border-sky-500/30" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-soft)' }}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">{exp.role}</h3>
                    <p className="font-medium" style={{ color: ACCENTS.experience }}>{exp.company}</p>
                  </div>
                  <span
                    className="font-mono text-xs px-3 py-1 rounded-full border text-slate-400 whitespace-nowrap"
                    style={{ borderColor: 'var(--border-soft)' }}
                  >
                    {exp.period}
                  </span>
                </div>
                <p className="text-slate-400 leading-relaxed">{exp.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const CertificationsSection = ({ certifications }) => (
  <section id="certifications" className="py-20">
    <SectionHeading eyebrow="Credentials" title="Certifications" color={ACCENTS.certifications} />
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {certifications.map((cert, i) => (
        <Reveal key={cert.id} delay={i * 80}>
          <div className="rounded-2xl border p-5 h-full flex flex-col transition-transform hover:-translate-y-1 hover:border-rose-500/30" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-soft)' }}>
            <div className="flex items-start justify-between mb-4">
              <span
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-inner"
                style={{ backgroundColor: hexToRgba(ACCENTS.certifications, 0.12) }}
              >
                <ShieldCheck size={20} style={{ color: ACCENTS.certifications }} />
              </span>
              <span className="font-mono text-[10px] text-slate-500">{cert.date}</span>
            </div>
            <h3 className="font-display font-bold text-white mb-1 leading-snug">{cert.name}</h3>
            <p className="text-sm text-slate-400 mb-4">{cert.issuer}</p>
            <p className="font-mono text-[10px] text-slate-600 mt-auto">ID · {cert.credentialId}</p>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

const AccomplishmentsSection = ({ accomplishments }) => (
  <section id="accomplishments" className="py-20 mb-10">
    <SectionHeading eyebrow="Recognition" title="Accomplishments" color={ACCENTS.accomplishments} />

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      {accomplishments.stats.map((s, i) => (
        <Reveal key={`acc-stat-${i}`}>
          <div className="rounded-2xl border p-5 text-center h-full hover:bg-surface-2 transition-colors" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-soft)' }}>
            <p className="font-display text-2xl md:text-3xl font-bold" style={{ color: ACCENTS.accomplishments }}>{s.value}</p>
            <p className="text-xs text-slate-400 mt-1">{s.label}</p>
          </div>
        </Reveal>
      ))}
    </div>

    <div className="grid md:grid-cols-2 gap-4">
      {accomplishments.items.map((item, i) => {
        const Icon = ICONS[item.icon] || Star;
        return (
          <Reveal key={`acc-item-${i}`} delay={i * 80}>
            <div className="flex items-start gap-4 rounded-2xl border p-5 h-full transition-transform hover:-translate-x-1 hover:border-emerald-500/30" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border-soft)' }}>
              <span
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: hexToRgba(ACCENTS.accomplishments, 0.12) }}
              >
                <Icon size={18} style={{ color: ACCENTS.accomplishments }} />
              </span>
              <div>
                <h3 className="font-medium text-white mb-1">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.description}</p>
                <p className="font-mono text-[10px] text-slate-600 mt-2">{item.date}</p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  </section>
);

const Footer = ({ person, contact }) => (
  <footer className="border-t py-8" style={{ borderColor: 'var(--border-soft)' }}>
    <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
      <p>© {new Date().getFullYear()} {person.fullName}. All rights reserved.</p>
      <div className="flex gap-5">
        {contact.links.slice(0, 2).map((link, i) => {
          const Icon = ICONS[link.icon] || ExternalLink;
          return (
            <a key={`footer-link-${i}`} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
              <Icon size={14} /> {link.label}
            </a>
          );
        })}
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="portfolio-shell min-h-screen" style={{ color: 'var(--text-primary)' }}>
      <GlobalStyles />
      <KnowledgeGraphBackground />
      <Nav person={DATA.person} />
      
      {/* Flattened layout with semantic <section> tags and spacing */}
      <main className="max-w-6xl mx-auto px-6 pt-10">
        <Hero person={DATA.person} liveSystems={DATA.liveSystems} />
        <About about={DATA.about} skills={DATA.skills} />
        <ContactBlock contact={DATA.contact} />
        <ProjectsSection projects={DATA.projects} />
        <PublicationsSection publications={DATA.publications} />
        <ExperienceSection experience={DATA.experience} />
        <CertificationsSection certifications={DATA.certifications} />
        <AccomplishmentsSection accomplishments={DATA.accomplishments} />
      </main>
      
      <Footer person={DATA.person} contact={DATA.contact} />
    </div>
  );
}
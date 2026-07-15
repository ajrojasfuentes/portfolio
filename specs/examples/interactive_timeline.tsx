import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, HeartHandshake, Rocket, Flag, CalendarDays, ArrowRight, MousePointerClick } from 'lucide-react';

/**
 * @constant CATEGORIES
 * @description Defines the thematic categories for the timeline events. 
 * Each category includes styling metadata and an associated icon.
 */
const CATEGORIES = {
  job: {
    id: 'job',
    label: 'Job',
    icon: Briefcase,
    color: '#38bdf8', // Sky 400
    glow: 'rgba(56, 189, 248, 0.4)',
  },
  project: {
    id: 'project',
    label: 'Project',
    icon: Rocket,
    color: '#c084fc', // Purple 400
    glow: 'rgba(192, 132, 252, 0.4)',
  },
  volunteering: {
    id: 'volunteering',
    label: 'Volunteering',
    icon: HeartHandshake,
    color: '#34d399', // Emerald 400
    glow: 'rgba(52, 211, 153, 0.4)',
  },
  milestone: {
    id: 'milestone',
    label: 'Milestone',
    icon: Flag,
    color: '#fbbf24', // Amber 400
    glow: 'rgba(251, 191, 36, 0.4)',
  }
};

/**
 * @constant rawTimelineEvents
 * @description The raw data array containing the timeline events.
 * It mixes standard durational events (jobs, projects) and single-point milestones.
 */
const rawTimelineEvents = [
  {
    id: 'm1',
    type: 'milestone',
    title: 'University Enrollment',
    date: '2019-02',
    details: 'Started BSc Software Engineering. Focus on theoretical foundations and practical algorithms.'
  },
  {
    id: 'e1',
    type: 'project',
    title: 'Local E-commerce Platform',
    company: 'Independent Clients',
    start: '2019-08',
    end: '2021-12',
    shortDesc: 'Freelance full-stack web development parallel to university studies.',
    details: 'Built a platform from scratch using React, Node.js, and MongoDB. Included payment gateways, real-time inventory, and a custom admin panel. Achieved 500+ sales in the first month.'
  },
  {
    id: 'e2',
    type: 'job',
    title: 'Junior Web Developer',
    company: 'Tech Startup XYZ',
    start: '2022-01',
    end: '2023-10',
    shortDesc: 'First corporate role, focused on frontend architecture and API integration.',
    details: 'Responsible for migrating the main interface from Vanilla JS to React. Optimized load times by 40% and closely collaborated with UX design to implement a new design system.'
  },
  {
    id: 'm2',
    type: 'milestone',
    title: 'Graduation & Thesis Defense',
    date: '2023-11',
    details: 'Successful defense of thesis on "Optimization of search algorithms in massive graphs", graduating with highest honors.'
  },
  {
    id: 'e3',
    type: 'job',
    title: 'Machine Learning Engineer',
    company: 'DataCorp Solutions',
    start: '2024-01',
    end: '2025-06',
    shortDesc: 'Design of recommendation pipelines and big data management.',
    details: 'Developed and deployed collaborative filtering recommendation models using PyTorch. Created automated ETL pipelines handling 10TB+ monthly data with Apache Spark.'
  },
  {
    id: 'e4',
    type: 'volunteering',
    title: 'Data Analyst & Dev Lead',
    company: 'AI for Good Org',
    start: '2024-05',
    end: '2025-10',
    shortDesc: 'Climate data analysis leveraging open-source ML models.',
    details: 'Led a team of 5 volunteers analyzing deforestation patterns using satellite imagery and CNN models. Published results in a local environmental conference.'
  },
  {
    id: 'e5',
    type: 'project',
    title: 'LangChain Core Memory Module',
    company: 'Open Source Contribution',
    start: '2025-11',
    end: '2026-03',
    shortDesc: 'Architecture of a new memory module integrated into the main repository.',
    details: 'Designed and coded a persistent vector-based memory module for LLM agents. The PR was reviewed and merged, currently used by thousands of developers globally.'
  },
  {
    id: 'e6',
    type: 'job',
    title: 'Senior AI Engineer',
    company: 'Neural Dynamics',
    start: '2026-04',
    end: '2026-07', // Present
    shortDesc: 'Leading enterprise RAG systems architecture and optimization.',
    details: 'In charge of core AI infrastructure. Implemented Retrieval-Augmented Generation systems reducing latency by 60% and improving context accuracy for enterprise clients.'
  }
];

/**
 * @function parseDate
 * @description Parses a YYYY-MM string into a JS Date object safely avoiding UTC offset issues.
 */
const parseDate = (dateStr) => new Date(dateStr + '-02');

/**
 * @function formatShortDate
 * @description Formats a date string into a short layout (e.g., "Aug 2019").
 */
const formatShortDate = (dateStr) => {
  return parseDate(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

/**
 * @function formatFullDate
 * @description Formats a date string into a full layout (e.g., "August 2019").
 */
const formatFullDate = (dateStr) => {
  return parseDate(dateStr).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

/**
 * @hook useSortedTimeline
 * @description Hook that standardizes event dates and sorts them chronologically.
 * Replaces the old absolute Y-coordinate system to allow Flexbox to handle heights naturally.
 * @param {Array} events - The raw event objects.
 * @returns {Array} Sorted and standardized events.
 */
const useSortedTimeline = (events) => {
  return useMemo(() => {
    // Standardize: ensure we have a common sortable date timestamp
    const standardized = events.map(ev => ({
      ...ev,
      _sortDate: parseDate(ev.end || ev.date).getTime(),
      _isMilestone: ev.type === 'milestone'
    }));

    // Sort sequential: Oldest end_date to Newest end_date
    return standardized.sort((a, b) => a._sortDate - b._sortDate);
  }, [events]);
};

/**
 * @component MilestoneNode
 * @description Renders a single-point milestone on the timeline. 
 * Uses relative positioning within a flex container.
 */
const MilestoneNode = ({ event, index }) => {
  const cat = CATEGORIES.milestone;
  const Icon = cat.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1, type: "spring" }}
      className="relative w-full z-30 py-2" // py-2 adds slight internal padding
    >
      {/* Central Bubble vertically aligned inside the relative wrapper */}
      <div 
        className="absolute left-[30px] md:left-[25%] top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-[#0a0a0a] border-2 shadow-xl z-10"
        style={{ borderColor: cat.color, boxShadow: `0 0 20px ${cat.glow}` }}
      >
        <Icon className="w-5 h-5" style={{ color: cat.color }} />
      </div>

      {/* Milestone Text Container */}
      <div className="ml-[70px] md:ml-[calc(25%+35px)] pr-4">
        <div className="bg-[#121212]/90 backdrop-blur-md px-4 py-3 rounded-xl border border-white/5 inline-flex flex-col shadow-lg">
          <span className="text-white font-bold text-sm leading-tight">{event.title}</span>
          <span className="text-gray-400 text-xs font-mono mt-0.5 capitalize">{formatFullDate(event.date)}</span>
          {event.details && (
            <p className="text-gray-400 text-xs mt-2 leading-relaxed max-w-md">
              {event.details}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/**
 * @component FlipCardNode
 * @description Renders an interactive 3D flip card for jobs, projects, and volunteering.
 * Uses relative positioning. Height is organically determined by the front face's text content.
 */
const FlipCardNode = ({ event, index, isFlipped, onFlip }) => {
  const cat = CATEGORIES[event.type];
  const Icon = cat.icon;

  return (
    <div className="relative w-full z-20 group py-2">
      {/* 1. Spine Point (Vertically centered strictly to the relative container) */}
      <div 
        className="absolute left-[30px] md:left-[25%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 bg-[#0a0a0a] z-10 transition-colors duration-300"
        style={{ borderColor: cat.color, boxShadow: isFlipped ? `0 0 15px ${cat.glow}` : 'none' }}
      />

      {/* 2. Connector Line (Bridges spine to card) */}
      <div 
        className="absolute left-[30px] md:left-[25%] top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r z-0"
        style={{ 
          width: '40px', // Exact width bridging dot to margin-left 
          backgroundImage: `linear-gradient(to right, ${cat.color}60, transparent)` 
        }}
      />

      {/* 3. The 3D Interactive Card Container */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
        className="ml-[70px] md:ml-[calc(25%+40px)] mr-6 md:mr-auto md:w-[500px] cursor-pointer perspective-[1500px]"
        onClick={onFlip}
      >
        <motion.div
          className="w-full relative preserve-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          
          {/* --- FRONT FACE --- 
              Uses position relative to naturally define the DOM height.
          */}
          <div 
            className="relative w-full backface-hidden rounded-2xl bg-[#111111]/90 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)] overflow-hidden transition-colors group-hover:border-white/20"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            {/* Top Color Accent & Gradient */}
            <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: cat.color }} />
            <div className="absolute top-0 left-0 w-full h-24 opacity-[0.03]" style={{ background: `linear-gradient(to bottom, ${cat.color}, transparent)` }} />

            <div className="p-5 flex flex-col h-full">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-black/60 border border-white/5 flex items-center justify-center shadow-inner shrink-0">
                    <Icon className="w-5 h-5" style={{ color: cat.color }} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-[16px] leading-tight">{event.title}</h3>
                    <p className="text-gray-400 text-xs font-medium">{event.company}</p>
                  </div>
                </div>
                {/* Category Badge */}
                <span 
                  className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border bg-black/40 border-white/10 shrink-0 ml-2"
                  style={{ color: cat.color }}
                >
                  {cat.label}
                </span>
              </div>

              {/* Middle: Duration Badge */}
              <div className="inline-flex items-center gap-2 bg-black/50 border border-white/5 rounded-lg px-3 py-2 w-fit mb-4">
                <CalendarDays className="w-4 h-4" style={{ color: cat.color }} />
                <span className="text-sm font-mono text-gray-300 capitalize">
                  {formatShortDate(event.start)} <span className="text-gray-600 mx-1">→</span> {formatShortDate(event.end)}
                </span>
              </div>

              {/* Bottom: Description & Interactive Hint */}
              <div className="mt-auto flex items-end justify-between gap-4">
                <p className="text-gray-400 text-sm leading-relaxed max-w-[85%]">
                  {event.shortDesc}
                </p>
                <div className="flex flex-col items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity shrink-0">
                  <MousePointerClick className="w-5 h-5 text-gray-300 animate-bounce" />
                </div>
              </div>
            </div>
          </div>

          {/* --- BACK FACE (Details) --- 
              Uses position absolute to perfectly match the front face's height.
              Implements overflow-y-auto in case details exceed the summary's height.
          */}
          <div 
            className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden"
            style={{ 
              backfaceVisibility: 'hidden', 
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)' 
            }}
          >
            {/* Background Icon Watermark */}
            <Icon 
              className="absolute -bottom-10 -right-10 w-48 h-48 opacity-[0.03] rotate-12 pointer-events-none" 
              style={{ color: cat.color }} 
            />

            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10 shrink-0">
                <Icon className="w-4 h-4" style={{ color: cat.color }} />
                <h4 className="text-white font-semibold text-sm">In-depth Details</h4>
              </div>
              
              {/* Scrollable details container */}
              <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar relative z-10">
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {event.details}
                </p>
              </div>

              <div className="mt-4 pt-3 text-xs text-gray-500 font-mono text-center flex justify-center items-center gap-2 shrink-0">
                <ArrowRight className="w-3 h-3 rotate-180" /> Click to revert
              </div>
            </div>
          </div>

        </motion.div>
      </motion.div>
    </div>
  );
};

/**
 * @component App
 * @description Main application entry point linking state management and the layout engine.
 */
export default function App() {
  // Leverage the sorting hook
  const sortedEvents = useSortedTimeline(rawTimelineEvents);
  
  // Lifted state to enforce exclusively one flipped card at a time.
  const [activeCardId, setActiveCardId] = useState(null);

  /**
   * @function handleFlip
   * @description Toggles the active card. Closes the currently active card if clicked again.
   */
  const handleFlip = (id) => {
    setActiveCardId(prev => prev === id ? null : id);
  };

  return (
    <div className="w-full min-h-screen bg-[#030303] font-sans py-24 text-gray-200 overflow-x-hidden selection:bg-purple-500/30">
      
      {/* Global CSS for Custom Scrollbar injected safely */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #555; }
      `}} />

      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-20 text-center md:text-left md:pl-[25%] px-6 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest text-gray-300 uppercase shadow-lg backdrop-blur-sm"
        >
          Sequential View
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
          Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-sky-400 to-emerald-400">Timeline</span>
        </h1>
        <p className="text-gray-400 max-w-2xl text-base leading-relaxed">
          Chronologically ordered by completion date. Click on the experience cards to flip them and reveal in-depth details about key responsibilities and achievements.
        </p>
      </div>

      {/* 
        Timeline Container 
        Using flexbox (flex-col gap-10) to strictly guarantee equidistant items 
        regardless of their content height.
      */}
      <div className="w-full relative pb-32">
        <div className="relative w-full max-w-6xl mx-auto flex flex-col gap-10">
          
          {/* Vertical Spine Line (Stretches perfectly to the container's physical height) */}
          <div className="absolute left-[30px] md:left-[25%] top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 z-0 rounded-full overflow-hidden">
            {/* Animated Energy Flow */}
            <motion.div 
              className="absolute left-1/2 w-[4px] h-64 -translate-x-1/2 rounded-full blur-[2px] opacity-80"
              style={{ background: 'linear-gradient(to bottom, transparent, #c084fc, #38bdf8, transparent)' }}
              animate={{ top: ['-20%', '120%'] }} // Overflows slightly for smoother entry/exit
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Sequential Mapping of Timeline Nodes */}
          {sortedEvents.map((ev, index) => (
            ev._isMilestone 
              ? (
                  <MilestoneNode 
                    key={ev.id} 
                    event={ev} 
                    index={index} 
                  />
                )
              : (
                  <FlipCardNode 
                    key={ev.id} 
                    event={ev} 
                    index={index} 
                    isFlipped={activeCardId === ev.id}
                    onFlip={() => handleFlip(ev.id)}
                  />
                )
          ))}

        </div>
      </div>
    </div>
  );
}
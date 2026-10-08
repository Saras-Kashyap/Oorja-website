import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Play, ArrowRight, Sparkles, ChevronDown, Music, ShieldCheck } from 'lucide-react';
import { COLLEGE_CONFIG, CLUB_INFO } from '../data/college';

export const Hero = ({ onOpenRegister, onSelectEvent }) => {
  // Target date set to 6 November 2026 for Deep Shandhya / Upcoming Fest
  const TARGET_DATE = new Date('2026-11-06T00:00:00');

  const calculateTimeLeft = () => {
    const now = new Date();
    const diff = TARGET_DATE - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);

      if (
        remaining.days === 0 &&
        remaining.hours === 0 &&
        remaining.minutes === 0 &&
        remaining.seconds === 0
      ) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToEvents = () => {
    const el = document.getElementById('events');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-between items-center pt-24 pb-8 overflow-hidden bg-[#060609]"
    >
      {/* ==============================================================
          CINEMATIC STAGE BACKGROUND (Adapting Afrowave reference)
          - Deep dark stage
          - Upward shooting amber & purple stage beams
          - Geometric tribal/sacred arch columns on left and right
          - Crowd silhouette with hands raised at bottom
          - Floating golden embers & particles
          ============================================================== */}
      
      {/* Left Stage Beam (Warm Amber / Gold) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -bottom-20 -left-20 w-[600px] h-[800px] bg-gradient-to-tr from-amber-500/25 via-amber-600/10 to-transparent blur-3xl transform -rotate-12 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[600px] bg-amber-400/10 blur-[120px] rounded-full pointer-events-none" />
        
        {/* Right Stage Beam (Magenta / Purple) */}
        <div className="absolute -bottom-20 -right-20 w-[650px] h-[850px] bg-gradient-to-tl from-fuchsia-600/20 via-purple-600/10 to-transparent blur-3xl transform rotate-12 pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[600px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

        {/* Center Golden Spotlight Beam */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.18)_0%,rgba(245,158,11,0.05)_50%,transparent_75%)] pointer-events-none" />

        {/* Ambient Radial Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#060609_90%)] pointer-events-none" />
      </div>

      {/* LEFT GEOMETRIC TRIBAL / SACRED ARCH COLUMN (Afrowave composition reference) */}
      <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-36 xl:w-48 z-10 pointer-events-none opacity-40 mix-blend-screen overflow-hidden">
        <svg className="w-full h-full text-amber-500" viewBox="0 0 160 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.6">
            <circle cx="20" cy="400" r="130" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
            <circle cx="20" cy="400" r="100" stroke="currentColor" strokeWidth="3" />
            <circle cx="20" cy="400" r="70" stroke="currentColor" strokeWidth="1.5" />
            <path d="M0 50 L160 50 M0 150 L160 150 M0 650 L160 650 M0 750 L160 750" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
            <path d="M20 50 L80 110 L20 170 L80 230 L20 290" stroke="currentColor" strokeWidth="2" fill="none" />
            <polygon points="10,380 40,360 40,400" fill="currentColor" opacity="0.4" />
            <polygon points="10,420 40,400 40,440" fill="currentColor" opacity="0.4" />
          </g>
        </svg>
      </div>

      {/* RIGHT GEOMETRIC TRIBAL / SACRED ARCH COLUMN (Afrowave composition reference) */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-36 xl:w-48 z-10 pointer-events-none opacity-40 mix-blend-screen overflow-hidden scale-x-[-1]">
        <svg className="w-full h-full text-amber-500" viewBox="0 0 160 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.6">
            <circle cx="20" cy="400" r="130" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
            <circle cx="20" cy="400" r="100" stroke="currentColor" strokeWidth="3" />
            <circle cx="20" cy="400" r="70" stroke="currentColor" strokeWidth="1.5" />
            <path d="M0 50 L160 50 M0 150 L160 150 M0 650 L160 650 M0 750 L160 750" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
            <path d="M20 50 L80 110 L20 170 L80 230 L20 290" stroke="currentColor" strokeWidth="2" fill="none" />
            <polygon points="10,380 40,360 40,400" fill="currentColor" opacity="0.4" />
            <polygon points="10,420 40,400 40,440" fill="currentColor" opacity="0.4" />
          </g>
        </svg>
      </div>

      {/* FLOATING LIGHT PARTICLES / GOLDEN EMBER MOTES */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(14)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-amber-400"
            style={{
              width: `${(i % 4) * 2 + 3}px`,
              height: `${(i % 4) * 2 + 3}px`,
              left: `${(i * 7.5 + 5) % 95}%`,
              top: `${(i * 8 + 15) % 85}%`,
              opacity: 0.35,
              filter: 'blur(1px)',
              boxShadow: '0 0 8px #f59e0b',
            }}
            animate={{
              y: [-15, 15, -15],
              x: [-10, 10, -10],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 4 + (i % 5) * 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* ==============================================================
          MAIN HERO CENTRAL CONTENT
          (Exact Afrowave composition & typography proportions)
          ============================================================== */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center my-auto">
        
        {/* LARGE OFFICIAL OORJA LOGO (MAIN FOCAL POINT) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mt-4 sm:mt-6 mb-5 flex items-center justify-center"
        >
          {/* Ambient radiant glow behind the logo */}
          <div className="absolute inset-0 bg-amber-400/20 blur-3xl rounded-full scale-125 pointer-events-none" />
          <img
            src="/oorja-logo.png"
            alt="Official OORJA Logo"
            className="w-72 sm:w-96 md:w-[440px] lg:w-[500px] max-w-full h-auto object-contain filter brightness-0 invert drop-shadow-[0_0_28px_rgba(245,158,11,0.7)] hover:scale-105 transition-transform duration-300"
          />
        </motion.div>

        {/* AFFILIATION & LOCATION TEXT DIRECTLY BELOW LOGO */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-col items-center justify-center gap-1.5 mb-5 text-center"
        >
          <p className="text-xs sm:text-sm md:text-base font-semibold tracking-[0.25em] uppercase text-amber-200">
            COER UNIVERSITY • ROORKEE
          </p>
          <p className="text-[11px] sm:text-xs md:text-sm tracking-wider uppercase text-amber-400/90 font-medium">
            • A Cultural Club of COER University
          </p>
        </motion.div>

        {/* DATE & VENUE PILL ROW (Afrowave reference: 📅 25–28 JUIN 2026 | 📍 Stade Annexe) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-[#e8ded0]"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span className="font-medium tracking-wide">6 NOVEMBER [DEEP SHANDHYA]</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span className="font-medium tracking-wide">COER University Campus, Roorkee</span>
          </div>
        </motion.div>

        {/* ==============================================================
            COUNTDOWN TIMER (Exact 4-box layout from Afrowave reference)
            04 JOURS / 10 HEURES / 28 MIN / 36 SEC
            ============================================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-7 grid grid-cols-4 gap-2.5 sm:gap-4 max-w-md sm:max-w-lg w-full"
        >
          {[
            { label: 'DAYS', value: String(timeLeft.days).padStart(2, '0') },
            { label: 'HOURS', value: String(timeLeft.hours).padStart(2, '0') },
            { label: 'MIN', value: String(timeLeft.minutes).padStart(2, '0') },
            { label: 'SEC', value: String(timeLeft.seconds).padStart(2, '0') },
          ].map((item, idx) => (
            <div
              key={idx}
              className="relative group flex flex-col items-center justify-center py-2.5 sm:py-3.5 px-2 rounded-2xl bg-[#12121a]/80 backdrop-blur-xl border border-amber-500/25 shadow-lg shadow-black/50 hover:border-amber-400/60 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <span className="font-cinzel text-xl sm:text-2xl md:text-3xl font-extrabold text-[#fdf8ed] tracking-wider text-shadow">
                {item.value}
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold mt-0.5">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ==============================================================
            DUAL CTAS (Exact placement from Afrowave reference image)
            Left: Glowing gradient pill button ("RÉSERVER UN TICKET →")
            Right: Dark glass pill button with play icon ("REGARDER LA VIDÉO")
            ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md sm:max-w-lg"
        >
          {/* Primary Gradient Pill Button */}
          <button
            onClick={scrollToEvents}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase text-black bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 shadow-[0_0_25px_rgba(245,158,11,0.5)] hover:shadow-[0_0_35px_rgba(245,158,11,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <span>Explore Events</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>

          {/* Secondary Glass Pill Button */}
          <button
            onClick={() => onOpenRegister?.('fresher-event')}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#fbf7ee] bg-[#1a1a24]/80 hover:bg-[#252535] border border-amber-500/40 hover:border-amber-400 backdrop-blur-xl shadow-lg hover:shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Join OORJA</span>
          </button>
        </motion.div>
      </div>

      {/* ==============================================================
          BOTTOM AUDIENCE CROWD SILHOUETTE (Afrowave layout atmosphere)
          ============================================================== */}
      <div className="relative w-full z-10 pointer-events-none mt-6 sm:mt-8">
        {/* Subtle Crowd Silhouette SVG */}
        <div className="w-full h-20 sm:h-28 bg-gradient-to-t from-black via-black/80 to-transparent opacity-85 flex items-end justify-center overflow-hidden">
          <svg
            className="w-full h-16 sm:h-24 text-[#060609] fill-current opacity-90 scale-105"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            {/* Silhouette of concert crowd hands and heads */}
            <path d="M0,120 L0,85 Q40,65 80,95 Q120,50 160,90 Q200,40 230,85 Q260,30 290,90 Q340,55 380,95 Q420,35 450,85 Q480,20 510,80 Q550,45 590,95 Q630,25 670,80 Q710,40 750,90 Q790,20 830,85 Q880,50 920,95 Q960,35 990,80 Q1030,25 1070,90 Q1120,45 1160,85 Q1180,60 1200,90 L1200,120 Z" />
            <path d="M50,120 Q90,30 130,120 M210,120 Q240,15 270,120 M430,120 Q460,10 490,120 M650,120 Q680,15 710,120 M870,120 Q900,10 930,120 M1050,120 Q1080,20 1110,120" stroke="rgba(245,158,11,0.15)" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* ==============================================================
            SCROLL DOWN INDICATOR (Afrowave "SCROLL DOWN" chevron reference)
            ============================================================== */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center pointer-events-auto">
          <button
            onClick={scrollToAbout}
            className="group flex flex-col items-center gap-1 text-[10px] tracking-[0.3em] uppercase text-neutral-400 hover:text-amber-300 transition-colors cursor-pointer focus:outline-none"
            aria-label="Scroll down to About section"
          >
            <span className="font-semibold text-neutral-400 group-hover:text-amber-300 transition-colors">
              SCROLL DOWN
            </span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-4 h-4 text-amber-400 group-hover:text-amber-300" />
            </motion.div>
          </button>
        </div>
      </div>
    </section>
  );
};

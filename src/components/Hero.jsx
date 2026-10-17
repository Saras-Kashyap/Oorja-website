import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, MapPin, Play, ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { getOptimizedImageUrl, getResponsiveSrcSet } from '../utils/imageUtils';

// Curated full-screen immersive background photos of cultural festivals & concerts
const HERO_SLIDES = [
  {
    id: 'zion-concert',
    url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1920&q=80',
    title: 'ZION Mega Fest',
    subtitle: 'Headline Concert & Electric Energy',
  },
  {
    id: 'deep-sandhya-lights',
    url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1920&q=80',
    title: 'Deep Sandhya',
    subtitle: 'Candlelight & Cultural Grace',
  },
  {
    id: 'band-riffs',
    url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1920&q=80',
    title: 'War of the Bands',
    subtitle: 'Pulsating Stage & Laser Beams',
  },
  {
    id: 'aarambh-fresher',
    url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1920&q=80',
    title: 'Aarambh Fresher Night',
    subtitle: 'Youth, Vibrance & Festival Lights',
  },
  {
    id: 'symphony-stage',
    url: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1920&q=80',
    title: 'Symphony of Lights',
    subtitle: 'Celebration of Music and Expression',
  },
];

// Static config inline — avoids importing full college.js just for hero
const TARGET_DATE = new Date('2026-11-06T00:00:00');

const calcTimeLeft = () => {
  const diff = TARGET_DATE - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 864e5),
    hours: Math.floor((diff / 36e5) % 24),
    minutes: Math.floor((diff / 6e4) % 60),
    seconds: Math.floor((diff / 1e3) % 60),
  };
};

export const Hero = ({ onOpenRegister }) => {
  const shouldReduceMotion = useReducedMotion();
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Mobile touch swiping gesture tracking
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndX = useRef(0);
  const touchEndY = useRef(0);

  // Preload only the next background image smoothly without choking mobile network
  useEffect(() => {
    const nextIdx = (currentSlide + 1) % HERO_SLIDES.length;
    const img = new Image();
    img.src = getOptimizedImageUrl(HERO_SLIDES[nextIdx].url, 1200, 75);
  }, [currentSlide]);

  // Countdown timer interval
  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = calcTimeLeft();
      setTimeLeft(remaining);
      if (Object.values(remaining).every((v) => v === 0)) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 4-second automatic crossfade transition
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, currentSlide]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  // Mobile touch swipe handlers (guarded against vertical page scroll jitter)
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
    touchEndX.current = e.targetTouches[0].clientX;
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const deltaX = touchStartX.current - touchEndX.current;
    const deltaY = touchStartY.current - touchEndY.current;

    // Only switch slide if horizontal intent clearly dominates vertical scrolling
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = 0;
    touchStartY.current = 0;
    touchEndX.current = 0;
    touchEndY.current = 0;
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-between items-center pt-24 pb-8 overflow-hidden bg-[#06060e]"
      aria-roledescription="carousel"
      aria-label="OORJA Cultural Club Hero with Event Highlights"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: 'pan-y' }}
    >
      {/* ==============================================================
          1. FULL-SCREEN BACKGROUND IMAGE SLIDESHOW (CAROUSEL)
          ============================================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-0' : 'opacity-0 -z-10'
              }`}
            >
              <img
                src={getOptimizedImageUrl(slide.url, 1200, 75)}
                srcSet={getResponsiveSrcSet(slide.url)}
                sizes="100vw"
                alt={slide.title}
                width="1920"
                height="1080"
                decoding="async"
                className={`w-full h-full object-cover object-center transform transition-transform duration-[6000ms] ease-out will-change-transform ${
                  isActive && !shouldReduceMotion ? 'scale-105' : 'scale-100'
                }`}
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'low'}
              />
            </div>
          );
        })}
      </div>

      {/* ==============================================================
          2. DARK GRADIENT & VIGNETTE OVERLAY (rgba 0.60 to 0.75+)
          Ensures high contrast & pristine readability for text & logo
          ============================================================== */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(6, 6, 9, 0.60) 0%, rgba(6, 6, 9, 0.75) 65%, rgba(6, 6, 9, 0.95) 100%), linear-gradient(to bottom, rgba(6, 6, 9, 0.75) 0%, rgba(6, 6, 9, 0.60) 35%, rgba(6, 6, 9, 0.75) 75%, rgba(6, 6, 9, 0.98) 100%)',
        }}
      />

      {/* ==============================================================
          3. CINEMATIC STAGE BEAMS & SPOTLIGHTS
          ============================================================== */}
      <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
        <div className="absolute -bottom-20 -left-20 w-[600px] h-[800px] bg-gradient-to-tr from-amber-500/20 via-amber-600/10 to-transparent blur-3xl transform -rotate-12 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[600px] bg-amber-400/10 blur-[120px] rounded-full pointer-events-none" />
        
        {/* Right Stage Beam (Magenta / Purple) */}
        <div className="absolute -bottom-20 -right-20 w-[650px] h-[850px] bg-gradient-to-tl from-fuchsia-600/15 via-purple-600/10 to-transparent blur-3xl transform rotate-12 pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[600px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

        {/* Center Golden Spotlight Beam */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.18)_0%,rgba(245,158,11,0.05)_50%,transparent_75%)] pointer-events-none" />
      </div>

      {/* LEFT GEOMETRIC TRIBAL / SACRED ARCH COLUMN */}
      <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-36 xl:w-48 z-10 pointer-events-none opacity-40 mix-blend-screen overflow-hidden">
        <svg className="w-full h-full text-amber-500" viewBox="0 0 160 800" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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

      {/* RIGHT GEOMETRIC TRIBAL / SACRED ARCH COLUMN */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-36 xl:w-48 z-10 pointer-events-none opacity-40 mix-blend-screen overflow-hidden scale-x-[-1]">
        <svg className="w-full h-full text-amber-500" viewBox="0 0 160 800" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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

      {/* FLOATING LIGHT PARTICLES — only active on desktop/tablet to maintain 60fps on mobile */}
      {!shouldReduceMotion && (
        <div className="hidden sm:block absolute inset-0 z-10 pointer-events-none" aria-hidden="true">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-amber-400"
              style={{
                width: `${(i % 3) * 2 + 3}px`,
                height: `${(i % 3) * 2 + 3}px`,
                left: `${(i * 8 + 5) % 95}%`,
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
                duration: 4 + (i % 4) * 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      )}

      {/* ==============================================================
          MAIN HERO CENTRAL CONTENT
          ============================================================== */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center my-auto">
        
        {/* LARGE OFFICIAL OORJA LOGO (TRANSLUCENT GLASSMORPHIC WATERMARK EFFECT) */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative mt-3 sm:mt-6 mb-3 flex items-center justify-center transform-gpu will-change-transform"
        >
          {/* Subtle translucent ambient glow allowing photos to show through */}
          <div className="absolute inset-0 bg-amber-400/10 blur-2xl sm:blur-3xl rounded-full scale-110 sm:scale-125 pointer-events-none transform-gpu" />
          
          {/* WebP logo with PNG fallback - translucent watermark with blend-mode */}
          <picture className="relative z-10">
            <source srcSet="/oorja-logo.webp" type="image/webp" />
            <img
              src="/oorja-logo.png"
              alt="Official OORJA Cultural Club Logo"
              width="500"
              height="212"
              className="w-64 sm:w-80 md:w-[440px] lg:w-[500px] max-w-[85vw] h-auto object-contain filter brightness-0 invert opacity-70 mix-blend-screen drop-shadow-[0_0_20px_rgba(245,158,11,0.45)] hover:opacity-85 hover:scale-105 transition-all duration-300 transform-gpu will-change-transform"
              fetchPriority="high"
            />
          </picture>
        </motion.div>

        {/* TAGLINE & AFFILIATION TEXT (TRANSLUCENT WATERMARK INTEGRATION) */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.25 }}
          className="flex flex-col items-center justify-center gap-1.5 mb-5 text-center mix-blend-screen"
        >
          {/* "Scintillating The Aura" Tagline */}
          <div className="flex items-center justify-center gap-3 opacity-70">
            <span className="w-8 sm:w-14 h-px bg-gradient-to-r from-transparent to-amber-300/50" />
            <p className="font-cormorant italic text-base sm:text-lg md:text-xl text-amber-200/90 tracking-widest font-normal drop-shadow-[0_0_12px_rgba(245,158,11,0.3)]">
              Scintillating The Aura
            </p>
            <span className="w-8 sm:w-14 h-px bg-gradient-to-l from-transparent to-amber-300/50" />
          </div>

          <p className="text-xs sm:text-sm md:text-base font-semibold tracking-[0.25em] uppercase text-amber-200/70 drop-shadow-[0_0_10px_rgba(245,158,11,0.25)]">
            COER UNIVERSITY • ROORKEE
          </p>
          <p className="text-[11px] sm:text-xs md:text-sm tracking-wider uppercase text-amber-400/65 font-medium">
            • A Cultural Club of COER University
          </p>
        </motion.div>

        {/* DATE & VENUE PILL ROW */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.55 }}
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
            COUNTDOWN TIMER
            ============================================================== */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: shouldReduceMotion ? 0 : 0.65 }}
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
              <span className="font-cinzel text-xl sm:text-2xl md:text-3xl font-extrabold text-[#fdf8ed] tracking-wider">
                {item.value}
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold mt-0.5">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ==============================================================
            DUAL CTAs
            ============================================================== */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.75 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md sm:max-w-lg"
        >
          {/* Primary Gradient Pill Button */}
          <button
            onClick={() => scrollTo('events')}
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

        {/* ==============================================================
            CAROUSEL CONTROLS: SUBTLE DOT INDICATORS & EVENT BADGE
            ============================================================== */}
        <div
          className="mt-6 flex flex-col items-center gap-2 z-20 pointer-events-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Subtle caption pill indicating current event backdrop */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-white/10 backdrop-blur-md text-[10px] sm:text-[11px] text-amber-200/90 tracking-wider uppercase font-medium shadow-sm">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>{HERO_SLIDES[currentSlide].title}</span>
            <span className="text-white/20">•</span>
            <span className="text-neutral-400 font-mono text-[10px]">{currentSlide + 1}/{HERO_SLIDES.length}</span>
          </div>

          {/* Dot Indicators */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => handleDotClick(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer focus:outline-none ${
                  idx === currentSlide
                    ? 'w-6 sm:w-7 h-1.5 bg-gradient-to-r from-amber-400 to-yellow-300 shadow-[0_0_8px_rgba(251,191,36,0.7)]'
                    : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ==============================================================
          MANUAL CONTROLS: SUBTLE NEXT / PREV ARROWS
          ============================================================== */}
      <button
        onClick={handlePrev}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-black/30 hover:bg-black/60 text-white/50 hover:text-amber-300 border border-white/10 hover:border-amber-400/40 backdrop-blur-md opacity-40 hover:opacity-100 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-400/50 shadow-md shadow-black/40"
        aria-label="Previous background photo"
        title="Previous photo"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={handleNext}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-black/30 hover:bg-black/60 text-white/50 hover:text-amber-300 border border-white/10 hover:border-amber-400/40 backdrop-blur-md opacity-40 hover:opacity-100 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-400/50 shadow-md shadow-black/40"
        aria-label="Next background photo"
        title="Next photo"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* ==============================================================
          BOTTOM AUDIENCE CROWD SILHOUETTE
          ============================================================== */}
      <div className="relative w-full z-10 pointer-events-none mt-6 sm:mt-8">
        {/* Subtle Crowd Silhouette SVG */}
        <div className="w-full h-20 sm:h-28 bg-gradient-to-t from-[#070712] via-[#06060e]/80 to-transparent opacity-90 flex items-end justify-center overflow-hidden">
          <svg
            className="w-full h-16 sm:h-24 text-[#06060e] fill-current opacity-95 scale-105"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0,120 L0,85 Q40,65 80,95 Q120,50 160,90 Q200,40 230,85 Q260,30 290,90 Q340,55 380,95 Q420,35 450,85 Q480,20 510,80 Q550,45 590,95 Q630,25 670,80 Q710,40 750,90 Q790,20 830,85 Q880,50 920,95 Q960,35 990,80 Q1030,25 1070,90 Q1120,45 1160,85 Q1180,60 1200,90 L1200,120 Z" />
            <path d="M50,120 Q90,30 130,120 M210,120 Q240,15 270,120 M430,120 Q460,10 490,120 M650,120 Q680,15 710,120 M870,120 Q900,10 930,120 M1050,120 Q1080,20 1110,120" stroke="rgba(245,158,11,0.15)" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* SCROLL DOWN INDICATOR */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center pointer-events-auto">
          <button
            onClick={() => scrollTo('events')}
            className="group flex flex-col items-center gap-1 text-[10px] tracking-[0.3em] uppercase text-neutral-400 hover:text-amber-300 transition-colors cursor-pointer focus:outline-none"
            aria-label="Scroll down to Events section"
          >
            <span className="font-semibold text-neutral-400 group-hover:text-amber-300 transition-colors">
              SCROLL DOWN
            </span>
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, 5, 0] }}
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

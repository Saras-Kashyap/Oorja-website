import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Play,
  ChevronLeft,
  ChevronRight,
  Flame,
  Music,
  Heart
} from 'lucide-react';
import { EVENTS_DATA } from '../data/events';

// Lazy-load modal — only mounted when user opens details
const EventModal = lazy(() => import('./EventModal').then(m => ({ default: m.EventModal })));

// Event-specific visual and atmospheric staging configuration
const EVENT_SHOWCASE_CONFIG = {
  zion: {
    bgImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1920&q=80',
    number: '01',
    category: 'Flagship Mega Fest',
    themeGradient: 'from-amber-400 via-orange-500 to-yellow-300',
    beamLeft: 'from-amber-500/25 via-amber-600/10 to-transparent',
    beamRight: 'from-fuchsia-600/20 via-purple-600/10 to-transparent',
    spotlight: 'rgba(251, 191, 36, 0.22)',
    badgeBorder: 'border-amber-400/40 text-amber-300 bg-amber-500/15',
    accentText: 'text-amber-400',
    icon: Flame,
  },
  'deep-sandhya': {
    bgImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1920&q=80',
    number: '02',
    category: 'Cultural Heritage Night',
    themeGradient: 'from-yellow-300 via-amber-400 to-orange-500',
    beamLeft: 'from-amber-400/25 via-yellow-600/10 to-transparent',
    beamRight: 'from-purple-600/20 via-indigo-600/10 to-transparent',
    spotlight: 'rgba(245, 158, 11, 0.24)',
    badgeBorder: 'border-yellow-400/40 text-yellow-300 bg-yellow-500/15',
    accentText: 'text-yellow-400',
    icon: Heart,
  },
  'fresher-event': {
    bgImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1920&q=80',
    number: '03',
    category: 'Fresher Induction Special',
    themeGradient: 'from-amber-300 via-rose-400 to-pink-500',
    beamLeft: 'from-rose-500/25 via-pink-600/10 to-transparent',
    beamRight: 'from-indigo-600/20 via-blue-600/10 to-transparent',
    spotlight: 'rgba(244, 63, 94, 0.22)',
    badgeBorder: 'border-rose-400/40 text-rose-300 bg-rose-500/15',
    accentText: 'text-rose-400',
    icon: Music,
  },
};

export const Events = ({ onRegisterEvent }) => {
  const shouldReduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Touch swipe tracking references
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Preload event photos for instant, zero-delay transitions
  useEffect(() => {
    Object.values(EVENT_SHOWCASE_CONFIG).forEach((config) => {
      const img = new Image();
      img.src = config.bgImage;
    });
  }, []);

  // 7-second gentle auto-advance, paused on hover or touch
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 7000);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let nextIndex = prev + newDirection;
      if (nextIndex < 0) nextIndex = EVENTS_DATA.length - 1;
      if (nextIndex >= EVENTS_DATA.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const goToEvent = (index) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Touch swipe handlers for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      // Swiped left -> next event
      paginate(1);
    } else if (diff < -45) {
      // Swiped right -> prev event
      paginate(-1);
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Keyboard arrow navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      paginate(1);
    } else if (e.key === 'ArrowLeft') {
      paginate(-1);
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleRegister = (eventId) => {
    if (onRegisterEvent) {
      onRegisterEvent(eventId);
    } else {
      const target = EVENTS_DATA.find((e) => e.id === eventId) || EVENTS_DATA[0];
      setSelectedEvent(target);
      setIsModalOpen(true);
    }
  };

  // Smooth slide transition animation variants
  const slideVariants = {
    enter: (dir) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? 80 : -80,
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.98,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.35 },
        scale: { duration: 0.35 },
      },
    },
    exit: (dir) => ({
      zIndex: 0,
      x: shouldReduceMotion ? 0 : dir < 0 ? 80 : -80,
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.98,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
      },
    }),
  };

  const activeEvent = EVENTS_DATA[currentIndex];
  const activeConfig = EVENT_SHOWCASE_CONFIG[activeEvent.id] || EVENT_SHOWCASE_CONFIG.zion;
  const ActiveIcon = activeConfig.icon || Sparkles;

  return (
    <section
      id="events"
      className="relative py-24 sm:py-28 bg-[#070712]/75 text-[#f4eee4] overflow-hidden backdrop-blur-[2px]"
      aria-label="Major Events Showcase"
      onKeyDown={handleKeyDown}
      tabIndex="0"
    >
      {/* Background Ambient Party Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-r from-amber-500/15 via-orange-600/10 to-transparent blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute -top-12 -right-16 w-[600px] h-[600px] bg-purple-600/12 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-16 -left-16 w-[600px] h-[600px] bg-indigo-600/12 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ==============================================================
            SECTION HEADER & NUMBERED TAB SELECTORS
            ============================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Campus Cultural Calendar</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-wider text-[#fdf8ed] mb-3"
          >
            MAJOR EVENT SPOTLIGHT
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-sm sm:text-base md:text-lg text-neutral-400 font-light max-w-2xl mx-auto"
          >
            Swipe or click left/right to view each featured event one at a time.
          </motion.p>

          {/* Numbered Tab Selectors at the Top (Requirement 2) */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {EVENTS_DATA.map((event, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={event.id}
                  onClick={() => goToEvent(idx)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-300 text-black shadow-[0_0_20px_rgba(251,191,36,0.6)] scale-105'
                      : 'bg-[#10101c]/80 text-neutral-300 hover:text-white hover:bg-white/10 border border-white/10 hover:border-amber-400/40'
                  }`}
                  aria-label={`View ${event.title}`}
                >
                  0{idx + 1} • {event.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* ==============================================================
            SINGLE CENTERED EVENT CARD CAROUSEL (Requirement 1 & 2)
            ============================================================== */}
        <div
          className="relative max-w-5xl mx-auto flex items-center justify-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* LEFT NAVIGATION ARROW (DESKTOP & TABLET) */}
          <button
            onClick={() => paginate(-1)}
            className="hidden md:flex absolute -left-5 lg:-left-7 top-1/2 -translate-y-1/2 z-30 w-12 h-12 lg:w-14 lg:h-14 items-center justify-center rounded-full bg-black/75 hover:bg-black/95 text-white/80 hover:text-amber-300 border border-amber-500/30 hover:border-amber-400 backdrop-blur-xl shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400/50"
            aria-label="Previous event card"
            title="Previous event card"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* RIGHT NAVIGATION ARROW (DESKTOP & TABLET) */}
          <button
            onClick={() => paginate(1)}
            className="hidden md:flex absolute -right-5 lg:-right-7 top-1/2 -translate-y-1/2 z-30 w-12 h-12 lg:w-14 lg:h-14 items-center justify-center rounded-full bg-black/75 hover:bg-black/95 text-white/80 hover:text-amber-300 border border-amber-500/30 hover:border-amber-400 backdrop-blur-xl shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400/50"
            aria-label="Next event card"
            title="Next event card"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* MAIN CENTERED GLASSMORPHIC CONTAINER CARD */}
          <div
            className="relative w-full rounded-3xl sm:rounded-[2.5rem] overflow-hidden border-2 border-amber-500/35 shadow-[0_0_50px_rgba(245,158,11,0.2),0_25px_60px_rgba(0,0,0,0.85)] bg-[#0d0d1a]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeEvent.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative w-full min-h-[580px] sm:min-h-[620px] flex flex-col justify-between items-center p-6 sm:p-10 lg:p-14 overflow-hidden"
              >
                {/* 1. IMMERSIVE EVENT BACKGROUND PHOTO INSIDE CARD */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  <img
                    src={activeConfig.bgImage}
                    alt={activeEvent.title}
                    className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-[7000ms] ease-out filter brightness-[0.85]"
                  />
                </div>

                {/* 2. DARK GLASSMORPHIC & VIGNETTE OVERLAY INSIDE CARD (0.65 to 0.88 opacity) */}
                <div
                  className="absolute inset-0 z-[1] pointer-events-none"
                  style={{
                    background: `
                      radial-gradient(ellipse at center, rgba(8, 8, 18, 0.65) 0%, rgba(8, 8, 18, 0.80) 65%, rgba(6, 6, 14, 0.96) 100%),
                      linear-gradient(to bottom, rgba(7, 7, 16, 0.80) 0%, rgba(7, 7, 16, 0.60) 35%, rgba(7, 7, 16, 0.85) 80%, rgba(6, 6, 12, 0.98) 100%)
                    `,
                  }}
                />

                {/* 3. DYNAMIC PARTY STAGE BEAMS INSIDE CARD */}
                <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
                  <div
                    className={`absolute -bottom-20 -left-20 w-[550px] h-[750px] bg-gradient-to-tr ${activeConfig.beamLeft} blur-3xl transform -rotate-12`}
                  />
                  <div
                    className={`absolute -bottom-20 -right-20 w-[550px] h-[750px] bg-gradient-to-tl ${activeConfig.beamRight} blur-3xl transform rotate-12`}
                  />
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[550px] blur-[120px] rounded-full"
                    style={{ background: activeConfig.spotlight }}
                  />
                </div>

                {/* 4. SACRED ARCH COLUMN ACCENTS */}
                <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none opacity-20 mix-blend-screen overflow-hidden">
                  <svg className="w-full h-full text-amber-500" viewBox="0 0 160 800" fill="none" aria-hidden="true">
                    <g opacity="0.6">
                      <circle cx="20" cy="400" r="110" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
                      <circle cx="20" cy="400" r="80" stroke="currentColor" strokeWidth="2" />
                      <path d="M0 50 L160 50 M0 750 L160 750" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
                    </g>
                  </svg>
                </div>

                <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none opacity-20 mix-blend-screen overflow-hidden scale-x-[-1]">
                  <svg className="w-full h-full text-amber-500" viewBox="0 0 160 800" fill="none" aria-hidden="true">
                    <g opacity="0.6">
                      <circle cx="20" cy="400" r="110" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
                      <circle cx="20" cy="400" r="80" stroke="currentColor" strokeWidth="2" />
                      <path d="M0 50 L160 50 M0 750 L160 750" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
                    </g>
                  </svg>
                </div>

                {/* ==============================================================
                    5. CLEANLY ORGANIZED EVENT DETAILS (Requirement 4)
                    ============================================================== */}
                <div className="relative z-20 max-w-3xl mx-auto text-center flex flex-col items-center justify-center my-auto w-full">
                  
                  {/* Category Pill Badge */}
                  <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border ${activeConfig.badgeBorder} backdrop-blur-md shadow-lg mb-4 sm:mb-5`}>
                    <ActiveIcon className="w-3.5 h-3.5" />
                    <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest">
                      FEATURED EVENT 0{activeConfig.number} • {activeEvent.badge}
                    </span>
                  </div>

                  {/* Monumental Event Title */}
                  <h3 className="font-cinzel text-4xl sm:text-6xl lg:text-7xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-400 drop-shadow-[0_0_35px_rgba(245,158,11,0.55)] leading-tight">
                    {activeEvent.title}
                  </h3>

                  {/* Tagline */}
                  <p className="font-cormorant italic text-lg sm:text-2xl md:text-3xl text-amber-200/90 font-medium tracking-wide mt-2 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)] max-w-xl">
                    "{activeEvent.tagline}"
                  </p>

                  {/* Description */}
                  <p className="font-body text-neutral-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl font-light mt-3 sm:mt-4 line-clamp-4 sm:line-clamp-none">
                    {activeEvent.description}
                  </p>

                  {/* Metadata Pills: Date, Time & Venue */}
                  <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 text-xs sm:text-sm text-[#e8ded0]">
                    {/* Date Pill */}
                    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-amber-500/40 backdrop-blur-md shadow-md">
                      <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                      <span className="font-semibold tracking-wide text-amber-200">{activeEvent.date}</span>
                    </div>

                    {/* Time Pill */}
                    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md shadow-md">
                      <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                      <span className="font-medium tracking-wide text-neutral-200">{activeEvent.time}</span>
                    </div>

                    {/* Venue Pill */}
                    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md shadow-md">
                      <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                      <span className="font-medium tracking-wide text-neutral-200">{activeEvent.venue}</span>
                    </div>
                  </div>

                  {/* Feature Highlights Chips */}
                  {activeEvent.highlights && (
                    <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-xl">
                      {activeEvent.highlights.slice(0, 3).map((highlight, hIdx) => (
                        <span
                          key={hIdx}
                          className="px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium text-amber-100/90 bg-[#161628]/85 border border-white/10 backdrop-blur-md shadow-sm"
                        >
                          • {highlight}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md">
                    {/* Primary Schedule Button */}
                    <button
                      onClick={() => handleSelectEvent(activeEvent)}
                      className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase text-black bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 shadow-[0_0_25px_rgba(245,158,11,0.5)] hover:shadow-[0_0_35px_rgba(245,158,11,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                    >
                      <span>Explore Schedule</span>
                      <ArrowRight className="w-4 h-4 text-black" />
                    </button>

                    {/* Secondary Registration Button */}
                    <button
                      onClick={() => handleRegister(activeEvent.id)}
                      className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#fbf7ee] bg-[#1a1a28]/85 hover:bg-[#25253a] border border-amber-500/40 hover:border-amber-400 backdrop-blur-xl shadow-lg hover:shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>Register Now</span>
                    </button>
                  </div>
                </div>

                {/* Mobile Navigation Arrows (Visible at bottom on mobile) */}
                <div className="relative z-20 md:hidden flex items-center justify-between w-full mt-6 pt-4 border-t border-white/10">
                  <button
                    onClick={() => paginate(-1)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 text-xs text-neutral-300 hover:text-white border border-white/10 cursor-pointer"
                    aria-label="Previous event"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <span className="text-[10px] uppercase tracking-widest text-neutral-400">
                    Swipe or Tap
                  </span>

                  <button
                    onClick={() => paginate(1)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 text-xs text-neutral-300 hover:text-white border border-white/10 cursor-pointer"
                    aria-label="Next event"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ==============================================================
            INDICATOR DOTS & EVENT COUNTER AT THE BOTTOM (Requirement 2)
            ============================================================== */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3">
          {/* Indicator Dots */}
          <div className="flex items-center gap-2.5">
            {EVENTS_DATA.map((event, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={event.id}
                  onClick={() => goToEvent(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer focus:outline-none ${
                    isActive
                      ? 'w-8 sm:w-10 h-2 bg-gradient-to-r from-amber-400 to-yellow-300 shadow-[0_0_12px_rgba(251,191,36,0.8)]'
                      : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}: ${event.title}`}
                />
              );
            })}
          </div>

          {/* Slide Indicator Label */}
          <p className="text-[11px] uppercase tracking-widest text-neutral-400 font-mono">
            Event 0{currentIndex + 1} of 0{EVENTS_DATA.length} • {activeEvent.title}
          </p>
        </div>

        {/* Notice on Venue Placeholders */}
        <div className="mt-8 text-center">
          <p className="text-xs text-neutral-500 tracking-wide font-light">
            Venue location: <span className="text-neutral-400">COER University Campus, Roorkee — exact venue [TO BE ANNOUNCED]</span>. Dates and artist lineups are placeholders for upcoming session announcements.
          </p>
        </div>

      </div>

      {/* Interactive Modal — only mounted when an event is selected */}
      {isModalOpen && (
        <Suspense fallback={null}>
          <EventModal
            event={selectedEvent}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </Suspense>
      )}
    </section>
  );
};

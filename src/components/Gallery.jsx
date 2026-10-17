import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  Camera
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data/events';
import { getOptimizedImageUrl, getResponsiveSrcSet } from '../utils/imageUtils';

export const Gallery = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const carouselRef = useRef(null);

  // Mouse drag scrolling state for desktop
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);

  // Scroll tracking state for arrows and progress bar
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const checkScrollState = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);

    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress((scrollLeft / maxScroll) * 100);
    }
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    checkScrollState();
    el.addEventListener('scroll', checkScrollState, { passive: true });
    window.addEventListener('resize', checkScrollState);

    return () => {
      el.removeEventListener('scroll', checkScrollState);
      window.removeEventListener('resize', checkScrollState);
    };
  }, []);

  const scrollByAmount = (offset) => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  // Mouse drag to scroll handlers for desktop
  const handleMouseDown = (e) => {
    if (!carouselRef.current) return;
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftRef.current = carouselRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5; // Scroll speed multiplier
    if (Math.abs(x - startXRef.current) > 6) {
      hasMovedRef.current = true;
    }
    carouselRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
  };

  // Lightbox handlers
  const openLightbox = (index) => {
    // Prevent opening if the user was dragging the slider
    if (hasMovedRef.current) return;
    setActiveImageIndex(index);
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
  };

  const showNext = () => {
    setActiveImageIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
  };

  const showPrev = () => {
    setActiveImageIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  };

  // Touch swiping for mobile full-screen lightbox
  const lightboxTouchStartX = useRef(0);
  const lightboxTouchStartY = useRef(0);
  const lightboxTouchEndX = useRef(0);
  const lightboxTouchEndY = useRef(0);

  const handleLightboxTouchStart = (e) => {
    lightboxTouchStartX.current = e.targetTouches[0].clientX;
    lightboxTouchStartY.current = e.targetTouches[0].clientY;
    lightboxTouchEndX.current = e.targetTouches[0].clientX;
    lightboxTouchEndY.current = e.targetTouches[0].clientY;
  };

  const handleLightboxTouchMove = (e) => {
    lightboxTouchEndX.current = e.targetTouches[0].clientX;
    lightboxTouchEndY.current = e.targetTouches[0].clientY;
  };

  const handleLightboxTouchEnd = () => {
    if (!lightboxTouchStartX.current || !lightboxTouchEndX.current) return;
    const deltaX = lightboxTouchStartX.current - lightboxTouchEndX.current;
    const deltaY = lightboxTouchStartY.current - lightboxTouchEndY.current;
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX > 0) {
        showNext();
      } else {
        showPrev();
      }
    }
    lightboxTouchStartX.current = 0;
    lightboxTouchStartY.current = 0;
    lightboxTouchEndX.current = 0;
    lightboxTouchEndY.current = 0;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeImageIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (activeImageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeImageIndex]);

  return (
    <section
      id="gallery"
      className="relative py-24 sm:py-28 bg-[#070712]/75 text-[#f4eee4] overflow-hidden backdrop-blur-[2px]"
      aria-label="Moments That Glow Gallery Showcase"
    >
      {/* Background Ambient Party Glow Accents */}
      <div className="absolute top-10 left-10 w-[550px] h-[550px] bg-purple-600/12 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-amber-500/12 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-indigo-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ==============================================================
            SECTION HEADER WITH DESKTOP SLIDER CONTROLS
            ============================================================== */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Captured Resonance</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-wider text-[#fdf8ed]"
            >
              MOMENTS THAT GLOW
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-sm sm:text-base text-neutral-400 font-light max-w-xl mt-2.5"
            >
              A visual retrospective of raw emotions, standing ovations, and electric memories forged under the lights.
            </motion.p>
          </div>

          {/* Slider Desktop Navigation Buttons */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <span className="hidden sm:inline-block text-xs uppercase tracking-widest text-neutral-400 font-mono mr-2">
              Scroll or Swipe
            </span>

            <button
              onClick={() => scrollByAmount(-380)}
              disabled={!canScrollLeft}
              className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-200 cursor-pointer ${
                canScrollLeft
                  ? 'bg-black/60 hover:bg-black/90 text-white hover:text-amber-300 border-white/15 hover:border-amber-400/60 shadow-lg hover:scale-105 active:scale-95'
                  : 'bg-black/30 text-neutral-600 border-white/5 opacity-40 cursor-not-allowed'
              }`}
              aria-label="Scroll gallery left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => scrollByAmount(380)}
              disabled={!canScrollRight}
              className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-200 cursor-pointer ${
                canScrollRight
                  ? 'bg-black/60 hover:bg-black/90 text-white hover:text-amber-300 border-white/15 hover:border-amber-400/60 shadow-lg hover:scale-105 active:scale-95'
                  : 'bg-black/30 text-neutral-600 border-white/5 opacity-40 cursor-not-allowed'
              }`}
              aria-label="Scroll gallery right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* ==============================================================
          CONTINUOUS HORIZONTAL SCROLLABLE TRACK (CAROUSEL / SLIDER)
          ============================================================== */}
      <div className="relative w-full overflow-hidden">
        <div
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className="flex gap-4 sm:gap-6 overflow-x-auto py-4 px-4 sm:px-6 lg:px-8 no-scrollbar cursor-grab active:cursor-grabbing select-none snap-x snap-mandatory"
          style={{
            WebkitOverflowScrolling: 'touch',
            overscrollBehaviorX: 'contain',
            touchAction: 'pan-y pan-x',
          }}
        >
          {GALLERY_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => openLightbox(index)}
              className="group relative flex-shrink-0 w-[76vw] max-w-[310px] sm:max-w-none sm:w-[340px] md:w-[370px] lg:w-[390px] h-[390px] sm:h-[470px] rounded-3xl overflow-hidden cursor-pointer border border-amber-500/25 hover:border-amber-400/60 shadow-[0_12px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(245,158,11,0.12)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_35px_rgba(245,158,11,0.28)] transition-all duration-300 snap-start bg-[#0d0d18] transform-gpu will-change-transform"
              tabIndex={0}
              role="button"
              aria-label={`View photo: ${item.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') openLightbox(index);
              }}
            >
              {/* High-Resolution Event Image with Smooth Zoom */}
              <img
                src={getOptimizedImageUrl(item.image, 700, 75)}
                srcSet={getResponsiveSrcSet(item.image)}
                sizes="(max-width: 640px) 76vw, (max-width: 1024px) 370px, 390px"
                alt={item.title}
                width="700"
                height="525"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.88] group-hover:brightness-100 will-change-transform"
                loading="lazy"
                draggable={false}
              />

              {/* Multi-Stop Dark Vignette Overlay for Crisp Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              {/* Top Category Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/65 text-amber-300 border border-amber-500/30 backdrop-blur-md shadow-md">
                  {item.category}
                </span>
              </div>

              {/* Top Right Zoom / Expand Icon */}
              <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/65 border border-white/20 flex items-center justify-center text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md shadow-lg">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Bottom Event Info & Captions */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-10 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400/90 block mb-1">
                  {item.event} [Archive]
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#faf5ec] group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-300 font-light mt-1.5 opacity-90 group-hover:opacity-100 transition-opacity line-clamp-2">
                  {item.caption}
                </p>
                
                {/* View Fullscreen CTA Indicator */}
                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-amber-300/80 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>Click to view full screen</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ==============================================================
          BOTTOM SCROLL PROGRESS BAR & NOTICE
          ============================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs text-neutral-400">
          {/* Progress Bar Container */}
          <div className="flex items-center gap-3 w-full sm:w-64">
            <span className="text-[10px] uppercase tracking-wider font-mono text-neutral-500">Track</span>
            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full transition-all duration-150"
                style={{ width: `${Math.max(12, scrollProgress)}%` }}
              />
            </div>
          </div>

          {/* Swipe Hint & Archive Notice */}
          <p className="text-center sm:text-right font-light text-neutral-500">
            Showing {GALLERY_ITEMS.length} archive photo highlights. Click any image to view in full-screen lightbox.
          </p>
        </div>
      </div>

      {/* ==============================================================
          FULL-SCREEN LIGHTBOX MODAL (Requirement 4)
          ============================================================== */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Gallery Image Lightbox"
            onTouchStart={handleLightboxTouchStart}
            onTouchMove={handleLightboxTouchMove}
            onTouchEnd={handleLightboxTouchEnd}
            style={{ touchAction: 'pan-y' }}
          >
            {/* Close Lightbox */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="Close Lightbox (Esc)"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={showPrev}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/10 hover:border-amber-400 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="Previous Image (Left Arrow)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={showNext}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/10 hover:border-amber-400 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="Next Image (Right Arrow)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Active Image Container */}
            <motion.div
              key={activeImageIndex}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-5xl max-h-[90vh] flex flex-col items-center justify-center transform-gpu will-change-transform"
            >
              <img
                src={getOptimizedImageUrl(GALLERY_ITEMS[activeImageIndex].image, 1400, 85)}
                alt={GALLERY_ITEMS[activeImageIndex].title}
                width="1400"
                height="1050"
                decoding="async"
                className="max-h-[66vh] sm:max-h-[74vh] max-w-full rounded-2xl object-contain border border-amber-500/30 shadow-2xl"
              />

              <div className="mt-4 text-center px-4">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                  {GALLERY_ITEMS[activeImageIndex].event} • {GALLERY_ITEMS[activeImageIndex].category}
                </span>
                <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-white mt-1">
                  {GALLERY_ITEMS[activeImageIndex].title}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 font-light mt-1.5 max-w-xl mx-auto">
                  {GALLERY_ITEMS[activeImageIndex].caption}
                </p>
                <span className="text-[10px] text-neutral-500 font-mono mt-2 block">
                  Photo {activeImageIndex + 1} of {GALLERY_ITEMS.length} (Swipe left/right)
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/events';

export const Gallery = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  const openLightbox = (index) => {
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

  // Lock scroll when lightbox is open
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
    <section id="gallery" className="relative py-28 bg-[#070712]/75 text-[#f4eee4] overflow-hidden backdrop-blur-[2px]">
      {/* Background Party Glow Accents */}
      <div className="absolute top-10 left-10 w-[550px] h-[550px] bg-purple-600/12 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-amber-500/12 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-indigo-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Captured Resonance</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-cinzel text-3xl sm:text-5xl font-extrabold tracking-wider text-[#fdf8ed] mb-4"
          >
            MOMENTS THAT GLOW
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-base sm:text-lg text-neutral-400 font-light max-w-xl mx-auto"
          >
            A visual retrospective of raw emotions, standing ovations, and electric memories forged under the lights.
          </motion.p>
        </div>

        {/* Masonry / Asymmetric Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]">
          {GALLERY_ITEMS.map((item, index) => {
            const isSpanTall = item.aspect === 'tall';
            const isSpanWide = item.aspect === 'wide';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                onClick={() => openLightbox(index)}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer border border-white/10 hover:border-amber-400/60 transition-all duration-300 shadow-xl ${
                  isSpanTall ? 'sm:row-span-2' : ''
                } ${isSpanWide ? 'sm:col-span-2' : ''}`}
                tabIndex={0}
                role="button"
                aria-label={`View image: ${item.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') openLightbox(index);
                }}
              >
                {/* Image with zoom on hover */}
                <img
                  src={item.image}
                  alt={item.title}
                  width="800"
                  height="600"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                  loading="lazy"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Top Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                    {item.category}
                  </span>
                </div>

                {/* Hover Maximize Icon */}
                <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                  <Maximize2 className="w-4 h-4 text-amber-300" />
                </div>

                {/* Bottom Overlay Title & Event */}
                <div className="absolute bottom-0 inset-x-0 p-6 z-10 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400/90 block mb-1">
                    {item.event} [Archive]
                  </span>
                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#faf5ec] group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-300 font-light mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Notice badge */}
        <div className="mt-8 text-center text-xs text-neutral-500">
          Showing archive photo highlights. [Placeholder curation for OORJA].
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Gallery Image Lightbox"
          >
            {/* Close Lightbox */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="Close Lightbox (Esc)"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={showPrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="Previous Image (Left Arrow)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={showNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="Next Image (Right Arrow)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Active Image Container */}
            <motion.div
              key={activeImageIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
            >
              <img
                src={GALLERY_ITEMS[activeImageIndex].image}
                alt={GALLERY_ITEMS[activeImageIndex].title}
                className="max-h-[72vh] max-w-full rounded-2xl object-contain border border-amber-500/30 shadow-2xl"
              />

              <div className="mt-4 text-center">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                  {GALLERY_ITEMS[activeImageIndex].event} • {GALLERY_ITEMS[activeImageIndex].category}
                </span>
                <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-white mt-1">
                  {GALLERY_ITEMS[activeImageIndex].title}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 font-light mt-1 max-w-xl mx-auto">
                  {GALLERY_ITEMS[activeImageIndex].caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

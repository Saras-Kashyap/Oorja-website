import React, { useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { EVENTS_DATA } from '../data/events';
import { EventCard } from './EventCard';

// Lazy-load modal — only needed when user clicks a card
const EventModal = lazy(() => import('./EventModal').then(m => ({ default: m.EventModal })));

export const Events = ({ onRegisterEvent }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleRegister = (eventId) => {
    // Bubble up to parent (Home) for fresher-event; open local modal for others
    if (onRegisterEvent) {
      onRegisterEvent(eventId);
    } else {
      const target = EVENTS_DATA.find((e) => e.id === eventId) || EVENTS_DATA[2];
      setSelectedEvent(target);
      setIsModalOpen(true);
    }
  };

  return (
    <section id="events" className="relative py-28 bg-[#070712]/75 text-[#f4eee4] overflow-hidden backdrop-blur-[2px]">
      {/* Dynamic Party Stage Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-r from-amber-500/15 via-orange-600/10 to-transparent blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute -top-12 -right-16 w-[600px] h-[600px] bg-purple-600/12 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-16 -left-16 w-[600px] h-[600px] bg-indigo-600/12 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
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
            className="font-cinzel text-3xl sm:text-5xl font-extrabold tracking-wider text-[#fdf8ed] mb-2"
          >
            DEEP SHANDHYA
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-cinzel text-xl sm:text-2xl font-bold tracking-widest text-amber-300 mb-4"
          >
            6 NOVEMBER
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-base sm:text-lg text-neutral-400 font-light max-w-2xl mx-auto"
          >
            Step into three signature cultural spectacles that define the spirit, grandeur, and creative passion of COER University.
          </motion.p>
        </div>

        {/* 3 Signature Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EVENTS_DATA.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              <EventCard
                event={event}
                onSelect={handleSelectEvent}
                onRegister={handleRegister}
              />
            </motion.div>
          ))}
        </div>

        {/* Notice on Venue Placeholders */}
        <div className="mt-14 text-center">
          <p className="text-xs text-neutral-500 tracking-wide font-light">
            Venue location: <span className="text-neutral-400">COER University Campus, Roorkee — exact venue [TO BE ANNOUNCED]</span>. Dates and artist lineups are placeholders for upcoming session announcements.
          </p>
        </div>

      </div>

      {/* Interactive Modal — only mounted when open */}
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

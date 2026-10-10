import React, { useState, lazy, Suspense } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Events } from '../components/Events';
import { FresherSpecial } from '../components/FresherSpecial';
import { Footer } from '../components/Footer';
import { EVENTS_DATA } from '../data/events';

// Below-the-fold sections — lazy-loaded for faster initial paint
const Gallery = lazy(() => import('../components/Gallery').then(m => ({ default: m.Gallery })));
const Team = lazy(() => import('../components/Team').then(m => ({ default: m.Team })));
const About = lazy(() => import('../components/About').then(m => ({ default: m.About })));
const Contact = lazy(() => import('../components/Contact').then(m => ({ default: m.Contact })));
const EventModal = lazy(() => import('../components/EventModal').then(m => ({ default: m.EventModal })));

// Minimal skeleton placeholder — preserves height to avoid layout shift
const SectionSkeleton = () => (
  <div className="w-full py-28 flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-amber-500/30 border-t-amber-400 animate-spin" />
  </div>
);

export const Home = () => {
  const [modalEvent, setModalEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenRegister = (eventId = 'fresher-event') => {
    const target = EVENTS_DATA.find((e) => e.id === eventId) || EVENTS_DATA[2];
    setModalEvent(target);
    setIsModalOpen(true);
  };

  const handleSelectEvent = (event) => {
    setModalEvent(event);
    setIsModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#07070a] text-[#f4eee4] selection:bg-amber-500 selection:text-black">
      {/* Sticky Navigation */}
      <Navbar onOpenRegister={handleOpenRegister} />

      {/* Main Sections */}
      <main>
        {/* Hero — eagerly loaded (above the fold) */}
        <Hero
          onOpenRegister={handleOpenRegister}
          onSelectEvent={handleSelectEvent}
        />

        {/* Signature Events — eagerly loaded (first below-fold section, high priority) */}
        <Events onRegisterEvent={handleOpenRegister} />

        {/* Fresher Special Aarambh 2026 with Live Countdown */}
        <FresherSpecial onRegister={handleOpenRegister} />

        {/* Below-the-fold sections — lazily loaded */}
        <Suspense fallback={<SectionSkeleton />}>
          {/* Glow Gallery with Masonry & Lightbox */}
          <Gallery />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          {/* Leadership Council Team */}
          <Team />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          {/* About Section with Core Values & Campus Facts Strip */}
          <About />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          {/* Contact with Form Validation & Map Embed */}
          <Contact />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Event / Registration Modal — only mounted when needed */}
      {isModalOpen && (
        <Suspense fallback={null}>
          <EventModal
            event={modalEvent}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </Suspense>
      )}
    </div>
  );
};

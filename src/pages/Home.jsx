import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Events } from '../components/Events';
import { FresherSpecial } from '../components/FresherSpecial';
import { Gallery } from '../components/Gallery';
import { Team } from '../components/Team';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { EventModal } from '../components/EventModal';
import { EVENTS_DATA } from '../data/events';

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
        {/* Exact Layout Reference Hero */}
        <Hero
          onOpenRegister={handleOpenRegister}
          onSelectEvent={handleSelectEvent}
        />

        {/* About Section with Core Values & Campus Facts Strip */}
        <About />

        {/* Signature Events (Zion, Deep Sandhya, Fresher Event) */}
        <Events onRegisterEvent={handleOpenRegister} />

        {/* Fresher Special Aarambh 2026 with Live Countdown */}
        <FresherSpecial onRegister={handleOpenRegister} />

        {/* Glow Gallery with Masonry & Lightbox */}
        <Gallery />

        {/* Leadership Council Team */}
        <Team />

        {/* Contact with Form Validation & Map Embed */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Event / Registration Modal */}
      <EventModal
        event={modalEvent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

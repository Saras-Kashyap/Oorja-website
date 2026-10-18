import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, MapPin, Sparkles, CheckCircle2, Send, Share2 } from 'lucide-react';
import { EVENTS_DATA } from '../data/events';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { PartyAmbientBackground } from '../components/PartyAmbientBackground';
import confetti from 'canvas-confetti';

export const EventDetails = () => {
  const { eventId } = useParams();
  const event = EVENTS_DATA.find((e) => e.id === eventId) || EVENTS_DATA[0];

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (e) {}

    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen bg-[#070710] text-[#f4eee4]">
      {/* Global Vibrant Party Ambient Stage Background */}
      <PartyAmbientBackground />

      <Navbar />

      <div className="relative z-10 pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-amber-300 uppercase tracking-wider mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Experiences</span>
        </Link>

        {/* Hero Card */}
        <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-[#0f0f18] p-8 sm:p-12 mb-12 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            {event.badge}
          </span>

          <h1 className="font-cinzel text-4xl sm:text-6xl font-black text-white mb-3">
            {event.title}
          </h1>

          <p className="font-cormorant italic text-xl sm:text-2xl text-amber-300/95 mb-8">
            {event.subtitle || event.tagline}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 text-xs sm:text-sm text-neutral-300">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>
          </div>
        </div>

        {/* Content & Registration Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Details (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {event.description && (
              <div className="p-8 rounded-3xl bg-[#11111a] border border-white/10 space-y-4">
                <h3 className="font-cinzel text-xl font-bold text-white">
                  About The Event
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed font-light">
                  {event.description}
                </p>
              </div>
            )}

            {event.highlights && (
              <div className="p-8 rounded-3xl bg-[#11111a] border border-white/10 space-y-4">
                <h3 className="font-cinzel text-xl font-bold text-white">
                  Event Highlights & Attractions
                </h3>
                <div className="space-y-3">
                  {event.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-neutral-300">
                      <Sparkles className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Registration Box (5 cols) */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-3xl bg-[#13131e] border border-amber-500/30 sticky top-28 shadow-xl">
              <h3 className="font-cinzel text-xl font-bold text-white mb-2">
                Register for {event.title}
              </h3>
              <p className="text-xs text-neutral-400 font-light mb-6">
                Reserve student entry pass. Limited seats available on campus.
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-amber-400 mx-auto" />
                  <h4 className="font-cinzel text-lg font-bold text-white">
                    Registration Confirmed!
                  </h4>
                  <p className="text-xs text-neutral-300">
                    We'll see you at COER University campus. Pass details have been emailed to {formData.email}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs text-neutral-300 font-medium mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-300 font-medium mb-1">
                      Student Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="student@coeruniversity.ac.in"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-300 font-medium mb-1">
                      Department
                    </label>
                    <input
                      type="text"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      placeholder="e.g. Computer Science"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-full text-xs font-bold tracking-wider uppercase text-black bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 transition-all shadow-md shadow-amber-500/20 cursor-pointer"
                  >
                    Confirm Registration Pass
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

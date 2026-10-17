import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, UserPlus, Flame, PartyPopper, Calendar, MapPin } from 'lucide-react';
import { Countdown } from './Countdown';
import confetti from 'canvas-confetti';

export const FresherSpecial = ({ onRegister }) => {
  // Target date set for placeholder Fresher event (e.g., in 16 days)
  const placeholderFresherDate = new Date();
  placeholderFresherDate.setDate(placeholderFresherDate.getDate() + 16);
  placeholderFresherDate.setHours(15, 30, 0, 0);

  const handleRegisterClick = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fbbf24', '#ec4899', '#ffffff'],
      });
    } catch (e) {}

    onRegister?.('fresher-event');
  };

  return (
    <section id="fresher" className="relative py-28 bg-[#0a0a18]/75 text-[#f4eee4] overflow-hidden backdrop-blur-[2px]">
      {/* Visual Lighting Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.12)_0%,rgba(168,85,247,0.08)_40%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-96 h-96 bg-rose-500/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-96 h-96 bg-amber-400/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute -top-10 left-1/3 w-80 h-80 bg-indigo-500/12 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Glow Container Card */}
        <div className="relative rounded-3xl p-8 sm:p-14 lg:p-16 bg-gradient-to-b from-[#161628]/95 to-[#0d0d18]/98 border border-amber-500/40 shadow-[0_0_60px_rgba(245,158,11,0.2),0_0_30px_rgba(168,85,247,0.15)] overflow-hidden text-center backdrop-blur-xl">
          
          {/* Subtle Decorative Backdrop Elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <PartyPopper className="w-3.5 h-3.5" />
            <span>Fresher Welcome Special 2026</span>
          </motion.div>

          {/* Heading & Subheading */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#fce7c0] to-[#f59e0b] mb-3"
          >
            THE NEW CHAPTER BEGINS.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-cormorant italic text-xl sm:text-3xl text-amber-300/90 font-medium mb-6"
          >
            Welcome to OORJA.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-body text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed font-light mb-10"
          >
            Fresh minds, unbridled passions, and endless creativity. Whether you're an actor, dancer, vocalist, designer, or backstage maverick — this is where your legacy at COER University starts.
          </motion.p>

          {/* Countdown Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-10"
          >
            <Countdown targetDate={placeholderFresherDate} />
          </motion.div>

          {/* Location & Time Pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-300 mb-10">
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/10">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>October 24, 2026 [Placeholder]</span>
            </span>
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/10">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>COER University Campus, Roorkee — exact venue TBA</span>
            </span>
          </div>

          {/* Action CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={handleRegisterClick}
              className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full text-sm font-bold tracking-wider uppercase text-black bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 transition-all duration-300 shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:shadow-[0_0_45px_rgba(245,158,11,0.8)] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-black" />
              <span>Register Now for Aarambh 2026</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Users, Mic2, Award, Landmark, GraduationCap, Building2 } from 'lucide-react';
import { COLLEGE_CONFIG, CLUB_INFO } from '../data/college';

export const About = () => {
  const iconMap = {
    Sparkles: Sparkles,
    Zap: Zap,
    Users: Users,
    Mic2: Mic2,
  };

  return (
    <section id="about" className="relative py-28 bg-[#09090f] text-[#f4eee4] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Heartbeat of COER Campus</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-cinzel text-3xl sm:text-5xl font-extrabold tracking-wider text-[#fdf8ed] mb-6"
          >
            {CLUB_INFO.aboutHeading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-base sm:text-lg text-neutral-300 leading-relaxed font-light"
          >
            {CLUB_INFO.aboutText}
          </motion.p>
        </div>

        {/* Four Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {CLUB_INFO.coreValues.map((value, idx) => {
            const IconComponent = iconMap[value.icon] || Sparkles;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative p-8 rounded-2xl bg-[#12121c]/80 backdrop-blur-xl border border-white/10 hover:border-amber-400/50 transition-all duration-300 shadow-xl shadow-black/40 hover:shadow-amber-500/10"
              >
                {/* Glow pill behind icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/10`}>
                  <IconComponent className={`w-7 h-7 ${value.accent}`} />
                </div>

                <h3 className="font-cinzel text-xl font-bold text-[#faf5ec] mb-3 group-hover:text-amber-300 transition-colors">
                  {value.title}
                </h3>

                <p className="font-body text-sm text-neutral-400 leading-relaxed font-light">
                  {value.description}
                </p>

                {/* Subtle hover corner accent */}
                <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden rounded-tr-2xl pointer-events-none">
                  <div className="w-6 h-6 bg-amber-400/20 rotate-45 transform translate-x-3 -translate-y-3 group-hover:bg-amber-400/40 transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ==============================================================
            CAMPUS FACTS STRIP (Section 0 Verified Details)
            75-acre campus, 27-year legacy, 13 colleges, 16K+ alumni
            ============================================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-[#141420] via-[#1a1926] to-[#141420] border border-amber-500/30 shadow-2xl overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-amber-400/10 blur-3xl pointer-events-none rounded-full" />
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:max-w-sm text-center lg:text-left">
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-amber-400/90 block mb-1">
                OUR UNIVERSITY ROOTS
              </span>
              <h4 className="font-cinzel text-2xl font-bold text-[#fffdfa] mb-2">
                COER University, Roorkee
              </h4>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Founded in 1998 as Roorkee's premier engineering institute, today a thriving UGC-recognized university powering global innovators and vibrant cultural pioneers.
              </p>
            </div>

            {/* 4 Stats Blocks */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full lg:w-auto">
              {[
                { value: "75 Acres", label: "Green Campus", icon: Landmark },
                { value: "27 Years", label: "Inspiring Legacy", icon: Award },
                { value: "13 Colleges", label: "Faculty Disciplines", icon: Building2 },
                { value: "16K+ Alumni", label: "Global Network", icon: GraduationCap },
              ].map((stat, idx) => {
                const StatIcon = stat.icon;
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-black/40 border border-white/5 text-center group hover:border-amber-400/30 transition-colors"
                  >
                    <StatIcon className="w-5 h-5 text-amber-400/80 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="font-cinzel text-xl sm:text-2xl font-black text-amber-300">
                      {stat.value}
                    </span>
                    <span className="text-[10px] sm:text-xs text-neutral-400 font-medium tracking-wide mt-0.5">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

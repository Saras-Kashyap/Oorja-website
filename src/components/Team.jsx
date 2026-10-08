import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Mail, ExternalLink } from 'lucide-react';
import { InstagramIcon } from './SocialIcons';
import { TEAM_MEMBERS } from '../data/events';

export const Team = () => {
  return (
    <section id="team" className="relative py-28 bg-[#09090f] text-[#f4eee4] overflow-hidden">
      {/* Background Lighting Elements */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-amber-500/5 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-500/5 blur-[130px] pointer-events-none rounded-full" />

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
            <span>Leadership & Vision</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-cinzel text-3xl sm:text-5xl font-extrabold tracking-wider text-[#fdf8ed] mb-4"
          >
            THE PEOPLE BEHIND OORJA
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-base sm:text-lg text-neutral-400 font-light max-w-xl mx-auto"
          >
            Meet the passionate student council leads orchestrating every beat, stage, spotlight, and celebration.
          </motion.p>
        </div>

        {/* 6 Leadership Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div
              key={member.role}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="group relative rounded-3xl bg-[#12121b] border border-white/10 hover:border-amber-400/50 transition-all duration-300 shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Photo Area */}
              <div className="relative h-72 w-full overflow-hidden bg-neutral-900">
                <img
                  src={member.image}
                  alt={`${member.name} - ${member.role}`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 grayscale-[25%] group-hover:grayscale-0"
                  loading="lazy"
                />

                {/* Gradient Shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#12121b] via-[#12121b]/30 to-transparent" />

                {/* Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                    {member.badge}
                  </span>
                </div>

                {/* Placeholder Marker */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-medium tracking-wide bg-amber-500/20 text-amber-200 border border-amber-500/30 backdrop-blur-md">
                    [Placeholder]
                  </span>
                </div>
              </div>

              {/* Info Area */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between -mt-6 relative z-10">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 block mb-1">
                    {member.role}
                  </span>

                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#faf5ec] group-hover:text-amber-300 transition-colors mb-2">
                    {member.name}
                  </h3>

                  <p className="font-body text-xs sm:text-sm text-neutral-400 font-light leading-relaxed mb-6">
                    {member.bio}
                  </p>
                </div>

                {/* Social Connect Row */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-400">COER Student Council</span>
                  <div className="flex items-center gap-2">
                    <a
                      href={member.social}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white/5 hover:bg-amber-500/20 text-neutral-300 hover:text-amber-300 border border-white/10 hover:border-amber-400/40 transition-colors"
                      aria-label={`${member.name} Instagram`}
                    >
                      <InstagramIcon className="w-4 h-4" />
                    </a>
                    <a
                      href={`mailto:oorja.club@coeruniversity.ac.in`}
                      className="p-2 rounded-full bg-white/5 hover:bg-amber-500/20 text-neutral-300 hover:text-amber-300 border border-white/10 hover:border-amber-400/40 transition-colors"
                      aria-label={`Email ${member.role}`}
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-12 text-center text-xs text-neutral-500">
          Executive team leads for the upcoming cultural academic tenure. [Student details and portraits are placeholders].
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { Sparkles, ExternalLink, Heart } from 'lucide-react';
import { InstagramIcon, FacebookIcon, YoutubeIcon, LinkedinIcon } from './SocialIcons';
import { COLLEGE_CONFIG, CLUB_INFO } from '../data/college';

export const Footer = () => {
  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Events', href: '#events' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Team', href: '#team' },
  ];

  const collegeLinks = [
    { label: 'COER University Website', href: COLLEGE_CONFIG.officialLinks.website },
    { label: 'Cultural Activities Portal', href: COLLEGE_CONFIG.officialLinks.culturalActivities },
    { label: 'Student Clubs & Societies', href: COLLEGE_CONFIG.officialLinks.studentClubs },
    { label: 'Campus Happenings & Events', href: COLLEGE_CONFIG.officialLinks.events },
  ];

  return (
    <footer className="relative bg-[#05050f]/85 text-[#f4eee4] border-t border-amber-500/25 pt-16 pb-12 overflow-hidden backdrop-blur-md">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-amber-500/10 via-purple-500/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Brand & Affiliation (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/oorja-logo.png"
                alt="OORJA Club Logo"
                className="w-12 h-12 object-contain filter drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]"
              />
              <div>
                <span className="font-cinzel text-2xl font-bold tracking-widest text-[#fdf8ed]">
                  OORJA
                </span>
                <p className="font-cormorant italic text-xs text-amber-300">
                  {CLUB_INFO.tagline}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-sm leading-relaxed">
              Where energy meets expression, creativity meets culture, and every moment becomes an unforgettable experience.
            </p>

            {/* Official College Affiliation Link */}
            <div className="pt-2">
              <a
                href={COLLEGE_CONFIG.officialLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/40 text-xs text-neutral-300 hover:text-amber-300 transition-colors"
              >
                <span>Part of COER University, Roorkee</span>
                <ExternalLink className="w-3 h-3 text-amber-400" />
              </a>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-neutral-400 hover:text-amber-300 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* College Links (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400">
              COER University Portals
            </h4>
            <ul className="space-y-2 text-xs">
              {collegeLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-neutral-400 hover:text-amber-300 transition-colors"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="w-2.5 h-2.5 text-neutral-500" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Connect Icons */}
            <div className="pt-4">
              <span className="text-[11px] font-semibold text-neutral-400 block mb-2">
                Connect With COER University
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href={COLLEGE_CONFIG.officialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-white/5 hover:bg-amber-500/20 text-neutral-400 hover:text-amber-300 border border-white/10 hover:border-amber-400/40 transition-colors"
                  aria-label="COER University Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={COLLEGE_CONFIG.officialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-white/5 hover:bg-amber-500/20 text-neutral-400 hover:text-amber-300 border border-white/10 hover:border-amber-400/40 transition-colors"
                  aria-label="COER University Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href={COLLEGE_CONFIG.officialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-white/5 hover:bg-amber-500/20 text-neutral-400 hover:text-amber-300 border border-white/10 hover:border-amber-400/40 transition-colors"
                  aria-label="COER University YouTube"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
                <a
                  href={COLLEGE_CONFIG.officialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-white/5 hover:bg-amber-500/20 text-neutral-400 hover:text-amber-300 border border-white/10 hover:border-amber-400/40 transition-colors"
                  aria-label="COER University LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-light">
          <div>
            © 2026 OORJA. All rights reserved. Part of COER University, Roorkee.
          </div>
          <div>
            {COLLEGE_CONFIG.builderCredit}
          </div>
        </div>
      </div>
    </footer>
  );
};

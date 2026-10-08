import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, ChevronRight, Compass } from 'lucide-react';
import { COLLEGE_CONFIG } from '../data/college';

export const Navbar = ({ onOpenRegister }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Events', href: '#events', id: 'events' },
    { label: 'Fresher Special', href: '#fresher', id: 'fresher' },
    { label: 'Gallery', href: '#gallery', id: 'gallery' },
    { label: 'Team', href: '#team', id: 'team' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine active section based on scroll position
      const sections = ['home', 'about', 'events', 'fresher', 'gallery', 'team', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#09090dd4] backdrop-blur-xl border-b border-amber-500/20 py-3 shadow-2xl shadow-black/80'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="group flex items-center gap-3 transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-lg p-1"
            aria-label="OORJA Club Home"
          >
            <div className="flex flex-col">
              <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-widest text-[#fbf7ee] group-hover:text-amber-300 transition-colors">
                OORJA
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-amber-400/90 font-medium font-body -mt-0.5">
                COER University
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-4 py-1.5 text-xs xl:text-sm font-medium tracking-wide rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-amber-300 bg-amber-500/15 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-amber-400 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => onOpenRegister?.('fresher-event')}
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase text-black bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 transition-all duration-200 shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_28px_rgba(245,158,11,0.7)] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Join OORJA</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => onOpenRegister?.('fresher-event')}
              className="px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase text-black bg-gradient-to-r from-amber-400 to-yellow-300 shadow-[0_0_12px_rgba(245,158,11,0.3)]"
            >
              Join
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-neutral-300 hover:text-white bg-white/5 border border-white/10 hover:border-amber-500/40 focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#0c0c12]/95 backdrop-blur-2xl border-b border-amber-500/30 shadow-2xl px-6 py-6 transition-all duration-300 animate-fadeIn">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-colors ${
                  activeSection === link.id
                    ? 'text-amber-300 bg-amber-500/15 border border-amber-500/30'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-amber-400/60" />
              </a>
            ))}

            <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegister?.('fresher-event');
                }}
                className="w-full py-3 rounded-xl text-sm font-semibold tracking-wider uppercase text-black bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-300 shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Join OORJA 2026
              </button>

              <div className="text-center text-[11px] text-neutral-400 pt-1">
                A Cultural Club of {COLLEGE_CONFIG.name}, Roorkee
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

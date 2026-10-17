import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Send,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Navigation
} from 'lucide-react';
import { InstagramIcon } from './SocialIcons';
import { COLLEGE_CONFIG } from '../data/college';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Please provide your full name.';
    }
    if (!formData.email.trim()) {
      errors.email = 'Please provide your email address.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email format.';
    }
    if (!formData.message.trim()) {
      errors.message = 'Please write a brief message.';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Mock API call simulation (matches /api/contact endpoint)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setFormErrors({});
    }, 700);
  };

  return (
    <section id="contact" className="relative py-28 bg-[#060610]/75 text-[#f4eee4] overflow-hidden backdrop-blur-[2px]">
      {/* Dynamic Party Glow Accents */}
      <div className="absolute top-1/4 left-1/3 w-[650px] h-[650px] bg-amber-500/12 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-[550px] h-[550px] bg-purple-600/12 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-indigo-600/10 blur-[140px] pointer-events-none rounded-full" />

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
            <span>Connect & Collaborate</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-cinzel text-3xl sm:text-5xl font-extrabold tracking-wider text-[#fdf8ed] mb-4"
          >
            LET'S CREATE SOMETHING ELECTRIC.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-base sm:text-lg text-neutral-400 font-light max-w-xl mx-auto"
          >
            Have ideas for performances, artist bookings, sponsor tie-ups, or want to join the crew? Reach out to OORJA.
          </motion.p>
        </div>

        {/* Contact Grid: Details + Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          
          {/* Left Column: Real Campus Details & Verified Contact Points (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Campus Address Card */}
            <div className="p-7 rounded-3xl bg-[#101018] border border-amber-500/20 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                    Official University Campus
                  </span>
                  <h3 className="font-cinzel text-lg font-bold text-white">
                    {COLLEGE_CONFIG.name}
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                {COLLEGE_CONFIG.address.full}
              </p>

              <div className="pt-2 flex items-center gap-3">
                <a
                  href={COLLEGE_CONFIG.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-4 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions (29.8923, 77.9576)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Helpline & Club Contacts */}
            <div className="p-7 rounded-3xl bg-[#101018] border border-white/10 shadow-xl space-y-5">
              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                Direct Inquiries & Helplines
              </h4>

              {/* COER University Helpline (Real verified info) */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-black/40 border border-white/5">
                <Phone className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold block">
                    COER University Helpline (Official)
                  </span>
                  <a
                    href={`tel:${COLLEGE_CONFIG.contacts.helplinePhone}`}
                    className="text-xs sm:text-sm text-neutral-200 hover:text-amber-300 font-medium"
                  >
                    {COLLEGE_CONFIG.contacts.helplinePhone}
                  </a>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Email: {COLLEGE_CONFIG.contacts.helplineEmail}
                  </p>
                </div>
              </div>

              {/* OORJA Club Email [Placeholder] */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-black/40 border border-white/5">
                <Mail className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold block">
                    OORJA Club Email [Placeholder]
                  </span>
                  <a
                    href={`mailto:${COLLEGE_CONFIG.contacts.clubEmailPlaceholder}`}
                    className="text-xs sm:text-sm text-neutral-300 hover:text-amber-300"
                  >
                    {COLLEGE_CONFIG.contacts.clubEmailPlaceholder}
                  </a>
                </div>
              </div>

              {/* OORJA Instagram [Placeholder] */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-black/40 border border-white/5">
                <InstagramIcon className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold block">
                    OORJA Club Instagram [Placeholder]
                  </span>
                  <span className="text-xs sm:text-sm text-neutral-300">
                    {COLLEGE_CONFIG.contacts.clubInstagramPlaceholder} [placeholder]
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#12121c] border border-amber-500/30 shadow-2xl relative">
              <h3 className="font-cinzel text-2xl font-bold text-white mb-2">
                Send a Message to OORJA
              </h3>
              <p className="text-xs text-neutral-400 font-light mb-8">
                Got a query regarding event passes, club auditions, or artist collaborations? Drop us a line.
              </p>

              {isSuccess ? (
                <div className="p-8 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-amber-400 mx-auto" />
                  <h4 className="font-cinzel text-2xl font-bold text-white">
                    Message Dispatched!
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto">
                    Thank you for writing to OORJA Cultural Club. The student coordination team will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 transition-colors cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Name field */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Aniket Kashyap"
                      aria-invalid={!!formErrors.name}
                      aria-describedby={formErrors.name ? "name-error" : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                        formErrors.name ? 'border-red-500' : 'border-white/10'
                      } text-sm text-white focus:outline-none focus:border-amber-400 transition-colors`}
                    />
                    {formErrors.name && (
                      <p id="name-error" className="text-xs text-red-400 flex items-center gap-1 mt-1.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{formErrors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email field */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. aniket@gmail.com"
                      aria-invalid={!!formErrors.email}
                      aria-describedby={formErrors.email ? "email-error" : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                        formErrors.email ? 'border-red-500' : 'border-white/10'
                      } text-sm text-white focus:outline-none focus:border-amber-400 transition-colors`}
                    />
                    {formErrors.email && (
                      <p id="email-error" className="text-xs text-red-400 flex items-center gap-1 mt-1.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{formErrors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Message field */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your thoughts, suggestions, or inquiry..."
                      aria-invalid={!!formErrors.message}
                      aria-describedby={formErrors.message ? "message-error" : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${
                        formErrors.message ? 'border-red-500' : 'border-white/10'
                      } text-sm text-white focus:outline-none focus:border-amber-400 transition-colors resize-none`}
                    />
                    {formErrors.message && (
                      <p id="message-error" className="text-xs text-red-400 flex items-center gap-1 mt-1.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{formErrors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase text-black bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 transition-all duration-300 shadow-lg shadow-amber-500/25 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-4 h-4 text-black" />
                      <span>{isSubmitting ? 'Transmitting...' : 'Send Message to OORJA'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ==============================================================
            EMBEDDED GOOGLE MAP (Real Verified Coordinates: 29.8923, 77.9576)
            COER University, Vardhmanpuram, Roorkee
            ============================================================== */}
        <div className="rounded-3xl overflow-hidden border border-amber-500/25 shadow-2xl bg-neutral-900">
          <div className="p-4 bg-[#12121a] flex flex-wrap items-center justify-between gap-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-white">
                Campus Location Map: COER University (29.8923° N, 77.9576° E)
              </span>
            </div>
            <a
              href={COLLEGE_CONFIG.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="w-full h-80 sm:h-96">
            <iframe
              title="COER University Roorkee Campus Map Location"
              src={COLLEGE_CONFIG.address.embedMapUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(90%)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

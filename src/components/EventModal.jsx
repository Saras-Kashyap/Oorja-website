import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MapPin, Sparkles, CheckCircle2, Send, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const EventModal = ({ event, isOpen, onClose, onRegistered }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: '',
    yearOfStudy: '1st Year',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !event) return null;

  const validate = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Please enter your full name';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please provide a valid email address';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API registration call (and mock post to /api/events/register)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#fbbf24', '#f97316', '#ffffff'],
        });
      } catch (err) {
        // fallback
      }

      onRegistered?.(event.id);
    }, 600);
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl rounded-3xl bg-[#0f0f17] border border-amber-500/40 shadow-2xl shadow-black overflow-hidden my-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-black/60 text-neutral-400 hover:text-white border border-white/10 hover:border-amber-400/50 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            aria-label="Close event details modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Banner */}
          <div className="relative p-6 sm:p-8 bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-black border-b border-white/10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              {event.badge}
            </span>
            <h2 id="modal-title" className="font-cinzel text-3xl sm:text-4xl font-extrabold text-[#fdf8ed]">
              {event.title}
            </h2>
            <p className="text-sm font-cormorant italic text-amber-300/90 mt-1">
              {event.subtitle || event.tagline}
            </p>

            {/* Quick Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-4 border-t border-white/10 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate">{event.venue}</span>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-6 text-[#ded8cc]">
            {/* Description */}
            <div>
              <h4 className="text-xs uppercase font-bold tracking-widest text-amber-400 mb-2">
                About The Experience
              </h4>
              <p className="text-sm leading-relaxed text-neutral-300 font-light">
                {event.description}
              </p>
            </div>

            {/* Highlights List */}
            {event.highlights && (
              <div>
                <h4 className="text-xs uppercase font-bold tracking-widest text-amber-400 mb-3">
                  Festival Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {event.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-neutral-200"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Registration Form / Confirmation Section */}
            <div className="pt-4 border-t border-white/10">
              {submitSuccess ? (
                <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-amber-400 mx-auto" />
                  <h4 className="font-cinzel text-xl font-bold text-[#faf5ec]">
                    You're On The Guestlist!
                  </h4>
                  <p className="text-xs text-neutral-300 max-w-md mx-auto">
                    Registration confirmed for <strong>{event.title}</strong> at COER University. A confirmation voucher has been dispatched to {formData.email}.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs uppercase font-bold tracking-widest text-amber-400">
                      Reserve Your Spot / Express Pass
                    </h4>
                    <span className="text-[10px] text-neutral-400">Free for COER students & guests</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] text-neutral-300 font-medium mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Priyanshu Sharma"
                        className={`w-full px-4 py-2.5 rounded-xl bg-white/5 border ${
                          formErrors.fullName ? 'border-red-500' : 'border-white/10'
                        } text-sm text-white focus:outline-none focus:border-amber-400 transition-colors`}
                      />
                      {formErrors.fullName && (
                        <span className="text-[10px] text-red-400 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3" /> {formErrors.fullName}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] text-neutral-300 font-medium mb-1">
                        Student Email / Personal Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="student@coeruniversity.ac.in"
                        className={`w-full px-4 py-2.5 rounded-xl bg-white/5 border ${
                          formErrors.email ? 'border-red-500' : 'border-white/10'
                        } text-sm text-white focus:outline-none focus:border-amber-400 transition-colors`}
                      />
                      {formErrors.email && (
                        <span className="text-[10px] text-red-400 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3" /> {formErrors.email}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] text-neutral-300 font-medium mb-1">
                        Phone / WhatsApp [Optional]
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-neutral-300 font-medium mb-1">
                        Department / College
                      </label>
                      <input
                        type="text"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        placeholder="e.g. B.Tech CSE / Management"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-5 py-2.5 rounded-full text-xs font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase text-black bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 transition-all shadow-md shadow-amber-500/20 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'Registering...' : 'Confirm Registration'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

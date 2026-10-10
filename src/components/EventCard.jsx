import React from 'react';
import { Calendar, MapPin, ArrowRight, Sparkles, ExternalLink } from 'lucide-react';

export const EventCard = ({ event, onSelect, onRegister }) => {
  // Unique visual treatment based on event id
  const getVisualStyling = (id) => {
    switch (id) {
      case 'zion':
        return {
          bannerGradient: 'from-amber-500/30 via-orange-600/20 to-black',
          badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          accentBorder: 'hover:border-amber-400',
          bgArt: 'radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.25) 0%, transparent 60%)',
          cardTag: 'Electric Rock & Dance Mega Fest',
          image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
        };
      case 'deep-sandhya':
        return {
          bannerGradient: 'from-orange-500/30 via-yellow-700/20 to-black',
          badgeColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
          accentBorder: 'hover:border-yellow-400',
          bgArt: 'radial-gradient(circle at 80% 20%, rgba(217, 119, 6, 0.3) 0%, transparent 60%)',
          cardTag: 'Lanterns, Classical Ragas & Theatre',
          image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
        };
      case 'fresher-event':
      default:
        return {
          bannerGradient: 'from-yellow-400/30 via-rose-600/20 to-black',
          badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
          accentBorder: 'hover:border-rose-400',
          bgArt: 'radial-gradient(circle at 80% 20%, rgba(244, 63, 94, 0.25) 0%, transparent 60%)',
          cardTag: 'The Official Induction Gala',
          image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
        };
    }
  };

  const style = getVisualStyling(event.id);

  return (
    <div
      className={`group relative flex flex-col rounded-3xl bg-[#0f0f17] border border-white/10 ${style.accentBorder} transition-all duration-300 shadow-2xl overflow-hidden hover:-translate-y-2.5`}
    >
      {/* Top Large Visual Area */}
      <div className="relative h-60 sm:h-68 w-full overflow-hidden">
        {/* Background Image with Zoom on Hover */}
        <img
          src={style.image}
          alt={event.title}
          width="800"
          height="400"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70 group-hover:opacity-90"
          loading="lazy"
        />

        {/* Gradient Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f17] via-[#0f0f17]/40 to-transparent" />
        <div className={`absolute inset-0 bg-gradient-to-br ${style.bannerGradient} mix-blend-color-dodge opacity-60`} />

        {/* Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-md border ${style.badgeColor}`}>
            <Sparkles className="w-3 h-3" />
            {event.badge}
          </span>
        </div>

        {/* Status Tag */}
        <div className="absolute top-4 right-4 z-10">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-black/60 text-neutral-300 border border-white/10 backdrop-blur-md">
            {event.status}
          </span>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between -mt-4 relative z-10">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-amber-400/90 uppercase block mb-1">
            {style.cardTag}
          </span>

          <h3 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#faf5ec] group-hover:text-amber-300 transition-colors mb-2">
            {event.title}
          </h3>

          <p className="font-body text-xs sm:text-sm text-neutral-400 font-light leading-relaxed mb-6 line-clamp-2">
            {event.tagline}
          </p>

          {/* Date & Location Placeholders */}
          <div className="space-y-2 pt-2 border-t border-white/10 mb-6 text-xs text-neutral-300">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA Row */}
        <div className="flex items-center gap-3 pt-2">
          {event.id === 'fresher-event' ? (
            <button
              onClick={() => onRegister(event.id)}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full text-xs font-bold tracking-wider uppercase text-black bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 transition-all duration-200 shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <span>{event.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => onSelect(event)}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#fdf8ed] bg-white/5 hover:bg-white/10 border border-amber-500/30 hover:border-amber-400 transition-all duration-200 cursor-pointer"
            >
              <span>{event.ctaText}</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            </button>
          )}

          <button
            onClick={() => onSelect(event)}
            aria-label={`View full details for ${event.title}`}
            className="p-3 rounded-full bg-white/5 hover:bg-amber-500/20 text-neutral-400 hover:text-amber-300 border border-white/10 transition-colors cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

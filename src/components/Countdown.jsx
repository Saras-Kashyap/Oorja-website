import React, { useState, useEffect } from 'react';

export const Countdown = ({ targetDate, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // If target date is a string or Date object
    const destination = targetDate ? new Date(targetDate).getTime() : new Date().getTime() + 14 * 86400000;

    const calculate = () => {
      const now = new Date().getTime();
      const difference = destination - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (onComplete) onComplete();
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate, onComplete]);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 w-full max-w-xl mx-auto">
      {units.map((unit, index) => (
        <div
          key={index}
          className="relative group flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl bg-black/60 backdrop-blur-xl border border-amber-500/30 shadow-xl shadow-black/80 hover:border-amber-400/70 transition-all duration-300"
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-black text-[#fffdfa] tracking-wider">
            {String(unit.value).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-amber-400/90 mt-1">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
};

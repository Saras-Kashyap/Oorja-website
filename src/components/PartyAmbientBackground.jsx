import React from 'react';

/**
 * High-performance, GPU-accelerated ambient party background.
 * Uses pure CSS transforms and opacity animations to maintain 60fps scrolling
 * while creating a living, concert stage atmosphere across all sections.
 */
export const PartyAmbientBackground = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#070710]"
      style={{
        contain: 'paint layout size',
      }}
      aria-hidden="true"
    >
      {/* Deep Midnight Canvas Wash */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#06060d] via-[#090818] to-[#06060c]"
      />

      {/* Mesh Blob 1: Midnight Indigo / Electric Blue (Top Left) */}
      <div
        className="party-blob-1 absolute -top-[10%] -left-[10%] w-[650px] h-[650px] sm:w-[850px] sm:h-[850px] rounded-full blur-[100px] opacity-70"
        style={{
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.28) 0%, rgba(37, 99, 235, 0.14) 40%, transparent 70%)',
        }}
      />

      {/* Mesh Blob 2: Deep Violet / Royal Purple (Center Right) */}
      <div
        className="party-blob-2 absolute top-[28%] -right-[12%] w-[700px] h-[700px] sm:w-[950px] sm:h-[950px] rounded-full blur-[120px] opacity-65"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, rgba(139, 92, 246, 0.12) 40%, transparent 70%)',
        }}
      />

      {/* Mesh Blob 3: Warm Amber / Gold Fest Spotlight (Bottom Center / Left) */}
      <div
        className="party-blob-3 absolute bottom-[10%] left-[5%] w-[600px] h-[600px] sm:w-[850px] sm:h-[850px] rounded-full blur-[110px] opacity-60"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.22) 0%, rgba(217, 119, 6, 0.08) 45%, transparent 70%)',
        }}
      />

      {/* Mesh Blob 4: Concert Magenta / Hot Rose Flare (Center Left Floating) */}
      <div
        className="party-blob-4 absolute top-[60%] right-[15%] w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full blur-[100px] opacity-55"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.18) 0%, rgba(219, 39, 119, 0.08) 45%, transparent 70%)',
        }}
      />

      {/* Angled Concert Stage Beam Left (Amber/Gold sweeping cone) */}
      <div
        className="concert-beam-sweep-left absolute -bottom-20 -left-20 w-[550px] h-[1000px] opacity-35 blur-[70px] pointer-events-none"
        style={{
          background: 'linear-gradient(45deg, rgba(245, 158, 11, 0.25) 0%, rgba(251, 191, 36, 0.08) 40%, transparent 70%)',
        }}
      />

      {/* Angled Concert Stage Beam Right (Violet/Indigo sweeping cone) */}
      <div
        className="concert-beam-sweep-right absolute -bottom-20 -right-20 w-[600px] h-[1100px] opacity-30 blur-[80px] pointer-events-none"
        style={{
          background: 'linear-gradient(-45deg, rgba(168, 85, 247, 0.25) 0%, rgba(99, 102, 241, 0.08) 40%, transparent 70%)',
        }}
      />

      {/* Subtle Dynamic Stage Grid / Atmospheric Vignette */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(6,6,12,0.65)_80%,#06060c_100%)] opacity-85"
      />
    </div>
  );
};

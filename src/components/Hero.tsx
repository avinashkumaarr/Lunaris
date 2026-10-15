import React, { useRef } from 'react';
import { Compass, Sparkles, ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { IMAGES } from '../data/images';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  // Smooth scroll parallax for background landscape vs foreground typography
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.08]);
  const foregroundY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.1]);

  return (
    <section 
      ref={containerRef}
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-end overflow-hidden bg-black -mt-16 pt-24 px-4 sm:px-8 lg:px-16 pb-10 border-b border-white/15"
    >
      {/* Cinematic Full-Bleed Lunar & Earth Video Loop */}
      <motion.div 
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        style={{ 
          y: backgroundY,
          scale: backgroundScale,
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover object-center"
        >
          <source src="/videos/lunaris-earth-left-to-right-loop.mp4" type="video/mp4" />
          {/* Fallback image */}
          <img 
            src={IMAGES.earthRise} 
            alt="Lunar surface with Earth rising on the horizon" 
            className="w-full h-full object-cover object-center"
          />
        </video>
      </motion.div>

      {/* Atmospheric Vignette & Text Readability Gradient Overlays */}
      {/* Subtle left gradient overlay specifically tailored for text contrast while keeping Earth's vivid blue natural color intact on the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent z-[1] pointer-events-none" />
      {/* Top and bottom subtle vertical vignette to cleanly anchor header and telemetry strip */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 z-[1] pointer-events-none" />

      {/* Asymmetric Lower-Left Anchored Content */}
      <motion.div 
        className="relative z-10 max-w-4xl flex flex-col gap-5 mb-12"
        style={{ y: foregroundY, opacity: contentOpacity }}
      >
        {/* Aerospace Mission Eyebrow */}
        <motion.div 
          className="flex items-center gap-3 text-white/80 font-mono text-[11px] uppercase tracking-[0.25em]"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="w-2 h-2 bg-[#00FF9D] animate-pulse" />
          <span>NASA SPACE APPS 2026 // EXPEDITION LUNARIS</span>
          <span className="hidden sm:inline text-white/40">// CLPS-1 MISSION CONSOLE</span>
        </motion.div>

        {/* Massive SpaceX-Style Bold Uppercase Headline */}
        <h1 className="font-display-hero text-4xl sm:text-6xl lg:text-[76px] text-white font-bold tracking-[0.02em] leading-[1.02] uppercase overflow-hidden">
          <motion.span 
            className="block"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            WHERE LIGHT IS LIFE.
          </motion.span>
          <motion.span 
            className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-primary-container"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
          >
            AND SHADOW IS FOREVER.
          </motion.span>
        </h1>

        {/* Constrained Supporting Description */}
        <motion.p 
          className="font-body-lg text-base sm:text-lg text-white/75 max-w-xl leading-relaxed font-light"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          At the Moon's South Pole, grazing sunlight and crater massifs dictate vehicle survival. Step inside the topocentric horizon engine that calculates illumination, libration, and direct communication lines to Earth.
        </motion.p>

        {/* SpaceX Signature Ghost Action Buttons */}
        <motion.div 
          className="flex flex-wrap items-center gap-4 pt-3"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
        >
          <a 
            href="#mission-browser" 
            className="spacex-btn group"
          >
            <span className="flex items-center gap-2.5">
              <Compass size={16} className="transition-transform group-hover:rotate-45" />
              EXPLORE LANDING SITES
            </span>
          </a>

          <a 
            href="#research-lab" 
            className="spacex-btn spacex-btn-cyan group"
          >
            <span className="flex items-center gap-2">
              <Sparkles size={16} className="transition-transform group-hover:scale-110" />
              RESEARCH LAB 3D
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* SpaceX Mission Telemetry Strip Across Bottom Viewport */}
      <motion.div 
        className="relative z-10 w-full pt-4 border-t border-white/15 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <div className="flex flex-col">
          <span className="font-display-hero text-2xl sm:text-3xl font-bold tracking-tight text-white tabular-nums">
            89.9° S
          </span>
          <span className="font-mono text-[10px] text-white/50 uppercase tracking-[0.18em]">
            TARGET LATITUDE
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-display-hero text-2xl sm:text-3xl font-bold tracking-tight text-white tabular-nums">
            1.54°
          </span>
          <span className="font-mono text-[10px] text-white/50 uppercase tracking-[0.18em]">
            AXIAL INCLINATION
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-display-hero text-2xl sm:text-3xl font-bold tracking-tight text-white tabular-nums">
            384,400 KM
          </span>
          <span className="font-mono text-[10px] text-white/50 uppercase tracking-[0.18em]">
            EARTH DISTANCE
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-display-hero text-2xl sm:text-3xl font-bold tracking-tight text-white tabular-nums">
            29.53 DAYS
          </span>
          <span className="font-mono text-[10px] text-white/50 uppercase tracking-[0.18em]">
            SYNODIC PERIOD
          </span>
        </div>

        <div className="flex flex-col col-span-2 sm:col-span-1">
          <span className="font-display-hero text-2xl sm:text-3xl font-bold tracking-tight text-[#00FF9D] tabular-nums">
            100% OPEN
          </span>
          <span className="font-mono text-[10px] text-white/50 uppercase tracking-[0.18em]">
            PDS / NAIF SPICE
          </span>
        </div>
      </motion.div>

      {/* Subtle Scroll Chevron Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none opacity-60">
        <motion.div 
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} className="text-white/60" />
        </motion.div>
      </div>
    </section>
  );
};

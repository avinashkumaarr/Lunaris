import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Compass } from 'lucide-react';
import { IMAGES } from '../data/images';

export const CinematicClosing: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end']
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.14, 1.02]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '2%']);
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.75], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.15, 0.75], [25, 0]);

  return (
    <section 
      ref={containerRef}
      id="chapter-closing"
      className="relative w-full min-h-[85vh] flex items-center justify-center py-24 px-4 sm:px-margin-tablet lg:px-margin-desktop bg-black overflow-hidden border-b border-white/15"
    >
      {/* Panoramic Lunar Landscape Connecting Back to Hero Vista */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-screen transform-gpu origin-center pointer-events-none"
        style={{ 
          backgroundImage: `url("${IMAGES.earthRise}")`,
          scale: imageScale,
          y: imageY
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/90 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />

      <motion.div 
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center gap-6 py-12"
        style={{ opacity: textOpacity, y: textY }}
      >
        <span className="font-mono text-xs text-white/60 uppercase tracking-[0.25em] font-semibold">
          CHAPTER 09 — CONTINUED EXPLORATION
        </span>

        {/* Headline */}
        <h2 className="font-display-hero text-4xl sm:text-6xl lg:text-7xl text-white font-bold uppercase tracking-tight leading-[1.05]">
          EVERY MISSION BEGINS<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-primary-container">
            WITH BETTER QUESTIONS.
          </span>
        </h2>

        {/* Supporting Narrative */}
        <div className="flex flex-col gap-1 text-white/70 font-body-lg text-lg sm:text-xl font-light">
          <p>Explore the terrain.</p>
          <p>Understand the geometry.</p>
          <p>Compare the opportunities.</p>
        </div>

        {/* SpaceX Signature Ghost Action CTA */}
        <div className="pt-4">
          <a 
            href="#mission-browser"
            className="spacex-btn group !px-10 !py-4 !text-sm"
          >
            <span className="flex items-center gap-3">
              <Compass size={18} className="transition-transform group-hover:rotate-45" />
              <span>OPEN THE MISSION BROWSER</span>
            </span>
          </a>
        </div>
      </motion.div>
    </section>
  );
};

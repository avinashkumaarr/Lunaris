import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Compass, Mountain, Eye, GitCompare, ArrowDown } from 'lucide-react';
import { IMAGES } from '../data/images';

export const ChapterSolution: React.FC = () => {
  const pillars = [
    {
      id: 'loc',
      icon: <MapPin size={20} className="text-primary" />,
      title: 'LOCATION',
      subtitle: 'Coordinates & Elevation',
      desc: 'Topocentric observer placement on real 30m/px LOLA digital elevation models.'
    },
    {
      id: 'time',
      icon: <Clock size={20} className="text-secondary" />,
      title: 'TIME',
      subtitle: 'Synodic & Libration Epochs',
      desc: 'Simulating the dual-cycle interaction between 29.5-day sunlight and 27.3-day Earth oscillation.'
    },
    {
      id: 'celestial',
      icon: <Compass size={20} className="text-primary-container" />,
      title: 'SUN & EARTH',
      subtitle: 'Topocentric Angles',
      desc: 'Live calculation of azimuth and elevation in the local Tangent SEZ reference frame.'
    },
    {
      id: 'terrain',
      icon: <Mountain size={20} className="text-secondary-fixed" />,
      title: 'TERRAIN',
      subtitle: '360° Horizon Masks',
      desc: 'True relief angles derived from laser altimetry rather than simplified spherical datums.'
    },
    {
      id: 'visibility',
      icon: <Eye size={20} className="text-emerald-400" />,
      title: 'VISIBILITY',
      subtitle: 'Ray-Tracing Intercepts',
      desc: 'Determining exact power harvest and DTE communications windows.'
    },
    {
      id: 'comparison',
      icon: <GitCompare size={20} className="text-warm-white" />,
      title: 'COMPARISON',
      subtitle: 'Decision Trade-Offs',
      desc: 'Evaluating candidate landing sites against specific mission constraints.'
    }
  ];

  return (
    <section id="chapter-solution" className="w-full py-24 px-4 sm:px-margin-tablet lg:px-margin-desktop bg-surface-container-lowest border-b border-surface-container-highest/50">
      <div className="max-w-6xl mx-auto flex flex-col gap-14">
        {/* Editorial Eyebrow & Headline */}
        <motion.div 
          className="flex flex-col gap-4 max-w-4xl"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest font-semibold">
            CHAPTER 05 — THE SOLUTION
          </span>
          <h2 className="font-display-hero text-3xl sm:text-5xl lg:text-6xl text-warm-white font-semibold uppercase tracking-tight leading-[1.08]">
            WHAT IF YOU COULD<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-container to-secondary">
              SEE THE WHOLE PICTURE?
            </span>
          </h2>
          <p className="font-body-lg text-lg sm:text-xl text-on-surface-variant leading-relaxed font-light">
            Instead of isolated ephemeris tables and flat topographic maps, LUNARIS integrates celestial mechanics, crater relief, and telecommunications into one cohesive browser.
          </p>
        </motion.div>

        {/* Cinematic Visual Transition from Lunar Landscape into Interface Blueprint */}
        <div className="relative w-full border border-surface-container-highest overflow-hidden bg-surface-container shadow-2xl">
          <div className="relative h-64 sm:h-96 w-full overflow-hidden">
            <img 
              src={IMAGES.clpsLander} 
              alt="CLPS Lunar Lander touched down near Shackleton Crater Rim" 
              className="w-full h-full object-cover opacity-50 filter contrast-125 transition-transform duration-1000 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/70 to-transparent pointer-events-none" />

            {/* Overlay Mission Synthesis Callout */}
            <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end">
              <span className="font-telemetry-sm text-xs text-primary font-bold tracking-widest uppercase">
                UNIFIED MISSION ARCHITECTURE // LUNARIS PLATFORM
              </span>
              <h3 className="font-headline-lg text-2xl sm:text-3xl text-warm-white font-semibold uppercase mt-1">
                From Raw Altimetry to Operational Decision
              </h3>
            </div>
          </div>

          {/* 6 Dimension Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-y sm:divide-y-0 sm:divide-x divide-surface-container-highest border-t border-surface-container-highest bg-surface-container-high">
            {pillars.map((p) => (
              <div key={p.id} className="p-4 sm:p-5 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  {p.icon}
                  <span className="font-label-caps text-xs text-warm-white font-bold tracking-wider">{p.title}</span>
                </div>
                <span className="font-telemetry-sm text-[11px] text-outline">{p.subtitle}</span>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Transition Prompt to Experiment */}
        <div className="flex flex-col items-center justify-center gap-4 text-center pt-2">
          <p className="text-on-surface-variant text-sm font-body-sm max-w-xl">
            Explore 7 candidate Artemis & CLPS landing sites across the lunar south pole. Scrub time, evaluate illumination, and inspect direct line-of-sight to Earth.
          </p>
          <a
            href="#mission-browser"
            className="px-6 py-3 bg-primary-container text-on-primary-container hover:bg-primary font-telemetry-md text-xs uppercase font-bold tracking-wider flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(88,216,208,0.3)] cursor-pointer"
          >
            <span>TAKE CONTROL IN THE MISSION BROWSER</span>
            <ArrowDown size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};

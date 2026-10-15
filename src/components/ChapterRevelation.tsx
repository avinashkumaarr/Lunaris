import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertOctagon, CheckCircle2, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

type CommState = 'obstructed' | 'clear' | 'subhorizon';

export const ChapterRevelation: React.FC = () => {
  const [commState, setCommState] = useState<CommState>('obstructed');
  const [showTechnicalDetails, setShowTechnicalDetails] = useState<boolean>(false);

  // States
  const isObstructed = commState === 'obstructed';
  const isSubhorizon = commState === 'subhorizon';
  const isClear = commState === 'clear';

  const earthElevation = isSubhorizon ? -1.2 : isClear ? 6.5 : 3.8;
  const ridgeElevation = isClear ? 2.4 : 5.4;
  const earthY = isSubhorizon ? 195 : isClear ? 65 : 105;
  const ridgePeakY = isClear ? 140 : 80;

  return (
    <section id="chapter-revelation" className="w-full py-20 px-4 sm:px-margin-tablet lg:px-margin-desktop bg-surface-container-lowest border-b border-surface-container-highest/50">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Chapter Header */}
        <motion.div 
          className="flex flex-col gap-4 max-w-4xl"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest font-semibold">
            CHAPTER 03 — THE REVELATION
          </span>
          <h2 className="font-display-hero text-3xl sm:text-5xl lg:text-6xl text-warm-white font-semibold uppercase tracking-tight leading-[1.08]">
            ABOVE THE HORIZON.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-alert-coral via-on-surface to-titanium">
              YET STILL INVISIBLE.
            </span>
          </h2>
          <p className="font-body-lg text-lg sm:text-xl text-on-surface-variant leading-relaxed font-light">
            Orbital ephemeris tables may report that planet Earth is several degrees above the geometric horizon. Yet on the real Moon, a silent crater ridge kilometers away can completely sever your lifeline to Earth.
          </p>
        </motion.div>

        {/* Large Animated Scientific Terrain Cross-Section */}
        <div className="w-full bg-surface-container border border-surface-container-highest shadow-2xl flex flex-col overflow-hidden">
          {/* Canvas Header & Interactive Controls */}
          <div className="flex flex-wrap items-center justify-between p-4 bg-surface-container-high border-b border-surface-container-highest gap-3">
            <div className="flex items-center gap-2 text-xs font-telemetry-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-on-surface font-semibold uppercase tracking-wider">
                DIRECT-TO-EARTH (DTE) LINE-OF-SIGHT CROSS-SECTION
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCommState('obstructed')}
                className={`px-3 py-1.5 text-xs font-telemetry-sm transition-all border ${
                  isObstructed 
                    ? 'bg-alert-coral/20 text-alert-coral font-bold border-alert-coral shadow-[0_0_12px_rgba(255,119,119,0.3)]'
                    : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface border-surface-container-highest'
                }`}
              >
                MASSIF OBSTRUCTION (+3.8° / +5.4°)
              </button>
              <button
                onClick={() => setCommState('clear')}
                className={`px-3 py-1.5 text-xs font-telemetry-sm transition-all border ${
                  isClear 
                    ? 'bg-primary-container text-on-primary-container font-bold border-primary shadow-[0_0_12px_rgba(88,216,208,0.4)]'
                    : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface border-surface-container-highest'
                }`}
              >
                UNOBSTRUCTED LINK (+6.5°)
              </button>
              <button
                onClick={() => setCommState('subhorizon')}
                className={`px-3 py-1.5 text-xs font-telemetry-sm transition-all border ${
                  isSubhorizon 
                    ? 'bg-alert-coral/20 text-alert-coral font-bold border-alert-coral shadow-[0_0_12px_rgba(255,119,119,0.3)]'
                    : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface border-surface-container-highest'
                }`}
              >
                LIBRATION DIP (-1.2°)
              </button>
            </div>
          </div>

          {/* Master SVG Canvas */}
          <div className="relative w-full h-[360px] sm:h-[420px] bg-surface-container-lowest p-4 sm:p-6 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 760 280">
              <defs>
                <linearGradient id="cyanBeamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#58d8d0" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#78f5ec" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="blockedBeamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff7777" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#690005" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* 1. Geometric 0.0° Horizontal Line */}
              <line x1="40" y1="180" x2="720" y2="180" stroke="#869392" strokeWidth="1" strokeDasharray="4 4" opacity="0.35" />
              <text x="50" y="174" fill="#869392" className="font-telemetry-sm text-[9px] uppercase tracking-wider">
                0.0° GEOMETRIC LOCAL HORIZON
              </text>

              {/* 2. Lunar Surface Bed */}
              <path 
                d="M 40 180 Q 150 183 240 180 T 450 182 T 720 180 L 720 260 L 40 260 Z" 
                fill="#101419" 
                stroke="#2a323d" 
                strokeWidth="1.5"
              />

              {/* 3. Dynamic Terrain Ridge (Rises between Lander & Earth) */}
              <motion.g
                animate={{ y: isClear ? 30 : 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <path 
                  d={`M 300 180 Q 380 140 430 ${ridgePeakY} Q 470 130 550 180 Z`} 
                  fill="#171b20" 
                  stroke={isObstructed ? '#ff7777' : '#869392'} 
                  strokeWidth="1.5" 
                />
                <circle cx="430" cy={ridgePeakY} r="4" fill={isObstructed ? '#ff7777' : '#58d8d0'} />
                <text x="440" y={ridgePeakY - 8} fill={isObstructed ? '#ff7777' : '#869392'} className="font-telemetry-sm text-[10px] font-bold">
                  INTERVENING RIDGE ({isClear ? '+2.4°' : '+5.4°'})
                </text>
              </motion.g>

              {/* 4. The Lander Node on the Left Rim */}
              <g transform="translate(100, 160)">
                <rect x="-9" y="-16" width="18" height="16" fill="#58d8d0" stroke="#003734" strokeWidth="1.5" />
                <line x1="-14" y1="0" x2="-9" y2="-16" stroke="#58d8d0" strokeWidth="1.5" />
                <line x1="14" y1="0" x2="9" y2="-16" stroke="#58d8d0" strokeWidth="1.5" />
                <line x1="0" y1="-16" x2="0" y2="-26" stroke="#58d8d0" strokeWidth="1.5" />
                <circle cx="0" cy="-27" r="3" fill="#ffffff" />
                <text x="-28" y="16" fill="#58d8d0" className="font-telemetry-sm text-[10px] font-bold">
                  CLPS LANDER
                </text>
              </g>

              {/* 5. Planet Earth Node on the Right */}
              <motion.g
                animate={{ cy: earthY }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                transform={`translate(660, ${earthY})`}
              >
                {/* Glow ring */}
                <circle cx="0" cy="0" r="28" fill="#58d8d0" opacity="0.15" />
                <circle cx="0" cy="0" r="20" fill="#0b0f14" stroke="#58d8d0" strokeWidth="2" />
                {/* Blue/Cyan Earth continents simplified */}
                <circle cx="-4" cy="-3" r="6" fill="#58d8d0" opacity="0.7" />
                <circle cx="5" cy="4" r="5" fill="#58d8d0" opacity="0.7" />
                <text x="-25" y="32" fill="#58d8d0" className="font-telemetry-sm text-[10px] font-bold">
                  EARTH ({earthElevation > 0 ? `+${earthElevation.toFixed(1)}°` : `${earthElevation.toFixed(1)}°`})
                </text>
              </motion.g>

              {/* 6. Communication RF Beam */}
              {isClear ? (
                // Uninterrupted beam
                <motion.line
                  x1="100"
                  y1="133"
                  x2="660"
                  y2={earthY}
                  stroke="url(#cyanBeamGrad)"
                  strokeWidth="2.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7 }}
                />
              ) : isObstructed ? (
                // Obstructed beam: stops at ridge
                <g>
                  <line 
                    x1="100" 
                    y1="133" 
                    x2="430" 
                    y2={ridgePeakY} 
                    stroke="#ff7777" 
                    strokeWidth="2.5" 
                    strokeDasharray="5 3"
                  />
                  <line 
                    x1="430" 
                    y1={ridgePeakY} 
                    x2="660" 
                    y2={earthY} 
                    stroke="#ff7777" 
                    strokeWidth="1" 
                    strokeDasharray="2 4" 
                    opacity="0.3"
                  />
                  <circle cx="430" cy={ridgePeakY} r="8" fill="#ff7777" opacity="0.4" className="animate-ping" />
                  <text x="430" y={ridgePeakY + 22} fill="#ff7777" className="font-telemetry-sm text-[9px] font-bold">
                    RAY OCCLUSION INTERCEPT
                  </text>
                </g>
              ) : (
                // Subhorizon: Earth is below 0° line
                <line 
                  x1="100" 
                  y1="133" 
                  x2="400" 
                  y2="180" 
                  stroke="#ff7777" 
                  strokeWidth="1.5" 
                  strokeDasharray="4 4"
                  opacity="0.5"
                />
              )}
            </svg>
          </div>

          {/* Prominent Physical Result Readout Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-surface-container-highest bg-surface-container-high p-4 border-t border-surface-container-highest">
            <div className="flex flex-col gap-1 p-2">
              <span className="font-label-caps text-xs text-outline uppercase tracking-wider">
                GEOMETRIC ELEVATION (SPICE)
              </span>
              <span className={`font-telemetry-md text-base font-bold ${earthElevation > 0 ? 'text-primary' : 'text-alert-coral'}`}>
                {earthElevation > 0 ? `+${earthElevation.toFixed(1)}° ABOVE HORIZON` : `${earthElevation.toFixed(1)}° SUB-HORIZON`}
              </span>
            </div>

            <div className="flex flex-col gap-1 p-2">
              <span className="font-label-caps text-xs text-outline uppercase tracking-wider">
                TERRAIN HORIZON MASK (LOLA)
              </span>
              <span className="font-telemetry-md text-base text-secondary font-bold">
                +{ridgeElevation.toFixed(1)}° CRATER RELIEF
              </span>
            </div>

            <div className="flex flex-col gap-1 p-2">
              <span className="font-label-caps text-xs text-outline uppercase tracking-wider">
                RADIO LINE-OF-SIGHT VERDICT
              </span>
              <div className="flex items-center gap-2">
                {isClear ? (
                  <>
                    <CheckCircle2 size={16} className="text-primary" />
                    <span className="font-telemetry-md text-base text-primary font-bold">
                      CLEAR // DSN LOCK ACTIVE
                    </span>
                  </>
                ) : (
                  <>
                    <AlertOctagon size={16} className="text-alert-coral" />
                    <span className="font-telemetry-md text-base text-alert-coral font-bold">
                      BLOCKED // LOSS OF SIGNAL
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 4 Explanatory Pillars of Lunar Communication */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          <div className="flex flex-col gap-2 p-5 bg-surface-container border border-surface-container-highest/60">
            <span className="font-label-caps text-xs text-primary font-semibold uppercase">01 / LIBRATION OSCILLATION</span>
            <h4 className="font-headline-sm text-base text-on-surface font-semibold">Hovering in the Low Sky</h4>
            <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
              Because of tidal locking and orbital eccentricity, Earth wobbles within an apparent ~14° angular box. At the pole, this means Earth skims perpetually near the terrain horizon.
            </p>
          </div>

          <div className="flex flex-col gap-2 p-5 bg-surface-container border border-surface-container-highest/60">
            <span className="font-label-caps text-xs text-secondary font-semibold uppercase">02 / HORIZON DISPARITY</span>
            <h4 className="font-headline-sm text-base text-on-surface font-semibold">Geometric vs. Real Terrain</h4>
            <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
              A celestial body can have a positive mathematical elevation while remaining completely blocked by crater rims or central peaks kilometers away.
            </p>
          </div>

          <div className="flex flex-col gap-2 p-5 bg-surface-container border border-surface-container-highest/60">
            <span className="font-label-caps text-xs text-primary-container font-semibold uppercase">03 / DTE ARCHITECTURE</span>
            <h4 className="font-headline-sm text-base text-on-surface font-semibold">Direct-to-Earth Telemetry</h4>
            <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
              Without dedicated lunar relay satellites, science data and telecommands depend entirely on uninterrupted direct line-of-sight to NASA Deep Space Network ground stations.
            </p>
          </div>

          <div className="flex flex-col gap-2 p-5 bg-surface-container border border-surface-container-highest/60">
            <span className="font-label-caps text-xs text-alert-coral font-semibold uppercase">04 / RF PROPAGATION</span>
            <h4 className="font-headline-sm text-base text-on-surface font-semibold">More Than Optical Line</h4>
            <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
              Microwave communication requires clearing the first Fresnel zone. Grazing rays graze regolith ridges causing diffraction loss and multipath fading.
            </p>
          </div>
        </div>

        {/* Expandable Technical Reference Drawer */}
        <div className="w-full">
          <button
            onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
            className="w-full py-3.5 px-6 bg-surface-container hover:bg-surface-container-high transition-all border border-surface-container-highest flex items-center justify-between group cursor-pointer shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Sparkles size={16} className="text-primary" />
              <span className="font-telemetry-md text-xs uppercase tracking-wider text-on-surface font-semibold">
                {showTechnicalDetails ? 'COLLAPSE LIBRATION MATHEMATICS & RF LINK BUDGET' : 'EXPAND LIBRATION MATHEMATICS & RF LINK BUDGET'}
              </span>
            </div>
            {showTechnicalDetails ? <ChevronUp size={16} className="text-primary" /> : <ChevronDown size={16} className="text-primary" />}
          </button>

          <AnimatePresence>
            {showTechnicalDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden bg-surface-container-low border-x border-b border-surface-container-highest p-6 flex flex-col gap-4 text-xs font-telemetry-sm text-on-surface-variant"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-surface-container-lowest border border-surface-container-highest flex flex-col gap-1">
                    <span className="font-bold text-primary uppercase">OPTICAL LIBRATION IN LATITUDE:</span>
                    <p className="font-body-sm text-xs leading-relaxed">
                      Due to the 6.68° inclination of the lunar equator to its orbit plane, Earth appears to oscillate ±6.68° north and south over a 27.21-day nodical period, directly modulating polar elevation.
                    </p>
                  </div>
                  <div className="p-3 bg-surface-container-lowest border border-surface-container-highest flex flex-col gap-1">
                    <span className="font-bold text-secondary uppercase">FIRST FRESNEL ZONE RADIUS:</span>
                    <p className="font-body-sm text-xs leading-relaxed">
                      r₁ = √(λ · d₁ · d₂ / (d₁ + d₂)). For X-band (λ ≈ 3.5 cm) at 10 km obstacle distance, at least 18 meters of vertical clearance is required above obstacle crests to avoid significant attenuation.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

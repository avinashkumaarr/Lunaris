import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'motion/react';
import { AlertTriangle, CheckCircle, ChevronDown, ChevronUp, Sparkles, Sliders } from 'lucide-react';
import { IMAGES } from '../data/images';

interface StoryStage {
  id: number;
  stageNum: string;
  title: string;
  subtitle: string;
  description: string;
  formula: string;
  sunEl: number;
  maskEl: number;
  status: 'NOMINAL' | 'INCIDENT_RAY' | 'RIDGE_SURVEY' | 'OCCLUDED' | 'VERDICT';
  statusText: string;
  statusColor: string;
}

const STAGES: StoryStage[] = [
  {
    id: 1,
    stageNum: '01 / 05',
    title: 'THE LANDING SITE & SURFACE OBSERVER',
    subtitle: 'Lander Deployed on Shackleton Rim Plateau',
    description: 'At 89.9° South, the observer sits on a localized topographic bench. On an idealized smooth sphere, the geometric horizon sits at precisely 0.0° elevation in all 360 azimuthal directions.',
    formula: 'Geometric Datum: θ_geom = 0.00° // R_moon = 1,737.4 km',
    sunEl: 0.0,
    maskEl: 0.0,
    status: 'NOMINAL',
    statusText: 'LOCAL HORIZON CLEAR // AWAITING CELESTIAL EPHEMERIS',
    statusColor: 'text-primary border-primary/30 bg-primary/10'
  },
  {
    id: 2,
    stageNum: '02 / 05',
    title: 'THE GRAZING POLAR SUN',
    subtitle: 'Low-Angle Solar Ray Propagation (+1.4° Elevation)',
    description: 'Due to the Moon’s tiny 1.54° axial tilt relative to the ecliptic, the Sun never climbs high overhead. It skims continuously across the horizon, casting incident grazing rays across the regolith.',
    formula: 'Solar Ephemeris: θ_sun = +1.40° // Solar Azimuth: 143.2°',
    sunEl: 1.4,
    maskEl: 0.0,
    status: 'INCIDENT_RAY',
    statusText: 'INCIDENT RAY DETECTED // POSITIVE GEOMETRIC ALTITUDE',
    statusColor: 'text-secondary border-secondary/30 bg-secondary/10'
  },
  {
    id: 3,
    stageNum: '03 / 05',
    title: 'THE CRATER RIDGE EMERGES',
    subtitle: 'Topographic Relief Measured via LOLA Laser Altimetry',
    description: 'The real Moon is not a sphere. 14 kilometers to the southeast, the towering rim crest of Malapert Massif rises +3,200 meters above the local lander datum, projecting an angular elevation mask of +4.8° into the sky.',
    formula: 'Topographic Mask: θ_mask = arctan(Δz / d) = +4.80°',
    sunEl: 1.4,
    maskEl: 4.8,
    status: 'RIDGE_SURVEY',
    statusText: 'TERRAIN HORIZON IDENTIFIED // PEAK MASK: +4.80°',
    statusColor: 'text-outline border-outline/30 bg-surface-container-high'
  },
  {
    id: 4,
    stageNum: '04 / 05',
    title: 'ELEVATION VS. TOPOGRAPHIC HORIZON',
    subtitle: 'The Contest Between Celestial Vector and Relief',
    description: 'Although the Sun has a positive elevation of +1.4° (well above the 0° geometric horizon), the terrain ridge elevation is +4.8°. Because θ_sun < θ_mask, the incident solar ray intersects the crater rim crest before reaching the lander.',
    formula: 'Ray-Marching Delta: Δθ = θ_sun - θ_mask = 1.40° - 4.80° = -3.40°',
    sunEl: 1.4,
    maskEl: 4.8,
    status: 'OCCLUDED',
    statusText: 'RAY INTERSECTED // OPTICAL OCCLUSION ACTIVE',
    statusColor: 'text-error border-error/30 bg-error/10'
  },
  {
    id: 5,
    stageNum: '05 / 05',
    title: 'THE FINAL MISSION VERDICT',
    subtitle: 'Geometric Visibility ≠ True Operational Reality',
    description: 'The lander is plunged into deep shadow despite ephemeris models reporting "daylight". True surface power requires micro-site spatial divergence analysis—relocating just 1.8 km northward onto the ridge spine restores 100% solar flux.',
    formula: 'Mission Decision: Relocate to Node B (+2.2 km) // Harvest Window: +180h',
    sunEl: 1.4,
    maskEl: 4.8,
    status: 'VERDICT',
    statusText: 'MICRO-SITE TRADE-OFF // CRITICAL LESSON DEMONSTRATED',
    statusColor: 'text-secondary-fixed border-secondary-fixed/30 bg-secondary-fixed/10'
  }
];

export const ChapterProblem: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [showScienceDetails, setShowScienceDetails] = useState<boolean>(false);
  const [interactiveSunEl, setInteractiveSunEl] = useState<number>(1.4);
  const [useInteractiveSlider, setUseInteractiveSlider] = useState<boolean>(false);

  // Track scroll progress through the pinned storytelling sequence
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Calculate active stage from scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (useInteractiveSlider) return;
      const stageIdx = Math.min(4, Math.floor(latest * 5));
      setActiveStageIndex(stageIdx);
    });
    return () => unsubscribe();
  }, [scrollYProgress, useInteractiveSlider]);

  const currentStage = STAGES[activeStageIndex];
  const effectiveSunEl = useInteractiveSlider ? interactiveSunEl : currentStage.sunEl;
  const effectiveMaskEl = currentStage.maskEl;
  const isOccluded = effectiveSunEl < effectiveMaskEl && effectiveMaskEl > 0;

  // Scene visual flags
  const isRayDrawn = activeStageIndex >= 1 || useInteractiveSlider;
  const isRidgeVisible = activeStageIndex >= 2 || useInteractiveSlider;
  const isShadowOverLander = isOccluded || (activeStageIndex >= 3 && !useInteractiveSlider);

  // Dynamic ray coordinates (SVG viewBox: 0 0 650 260)
  // Sun origin: x=580, y depends on Sun Elevation (0° = 180, +5° = 95, -2° = 210)
  const sunOriginY = 180 - effectiveSunEl * 17;
  const ridgeTopX = 375;
  const ridgeTopY = 98; // +4.8° peak

  return (
    <section id="chapter-problem" className="w-full bg-surface border-b border-surface-container-highest/50">
      {/* 1. Cinematic Opening Moment - Full-Bleed Dramatic Lunar Landscape */}
      <div className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden px-4 sm:px-margin-tablet lg:px-margin-desktop py-20 bg-surface-container-lowest">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center opacity-65 mix-blend-luminosity transform-gpu"
          style={{ backgroundImage: `url("${IMAGES.psrTerminator}")` }}
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.2, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-surface/90 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface/90 via-surface/40 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-6">
          <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest font-semibold">
            CHAPTER 02 — THE PROBLEM
          </span>
          <h2 className="font-display-hero text-3xl sm:text-5xl lg:text-6xl text-warm-white font-semibold uppercase tracking-tight leading-[1.08]">
            LIGHT CHANGES EVERYTHING.
          </h2>
          <p className="font-body-lg text-lg sm:text-xl text-on-surface-variant max-w-3xl leading-relaxed font-light">
            Near the lunar south pole, sunlight can travel close to the horizon. Small changes in terrain and time can change whether a lander receives direct sunlight.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <span className="px-3 py-1 bg-surface-container-high/90 border border-secondary/30 text-secondary text-xs font-telemetry-sm uppercase">
              AXIAL TILT: 1.54° // PERPETUAL GRAZING INCIDENCE
            </span>
            <span className="text-outline text-xs font-telemetry-sm">
              SHADOWS EXTEND UP TO 100 KM ACROSS REGOLITH
            </span>
          </div>
        </div>
      </div>

      {/* 2. Pinned Desktop Storytelling Sequence (Hidden on mobile, uses fallback stack) */}
      <div 
        ref={containerRef}
        className="hidden md:block relative w-full h-[360vh]"
      >
        <div className="sticky top-16 w-full h-[calc(100vh-4rem)] bg-surface-container-lowest flex flex-col justify-between p-6 lg:p-10 overflow-hidden border-t border-surface-container-highest/60">
          {/* Top Status & Stage Indicators */}
          <div className="flex items-center justify-between border-b border-surface-container-highest/60 pb-3 max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-secondary font-telemetry-sm text-xs font-semibold uppercase tracking-wider">
                TOPOCENTRIC SOLAR RAY INCIDENCE // PINNED STORYTELLING
              </span>
            </div>

            {/* Stage Progress Navigation */}
            <div className="flex items-center gap-2">
              {STAGES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setUseInteractiveSlider(false);
                    setActiveStageIndex(idx);
                  }}
                  className={`px-3 py-1 text-xs font-telemetry-sm transition-all border ${
                    activeStageIndex === idx && !useInteractiveSlider
                      ? 'bg-secondary text-on-secondary font-bold border-secondary shadow-[0_0_12px_rgba(236,192,104,0.4)]'
                      : 'bg-surface-container text-on-surface-variant hover:text-on-surface border-surface-container-highest'
                  }`}
                >
                  STAGE {s.stageNum.split('/')[0].trim()}
                </button>
              ))}

              <button
                onClick={() => setUseInteractiveSlider(!useInteractiveSlider)}
                className={`ml-2 px-3 py-1 text-xs font-telemetry-sm flex items-center gap-1.5 border transition-all ${
                  useInteractiveSlider
                    ? 'bg-primary text-on-primary font-bold border-primary shadow-[0_0_12px_rgba(88,216,208,0.4)]'
                    : 'bg-surface-container text-outline hover:text-on-surface border-surface-container-highest'
                }`}
              >
                <Sliders size={12} />
                <span>INTERACTIVE SLIDER</span>
              </button>
            </div>
          </div>

          {/* Main 2-Column Content Layout */}
          <div className="grid grid-cols-12 gap-8 items-center max-w-7xl mx-auto w-full my-auto py-4">
            {/* Left: Dynamic SVG Horizon Cross-Section Canvas (7 cols) */}
            <div className="col-span-7 bg-surface-container-high border border-surface-container-highest p-6 shadow-2xl relative flex flex-col justify-between min-h-[460px]">
              <div className="flex items-center justify-between text-outline font-telemetry-sm text-xs border-b border-surface-container-highest/60 pb-2">
                <span>SEZ VERTICAL PROFILE // LOCAL HORIZON TANGENT PLANE</span>
                <span className="font-semibold text-on-surface">
                  {useInteractiveSlider ? `LIVE SUN: ${interactiveSunEl.toFixed(1)}°` : currentStage.statusText}
                </span>
              </div>

              {/* The Visual SVG Ray Tracer */}
              <div className="relative w-full h-[320px] my-auto flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 650 260">
                  <defs>
                    <linearGradient id="shadowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#07090b" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#101419" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>

                  {/* 1. Geometric 0.0° Horizon Reference Line */}
                  <line x1="40" y1="180" x2="610" y2="180" stroke="#869392" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
                  <text x="45" y="174" fill="#869392" className="font-telemetry-sm text-[9px] uppercase tracking-wider">
                    0.0° GEOMETRIC SPHERICAL HORIZON (IDEALIZED DATUM)
                  </text>

                  {/* 2. Terrain Bed */}
                  <path 
                    d="M 40 180 Q 150 185 240 180 T 400 182 T 610 180 L 610 240 L 40 240 Z" 
                    fill="#101419" 
                    stroke="#2A323D" 
                    strokeWidth="1.5"
                  />

                  {/* 3. Shadow Cone when Ray is Intersected */}
                  {isShadowOverLander && (
                    <motion.polygon
                      points="120,165 375,98 610,180 610,240 40,240 40,180"
                      fill="url(#shadowGrad)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.88 }}
                      transition={{ duration: 0.6 }}
                    />
                  )}

                  {/* 4. Topographic Crater Ridge (Malapert Rim Profile) */}
                  <motion.g
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ 
                      opacity: isRidgeVisible ? 1 : 0,
                      scaleY: isRidgeVisible ? 1 : 0
                    }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    style={{ transformOrigin: '375px 180px' }}
                  >
                    <path 
                      d="M 280 180 Q 340 160 375 98 Q 410 150 480 180 Z" 
                      fill="#171b20" 
                      stroke="#869392" 
                      strokeWidth="1.5" 
                    />
                    <circle cx="375" cy="98" r="4" fill="#ecc068" />
                    <text x="385" y="95" fill="#ecc068" className="font-telemetry-sm text-[10px] font-semibold">
                      TERRAIN HORIZON PEAK (+4.8°)
                    </text>
                  </motion.g>

                  {/* 5. The Lander Node on the Rim Plateau */}
                  <g transform="translate(120, 160)">
                    <rect x="-8" y="-14" width="16" height="14" fill="#58d8d0" stroke="#003734" strokeWidth="1.5" />
                    <line x1="-12" y1="0" x2="-8" y2="-14" stroke="#58d8d0" strokeWidth="1.5" />
                    <line x1="12" y1="0" x2="8" y2="-14" stroke="#58d8d0" strokeWidth="1.5" />
                    <line x1="0" y1="-14" x2="0" y2="-22" stroke="#58d8d0" strokeWidth="1.5" />
                    <circle cx="0" cy="-23" r="2.5" fill="#ffffff" />
                    <text x="-25" y="14" fill="#58d8d0" className="font-telemetry-sm text-[9px] font-bold">
                      CLPS LANDER
                    </text>
                  </g>

                  {/* 6. Incident Solar Ray */}
                  {isRayDrawn && (
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <line 
                        x1="580" 
                        y1={sunOriginY} 
                        x2={isShadowOverLander ? ridgeTopX : 120} 
                        y2={isShadowOverLander ? ridgeTopY : 145} 
                        stroke="#f2c66d" 
                        strokeWidth="2.5"
                        strokeDasharray={isShadowOverLander ? "6 3" : undefined}
                      />
                      <circle cx="580" cy={sunOriginY} r="9" fill="#f2c66d" />
                      <circle cx="580" cy={sunOriginY} r="18" fill="#f2c66d" opacity="0.2" className="animate-ping" />
                      <text x="525" y={sunOriginY - 14} fill="#f2c66d" className="font-telemetry-sm text-[10px] font-bold">
                        SUN ({effectiveSunEl > 0 ? `+${effectiveSunEl.toFixed(1)}°` : `${effectiveSunEl.toFixed(1)}°`})
                      </text>

                      {isShadowOverLander && (
                        <circle cx={ridgeTopX} cy={ridgeTopY} r="6" fill="#ff7777" className="animate-pulse" />
                      )}
                    </motion.g>
                  )}
                </svg>
              </div>

              {/* Interactive Elevation Slider (when activated) */}
              {useInteractiveSlider && (
                <div className="bg-surface-container-lowest p-3 border border-surface-container-highest flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-telemetry-sm">
                    <span className="text-secondary font-semibold">ADJUST SOLAR ELEVATION (θ_sun):</span>
                    <span className="text-on-surface font-bold">{interactiveSunEl > 0 ? `+${interactiveSunEl.toFixed(1)}°` : `${interactiveSunEl.toFixed(1)}°`}</span>
                  </div>
                  <input 
                    type="range"
                    min="-3.0"
                    max="8.0"
                    step="0.1"
                    value={interactiveSunEl}
                    onChange={(e) => setInteractiveSunEl(parseFloat(e.target.value))}
                    className="w-full accent-secondary cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-telemetry-sm text-outline">
                    <span>-3.0° (Deep Polar Night)</span>
                    <span>0.0° (Geometric Horizon)</span>
                    <span>+4.8° (Ridge Occlusion Peak)</span>
                    <span>+8.0° (Clear Sunlight)</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Scientific Stage Narrative & Verdict (5 cols) */}
            <div className="col-span-5 flex flex-col gap-5 bg-surface-container p-6 border border-surface-container-highest shadow-xl">
              <div className="flex items-center justify-between">
                <span className="font-label-caps text-label-caps text-secondary font-bold tracking-widest">
                  STAGE {currentStage.stageNum}
                </span>
                <span className={`px-2.5 py-1 text-xs font-telemetry-sm font-bold border ${currentStage.statusColor}`}>
                  {isShadowOverLander ? 'OCCLUDED BY RELIEF' : 'DIRECT ILLUMINATION'}
                </span>
              </div>

              <h3 className="font-headline-lg text-2xl text-on-surface font-semibold leading-tight">
                {currentStage.title}
              </h3>

              <span className="font-telemetry-sm text-xs text-primary font-medium border-l-2 border-primary pl-2.5">
                {currentStage.subtitle}
              </span>

              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                {currentStage.description}
              </p>

              {/* Mathematical Ray-Marching Condition */}
              <div className="p-3 bg-surface-container-lowest border border-surface-container-highest font-telemetry-sm text-xs text-secondary flex flex-col gap-1">
                <span className="text-[10px] uppercase text-outline">CRITICAL RAY CONDITION:</span>
                <span className="font-bold">{currentStage.formula}</span>
              </div>

              {/* Stage Takeaway */}
              <div className="text-xs text-on-surface-variant pt-2 border-t border-surface-container-highest/60 flex items-center gap-2">
                {isShadowOverLander ? (
                  <AlertTriangle size={15} className="text-error shrink-0" />
                ) : (
                  <CheckCircle size={15} className="text-primary shrink-0" />
                )}
                <span>
                  {isShadowOverLander 
                    ? 'The Sun is geometrically above the horizon, yet blocked by real crater topography.'
                    : 'Unobstructed line of sight exists between solar disk and solar arrays.'}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Context Notice */}
          <div className="flex items-center justify-between text-[11px] font-telemetry-sm text-outline border-t border-surface-container-highest/60 pt-2 max-w-7xl mx-auto w-full">
            <span>SCROLL DOWN TO PROGRESS THROUGH ALL 5 TOPOGRAPHIC OCCLUSION PHASES</span>
            <span className="text-secondary font-semibold">STAGE {activeStageIndex + 1} OF 5 ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Mobile Vertical Fallback Stack */}
      <div className="md:hidden flex flex-col gap-6 p-4">
        {STAGES.map((stage) => (
          <div key={stage.id} className="bg-surface-container border border-surface-container-highest p-5 flex flex-col gap-3">
            <span className="font-label-caps text-xs text-secondary font-bold">STAGE {stage.stageNum}</span>
            <h4 className="font-headline-sm text-lg text-on-surface font-semibold">{stage.title}</h4>
            <p className="font-body-sm text-sm text-on-surface-variant">{stage.description}</p>
            <div className="p-2 bg-surface-container-lowest text-xs font-telemetry-sm text-secondary border border-surface-container-highest">
              {stage.formula}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Expandable Deep Scientific Section */}
      <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        <button
          onClick={() => setShowScienceDetails(!showScienceDetails)}
          className="w-full py-4 px-6 bg-surface-container hover:bg-surface-container-high transition-all border border-surface-container-highest flex items-center justify-between group cursor-pointer shadow-md"
        >
          <div className="flex items-center gap-3">
            <Sparkles size={18} className="text-secondary" />
            <span className="font-telemetry-md text-sm uppercase tracking-wider text-on-surface font-semibold">
              {showScienceDetails ? 'COLLAPSE DEEP SCIENTIFIC EXPLANATION & SOURCES' : 'EXPAND DEEP SCIENTIFIC EXPLANATION & SOURCES'}
            </span>
          </div>
          {showScienceDetails ? <ChevronUp size={18} className="text-secondary" /> : <ChevronDown size={18} className="text-secondary" />}
        </button>

        <AnimatePresence>
          {showScienceDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden bg-surface-container-low border-x border-b border-surface-container-highest p-6 sm:p-8 flex flex-col gap-6 text-sm text-on-surface-variant"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <h4 className="font-headline-sm text-base text-secondary font-semibold uppercase">
                    1. The 1.54° Axial Obliquity
                  </h4>
                  <p className="font-body-sm leading-relaxed">
                    The lunar spin axis is tilted only 1.54° with respect to the ecliptic plane pole (compared to Earth's 23.44°). Because of this near-perpendicular alignment, seasonal variations in solar elevation are muted to approximately ±1.54°. The Sun circles the polar landscape indefinitely near the horizon, casting shadows that can extend for over 100 kilometers across the regolith.
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <h4 className="font-headline-sm text-base text-primary font-semibold uppercase">
                    2. Permanently Shadowed Regions (PSRs)
                  </h4>
                  <p className="font-body-sm leading-relaxed">
                    Impact craters whose floors lie below the local terrain horizon have remained shielded from direct sunlight for billions of years. Within these cryogenic micro-environments, temperatures drop below 40 Kelvin (-233°C), creating stable thermodynamic traps for volatile organic compounds and water ice proven by the LCROSS impact experiment.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-surface-container-lowest border border-surface-container-highest text-xs font-telemetry-sm flex flex-col gap-2">
                <span className="font-bold text-on-surface uppercase">VALIDATED RESEARCH SOURCE CITATION:</span>
                <span className="text-outline">
                  Mazarico, E., et al. (2011). "Illumination conditions of the lunar polar regions using LOLA topography." *Icarus*, 211(2), 1066-1081. DOI: 10.1016/j.icarus.2010.10.030
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

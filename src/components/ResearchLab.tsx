import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RESEARCH_STAGES } from '../data/missionData';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Cpu, 
  CheckCircle2, 
  Layers, 
  Compass,
  ArrowRight,
  X,
  Scan,
  RotateCw
} from 'lucide-react';

// Pipeline steps definition
interface PipelineStep {
  id: string;
  label: string;
}

const PIPELINE_STEPS: PipelineStep[] = [
  { id: 'site', label: 'SITE + EPOCH' },
  { id: 'spice', label: 'SPICE DE440' },
  { id: 'sez', label: 'SEZ FRAME' },
  { id: 'lola', label: 'LOLA 360° MASK' },
  { id: 'ray', label: 'RAY MARCHING' },
  { id: 'decision', label: 'MISSION DECISION' },
];

// Mapping from stage index (0-6) to active pipeline steps
const STAGE_TO_PIPELINE_MAP: Record<number, string[]> = {
  0: ['site', 'spice'],
  1: ['spice', 'sez'],
  2: ['sez'],
  3: ['lola', 'ray'],
  4: ['ray'],
  5: ['decision'],
  6: ['site', 'decision'],
};

// 7 Scientific SVG Visual Motifs
const ScientificMotif: React.FC<{ stageIndex: number; isActive: boolean }> = ({ stageIndex, isActive }) => {
  switch (stageIndex) {
    case 0:
      // 01 — Solar Direction Vector
      return (
        <svg viewBox="0 0 280 130" className="w-full h-full">
          <defs>
            <linearGradient id="sunRayGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#78f5ec" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f2c66d" stopOpacity="1" />
            </linearGradient>
          </defs>
          {/* Tangent line */}
          <line x1="30" y1="100" x2="250" y2="100" stroke="#2a323d" strokeWidth="1" strokeDasharray="3 3" />
          <text x="35" y="115" fill="#869392" className="font-mono text-[8px] uppercase">0.0° TANGENT PLANE</text>
          
          {/* Observer node */}
          <circle cx="50" cy="100" r="4" fill="#58d8d0" />
          <text x="40" y="90" fill="#58d8d0" className="font-mono text-[9px] font-bold">OBS</text>

          {/* Solar ray vector */}
          <line x1="50" y1="100" x2="230" y2="35" stroke="url(#sunRayGrad)" strokeWidth="2.5" />
          
          {/* Angle arc */}
          <path d="M 90 100 A 40 40 0 0 0 88 86" fill="none" stroke="#f2c66d" strokeWidth="1.5" />
          <text x="96" y="94" fill="#f2c66d" className="font-mono text-[9px] font-bold">θ_sun = +1.40°</text>

          {/* Sun disc with corona */}
          <circle cx="230" cy="35" r="9" fill="#f2c66d" />
          <circle cx="230" cy="35" r="16" fill="#f2c66d" opacity="0.2" className={isActive ? "animate-ping" : ""} />
          <text x="205" y="22" fill="#f2c66d" className="font-mono text-[8px] font-bold">SOLAR DISK</text>
        </svg>
      );

    case 1:
      // 02 — Earth and a Lunar Reference Frame
      return (
        <svg viewBox="0 0 280 130" className="w-full h-full">
          {/* Moon coordinate circle */}
          <circle cx="70" cy="65" r="34" fill="#101419" stroke="#869392" strokeWidth="1.5" />
          <line x1="70" y1="15" x2="70" y2="115" stroke="#f2c66d" strokeWidth="1" strokeDasharray="2 2" />
          <text x="50" y="22" fill="#f2c66d" className="font-mono text-[7px]">SPIN AXIS (PA)</text>
          <ellipse cx="70" cy="65" rx="34" ry="12" fill="none" stroke="#2a323d" strokeWidth="1" />
          <text x="75" y="68" fill="#869392" className="font-mono text-[8px]">MOON</text>

          {/* Frame vector pointing to Earth */}
          <line x1="70" y1="65" x2="220" y2="65" stroke="#58d8d0" strokeWidth="1.5" strokeDasharray="4 2" />
          
          {/* Earth Node */}
          <circle cx="220" cy="65" r="18" fill="#0b0f14" stroke="#58d8d0" strokeWidth="2" />
          <circle cx="216" cy="62" r="6" fill="#58d8d0" opacity="0.6" />
          <circle cx="224" cy="68" r="5" fill="#58d8d0" opacity="0.6" />
          <text x="205" y="95" fill="#58d8d0" className="font-mono text-[9px] font-bold">EARTH (J2000)</text>
          
          <text x="110" y="55" fill="#869392" className="font-mono text-[8px]">ICRF → MOON_ME</text>
        </svg>
      );

    case 2:
      // 03 — Local Coordinate Triad (SEZ)
      return (
        <svg viewBox="0 0 280 130" className="w-full h-full">
          {/* Horizon ellipse */}
          <ellipse cx="140" cy="85" rx="90" ry="24" fill="#101419" stroke="#2a323d" strokeWidth="1" />
          <circle cx="140" cy="85" r="4" fill="#ffffff" />
          <text x="145" y="95" fill="#ffffff" className="font-mono text-[8px]">ORIGIN (SITE)</text>

          {/* Zenith Arrow (Z) */}
          <line x1="140" y1="85" x2="140" y2="20" stroke="#58d8d0" strokeWidth="2" />
          <polygon points="140,15 136,25 144,25" fill="#58d8d0" />
          <text x="148" y="24" fill="#58d8d0" className="font-mono text-[10px] font-bold">+Z (ZENITH)</text>

          {/* South Arrow (S) */}
          <line x1="140" y1="85" x2="70" y2="105" stroke="#f2c66d" strokeWidth="2" />
          <polygon points="65,107 75,102 73,111" fill="#f2c66d" />
          <text x="45" y="120" fill="#f2c66d" className="font-mono text-[10px] font-bold">+S (SOUTH)</text>

          {/* East Arrow (E) */}
          <line x1="140" y1="85" x2="225" y2="85" stroke="#78f5ec" strokeWidth="2" />
          <polygon points="230,85 220,81 220,89" fill="#78f5ec" />
          <text x="215" y="78" fill="#78f5ec" className="font-mono text-[10px] font-bold">+E (EAST)</text>
        </svg>
      );

    case 3:
      // 04 — Lunar Elevation Profile & Horizon Ray-Marching
      return (
        <svg viewBox="0 0 280 130" className="w-full h-full">
          {/* Observer on left */}
          <line x1="30" y1="100" x2="250" y2="100" stroke="#2a323d" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="45" cy="100" r="3.5" fill="#58d8d0" />

          {/* Crater relief profile */}
          <path d="M 45 100 Q 100 102 130 90 Q 160 50 185 45 Q 210 55 250 100 Z" fill="#171b20" stroke="#869392" strokeWidth="1.5" />
          
          {/* Radial ray fan */}
          <line x1="45" y1="100" x2="240" y2="25" stroke="#f2c66d" strokeWidth="1.5" />
          <line x1="45" y1="100" x2="185" y2="45" stroke="#ff7777" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="45" y1="100" x2="150" y2="70" stroke="#ff7777" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />

          {/* Max Peak marker */}
          <circle cx="185" cy="45" r="4" fill="#ff7777" />
          <text x="170" y="35" fill="#ff7777" className="font-mono text-[8px] font-bold">PEAK MASK +4.8°</text>
          <text x="50" y="45" fill="#f2c66d" className="font-mono text-[8px]">CLEAR SIGHTLINE</text>
        </svg>
      );

    case 4:
      // 05 — Solar Disc Semi-Diameter & Penumbra
      return (
        <svg viewBox="0 0 280 130" className="w-full h-full">
          {/* Horizon terrain obstacle */}
          <path d="M 30 110 L 140 70 L 250 90 L 250 120 L 30 120 Z" fill="#101419" stroke="#869392" strokeWidth="1.5" />
          <text x="145" y="112" fill="#869392" className="font-mono text-[8px]">OBSTACLE RIM</text>

          {/* Solar disc 0.53° bisected */}
          <circle cx="140" cy="70" r="28" fill="#f2c66d" opacity="0.3" stroke="#f2c66d" strokeWidth="1.5" />
          
          {/* Disc center & limbs */}
          <line x1="100" y1="42" x2="180" y2="42" stroke="#f2c66d" strokeWidth="1" strokeDasharray="2 2" />
          <text x="185" y="45" fill="#f2c66d" className="font-mono text-[7px]">UPPER LIMB (+0.26°)</text>

          <line x1="100" y1="70" x2="180" y2="70" stroke="#ffffff" strokeWidth="1" />
          <text x="185" y="73" fill="#ffffff" className="font-mono text-[7px]">CENTER (0.00°)</text>

          <line x1="100" y1="98" x2="180" y2="98" stroke="#869392" strokeWidth="1" strokeDasharray="2 2" />
          <text x="185" y="101" fill="#869392" className="font-mono text-[7px]">LOWER LIMB (-0.26°)</text>

          <text x="40" y="30" fill="#f2c66d" className="font-mono text-[9px] font-bold">PENUMBRAL GRAZE</text>
        </svg>
      );

    case 5:
      // 06 — Synchronized Mission Timelines
      return (
        <svg viewBox="0 0 280 130" className="w-full h-full">
          {/* Solar Track */}
          <text x="30" y="30" fill="#f2c66d" className="font-mono text-[8px] font-bold">SOLAR HARVEST</text>
          <rect x="30" y="35" width="220" height="14" fill="#101419" stroke="#2a323d" />
          <rect x="50" y="35" width="60" height="14" fill="#f2c66d" opacity="0.85" />
          <rect x="150" y="35" width="70" height="14" fill="#f2c66d" opacity="0.85" />

          {/* DTE Track */}
          <text x="30" y="70" fill="#58d8d0" className="font-mono text-[8px] font-bold">EARTH DTE COMM</text>
          <rect x="30" y="75" width="220" height="14" fill="#101419" stroke="#2a323d" />
          <rect x="80" y="75" width="90" height="14" fill="#58d8d0" opacity="0.85" />

          {/* Overlap Box */}
          <rect x="80" y="30" width="30" height="64" fill="none" stroke="#78f5ec" strokeWidth="1.5" strokeDasharray="3 2" />
          <rect x="150" y="30" width="20" height="64" fill="none" stroke="#78f5ec" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="60" y="112" fill="#78f5ec" className="font-mono text-[8px] font-bold">OPERATIONAL CONJUNCTION</text>
        </svg>
      );

    case 6:
      // 07 — DEM Uncertainty & Touchdown Tilt Distribution
      return (
        <svg viewBox="0 0 280 130" className="w-full h-full">
          {/* Gaussian bell curve */}
          <path d="M 30 100 Q 90 100 120 70 Q 140 25 140 25 Q 140 25 160 70 Q 190 100 250 100" fill="none" stroke="#58d8d0" strokeWidth="2" />
          <line x1="30" y1="100" x2="250" y2="100" stroke="#2a323d" strokeWidth="1" />

          {/* P50 Median */}
          <line x1="140" y1="25" x2="140" y2="100" stroke="#f2c66d" strokeWidth="1.5" />
          <text x="132" y="18" fill="#f2c66d" className="font-mono text-[8px] font-bold">P50</text>

          {/* P10 & P90 bounds */}
          <line x1="110" y1="75" x2="110" y2="100" stroke="#ff7777" strokeWidth="1" strokeDasharray="2 2" />
          <text x="100" y="112" fill="#ff7777" className="font-mono text-[7px]">P10 (-1.5m)</text>

          <line x1="170" y1="75" x2="170" y2="100" stroke="#58d8d0" strokeWidth="1" strokeDasharray="2 2" />
          <text x="160" y="112" fill="#58d8d0" className="font-mono text-[7px]">P90 (+1.5m)</text>

          <text x="35" y="30" fill="#869392" className="font-mono text-[8px]">MONTE CARLO ERROR BAND</text>
        </svg>
      );

    default:
      return null;
  }
};

type InteractionState = 
  | 'IDLE' 
  | 'HOVERING_LEFT' 
  | 'HOVERING_RIGHT' 
  | 'MOVING_TO_CENTER' 
  | 'FLIPPING' 
  | 'DETAILS_OPEN';

export const ResearchLab: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [interactionState, setInteractionState] = useState<InteractionState>('IDLE');
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(false);

  const carouselStageRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hoverDelayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverStepTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const totalCards = RESEARCH_STAGES.length; // 7 cards

  // Step rotation helpers
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? totalCards - 1 : prev - 1));
  }, [totalCards]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === totalCards - 1 ? 0 : prev + 1));
  }, [totalCards]);

  // Clean all active timers
  const clearAllTimers = useCallback(() => {
    if (hoverDelayTimerRef.current) clearTimeout(hoverDelayTimerRef.current);
    if (hoverStepTimerRef.current) clearInterval(hoverStepTimerRef.current);
    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
  }, []);

  // Close details handler: returns card to front face, keeps current active card in center
  const handleCloseDetails = useCallback(() => {
    clearAllTimers();
    setIsDetailsOpen(false);
    setIsFlipped(false);
    setInteractionState('IDLE');
  }, [clearAllTimers]);

  // Escape key closes expanded details without resetting index
  useEffect(() => {
    const onGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isDetailsOpen || isFlipped) {
          handleCloseDetails();
        }
      }
    };
    window.addEventListener('keydown', onGlobalKeyDown);
    return () => window.removeEventListener('keydown', onGlobalKeyDown);
  }, [isDetailsOpen, isFlipped, handleCloseDetails]);

  // Mouse Movement Over Stage: Left/Right hover zones steering
  const handleStageMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Disable hover-driven rotation if details are open, or during card transition/flip, or autoplay
    if (isDetailsOpen || interactionState === 'FLIPPING' || interactionState === 'MOVING_TO_CENTER' || isAutoplay) {
      return;
    }

    const stage = carouselStageRef.current;
    if (!stage) return;

    const rect = stage.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;

    // LEFT ZONE: far left ~18% width
    if (relX < 0.18) {
      if (interactionState !== 'HOVERING_LEFT') {
        if (hoverDelayTimerRef.current) clearTimeout(hoverDelayTimerRef.current);
        if (hoverStepTimerRef.current) clearInterval(hoverStepTimerRef.current);

        setInteractionState('HOVERING_LEFT');

        // Short movement delay threshold before advancing (prevents rapid accidental skipping)
        hoverDelayTimerRef.current = setTimeout(() => {
          handlePrev();
          hoverStepTimerRef.current = setInterval(() => {
            handlePrev();
          }, 1150);
        }, 260);
      }
    } 
    // RIGHT ZONE: far right ~18% width
    else if (relX > 0.82) {
      if (interactionState !== 'HOVERING_RIGHT') {
        if (hoverDelayTimerRef.current) clearTimeout(hoverDelayTimerRef.current);
        if (hoverStepTimerRef.current) clearInterval(hoverStepTimerRef.current);

        setInteractionState('HOVERING_RIGHT');

        // Short movement delay threshold before advancing
        hoverDelayTimerRef.current = setTimeout(() => {
          handleNext();
          hoverStepTimerRef.current = setInterval(() => {
            handleNext();
          }, 1150);
        }, 260);
      }
    } 
    // CENTER ZONE: 18% to 82% (Safe for hovering over center card and reading)
    else {
      if (interactionState === 'HOVERING_LEFT' || interactionState === 'HOVERING_RIGHT') {
        if (hoverDelayTimerRef.current) clearTimeout(hoverDelayTimerRef.current);
        if (hoverStepTimerRef.current) clearInterval(hoverStepTimerRef.current);
        setInteractionState('IDLE');
      }
    }
  }, [isDetailsOpen, interactionState, isAutoplay, handlePrev, handleNext]);

  // Mouse Leaves Carousel Stage: Gracefully stop rotation
  const handleStageMouseLeave = useCallback(() => {
    if (hoverDelayTimerRef.current) clearTimeout(hoverDelayTimerRef.current);
    if (hoverStepTimerRef.current) clearInterval(hoverStepTimerRef.current);

    if (interactionState === 'HOVERING_LEFT' || interactionState === 'HOVERING_RIGHT') {
      setInteractionState('IDLE');
    }
  }, [interactionState]);

  // Card Selection Handler (Move to Center → Flip → Open Details)
  const handleCardClick = useCallback((index: number) => {
    clearAllTimers();
    setIsAutoplay(false);

    // Prevent re-triggering while already animating
    if (interactionState === 'MOVING_TO_CENTER' || interactionState === 'FLIPPING') return;

    if (index === activeIndex) {
      // CENTER CARD CLICKED: Flip and expand
      if (!isFlipped) {
        setInteractionState('FLIPPING');
        setIsFlipped(true);

        transitionTimerRef.current = setTimeout(() => {
          setIsDetailsOpen(true);
          setInteractionState('DETAILS_OPEN');
        }, 650);
      } else {
        // If already flipped, toggling details
        if (!isDetailsOpen) {
          setIsDetailsOpen(true);
          setInteractionState('DETAILS_OPEN');
        } else {
          // If details are open and center card is clicked, toggle back
          handleCloseDetails();
        }
      }
    } else {
      // SIDE CARD CLICKED:
      // Step 1: Animate card along orbital path to center foreground
      setInteractionState('MOVING_TO_CENTER');
      setIsFlipped(false);
      setIsDetailsOpen(false);
      setActiveIndex(index);

      // Step 2: Once card arrives at center (~700ms), perform 3D flip
      transitionTimerRef.current = setTimeout(() => {
        setInteractionState('FLIPPING');
        setIsFlipped(true);

        // Step 3: Once flip completes (~650ms), reveal expanded detail view
        transitionTimerRef.current = setTimeout(() => {
          setIsDetailsOpen(true);
          setInteractionState('DETAILS_OPEN');
        }, 650);
      }, 720);
    }
  }, [activeIndex, interactionState, isFlipped, isDetailsOpen, clearAllTimers, handleCloseDetails]);

  // Numbered Navigation Handler (Pills 01 to 07): Rotates card without auto-flipping
  const handleNumberedSelect = useCallback((idx: number) => {
    clearAllTimers();
    setIsAutoplay(false);

    setIsFlipped(false);
    setIsDetailsOpen(false);
    setInteractionState('IDLE');
    setActiveIndex(idx);
  }, [clearAllTimers]);

  // Step next within open details panel
  const handleNextInDetails = useCallback(() => {
    const nextIdx = (activeIndex + 1) % totalCards;
    setActiveIndex(nextIdx);
  }, [activeIndex, totalCards]);

  // Step prev within open details panel
  const handlePrevInDetails = useCallback(() => {
    const prevIdx = activeIndex === 0 ? totalCards - 1 : activeIndex - 1;
    setActiveIndex(prevIdx);
  }, [activeIndex, totalCards]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        clearAllTimers();
        handlePrev();
        setIsFlipped(false);
        setIsDetailsOpen(false);
        setInteractionState('IDLE');
      } else if (e.key === 'ArrowRight') {
        clearAllTimers();
        handleNext();
        setIsFlipped(false);
        setIsDetailsOpen(false);
        setInteractionState('IDLE');
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCardClick(activeIndex);
      }
    },
    [clearAllTimers, handlePrev, handleNext, handleCardClick, activeIndex]
  );

  // Touch swipe support on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      setIsFlipped(false);
      setIsDetailsOpen(false);
      setInteractionState('IDLE');
    }
    touchStartXRef.current = null;
  };

  // Autoplay functionality
  useEffect(() => {
    if (!isAutoplay) {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      return;
    }

    autoplayTimerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev === totalCards - 1 ? 0 : prev + 1));
      setIsFlipped(false);
      setIsDetailsOpen(false);
    }, 5500);

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [isAutoplay, totalCards]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, [clearAllTimers]);

  const currentStage = RESEARCH_STAGES[activeIndex];
  const activePipelineStages = STAGE_TO_PIPELINE_MAP[activeIndex] || [];

  return (
    <section 
      id="research-lab" 
      className="w-full py-20 px-4 sm:px-margin-tablet lg:px-margin-desktop bg-surface-container-lowest border-b border-surface-container-highest/60 overflow-hidden"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* 1. Section Introduction */}
        <motion.div 
          className="flex flex-col gap-3 max-w-4xl"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">
              RESEARCH LAB / 08
            </span>
          </div>

          <h2 className="font-headline-lg text-2xl sm:text-4xl lg:text-5xl text-warm-white font-semibold uppercase tracking-tight">
            SEVEN QUESTIONS. ONE RELIABLE WORKFLOW.
          </h2>

          <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-3xl leading-relaxed font-light">
            To build defensible mission analysis software, we decomposed the lunar topocentric visibility challenge into seven distinct, mathematically rigorous research workflows based on NASA NAIF and LRO standards.
          </p>
        </motion.div>

        {/* 2. Interactive Workflow Pipeline Chain Banner */}
        <motion.div 
          className="p-4 bg-surface-container border border-surface-container-highest shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-wrap items-center gap-2 font-telemetry-sm text-xs">
            {PIPELINE_STEPS.map((step, idx) => {
              const isStepActive = activePipelineStages.includes(step.id);

              return (
                <React.Fragment key={step.id}>
                  <div
                    className={`px-3 py-1.5 transition-all duration-300 border flex items-center gap-1.5 ${
                      isStepActive
                        ? 'bg-primary/20 text-primary border-primary font-bold shadow-[0_0_12px_rgba(88,216,208,0.3)]'
                        : 'bg-surface-container-lowest text-on-surface-variant border-surface-container-highest opacity-70'
                    }`}
                  >
                    {isStepActive && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />}
                    <span>{step.label}</span>
                  </div>
                  {idx < PIPELINE_STEPS.length - 1 && (
                    <span className="text-outline text-[11px]">→</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="font-label-caps text-[10px] text-outline uppercase tracking-wider">
              NASA REPRODUCIBLE PIPELINE
            </span>
          </div>
        </motion.div>

        {/* 3. The 3D Orbital Carousel Stage with Mouse Hover Steering & 3D Flip */}
        <div className="relative w-full flex flex-col items-center">
          {/* Controls Bar */}
          <div className="w-full flex items-center justify-between pb-4 border-b border-surface-container-highest/40 z-20">
            {/* Active Card Counter & Progress */}
            <div className="flex items-center gap-3">
              <span className="font-telemetry-md text-base text-secondary font-bold">
                QUESTION {currentStage.questionNumber} / 07
              </span>
              <span className="hidden sm:inline text-xs text-outline font-telemetry-sm">
                // {currentStage.title}
              </span>
            </div>

            {/* Carousel Navigation Buttons & Autoplay Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  clearAllTimers();
                  setIsAutoplay(!isAutoplay);
                }}
                className={`p-2 border transition-all text-xs font-telemetry-sm flex items-center gap-1.5 cursor-pointer ${
                  isAutoplay 
                    ? 'bg-secondary text-on-secondary font-bold border-secondary shadow-[0_0_10px_rgba(242,198,109,0.3)]'
                    : 'bg-surface-container text-outline hover:text-on-surface border-surface-container-highest'
                }`}
                title={isAutoplay ? 'Pause auto-rotation' : 'Start auto-rotation'}
                aria-label="Toggle Carousel Autoplay"
              >
                {isAutoplay ? <Pause size={13} /> : <Play size={13} />}
                <span className="hidden md:inline">{isAutoplay ? 'AUTOPLAY ON' : 'AUTOPLAY'}</span>
              </button>

              <button
                onClick={() => {
                  clearAllTimers();
                  handlePrev();
                  setIsFlipped(false);
                  setIsDetailsOpen(false);
                  setInteractionState('IDLE');
                }}
                className="p-2 bg-surface-container hover:bg-surface-container-high text-on-surface border border-surface-container-highest transition-colors cursor-pointer"
                title="Previous Research Card (Left Arrow)"
                aria-label="Previous Card"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                onClick={() => {
                  clearAllTimers();
                  handleNext();
                  setIsFlipped(false);
                  setIsDetailsOpen(false);
                  setInteractionState('IDLE');
                }}
                className="p-2 bg-surface-container hover:bg-surface-container-high text-on-surface border border-surface-container-highest transition-colors cursor-pointer"
                title="Next Research Card (Right Arrow)"
                aria-label="Next Card"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* 3D Viewport with Mouse Position Steering */}
          <div 
            ref={carouselStageRef}
            onMouseMove={handleStageMouseMove}
            onMouseLeave={handleStageMouseLeave}
            className="relative w-full h-[480px] sm:h-[510px] flex items-center justify-center overflow-visible my-4 select-none"
            style={{ 
              perspective: '1300px',
              perspectiveOrigin: '50% 50%'
            }}
          >
            {/* Background Elliptical Curved Orbit Arc */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[340px] pointer-events-none opacity-20">
              <svg className="w-full h-full" viewBox="0 0 1000 340" preserveAspectRatio="none">
                <ellipse cx="500" cy="180" rx="460" ry="80" fill="none" stroke="#58d8d0" strokeWidth="1.5" strokeDasharray="4 4" />
              </svg>
            </div>

            {/* Left Hover Zone Visual Indicator */}
            <div 
              className={`absolute left-3 top-1/2 -translate-y-1/2 z-40 pointer-events-none transition-all duration-300 flex items-center gap-2 ${
                interactionState === 'HOVERING_LEFT'
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-90'
              }`}
            >
              <div className="p-3 rounded-full bg-secondary/20 border border-secondary text-secondary shadow-[0_0_20px_rgba(242,198,109,0.5)] flex items-center justify-center backdrop-blur-sm">
                <ChevronLeft size={22} className="animate-pulse" />
              </div>
              <span className="font-telemetry-sm text-[10px] text-secondary font-bold tracking-widest uppercase bg-surface-container/90 px-2.5 py-1 border border-secondary/40 shadow-lg hidden md:inline">
                STEERING LEFT
              </span>
            </div>

            {/* Right Hover Zone Visual Indicator */}
            <div 
              className={`absolute right-3 top-1/2 -translate-y-1/2 z-40 pointer-events-none transition-all duration-300 flex items-center gap-2 ${
                interactionState === 'HOVERING_RIGHT'
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-90'
              }`}
            >
              <span className="font-telemetry-sm text-[10px] text-secondary font-bold tracking-widest uppercase bg-surface-container/90 px-2.5 py-1 border border-secondary/40 shadow-lg hidden md:inline">
                STEERING RIGHT
              </span>
              <div className="p-3 rounded-full bg-secondary/20 border border-secondary text-secondary shadow-[0_0_20px_rgba(242,198,109,0.5)] flex items-center justify-center backdrop-blur-sm">
                <ChevronRight size={22} className="animate-pulse" />
              </div>
            </div>

            {/* The Seven Orbiting Cards with 3D Flip */}
            {RESEARCH_STAGES.map((stage, idx) => {
              // Calculate shortest circular offset in range [-3, 3]
              let offset = idx - activeIndex;
              if (offset > 3) offset -= 7;
              if (offset < -3) offset += 7;

              const isCurrent = offset === 0;
              const absOffset = Math.abs(offset);

              // 3D Orbital Transform Parameters (Recreating ORBIT-5-01-LITE.mp4)
              const angleDeg = offset * 26;
              const rotateY = -angleDeg;
              const xPos = offset * 270;
              const zPos = -Math.pow(absOffset, 1.25) * 155;
              const yPos = Math.pow(absOffset, 1.5) * 10;
              const scale = isCurrent ? 1.0 : Math.max(0.68, 1 - absOffset * 0.12);
              const opacity = isCurrent ? 1 : Math.max(0.25, 0.9 - absOffset * 0.25);
              const zIndex = isCurrent ? 50 : 30 - absOffset * 5;

              // Card is flipped if it is active and isFlipped is true
              const cardIsFlipped = isCurrent && isFlipped;

              return (
                <div
                  key={stage.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(idx);
                  }}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[310px] sm:w-[360px] h-[440px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer select-none`}
                  style={{
                    transform: `translate3d(calc(-50% + ${xPos}px), calc(-50% + ${yPos}px), ${zPos}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity: opacity,
                    zIndex: zIndex,
                    transformStyle: 'preserve-3d',
                  }}
                  tabIndex={isCurrent ? 0 : -1}
                  role="button"
                  aria-label={`Question ${stage.questionNumber}: ${stage.title}. ${isCurrent ? 'Press Enter or Space to inspect.' : 'Click to bring to center.'}`}
                >
                  {/* Inner 3D Card Flipper Element */}
                  <div
                    className="relative w-full h-full transition-transform duration-650 ease-[cubic-bezier(0.2,0.85,0.25,1)]"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: cardIsFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                  >
                    {/* ===== FRONT FACE ===== */}
                    <div
                      className={`absolute inset-0 w-full h-full p-5 flex flex-col justify-between border shadow-2xl transition-colors ${
                        isCurrent 
                          ? 'bg-surface-container border-secondary/80 ring-1 ring-secondary/40 shadow-[0_0_35px_rgba(0,0,0,0.85)]'
                          : 'bg-surface-container-low/95 border-surface-container-highest hover:border-primary/50'
                      }`}
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(0deg)',
                      }}
                    >
                      {/* Card Header: Stage Number & Kernel Badge */}
                      <div className="flex items-center justify-between pb-3 border-b border-surface-container-highest/60">
                        <span className="font-label-caps text-xs text-secondary font-bold tracking-wider">
                          QUESTION {stage.questionNumber} // WORKFLOW
                        </span>
                        <span className={`px-2 py-0.5 text-[10px] font-telemetry-sm font-semibold border ${
                          isCurrent 
                            ? 'bg-secondary/15 text-secondary border-secondary/40' 
                            : 'bg-surface-container-lowest text-outline border-surface-container-highest'
                        }`}>
                          {stage.kernel.split('//')[0].trim()}
                        </span>
                      </div>

                      {/* Card Headline */}
                      <div className="flex flex-col gap-1 py-1">
                        <h3 className="font-headline-sm text-base sm:text-lg text-warm-white font-bold leading-snug line-clamp-2">
                          {stage.title}
                        </h3>
                      </div>

                      {/* Card Visual Motif (Custom Scientific SVG) */}
                      <div className="relative w-full h-[135px] bg-surface-container-lowest border border-surface-container-highest/80 my-1 flex items-center justify-center overflow-hidden">
                        <ScientificMotif stageIndex={idx} isActive={isCurrent} />
                      </div>

                      {/* Concise Output & Method Preview */}
                      <div className="flex flex-col gap-1.5 pt-2 text-xs font-telemetry-sm border-t border-surface-container-highest/60">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-outline uppercase">CORE OUTPUT:</span>
                          <span className="text-primary font-bold truncate max-w-[190px]">{stage.output}</span>
                        </div>
                        <p className="text-[11px] text-on-surface-variant font-body-sm line-clamp-2">
                          {stage.method}
                        </p>
                      </div>

                      {/* Active Card Focus Pill / Action Prompt */}
                      {isCurrent ? (
                        <div className="flex items-center justify-between pt-2 text-[10px] font-telemetry-sm text-secondary font-semibold border-t border-surface-container-highest/60">
                          <span className="flex items-center gap-1.5">
                            <Scan size={12} className="text-secondary animate-pulse" />
                            <span>CLICK TO 3D FLIP & INSPECT</span>
                          </span>
                          <span className="text-[9px] text-outline">[SPACE / ENTER]</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center pt-2 text-[10px] font-telemetry-sm text-outline group-hover:text-primary">
                          <span>CLICK TO ROTATE & FLIP</span>
                        </div>
                      )}
                    </div>

                    {/* ===== BACK FACE (Scientific Instrument Backplane) ===== */}
                    <div
                      className="absolute inset-0 w-full h-full p-5 flex flex-col justify-between border shadow-2xl bg-[#0f1318] border-secondary/80 ring-1 ring-secondary/40 shadow-[0_0_35px_rgba(242,198,109,0.2)]"
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                      }}
                    >
                      {/* Instrument Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-surface-container-highest/60">
                        <span className="font-label-caps text-xs text-secondary font-bold tracking-wider">
                          QUESTION {stage.questionNumber} // BACKPLANE
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                          <span className="text-[10px] font-telemetry-sm text-primary font-bold">
                            ONLINE
                          </span>
                        </div>
                      </div>

                      {/* Scientific Telemetry Blocks */}
                      <div className="flex flex-col gap-2.5 my-auto">
                        <div className="p-2.5 bg-surface-container-lowest/80 border border-surface-container-highest/80 flex flex-col gap-1">
                          <div className="flex items-center gap-1.5 text-secondary font-label-caps text-[10px] font-bold">
                            <Layers size={11} className="text-secondary" />
                            <span>INPUT TELEMETRY</span>
                          </div>
                          <p className="font-body-sm text-[11px] text-on-surface-variant line-clamp-2 leading-tight">
                            {stage.inputData}
                          </p>
                        </div>

                        <div className="p-2.5 bg-surface-container-lowest/80 border border-surface-container-highest/80 flex flex-col gap-1">
                          <div className="flex items-center gap-1.5 text-primary font-label-caps text-[10px] font-bold">
                            <Compass size={11} className="text-primary" />
                            <span>METHODOLOGY</span>
                          </div>
                          <p className="font-body-sm text-[11px] text-on-surface-variant line-clamp-2 leading-tight">
                            {stage.method}
                          </p>
                        </div>

                        <div className="p-2.5 bg-surface-container-lowest/80 border border-surface-container-highest/80 flex flex-col gap-1">
                          <div className="flex items-center gap-1.5 text-primary-container font-label-caps text-[10px] font-bold">
                            <CheckCircle2 size={11} className="text-primary-container" />
                            <span>PRIMARY METRIC</span>
                          </div>
                          <p className="font-body-sm text-[11px] text-warm-white font-medium line-clamp-2 leading-tight">
                            {stage.output}
                          </p>
                        </div>
                      </div>

                      {/* Backplane Bottom Actions */}
                      <div className="flex items-center justify-between pt-2 border-t border-surface-container-highest/60 text-[10px] font-telemetry-sm">
                        <span className="text-secondary font-bold flex items-center gap-1">
                          <ArrowRight size={11} /> SPECIFICATION EXPANDED
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCloseDetails();
                          }}
                          className="text-outline hover:text-warm-white underline cursor-pointer flex items-center gap-1"
                          title="Flip back to front face"
                        >
                          <RotateCw size={10} />
                          <span>FLIP FRONT</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 7 Numbered Selection Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 z-20">
            {RESEARCH_STAGES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => handleNumberedSelect(idx)}
                className={`w-9 h-9 font-telemetry-sm text-xs font-bold transition-all border flex items-center justify-center cursor-pointer ${
                  activeIndex === idx
                    ? 'bg-secondary text-on-secondary border-secondary shadow-[0_0_12px_rgba(242,198,109,0.4)] scale-110'
                    : 'bg-surface-container text-outline hover:text-on-surface border-surface-container-highest'
                }`}
                title={`Jump to Question ${s.questionNumber}: ${s.title}`}
                aria-label={`Select Question ${s.questionNumber}`}
              >
                {s.questionNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Inspection Guide Strip (Shown when details are closed) */}
        {!isDetailsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full p-4 bg-surface-container/60 border border-surface-container-highest/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-telemetry-sm"
          >
            <div className="flex items-center gap-2 text-outline">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <span>ACTIVE WORKFLOW:</span>
              <span className="text-warm-white font-semibold">QUESTION {currentStage.questionNumber} — {currentStage.title}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleCardClick(activeIndex)}
                className="px-4 py-2 bg-secondary/15 hover:bg-secondary/25 border border-secondary/50 text-secondary hover:text-warm-white font-bold transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_12px_rgba(242,198,109,0.2)]"
              >
                <Scan size={14} />
                <span>CLICK TO 3D FLIP & EXPAND FULL 4-PILLAR SPECIFICATION</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* 4. Expanded Technical Detail View (Revealed on 3D Flip, Smooth Expansion with Close Button & ESC Support) */}
        <AnimatePresence>
          {isDetailsOpen && (
            <motion.div
              key={`details-${currentStage.id}`}
              initial={{ opacity: 0, y: 25, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 25, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-8 bg-surface-container border border-secondary/50 shadow-2xl flex flex-col gap-6 relative"
            >
              {/* Detail Panel Header with Prominent Close Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-container-highest/60">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    <span className="font-label-caps text-xs text-secondary font-bold uppercase tracking-wider">
                      QUESTION {currentStage.questionNumber} // COMPREHENSIVE WORKFLOW SPECIFICATION
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-xl text-warm-white font-bold mt-1">
                    {currentStage.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-3 py-1 bg-surface-container-lowest border border-secondary/40 text-secondary font-telemetry-sm text-xs font-semibold flex items-center gap-1.5">
                    <Cpu size={13} className="text-secondary" /> {currentStage.kernel}
                  </span>
                  <button
                    onClick={handleCloseDetails}
                    className="px-3.5 py-1.5 bg-surface-container-low hover:bg-surface-container-highest border border-secondary/60 hover:border-secondary text-warm-white font-telemetry-sm text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                    title="Close Specification View (Escape)"
                    aria-label="Close Specification View"
                  >
                    <X size={14} className="text-secondary" />
                    <span>CLOSE SPECIFICATION [ESC]</span>
                  </button>
                </div>
              </div>

              {/* The 4 Exact Pillars: INPUT DATA, METHOD, OUTPUT, ASSUMPTIONS */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Pillar 1: INPUT DATA */}
                <div className="p-4 bg-surface-container-low border border-surface-container-highest flex flex-col gap-2">
                  <span className="font-label-caps text-xs text-secondary font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Layers size={13} className="text-secondary" /> INPUT DATA
                  </span>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    {currentStage.inputData}
                  </p>
                </div>

                {/* Pillar 2: METHOD */}
                <div className="p-4 bg-surface-container-low border border-surface-container-highest flex flex-col gap-2">
                  <span className="font-label-caps text-xs text-primary font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Compass size={13} className="text-primary" /> METHOD
                  </span>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    {currentStage.method}
                  </p>
                </div>

                {/* Pillar 3: OUTPUT */}
                <div className="p-4 bg-surface-container-low border border-surface-container-highest flex flex-col gap-2">
                  <span className="font-label-caps text-xs text-primary-container font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-primary-container" /> OUTPUT
                  </span>
                  <p className="font-body-sm text-xs text-warm-white font-medium leading-relaxed">
                    {currentStage.output}
                  </p>
                </div>

                {/* Pillar 4: ASSUMPTIONS */}
                <div className="p-4 bg-surface-container-low border border-surface-container-highest flex flex-col gap-2">
                  <span className="font-label-caps text-xs text-outline font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Cpu size={13} className="text-outline" /> ASSUMPTIONS
                  </span>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    {currentStage.assumptions}
                  </p>
                </div>
              </div>

              {/* Navigation and Quick Actions Inside Detail Panel */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-telemetry-sm text-outline border-t border-surface-container-highest/60 pt-4">
                <div className="flex items-center gap-3">
                  <span className="text-secondary font-semibold">STATUS:</span>
                  <span>4-PILLAR SCIENTIFIC SPECIFICATION ACTIVE</span>
                  <button
                    onClick={handleCloseDetails}
                    className="text-outline hover:text-warm-white underline ml-2 cursor-pointer uppercase"
                  >
                    RETURN TO ORBIT
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={handlePrevInDetails}
                    className="text-outline hover:text-primary transition-colors flex items-center gap-1 cursor-pointer font-semibold uppercase"
                  >
                    <ChevronLeft size={13} />
                    <span>PREV: Q{RESEARCH_STAGES[(activeIndex === 0 ? totalCards - 1 : activeIndex - 1)].questionNumber}</span>
                  </button>
                  <button
                    onClick={handleNextInDetails}
                    className="text-primary hover:text-warm-white transition-colors flex items-center gap-1 cursor-pointer font-semibold uppercase"
                  >
                    <span>NEXT: Q{RESEARCH_STAGES[(activeIndex + 1) % totalCards].questionNumber}</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

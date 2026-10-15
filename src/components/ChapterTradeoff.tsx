import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Wifi, CheckCircle2, BatteryCharging, AlertOctagon, Play, Pause, RotateCcw, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export const ChapterTradeoff: React.FC = () => {
  const [hours, setHours] = useState<number>(142);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState<boolean>(false);

  // Playback loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setHours((prev) => {
        const next = prev + 1.5 * speed;
        return next >= 708 ? 0 : parseFloat(next.toFixed(1));
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  const pct = (hours / 708) * 100;
  const days = (hours / 24).toFixed(1);

  // Solar is active in intervals: 0-28% and 42-74%
  const isSolar = (pct <= 28) || (pct >= 42 && pct <= 74);
  // DTE is active in intervals: 10-58% and 70-100%
  const isDTE = (pct >= 10 && pct <= 58) || (pct >= 70);

  let synergyStatus = '';
  let synergyColor = '';
  let synergyIcon = <CheckCircle2 size={16} />;
  let narrativeInsight = '';

  if (isSolar && isDTE) {
    synergyStatus = 'OPERATIONAL OPTIMUM (POWER + COMMS SYNERGY)';
    synergyColor = 'text-primary font-bold';
    synergyIcon = <CheckCircle2 size={18} className="text-primary" />;
    narrativeInsight = 'Prime science operations window. Both solar arrays and DTE antennas are simultaneously active, allowing high-bandwidth telemetry downlinks without draining batteries.';
  } else if (isSolar && !isDTE) {
    synergyStatus = 'POWER HARVEST ONLY (NO DIRECT EARTH COMMS)';
    synergyColor = 'text-secondary font-semibold';
    synergyIcon = <Sun size={18} className="text-secondary" />;
    narrativeInsight = 'Lander generates maximum electrical power, but Earth is occluded by lunar libration or crater topography. Science data must be stored locally on onboard flash memory.';
  } else if (!isSolar && isDTE) {
    synergyStatus = 'BATTERY DISCHARGE COMMS WINDOW (TERRAIN SHADOW)';
    synergyColor = 'text-outline font-semibold';
    synergyIcon = <BatteryCharging size={18} className="text-outline" />;
    narrativeInsight = 'Earth is clearly visible for communication, but the Sun is blocked by surrounding ridges. Mission controllers must carefully ration battery energy during transmission.';
  } else {
    synergyStatus = 'CRITICAL BLACKOUT (SURVIVAL SLEEP MODE)';
    synergyColor = 'text-alert-coral font-bold';
    synergyIcon = <AlertOctagon size={18} className="text-alert-coral" />;
    narrativeInsight = 'Complete blackout. No solar generation and no RF link to Earth. The vehicle enters deep low-power sleep mode with radioisotope or resistive heaters preserving payload survival.';
  }

  const handleReset = () => {
    setIsPlaying(false);
    setHours(0);
  };

  return (
    <section id="chapter-tradeoff" className="w-full py-20 px-4 sm:px-margin-tablet lg:px-margin-desktop bg-surface border-b border-surface-container-highest/50">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Chapter Header */}
        <motion.div 
          className="flex flex-col gap-4 max-w-4xl"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest font-semibold">
            CHAPTER 04 — THE TRADE-OFF
          </span>
          <h2 className="font-display-hero text-3xl sm:text-5xl lg:text-6xl text-warm-white font-semibold uppercase tracking-tight leading-[1.08]">
            POWER WINDOW ≠<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary to-on-surface">
              COMMUNICATION WINDOW.
            </span>
          </h2>
          <p className="font-body-lg text-lg sm:text-xl text-on-surface-variant leading-relaxed font-light">
            Sunlight and Earth visibility do not naturally synchronize. Because solar illumination is driven by the 29.5-day synodic cycle while Earth visibility oscillates with the 27.3-day libration cycle, their overlap defines narrow windows for surface exploration.
          </p>
        </motion.div>

        {/* Dual Synchronized Timelines Container */}
        <div className="bg-surface-container border border-surface-container-highest p-6 sm:p-8 shadow-2xl flex flex-col gap-8">
          {/* Header Controls & Timeline Scrub Console */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-container-highest/60">
            <div className="flex flex-col">
              <span className="font-label-caps text-xs text-secondary uppercase tracking-wider font-semibold">
                708-HOUR SYNODIC TIMELINE HARMONIZER
              </span>
              <span className="text-xs text-outline font-telemetry-sm">
                ILLUSTRATIVE SCENARIO: SHACKLETON RIM RIDGE OVER 29.5 DAYS
              </span>
            </div>

            {/* Playback & Speed Controls */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-surface-container-lowest p-1 border border-surface-container-highest">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`px-3 py-1.5 font-telemetry-sm text-xs uppercase font-bold flex items-center gap-1.5 transition-all ${
                    isPlaying 
                      ? 'bg-secondary text-on-secondary shadow-[0_0_12px_rgba(236,192,104,0.4)]'
                      : 'bg-primary-container text-on-primary-container hover:bg-primary'
                  }`}
                >
                  {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                  <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
                </button>

                <button
                  onClick={handleReset}
                  className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
                  title="Reset to Hour 0"
                >
                  <RotateCcw size={14} />
                </button>
              </div>

              {/* Speed Multiplier */}
              <div className="flex items-center bg-surface-container-lowest border border-surface-container-highest p-1 text-xs font-telemetry-sm">
                {[1, 3, 10].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s)}
                    className={`px-2 py-0.5 transition-colors ${speed === s ? 'bg-primary-container text-on-primary-container font-bold' : 'text-outline hover:text-on-surface'}`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Real-time Status Display Banner */}
          <div className="flex items-center justify-between p-4 bg-surface-container-lowest border border-surface-container-highest">
            <div className="flex items-center gap-3">
              {synergyIcon}
              <div className="flex flex-col">
                <span className={`font-telemetry-md text-sm ${synergyColor}`}>
                  {synergyStatus}
                </span>
                <span className="text-xs text-on-surface-variant font-body-sm">
                  {narrativeInsight}
                </span>
              </div>
            </div>

            <div className="hidden sm:flex flex-col items-end shrink-0 pl-4">
              <span className="font-telemetry-md text-lg text-warm-white font-bold">
                T+ {hours.toFixed(0)}h / 708h
              </span>
              <span className="text-[11px] text-outline font-telemetry-sm">
                DAY {days} OF 29.5
              </span>
            </div>
          </div>

          {/* Interactive Scrub Bar (Slider) */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-telemetry-sm text-outline">
              <span>T+ 000 HOURS (LUNAR DAWN)</span>
              <span className="text-secondary font-bold">DRAG SCRUBBER TO SIMULATE TIME</span>
              <span>T+ 708 HOURS (SYNODIC COMPLETION)</span>
            </div>
            <input 
              type="range"
              min="0"
              max="708"
              step="0.5"
              value={hours}
              onChange={(e) => {
                setIsPlaying(false);
                setHours(parseFloat(e.target.value));
              }}
              className="w-full accent-primary h-2 bg-surface-container-lowest rounded-none cursor-pointer"
            />
          </div>

          {/* The Synchronized Timeline Lanes */}
          <div className="relative flex flex-col gap-6 pt-2">
            {/* Vertical Time Scrub Indicator Line */}
            <div 
              className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_12px_#ffffff] z-20 pointer-events-none transition-all duration-75"
              style={{ left: `${pct}%` }}
            >
              <div className="absolute -top-3 -translate-x-1/2 bg-white text-surface text-[9px] font-telemetry-sm font-bold px-1.5 py-0.5">
                {hours.toFixed(0)}h
              </div>
            </div>

            {/* Lane 1: Solar Illumination Timeline (Gold) */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-telemetry-sm">
                <span className="text-secondary font-bold flex items-center gap-1.5">
                  <Sun size={14} /> SOLAR ILLUMINATION WINDOW (POWER HARVEST)
                </span>
                <span className={isSolar ? 'text-secondary font-semibold' : 'text-outline'}>
                  {isSolar ? 'ILLUMINATED (+1.4° SUN)' : 'TERRAIN SHADOW'}
                </span>
              </div>
              <div className="relative h-9 bg-surface-container-lowest border border-surface-container-highest overflow-hidden">
                {/* Active Solar Blocks */}
                <div className="absolute top-0 bottom-0 left-[0%] w-[28%] bg-secondary/80 border-r border-secondary flex items-center justify-center text-[10px] text-surface font-bold uppercase">
                  SUNLIGHT (0-198h)
                </div>
                <div className="absolute top-0 bottom-0 left-[28%] w-[14%] bg-surface-container-lowest border-r border-surface-container-highest flex items-center justify-center text-[9px] text-outline uppercase">
                  SHADOW (198-297h)
                </div>
                <div className="absolute top-0 bottom-0 left-[42%] w-[32%] bg-secondary/80 border-r border-secondary flex items-center justify-center text-[10px] text-surface font-bold uppercase">
                  SUNLIGHT (297-524h)
                </div>
                <div className="absolute top-0 bottom-0 left-[74%] w-[26%] bg-surface-container-lowest flex items-center justify-center text-[9px] text-outline uppercase">
                  POLAR NIGHT (524-708h)
                </div>
              </div>
            </div>

            {/* Lane 2: Direct-to-Earth Communication Timeline (Cyan) */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-telemetry-sm">
                <span className="text-primary font-bold flex items-center gap-1.5">
                  <Wifi size={14} /> DIRECT-TO-EARTH (DTE) LINE-OF-SIGHT LINK
                </span>
                <span className={isDTE ? 'text-primary font-semibold' : 'text-outline'}>
                  {isDTE ? 'CLEAR DSN LOCK' : 'BLOCKED BY MASSIF'}
                </span>
              </div>
              <div className="relative h-9 bg-surface-container-lowest border border-surface-container-highest overflow-hidden">
                {/* Active DTE Blocks */}
                <div className="absolute top-0 bottom-0 left-[0%] w-[10%] bg-surface-container-lowest border-r border-surface-container-highest flex items-center justify-center text-[9px] text-outline uppercase">
                  OCCLUDED
                </div>
                <div className="absolute top-0 bottom-0 left-[10%] w-[48%] bg-primary-container/85 border-r border-primary flex items-center justify-center text-[10px] text-on-primary-container font-bold uppercase">
                  EARTH VISIBLE (71-410h)
                </div>
                <div className="absolute top-0 bottom-0 left-[58%] w-[12%] bg-surface-container-lowest border-r border-surface-container-highest flex items-center justify-center text-[9px] text-outline uppercase">
                  OCCLUDED
                </div>
                <div className="absolute top-0 bottom-0 left-[70%] w-[30%] bg-primary-container/85 flex items-center justify-center text-[10px] text-on-primary-container font-bold uppercase">
                  EARTH VISIBLE (495-708h)
                </div>
              </div>
            </div>

            {/* Lane 3: Operational Overlap (Synergy) */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-telemetry-sm">
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 size={14} /> JOINT OPERATIONAL OVERLAP (POWER + COMMS)
                </span>
                <span className="text-emerald-400 font-mono text-[11px]">
                  TOTAL JOINT OVERLAP: 341 HOURS (~48% OF CYCLE)
                </span>
              </div>
              <div className="relative h-7 bg-surface-container-lowest border border-surface-container-highest overflow-hidden">
                <div className="absolute top-0 bottom-0 left-[10%] w-[18%] bg-emerald-500/80 border-x border-emerald-400 flex items-center justify-center text-[9px] text-surface font-bold uppercase">
                  OVERLAP 1 (127h)
                </div>
                <div className="absolute top-0 bottom-0 left-[42%] w-[16%] bg-emerald-500/80 border-x border-emerald-400 flex items-center justify-center text-[9px] text-surface font-bold uppercase">
                  OVERLAP 2 (114h)
                </div>
                <div className="absolute top-0 bottom-0 left-[70%] w-[4%] bg-emerald-500/80 border-x border-emerald-400 flex items-center justify-center text-[8px] text-surface font-bold uppercase">
                  OVERLAP 3
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Technical Analysis Drawer */}
        <div className="w-full">
          <button
            onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
            className="w-full py-3.5 px-6 bg-surface-container hover:bg-surface-container-high transition-all border border-surface-container-highest flex items-center justify-between group cursor-pointer shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Sparkles size={16} className="text-secondary" />
              <span className="font-telemetry-md text-xs uppercase tracking-wider text-on-surface font-semibold">
                {showTechnicalDetails ? 'COLLAPSE MISSION PLANNING & BATTERY TRADE-OFF DETAILS' : 'EXPAND MISSION PLANNING & BATTERY TRADE-OFF DETAILS'}
              </span>
            </div>
            {showTechnicalDetails ? <ChevronUp size={16} className="text-secondary" /> : <ChevronDown size={16} className="text-secondary" />}
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
                    <span className="font-bold text-secondary uppercase">BATTERY DEPTH OF DISCHARGE (DOD):</span>
                    <p className="font-body-sm text-xs leading-relaxed">
                      Lithium-ion cells operating in cryogenic polar environments (-150°C to -233°C) must maintain internal heating loops. If an occlusion period exceeds 50 hours, the battery DOD exceeds 70%, risking permanent cell failure without solar recovery.
                    </p>
                  </div>
                  <div className="p-3 bg-surface-container-lowest border border-surface-container-highest flex flex-col gap-1">
                    <span className="font-bold text-primary uppercase">DOWNLINK SCHEDULING CONSTRAINTS:</span>
                    <p className="font-body-sm text-xs leading-relaxed">
                      During "Power Harvest Only" intervals, all HD rover video and spectrometer data must be cached in flash storage. Once DTE line-of-sight opens, high-power X-band transmitters fire at maximum data rate to clear onboard buffers before the next shadow passes.
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

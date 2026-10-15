import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LANDING_SITES } from '../data/missionData';
import { IMAGES } from '../data/images';
import type { LandingSite } from '../types/mission';
import { Compass, Calendar, Sun, Globe, RotateCcw, Clock, ChevronDown, ChevronUp, Sparkles, CheckCircle2, AlertOctagon } from 'lucide-react';

export const MissionBrowser: React.FC = () => {
  const [selectedSiteId, setSelectedSiteId] = useState<string>('shackleton');
  const [epochDate, setEpochDate] = useState<string>('2026-10-14');
  const [timeHour, setTimeHour] = useState<number>(12.0); // 0.0 to 24.0 UTC
  const [showAdvancedTelemetry, setShowAdvancedTelemetry] = useState<boolean>(false);

  const site: LandingSite = LANDING_SITES.find(s => s.id === selectedSiteId) || LANDING_SITES[0];

  const getSiteImage = (id: string) => {
    switch (id) {
      case 'malapert': return IMAGES.malapertPeak;
      case 'haworth': return IMAGES.psrTerminator;
      case 'connecting-ridge': return IMAGES.shadowRay;
      case 'amundsen': return IMAGES.earthRise;
      case 'shackleton': return IMAGES.lolaDem;
      default: return IMAGES.clpsLander;
    }
  };

  // Time-interpolated dynamic azimuth/elevation offset (educational model)
  const timeOffsetDeg = (timeHour - 12) * 0.5;
  const currentSunAz = (parseFloat(site.sunAzimuth) + timeOffsetDeg * 2 + 360) % 360;
  const currentSunEl = parseFloat(site.sunElevation) + Math.sin((timeHour / 24) * Math.PI * 2) * 0.45;
  const currentEarthEl = parseFloat(site.earthElevation) + Math.cos((timeHour / 24) * Math.PI) * 0.35;
  const currentEarthAz = parseFloat(site.earthAzimuth);

  // Occlusion checks
  const maskPeakEl = site.horizonMaskPeak.elevation;
  const isSunOccluded = currentSunEl < 1.0; // grazing threshold for this site
  const isEarthOccluded = currentEarthEl < (maskPeakEl * 0.6);

  const handleReset = () => {
    setSelectedSiteId('shackleton');
    setEpochDate('2026-10-14');
    setTimeHour(12.0);
  };

  // Polar coordinates conversion for the sky reticle (SVG 300x300 center 150,150, radius 120)
  // Azimuth: 0° is top (North), 90° East (right), 180° South (bottom), 270° West (left)
  // Elevation: 0° is outer rim (r=120), 10° is inner (r=40), 90° is center
  const polarToXY = (azDeg: number, elDeg: number) => {
    const angleRad = ((azDeg - 90) * Math.PI) / 180;
    // Map elDeg: 0° -> r=115, 10° -> r=35
    const r = Math.max(25, Math.min(120, 115 - Math.max(0, elDeg) * 8));
    return {
      x: 150 + r * Math.cos(angleRad),
      y: 150 + r * Math.sin(angleRad),
    };
  };

  const sunXY = polarToXY(currentSunAz, currentSunEl);
  const earthXY = polarToXY(currentEarthAz, currentEarthEl);
  const maskPeakXY = polarToXY(site.horizonMaskPeak.azimuth, site.horizonMaskPeak.elevation);

  return (
    <section id="mission-browser" className="w-full py-20 px-4 sm:px-margin-tablet lg:px-margin-desktop bg-surface-container-lowest border-b border-surface-container-highest/50">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Chapter Header */}
        <motion.div 
          className="flex flex-col gap-4 max-w-4xl"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest font-semibold">
            CHAPTER 06 — THE EXPERIMENT
          </span>
          <h2 className="font-display-hero text-3xl sm:text-5xl lg:text-6xl text-warm-white font-semibold uppercase tracking-tight leading-[1.08]">
            CHOOSE A LANDING SITE.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-container to-secondary">
              CHANGE THE TIME. SEE WHAT HAPPENS.
            </span>
          </h2>
          <p className="font-body-lg text-lg sm:text-xl text-on-surface-variant leading-relaxed font-light">
            Take control of the mission sandbox. Select a candidate touchdown site, set your mission date, and scrub through the day to see solar ray incidence, Earth line-of-sight, and terrain mask occlusion update simultaneously.
          </p>
        </motion.div>

        {/* The Master Interactive Mission Sandbox */}
        <div className="bg-surface-container border border-surface-container-highest p-6 sm:p-8 shadow-2xl flex flex-col gap-8">
          {/* Top Control Bar: Site & Date Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end pb-6 border-b border-surface-container-highest/60">
            {/* Site Picker */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="mission-site-picker" className="font-label-caps text-xs text-outline uppercase font-semibold flex items-center gap-1.5">
                <Compass size={14} className="text-primary" /> CANDIDATE LANDING SITE (7 ARTEMIS & CLPS REGIONS)
              </label>
              <select 
                id="mission-site-picker"
                value={selectedSiteId}
                onChange={(e) => setSelectedSiteId(e.target.value)}
                className="w-full bg-surface-container-lowest text-on-surface p-3 font-telemetry-md text-sm border border-surface-container-highest focus:border-primary outline-none cursor-pointer"
              >
                {LANDING_SITES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.coordinates} // {s.tier})
                  </option>
                ))}
              </select>
            </div>

            {/* Mission Date */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label htmlFor="mission-date-picker" className="font-label-caps text-xs text-outline uppercase font-semibold flex items-center gap-1.5">
                  <Calendar size={14} className="text-secondary" /> TOUCHDOWN EPOCH
                </label>
                <button
                  onClick={handleReset}
                  className="text-xs text-outline hover:text-on-surface flex items-center gap-1 transition-colors"
                  title="Reset to defaults"
                >
                  <RotateCcw size={12} />
                  <span>RESET</span>
                </button>
              </div>
              <input 
                id="mission-date-picker"
                type="date"
                value={epochDate}
                onChange={(e) => setEpochDate(e.target.value)}
                className="w-full bg-surface-container-lowest text-on-surface p-3 font-telemetry-md text-sm border border-surface-container-highest focus:border-primary outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* Time Scrubber (00:00 - 24:00 UTC) */}
          <div className="p-4 bg-surface-container-lowest border border-surface-container-highest flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs font-telemetry-sm">
              <span className="flex items-center gap-1.5 text-secondary font-bold">
                <Clock size={14} className="text-secondary" /> TIME-OF-DAY SCRUBBER:
              </span>
              <span className="text-warm-white font-bold text-sm bg-surface-container-high px-2.5 py-0.5 border border-surface-container-highest">
                {String(Math.floor(timeHour)).padStart(2, '0')}:{String(Math.floor((timeHour % 1) * 60)).padStart(2, '0')} UTC
              </span>
              <span className="text-outline">SCRUB 24H DIURNAL CYCLE</span>
            </div>
            <input 
              type="range"
              min="0"
              max="24"
              step="0.25"
              value={timeHour}
              onChange={(e) => setTimeHour(parseFloat(e.target.value))}
              className="w-full accent-primary h-2 bg-surface-container-high rounded-none cursor-pointer"
            />
          </div>

          {/* Main Visualizer: Polar Sky Reticle + Live Visual Status */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Topocentric Sky Reticle (5 cols) */}
            <div className="lg:col-span-5 bg-surface-container-lowest border border-surface-container-highest p-5 flex flex-col items-center justify-center relative min-h-[340px]">
              <div className="absolute top-3 left-3 text-[10px] font-telemetry-sm text-outline uppercase">
                TOPOCENTRIC SKY RETICLE (SEZ)
              </div>
              <div className="absolute top-3 right-3 text-[10px] font-telemetry-sm text-outline">
                0° TO +10° ELEVATION
              </div>

              {/* The Reticle SVG */}
              <svg width="280" height="280" viewBox="0 0 300 300" className="my-auto">
                {/* Concentric Elevation Rings */}
                <circle cx="150" cy="150" r="115" fill="none" stroke="#2a323d" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="150" cy="150" r="75" fill="none" stroke="#2a323d" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="150" cy="150" r="35" fill="none" stroke="#2a323d" strokeWidth="1" strokeDasharray="3 3" />

                {/* Crosshairs */}
                <line x1="150" y1="20" x2="150" y2="280" stroke="#2a323d" strokeWidth="1" />
                <line x1="20" y1="150" x2="280" y2="150" stroke="#2a323d" strokeWidth="1" />

                {/* Cardinal Direction Labels */}
                <text x="150" y="15" fill="#869392" textAnchor="middle" className="font-telemetry-sm text-[10px] font-bold">N (0°)</text>
                <text x="290" y="154" fill="#869392" textAnchor="end" className="font-telemetry-sm text-[10px] font-bold">E (90°)</text>
                <text x="150" y="295" fill="#869392" textAnchor="middle" className="font-telemetry-sm text-[10px] font-bold">S (180°)</text>
                <text x="10" y="154" fill="#869392" textAnchor="start" className="font-telemetry-sm text-[10px] font-bold">W (270°)</text>

                {/* Ring Degree Labels */}
                <text x="153" y="42" fill="#545c66" className="font-telemetry-sm text-[8px]">+10°</text>
                <text x="153" y="82" fill="#545c66" className="font-telemetry-sm text-[8px]">+5°</text>
                <text x="153" y="122" fill="#545c66" className="font-telemetry-sm text-[8px]">0° (HORIZON)</text>

                {/* Terrain Horizon Mask Peak Marker */}
                <circle cx={maskPeakXY.x} cy={maskPeakXY.y} r="5" fill="#869392" stroke="#ffffff" strokeWidth="1" />
                <text x={maskPeakXY.x + 8} y={maskPeakXY.y + 3} fill="#869392" className="font-telemetry-sm text-[8px]">
                  PEAK (+{site.horizonMaskPeak.elevation}°)
                </text>

                {/* Sun Position Node (Gold) */}
                <circle cx={sunXY.x} cy={sunXY.y} r="8" fill="#f2c66d" />
                <circle cx={sunXY.x} cy={sunXY.y} r="16" fill="#f2c66d" opacity="0.25" className="animate-ping" />
                <text x={sunXY.x + 10} y={sunXY.y - 6} fill="#f2c66d" className="font-telemetry-sm text-[10px] font-bold">
                  SUN ({currentSunEl >= 0 ? `+${currentSunEl.toFixed(1)}°` : `${currentSunEl.toFixed(1)}°`})
                </text>

                {/* Earth Position Node (Cyan) */}
                <circle cx={earthXY.x} cy={earthXY.y} r="7" fill="#58d8d0" stroke="#003734" strokeWidth="1.5" />
                <circle cx={earthXY.x} cy={earthXY.y} r="14" fill="#58d8d0" opacity="0.2" />
                <text x={earthXY.x + 9} y={earthXY.y + 12} fill="#58d8d0" className="font-telemetry-sm text-[10px] font-bold">
                  EARTH ({currentEarthEl >= 0 ? `+${currentEarthEl.toFixed(1)}°` : `${currentEarthEl.toFixed(1)}°`})
                </text>

                {/* Observer at Center */}
                <circle cx="150" cy="150" r="3" fill="#ffffff" />
              </svg>
            </div>

            {/* Right: Site Visual & Live Telemetry Readout (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              {/* Site Picture & Identity */}
              <div className="flex flex-col sm:flex-row gap-4 bg-surface-container-low p-4 border border-surface-container-highest items-start sm:items-center">
                <div className="relative w-full sm:w-40 h-28 shrink-0 overflow-hidden border border-surface-container-highest">
                  <img 
                    src={getSiteImage(site.id)} 
                    alt={site.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-black/80 text-[9px] font-telemetry-sm text-primary uppercase">
                    {site.tier}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="font-headline-sm text-xl text-warm-white font-bold">{site.name}</h3>
                  <span className="font-telemetry-sm text-xs text-outline">
                    COORDINATES: {site.coordinates} // ELEVATION: {site.elevationMeters}m
                  </span>
                  <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2 mt-1">
                    {site.description}
                  </p>
                </div>
              </div>

              {/* Status Verdict Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Solar Status */}
                <div className="p-4 bg-surface-container-low border border-surface-container-highest flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-telemetry-sm">
                    <span className="text-secondary font-bold flex items-center gap-1.5">
                      <Sun size={14} /> SOLAR STATUS
                    </span>
                    <span className="font-mono text-outline">{currentSunAz.toFixed(1)}° AZ / {currentSunEl.toFixed(2)}° EL</span>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    {isSunOccluded ? (
                      <>
                        <AlertOctagon size={16} className="text-alert-coral shrink-0" />
                        <span className="font-telemetry-md text-xs font-bold text-alert-coral">
                          OCCLUDED BY LOCAL RELIEF
                        </span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={16} className="text-secondary shrink-0" />
                        <span className="font-telemetry-md text-xs font-bold text-secondary">
                          DIRECT GRAZING SUNLIGHT
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Earth DTE Status */}
                <div className="p-4 bg-surface-container-low border border-surface-container-highest flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-telemetry-sm">
                    <span className="text-primary font-bold flex items-center gap-1.5">
                      <Globe size={14} /> EARTH DTE STATUS
                    </span>
                    <span className="font-mono text-outline">{currentEarthAz.toFixed(1)}° AZ / {currentEarthEl.toFixed(2)}° EL</span>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    {isEarthOccluded ? (
                      <>
                        <AlertOctagon size={16} className="text-alert-coral shrink-0" />
                        <span className="font-telemetry-md text-xs font-bold text-alert-coral">
                          OCCLUDED BY RIM MASSIF
                        </span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={16} className="text-primary shrink-0" />
                        <span className="font-telemetry-md text-xs font-bold text-primary">
                          UNOBSTRUCTED DSN LOCK
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* 4 Summary Numbers */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-telemetry-sm">
                <div className="p-3 bg-surface-container-lowest border border-surface-container-highest flex flex-col">
                  <span className="text-outline uppercase text-[10px]">28D SOLAR FLUX</span>
                  <span className="font-bold text-secondary text-sm">{site.solarFlux28d}%</span>
                </div>
                <div className="p-3 bg-surface-container-lowest border border-surface-container-highest flex flex-col">
                  <span className="text-outline uppercase text-[10px]">DTE VISIBILITY</span>
                  <span className="font-bold text-primary text-sm">{site.dteLineOfSightPct}</span>
                </div>
                <div className="p-3 bg-surface-container-lowest border border-surface-container-highest flex flex-col">
                  <span className="text-outline uppercase text-[10px]">JOINT OVERLAP</span>
                  <span className="font-bold text-emerald-400 text-sm">{site.continuousOverlapHours}h</span>
                </div>
                <div className="p-3 bg-surface-container-lowest border border-surface-container-highest flex flex-col">
                  <span className="text-outline uppercase text-[10px]">PEAK MASK</span>
                  <span className="font-bold text-warm-white text-sm">+{site.horizonMaskPeak.elevation}°</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progressive Disclosure: Advanced Scientific Telemetry Drawer */}
          <div className="w-full pt-2">
            <button
              onClick={() => setShowAdvancedTelemetry(!showAdvancedTelemetry)}
              className="w-full py-3.5 px-6 bg-surface-container-high hover:bg-surface-container-highest transition-all border border-surface-container-highest flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles size={16} className="text-primary" />
                <span className="font-telemetry-md text-xs uppercase tracking-wider text-on-surface font-semibold">
                  {showAdvancedTelemetry ? 'HIDE DETAILED TOPOGRAPHIC & ROVER TELEMETRY' : 'REVEAL DETAILED TOPOGRAPHIC & ROVER TELEMETRY'}
                </span>
              </div>
              {showAdvancedTelemetry ? <ChevronUp size={16} className="text-primary" /> : <ChevronDown size={16} className="text-primary" />}
            </button>

            <AnimatePresence>
              {showAdvancedTelemetry && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden bg-surface-container-low border-x border-b border-surface-container-highest p-6 flex flex-col gap-5 text-xs font-telemetry-sm"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-surface-container-lowest border border-surface-container-highest flex flex-col gap-1">
                      <span className="text-outline uppercase">TERRAIN SLOPE & RISK:</span>
                      <span className="font-bold text-warm-white">{site.slopeDegrees} ({site.terrainSlopeRisk})</span>
                      <p className="text-on-surface-variant text-[11px] font-body-sm mt-1">
                        Slopes &gt; 15° challenge autonomous hazard detection during terminal descent and limit rover traverse velocity.
                      </p>
                    </div>

                    <div className="p-3 bg-surface-container-lowest border border-surface-container-highest flex flex-col gap-1">
                      <span className="text-outline uppercase">PSR ICE PROXIMITY:</span>
                      <span className="font-bold text-emerald-400">{site.psrIceProximity}</span>
                      <p className="text-on-surface-variant text-[11px] font-body-sm mt-1">
                        Distance to nearest cryogenic volatile cold trap for in-situ resource utilization (ISRU) sampling.
                      </p>
                    </div>

                    <div className="p-3 bg-surface-container-lowest border border-surface-container-highest flex flex-col gap-1">
                      <span className="text-outline uppercase">ROVER MOBILITY RATING:</span>
                      <span className="font-bold text-primary">{site.roverMobilityRating}</span>
                      <p className="text-on-surface-variant text-[11px] font-body-sm mt-1">
                        Traversability index considering boulder distribution, loose regolith sinkage, and crater micro-relief.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-surface-container-lowest border border-surface-container-highest text-[11px] text-outline flex items-center justify-between">
                    <span>SELENOGRAPHIC DATUM: MOON_ME // TOPOCENTRIC SEZ COORDINATE TRANSFORMATION</span>
                    <span className="text-secondary font-medium">EDUCATIONAL DEMONSTRATION PROTOTYPE</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

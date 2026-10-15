import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, AlertTriangle, RotateCcw, Compass, Sun, Mountain, Layers, Eye } from 'lucide-react';

interface Preset {
  id: string;
  label: string;
  sunEl: number;
  maskEl: number;
  az: number;
  description: string;
}

const PRESETS: Preset[] = [
  { 
    id: 'mid-lat', 
    label: '30° Mid-Lat Sun', 
    sunEl: 30.0, 
    maskEl: 2.0, 
    az: 90.0,
    description: 'Sub-equatorial condition where the Sun easily clears all local topography.' 
  },
  { 
    id: 'polar-low', 
    label: 'Low Polar Sun (+1.2°)', 
    sunEl: 1.2, 
    maskEl: 7.2, 
    az: 143.0,
    description: 'Typical south pole condition where a distant crater rim casts a deep shadow.' 
  },
  { 
    id: 'geom-zero', 
    label: '0° Geometric Horizon', 
    sunEl: 0.0, 
    maskEl: 4.5, 
    az: 210.0,
    description: 'Sun tangent to the smooth lunar sphere but blocked by the elevated crater crest.' 
  },
  { 
    id: 'sub-horizon', 
    label: '-2.5° Sub-Horizon', 
    sunEl: -2.5, 
    maskEl: 3.0, 
    az: 315.0,
    description: 'Sun below the geometric horizon and completely occluded in lunar night.' 
  },
];

export const LightGeometry: React.FC = () => {
  const [sunEl, setSunEl] = useState<number>(1.2);
  const [maskEl, setMaskEl] = useState<number>(7.2);
  const [az, setAz] = useState<number>(143.0);

  // Clearance delta calculation: Δθ = θ_sun - θ_mask
  const delta = sunEl - maskEl;
  const isClear = delta > 0.05;
  const isBoundary = Math.abs(delta) <= 0.05;

  // Active preset matching
  const activePreset = PRESETS.find(
    (p) => Math.abs(p.sunEl - sunEl) < 0.05 && Math.abs(p.maskEl - maskEl) < 0.05 && Math.abs(p.az - az) < 0.5
  );

  // Elevation to SVG Y-coordinate mapping:
  // Base 0.0° datum is at y = 165px.
  // For -5° to +10°: 8.0px per degree.
  // For +10° to +35°: gentle compression at 2.4px per degree.
  const getElevationY = (el: number): number => {
    if (el <= 10.0) {
      return 165 - (el * 8.0);
    }
    return 85 - ((el - 10.0) * 2.4);
  };

  const sunY = Math.max(18, Math.min(215, getElevationY(sunEl)));
  const maskY = Math.max(25, Math.min(185, getElevationY(maskEl)));

  const handleApplyPreset = (p: Preset) => {
    setSunEl(p.sunEl);
    setMaskEl(p.maskEl);
    setAz(p.az);
  };

  const handleReset = () => {
    setSunEl(1.2);
    setMaskEl(7.2);
    setAz(143.0);
  };

  return (
    <section 
      id="light-geometry" 
      className="w-full py-20 px-4 sm:px-margin-tablet lg:px-margin-desktop bg-[#08090C] border-b border-[#2A323D]/60 text-[#E6E9F0]"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Section Header & Scientific Premise */}
        <motion.div 
          className="flex flex-col gap-3 max-w-4xl"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF9D] animate-pulse" />
            <span className="font-label-caps text-label-caps text-[#00FF9D] tracking-widest uppercase font-semibold">
              SOLAR GEOMETRY / 03
            </span>
          </div>

          <h2 className="font-headline-lg text-2xl sm:text-4xl lg:text-5xl text-[#E6E9F0] font-semibold uppercase tracking-tight">
            KNOWING WHERE THE SUN IS IS ONLY THE BEGINNING.
          </h2>

          <p className="font-body-lg text-base sm:text-lg text-[#9DA4AD] max-w-3xl leading-relaxed font-light">
            Standard celestial mechanics describe solar coordinates against an idealized, smooth sphere. On the actual lunar surface, operational visibility is strictly governed by the physical contest between celestial elevation and local topographic relief.
          </p>
        </motion.div>

        {/* 4 Core Definitions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div 
            className="p-5 bg-[#0D1017] border border-[#2A323D] flex flex-col gap-2 hover:border-[#00FF9D]/40 transition-colors"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center justify-between text-xs font-telemetry-sm text-[#FFB800] uppercase font-bold">
              <span className="flex items-center gap-1.5"><Sun size={13} /> ELEVATION</span>
              <span>θ_sun</span>
            </div>
            <span className="font-headline-sm text-base text-[#E6E9F0] font-semibold">
              Angular Altitude
            </span>
            <p className="font-body-sm text-xs text-[#9DA4AD] leading-relaxed">
              Vertical angular distance measured between the local horizontal tangent plane (0°) and the target celestial body center.
            </p>
          </motion.div>

          <motion.div 
            className="p-5 bg-[#0D1017] border border-[#2A323D] flex flex-col gap-2 hover:border-[#00FF9D]/40 transition-colors"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between text-xs font-telemetry-sm text-[#00FF9D] uppercase font-bold">
              <span className="flex items-center gap-1.5"><Compass size={13} /> AZIMUTH</span>
              <span>ϕ_sun</span>
            </div>
            <span className="font-headline-sm text-base text-[#E6E9F0] font-semibold">
              Compass Bearing
            </span>
            <p className="font-body-sm text-xs text-[#9DA4AD] leading-relaxed">
              Horizontal bearing clockwise in the local tangent plane: 0° = North, 90° = East, 180° = South, 270° = West.
            </p>
          </motion.div>

          <motion.div 
            className="p-5 bg-[#0D1017] border border-[#2A323D] flex flex-col gap-2 hover:border-[#00FF9D]/40 transition-colors"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-between text-xs font-telemetry-sm text-[#E6E9F0] uppercase font-bold">
              <span className="flex items-center gap-1.5"><Layers size={13} /> GEOMETRIC HORIZON</span>
              <span>0.00°</span>
            </div>
            <span className="font-headline-sm text-base text-[#E6E9F0] font-semibold">
              Idealized Sphere Limit
            </span>
            <p className="font-body-sm text-xs text-[#9DA4AD] leading-relaxed">
              The 0° elevation plane tangent to a smooth lunar mean sphere without topographic massifs, boulders, or crater rims.
            </p>
          </motion.div>

          <motion.div 
            className="p-5 bg-[#0D1017] border border-[#2A323D] flex flex-col gap-2 hover:border-[#00FF9D]/40 transition-colors"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center justify-between text-xs font-telemetry-sm text-[#FFB800] uppercase font-bold">
              <span className="flex items-center gap-1.5"><Mountain size={13} /> TERRAIN HORIZON</span>
              <span>θ_mask</span>
            </div>
            <span className="font-headline-sm text-base text-[#E6E9F0] font-semibold">
              Actual Topographic Mask
            </span>
            <p className="font-body-sm text-xs text-[#9DA4AD] leading-relaxed">
              The true angular obstruction profile generated by crater walls, peaks, and boulders across all 360° of azimuth.
            </p>
          </motion.div>
        </div>

        {/* Master Simulation Lab Panel */}
        <motion.div 
          className="bg-[#0B0E14] border border-[#2A323D] p-5 sm:p-7 shadow-2xl flex flex-col gap-6 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
        >
          {/* Top Lab Header & Scenario Presets */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#2A323D]/60">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9D] animate-ping" />
                <span className="font-label-caps text-xs text-[#00FF9D] uppercase tracking-widest font-bold">
                  INTERACTIVE SIMULATION LAB
                </span>
              </div>
              <h3 className="font-headline-md text-xl sm:text-2xl text-[#E6E9F0] font-semibold uppercase tracking-tight">
                Solar Elevation vs. Topographic Mask Resolver
              </h3>
            </div>

            {/* Presets & Reset Control */}
            <div className="flex flex-wrap items-center gap-2">
              {PRESETS.map((p) => {
                const isActive = activePreset?.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleApplyPreset(p)}
                    className={`px-3 py-1.5 text-xs font-telemetry-sm transition-all border cursor-pointer select-none ${
                      isActive 
                        ? 'bg-[#00FF9D]/15 text-[#00FF9D] border-[#00FF9D] font-bold shadow-[0_0_12px_rgba(0,255,157,0.35)]'
                        : 'bg-[#121620] text-[#9DA4AD] hover:text-[#E6E9F0] hover:bg-[#181D2A] border-[#2A323D]'
                    }`}
                    title={p.description}
                    aria-label={`Apply preset: ${p.label}`}
                  >
                    {p.label}
                  </button>
                );
              })}

              <button
                onClick={handleReset}
                className="p-2 bg-[#121620] hover:bg-[#181D2A] text-[#9DA4AD] hover:text-[#E6E9F0] border border-[#2A323D] transition-colors cursor-pointer"
                title="Reset simulation parameters to default (+1.2° / +7.2° / 143°)"
                aria-label="Reset simulation parameters"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>

          {/* Two-Column Simulation Workstation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* LEFT PANEL — TERRAIN VISUALIZATION (~60% Desktop) */}
            <div className="lg:col-span-7 bg-[#08090C] border border-[#2A323D]/80 p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden select-none">
              {/* Vertical Slice Telemetry Bar */}
              <div className="flex flex-wrap items-center justify-between text-xs font-telemetry-sm text-[#9DA4AD] pb-3 border-b border-[#2A323D]/40 gap-2">
                <span className="flex items-center gap-1.5">
                  <Eye size={12} className="text-[#00FF9D]" />
                  <span>LOCAL TOPOCENTRIC VERTICAL SLICE (AZIMUTH: <strong className="text-[#E6E9F0] font-semibold">{az.toFixed(1)}°</strong>)</span>
                </span>
                <span className="text-[11px] text-[#545C66] uppercase">GRID INTERVAL: 2.0°</span>
              </div>

              {/* Dynamic SVG Vector Horizon Canvas */}
              <div className="relative w-full h-[270px] sm:h-[310px] my-auto flex items-center justify-center">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 640 240" preserveAspectRatio="none">
                  <defs>
                    {/* Dark Regolith Gradient */}
                    <linearGradient id="terrainDarkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#1C212B" />
                      <stop offset="100%" stopColor="#0B0E14" />
                    </linearGradient>

                    {/* Solar Glow Filter */}
                    <filter id="solarGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* 1. Base Lunar Ground Foundation Block */}
                  <rect x="40" y="165" width="560" height="70" fill="#0B0E14" />

                  {/* 2. Grid Reference Lines */}
                  {/* +10.0° Elevation Line */}
                  <line x1="40" y1="85" x2="600" y2="85" stroke="#2A323D" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                  <text x="45" y="80" fill="#545C66" className="font-telemetry-sm text-[9px]">+10.0° ELEVATION</text>

                  {/* +5.0° Elevation Line */}
                  <line x1="40" y1="125" x2="600" y2="125" stroke="#2A323D" strokeWidth="1" strokeDasharray="3 3" opacity="0.8" />
                  <text x="45" y="120" fill="#545C66" className="font-telemetry-sm text-[9px]">+5.0° ELEVATION</text>

                  {/* 0.0° Geometric Horizon Line (Stellar Quartz, Dashed) */}
                  <line x1="40" y1="165" x2="600" y2="165" stroke="#E6E9F0" strokeWidth="1.2" strokeDasharray="5 4" opacity="0.5" />
                  <text x="45" y="160" fill="#E6E9F0" className="font-telemetry-sm text-[9px] font-semibold opacity-80">
                    0.0° GEOMETRIC HORIZON
                  </text>

                  {/* 3. Topographic Crater Ridge Polygon (Dynamic SVG Curve) */}
                  <path 
                    d={`M 40 165 Q 260 165 400 ${maskY} L 600 165 L 600 235 L 40 235 Z`} 
                    fill="url(#terrainDarkGrad)" 
                    stroke="#E6E9F0" 
                    strokeWidth="1.5" 
                    className="transition-all duration-300 ease-out"
                  />

                  {/* Ridge Peak Height Marker & Label */}
                  <line x1="400" y1="165" x2="400" y2={maskY} stroke="#FFB800" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
                  <circle cx="400" cy={maskY} r="5" fill="#E6E9F0" stroke="#FFB800" strokeWidth="2" className="transition-all duration-300 ease-out" />
                  <text 
                    x="410" 
                    y={maskY - 6} 
                    fill="#E6E9F0" 
                    className="font-telemetry-sm text-[10px] font-bold transition-all duration-300 ease-out"
                  >
                    TERRAIN MASK (+{maskEl.toFixed(1)}°)
                  </text>

                  {/* 4. CLPS Surface Lander Assembly */}
                  {/* Lander Chassis */}
                  <rect x="96" y="150" width="32" height="15" fill="#171B20" stroke="#E6E9F0" strokeWidth="1.5" rx="1" />
                  {/* Lander Legs */}
                  <line x1="96" y1="162" x2="88" y2="165" stroke="#E6E9F0" strokeWidth="1.5" />
                  <line x1="128" y1="162" x2="136" y2="165" stroke="#E6E9F0" strokeWidth="1.5" />
                  {/* Mast and Receiver Antenna (Observer Node) */}
                  <line x1="112" y1="150" x2="112" y2="142" stroke="#00FF9D" strokeWidth="2" />
                  <circle cx="112" cy="142" r="3.5" fill="#00FF9D" filter="drop-shadow(0 0 6px rgba(0,255,157,0.8))" />
                  <text x="82" y="180" fill="#E6E9F0" className="font-telemetry-sm text-[9px] font-bold tracking-wider">
                    CLPS LANDER
                  </text>

                  {/* 5. Incident Solar Ray Vector */}
                  {/* If clear: Solid Solar Amber. If occluded: Dashed Amber/Coral */}
                  <line 
                    x1="112" 
                    y1="142" 
                    x2="550" 
                    y2={sunY} 
                    stroke={isClear ? "#FFB800" : "#FF7777"} 
                    strokeWidth="2.5" 
                    strokeDasharray={isClear ? "none" : "5 3"} 
                    opacity={isClear ? 1.0 : 0.75}
                    className="transition-all duration-300 ease-out"
                  />

                  {/* 6. The Sun Marker (Dynamic Position and Solar Glow) */}
                  <circle 
                    cx="550" 
                    cy={sunY} 
                    r="12" 
                    fill="#FFB800" 
                    filter="url(#solarGlow)" 
                    className="transition-all duration-300 ease-out"
                  />
                  <circle 
                    cx="550" 
                    cy={sunY} 
                    r="18" 
                    fill="#FFB800" 
                    opacity="0.25"
                    className="transition-all duration-300 ease-out animate-pulse"
                  />
                  <text 
                    x="480" 
                    y={sunY - 16} 
                    fill="#FFB800" 
                    className="font-telemetry-sm text-[11px] font-bold transition-all duration-300 ease-out"
                  >
                    SUN ({sunEl >= 0 ? '+' : ''}{sunEl.toFixed(1)}°)
                  </text>
                </svg>
              </div>

              {/* Scientific Color Legend */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#2A323D]/50 text-[10px] font-telemetry-sm text-[#9DA4AD]">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-[#FFB800]" />
                  <span>SOLAR RAY (AMBER)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-[#E6E9F0] border-t border-dashed" />
                  <span>GEOMETRIC HORIZON (QUARTZ)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-2 bg-[#1C212B] border border-[#E6E9F0]" />
                  <span>TERRAIN PROFILE</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00FF9D]" />
                  <span>VISIBLE STATE (EMERALD)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-[#FF7777] border-t border-dashed" />
                  <span>OCCLUSION / WARNING</span>
                </span>
              </div>
            </div>

            {/* RIGHT PANEL — SIMULATOR TELEMETRY (~40% Desktop) */}
            <div className="lg:col-span-5 bg-[#0D1017] border border-[#2A323D] p-5 sm:p-6 flex flex-col justify-between gap-5 select-none">
              {/* Dynamic Visibility Status Header */}
              <div className="flex flex-col gap-2">
                <span className="font-label-caps text-xs text-[#9DA4AD] uppercase font-semibold">
                  SIMULATOR TELEMETRY
                </span>

                <div className={`p-3.5 border flex items-center justify-between gap-3 transition-colors duration-300 ${
                  isClear
                    ? 'bg-[#00FF9D]/10 border-[#00FF9D]/50 shadow-[0_0_15px_rgba(0,255,157,0.15)]'
                    : isBoundary
                    ? 'bg-[#FFB800]/10 border-[#FFB800]/50 shadow-[0_0_15px_rgba(255,184,0,0.15)]'
                    : 'bg-[#FF7777]/10 border-[#FF7777]/50 shadow-[0_0_15px_rgba(255,119,119,0.15)]'
                }`}>
                  <div className="flex items-center gap-2.5">
                    {isClear ? (
                      <CheckCircle2 size={18} className="text-[#00FF9D] shrink-0" />
                    ) : (
                      <AlertTriangle size={18} className={`shrink-0 ${isBoundary ? 'text-[#FFB800]' : 'text-[#FF7777]'}`} />
                    )}
                    <div className="flex flex-col">
                      <span className={`font-label-caps text-xs font-bold tracking-wider ${
                        isClear ? 'text-[#00FF9D]' : isBoundary ? 'text-[#FFB800]' : 'text-[#FF7777]'
                      }`}>
                        {isClear 
                          ? 'DIRECT SUNLIGHT AVAILABLE' 
                          : isBoundary 
                          ? 'CRITICAL HORIZON BOUNDARY' 
                          : 'TERRAIN OCCLUSION (SHADOW)'}
                      </span>
                      <span className="text-[11px] text-[#E6E9F0]/80 font-mono">
                        {isClear 
                          ? 'SUN CLEAR OF MODELED TERRAIN' 
                          : isBoundary 
                          ? 'SUN AT TERRAIN-HORIZON BOUNDARY' 
                          : 'SUN OCCLUDED BY MODELED TERRAIN'}
                      </span>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 text-[10px] font-telemetry-sm font-bold border uppercase shrink-0 ${
                    isClear 
                      ? 'bg-[#00FF9D]/20 text-[#00FF9D] border-[#00FF9D]/40' 
                      : isBoundary 
                      ? 'bg-[#FFB800]/20 text-[#FFB800] border-[#FFB800]/40' 
                      : 'bg-[#FF7777]/20 text-[#FF7777] border-[#FF7777]/40'
                  }`}>
                    {isClear ? 'CLEAR' : isBoundary ? 'GRAZE' : 'BLOCKED'}
                  </span>
                </div>
              </div>

              {/* 4-Tile Numerical Telemetry Grid */}
              <div className="grid grid-cols-2 gap-3 tabular-nums">
                {/* 1. Solar Elevation */}
                <div className="p-3 bg-[#08090C] border border-[#2A323D] flex flex-col gap-0.5">
                  <span className="font-label-caps text-[10px] text-[#9DA4AD] uppercase tracking-wider">
                    SOLAR ELEVATION (EL_SUN)
                  </span>
                  <span className="font-telemetry-lg text-xl sm:text-2xl text-[#FFB800] font-bold">
                    {sunEl >= 0 ? '+' : ''}{sunEl.toFixed(2)}°
                  </span>
                </div>

                {/* 2. Terrain Mask */}
                <div className="p-3 bg-[#08090C] border border-[#2A323D] flex flex-col gap-0.5">
                  <span className="font-label-caps text-[10px] text-[#9DA4AD] uppercase tracking-wider">
                    TERRAIN MASK (MASK_EL)
                  </span>
                  <span className="font-telemetry-lg text-xl sm:text-2xl text-[#E6E9F0] font-bold">
                    +{maskEl.toFixed(2)}°
                  </span>
                </div>

                {/* 3. Solar Azimuth */}
                <div className="p-3 bg-[#08090C] border border-[#2A323D] flex flex-col gap-0.5">
                  <span className="font-label-caps text-[10px] text-[#9DA4AD] uppercase tracking-wider">
                    SOLAR AZIMUTH (AZ_SUN)
                  </span>
                  <span className="font-telemetry-lg text-xl sm:text-2xl text-[#00FF9D] font-bold">
                    {az.toFixed(1)}°
                  </span>
                </div>

                {/* 4. Clearance Delta */}
                <div className="p-3 bg-[#08090C] border border-[#2A323D] flex flex-col gap-0.5">
                  <span className="font-label-caps text-[10px] text-[#9DA4AD] uppercase tracking-wider">
                    CLEARANCE DELTA (Δθ)
                  </span>
                  <span className={`font-telemetry-lg text-xl sm:text-2xl font-bold ${
                    isClear ? 'text-[#00FF9D]' : isBoundary ? 'text-[#FFB800]' : 'text-[#FF7777]'
                  }`}>
                    {delta >= 0 ? '+' : ''}{delta.toFixed(2)}°
                  </span>
                </div>
              </div>

              {/* 3 Interactive Precision Range Sliders */}
              <div className="flex flex-col gap-4 pt-3 border-t border-[#2A323D]/60">
                {/* Control A: Solar Elevation Slider */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs font-telemetry-sm">
                    <label htmlFor="sun-el-slider" className="text-[#E6E9F0] font-medium">
                      Adjust Solar Elevation:
                    </label>
                    <span className="text-[#FFB800] font-bold font-mono text-sm">
                      {sunEl >= 0 ? '+' : ''}{sunEl.toFixed(1)}°
                    </span>
                  </div>
                  <input 
                    id="sun-el-slider"
                    type="range" 
                    min="-5.0" 
                    max="35.0" 
                    step="0.1" 
                    value={sunEl}
                    onChange={(e) => setSunEl(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-[#1C212B] appearance-none cursor-pointer accent-[#FFB800]"
                    aria-label="Solar Elevation"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#545C66]">
                    <span>-5° (Deep Night)</span>
                    <span>0° (Horizon)</span>
                    <span>+35° (Sub-Equatorial)</span>
                  </div>
                </div>

                {/* Control B: Crater Ridge Elevation Slider */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs font-telemetry-sm">
                    <label htmlFor="mask-el-slider" className="text-[#E6E9F0] font-medium">
                      Adjust Crater Ridge Elevation:
                    </label>
                    <span className="text-[#E6E9F0] font-bold font-mono text-sm">
                      +{maskEl.toFixed(1)}°
                    </span>
                  </div>
                  <input 
                    id="mask-el-slider"
                    type="range" 
                    min="0.0" 
                    max="15.0" 
                    step="0.1" 
                    value={maskEl}
                    onChange={(e) => setMaskEl(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-[#1C212B] appearance-none cursor-pointer accent-[#E6E9F0]"
                    aria-label="Crater Ridge Elevation Mask"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#545C66]">
                    <span>0° (Flat Plateau)</span>
                    <span>+7.5° (Crater Wall)</span>
                    <span>+15° (Massif Crest)</span>
                  </div>
                </div>

                {/* Control C: Solar Azimuth Angle Slider */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs font-telemetry-sm">
                    <label htmlFor="az-slider" className="text-[#E6E9F0] font-medium">
                      Adjust Solar Azimuth Angle:
                    </label>
                    <span className="text-[#00FF9D] font-bold font-mono text-sm">
                      {az.toFixed(0)}°
                    </span>
                  </div>
                  <input 
                    id="az-slider"
                    type="range" 
                    min="0" 
                    max="360" 
                    step="1" 
                    value={az}
                    onChange={(e) => setAz(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-[#1C212B] appearance-none cursor-pointer accent-[#00FF9D]"
                    aria-label="Solar Azimuth Angle"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#545C66]">
                    <span>0° (N)</span>
                    <span>90° (E)</span>
                    <span>180° (S)</span>
                    <span>270° (W)</span>
                    <span>360° (N)</span>
                  </div>
                </div>
              </div>

              {/* Scientific Disclosure Note */}
              <div className="pt-2 border-t border-[#2A323D]/40 text-[10px] font-mono text-[#9DA4AD] leading-relaxed">
                <span>
                  DISCLOSURE: Ridge elevation represents the modeled terrain mask along azimuth {az.toFixed(0)}°. Evaluated as an illustrative point-source Sun center comparison; physical visibility models also resolve the finite 0.53° solar disc diameter.
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

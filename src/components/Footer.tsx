import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black text-white/70 border-t border-white/15">
      <div className="w-full px-4 sm:px-8 lg:px-16 py-16 max-w-7xl mx-auto">
        {/* Top bar with system status */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-8 mb-12 gap-4 border-b border-white/15">
          <div className="flex items-center gap-4">
            <span className="font-display-hero text-lg text-white tracking-[0.16em] font-bold uppercase">
              LUNARIS TELEMETRY CORE
            </span>
            <span className="font-mono text-[10px] text-white/40 tracking-[0.2em] uppercase">
              REVISION 2026.4
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black border border-white/20 text-white font-mono text-[11px]">
            <span className="w-2 h-2 bg-[#00FF9D] animate-pulse" />
            <span className="font-semibold tracking-[0.15em] uppercase">
              SYSTEM STATUS: NOMINAL // ALL KERNELS ONLINE
            </span>
          </div>
        </div>

        {/* 5-Column Link Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[11px] text-white uppercase tracking-[0.2em] font-bold">
              Mission Analysis
            </span>
            <a href="#mission-browser" className="font-mono text-[11px] text-white/60 hover:text-white transition-colors">
              CLPS Trajectory Sims
            </a>
            <a href="#mission-browser" className="font-mono text-[11px] text-white/60 hover:text-white transition-colors">
              Site Visibility Fields
            </a>
            <a href="#mission-browser" className="font-mono text-[11px] text-white/60 hover:text-white transition-colors">
              Sun / Earth Azimuth
            </a>
            <a href="#chapter-problem" className="font-mono text-[11px] text-white/60 hover:text-white transition-colors">
              Thermal Equilibrium
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-[11px] text-white uppercase tracking-[0.2em] font-bold">
              Scientific Ephemeris
            </span>
            <a href="https://ssd.jpl.nasa.gov/horizons/" target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-white/60 hover:text-white transition-colors">
              JPL Horizons System
            </a>
            <a href="https://naif.jpl.nasa.gov/naif/" target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-white/60 hover:text-white transition-colors">
              NAIF SPICE Toolkit
            </a>
            <a href="https://pds-geosciences.wustl.edu/" target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-white/60 hover:text-white transition-colors">
              DE-440 Planetary State
            </a>
            <a href="#chapter-science" className="font-mono text-[11px] text-white/60 hover:text-white transition-colors">
              Libration Matrices
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-[11px] text-white uppercase tracking-[0.2em] font-bold">
              Topography &amp; Datasets
            </span>
            <a href="https://trek.nasa.gov/moon/" target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-white/60 hover:text-white transition-colors">
              NASA Moon Trek
            </a>
            <a href="https://pds.nasa.gov/" target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-white/60 hover:text-white transition-colors">
              PDS LOLA Elevation
            </a>
            <a href="https://www.lroc.asu.edu/" target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-white/60 hover:text-white transition-colors">
              LROC NAC Orthomosaics
            </a>
            <a href="#light-geometry" className="font-mono text-[11px] text-white/60 hover:text-white transition-colors">
              PSR Shadow Polygons
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-[11px] text-white uppercase tracking-[0.2em] font-bold">
              Educational Tools
            </span>
            <a href="#light-geometry" className="font-mono text-[11px] text-white/60 hover:text-white transition-colors">
              Interactive Solar Resolver
            </a>
            <a href="#chapter-science" className="font-mono text-[11px] text-white/60 hover:text-white transition-colors">
              Astrodynamics Glossary
            </a>
            <a href="#chapter-science" className="font-mono text-[11px] text-white/60 hover:text-white transition-colors">
              Knowledge Check Exam
            </a>
            <a href="#chapter-problem" className="font-mono text-[11px] text-white/60 hover:text-white transition-colors">
              Polar Geometry Brief
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-[11px] text-white uppercase tracking-[0.2em] font-bold">
              Standards &amp; Integrity
            </span>
            <a href="#chapter-science" className="font-mono text-[11px] text-white/60 hover:text-white transition-colors">
              IAU Coordinate Frames
            </a>
            <a href="#chapter-science" className="font-mono text-[11px] text-white/60 hover:text-white transition-colors">
              Kernel Checksum Manifest
            </a>
            <a href="https://www.spaceappschallenge.org/" target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-white/60 hover:text-white transition-colors">
              NASA Space Apps 2026
            </a>
            <a href="#chapter-science" className="font-mono text-[11px] text-white/60 hover:text-white transition-colors">
              Reproducibility Notes
            </a>
          </div>
        </div>

        {/* Bottom copyright and disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-white/10">
          <p className="font-mono text-[11px] text-white/50 max-w-4xl leading-relaxed">
            LUNARIS is an independent scientific educational and mission analysis application developed for the 2026 NASA Space Apps Challenge. Not an official NASA service. Scientific conclusions depend on selected DEM resolution, ephemeris kernels (JPL Horizons/NAIF SPICE), and observer horizon modeling assumptions.
          </p>
          <div className="flex items-center gap-4 shrink-0">
            <span className="font-mono text-[10px] text-white/40 tracking-[0.2em] uppercase">
              © 2026 LUNARIS PROJECT // OPEN AEROSPACE
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

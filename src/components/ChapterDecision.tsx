import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GitCompare, Compass, CheckCircle2 } from 'lucide-react';
import { LANDING_SITES } from '../data/missionData';
import { IMAGES } from '../data/images';
import type { LandingSite } from '../types/mission';

export const ChapterDecision: React.FC = () => {
  const [siteAId, setSiteAId] = useState<string>('shackleton');
  const [siteBId, setSiteBId] = useState<string>('malapert');

  const siteA: LandingSite = LANDING_SITES.find(s => s.id === siteAId) || LANDING_SITES[0];
  const siteB: LandingSite = LANDING_SITES.find(s => s.id === siteBId) || LANDING_SITES[1];

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

  return (
    <section id="chapter-decision" className="w-full py-20 px-4 sm:px-margin-tablet lg:px-margin-desktop bg-surface border-b border-surface-container-highest/50">
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
            CHAPTER 07 — THE DECISION
          </span>
          <h2 className="font-display-hero text-3xl sm:text-5xl lg:text-6xl text-warm-white font-semibold uppercase tracking-tight leading-[1.08]">
            THERE IS NO UNIVERSALLY<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-warm-white to-primary">
              BEST LANDING SITE.
            </span>
          </h2>
          <p className="font-body-lg text-lg sm:text-xl text-on-surface-variant leading-relaxed font-light">
            Every landing location represents an architectural compromise. A crest offering 86% solar illumination may face steep 30° crater slopes and intermittent Earth communication, while an elevated mountain peak with continuous Earth contact receives less sunlight.
          </p>
        </motion.div>

        {/* Dual Site Comparison Experiment */}
        <div className="bg-surface-container border border-surface-container-highest p-6 sm:p-8 shadow-2xl flex flex-col gap-8">
          {/* Site Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-surface-container-highest/60">
            <div className="flex flex-col gap-2">
              <label htmlFor="select-site-a" className="font-label-caps text-xs text-secondary uppercase font-semibold flex items-center gap-1.5">
                <Compass size={14} className="text-secondary" /> PRIMARY CANDIDATE (SITE A)
              </label>
              <select
                id="select-site-a"
                value={siteAId}
                onChange={(e) => setSiteAId(e.target.value)}
                className="w-full bg-surface-container-lowest text-on-surface p-3 font-telemetry-md text-sm border border-surface-container-highest focus:border-secondary outline-none cursor-pointer"
              >
                {LANDING_SITES.map((site) => (
                  <option key={site.id} value={site.id}>
                    {site.name} ({site.coordinates})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="select-site-b" className="font-label-caps text-xs text-primary uppercase font-semibold flex items-center gap-1.5">
                <GitCompare size={14} className="text-primary" /> COMPARISON CANDIDATE (SITE B)
              </label>
              <select
                id="select-site-b"
                value={siteBId}
                onChange={(e) => setSiteBId(e.target.value)}
                className="w-full bg-surface-container-lowest text-on-surface p-3 font-telemetry-md text-sm border border-surface-container-highest focus:border-primary outline-none cursor-pointer"
              >
                {LANDING_SITES.map((site) => (
                  <option key={site.id} value={site.id}>
                    {site.name} ({site.coordinates})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Two Distinct Visual Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Site A Card */}
            <div className="bg-surface-container-low border border-surface-container-highest flex flex-col overflow-hidden shadow-lg">
              <div className="relative h-48 w-full overflow-hidden">
                <img 
                  src={getSiteImage(siteA.id)} 
                  alt={siteA.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
                <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/80 border border-secondary/40 text-secondary font-telemetry-sm text-[10px] uppercase">
                  SITE A // {siteA.tier}
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-headline-sm text-xl text-warm-white font-bold">{siteA.name}</h3>
                  <span className="font-telemetry-sm text-xs text-outline">{siteA.coordinates} // ELEV: {siteA.elevationMeters}m</span>
                </div>
              </div>

              <div className="p-5 flex flex-col gap-4">
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  {siteA.description}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3 text-xs font-telemetry-sm">
                  <div className="p-2.5 bg-surface-container-lowest border border-surface-container-highest flex flex-col">
                    <span className="text-outline uppercase text-[10px]">SOLAR HARVEST</span>
                    <span className="text-secondary font-bold text-sm">{siteA.solarFlux28d}% FLUX</span>
                  </div>
                  <div className="p-2.5 bg-surface-container-lowest border border-surface-container-highest flex flex-col">
                    <span className="text-outline uppercase text-[10px]">DTE VISIBILITY</span>
                    <span className="text-primary font-bold text-sm">{siteA.dteLineOfSightPct}</span>
                  </div>
                  <div className="p-2.5 bg-surface-container-lowest border border-surface-container-highest flex flex-col">
                    <span className="text-outline uppercase text-[10px]">TERRAIN SLOPE</span>
                    <span className="text-warm-white font-semibold">{siteA.slopeDegrees} ({siteA.terrainSlopeRisk})</span>
                  </div>
                  <div className="p-2.5 bg-surface-container-lowest border border-surface-container-highest flex flex-col">
                    <span className="text-outline uppercase text-[10px]">ICE PROXIMITY</span>
                    <span className="text-emerald-400 font-semibold">{siteA.psrIceProximity}</span>
                  </div>
                </div>

                <div className="p-2.5 bg-surface-container-lowest border border-surface-container-highest text-xs text-on-surface-variant font-body-sm">
                  <span className="text-secondary font-semibold font-telemetry-sm block mb-1">SCIENTIFIC VALUE:</span>
                  {siteA.scientificValue}
                </div>
              </div>
            </div>

            {/* Site B Card */}
            <div className="bg-surface-container-low border border-surface-container-highest flex flex-col overflow-hidden shadow-lg">
              <div className="relative h-48 w-full overflow-hidden">
                <img 
                  src={getSiteImage(siteB.id)} 
                  alt={siteB.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
                <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/80 border border-primary/40 text-primary font-telemetry-sm text-[10px] uppercase">
                  SITE B // {siteB.tier}
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-headline-sm text-xl text-warm-white font-bold">{siteB.name}</h3>
                  <span className="font-telemetry-sm text-xs text-outline">{siteB.coordinates} // ELEV: {siteB.elevationMeters}m</span>
                </div>
              </div>

              <div className="p-5 flex flex-col gap-4">
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  {siteB.description}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3 text-xs font-telemetry-sm">
                  <div className="p-2.5 bg-surface-container-lowest border border-surface-container-highest flex flex-col">
                    <span className="text-outline uppercase text-[10px]">SOLAR HARVEST</span>
                    <span className="text-secondary font-bold text-sm">{siteB.solarFlux28d}% FLUX</span>
                  </div>
                  <div className="p-2.5 bg-surface-container-lowest border border-surface-container-highest flex flex-col">
                    <span className="text-outline uppercase text-[10px]">DTE VISIBILITY</span>
                    <span className="text-primary font-bold text-sm">{siteB.dteLineOfSightPct}</span>
                  </div>
                  <div className="p-2.5 bg-surface-container-lowest border border-surface-container-highest flex flex-col">
                    <span className="text-outline uppercase text-[10px]">TERRAIN SLOPE</span>
                    <span className="text-warm-white font-semibold">{siteB.slopeDegrees} ({siteB.terrainSlopeRisk})</span>
                  </div>
                  <div className="p-2.5 bg-surface-container-lowest border border-surface-container-highest flex flex-col">
                    <span className="text-outline uppercase text-[10px]">ICE PROXIMITY</span>
                    <span className="text-emerald-400 font-semibold">{siteB.psrIceProximity}</span>
                  </div>
                </div>

                <div className="p-2.5 bg-surface-container-lowest border border-surface-container-highest text-xs text-on-surface-variant font-body-sm">
                  <span className="text-primary font-semibold font-telemetry-sm block mb-1">SCIENTIFIC VALUE:</span>
                  {siteB.scientificValue}
                </div>
              </div>
            </div>
          </div>

          {/* Decision Trade-Off Synthesis */}
          <div className="p-5 bg-surface-container-lowest border border-surface-container-highest flex flex-col gap-3">
            <span className="font-label-caps text-xs text-secondary font-bold uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 size={16} className="text-secondary" />
              MISSION ARCHITECTURE TRADEOFF ANALYSIS:
            </span>
            <p className="font-body-sm text-sm text-on-surface-variant leading-relaxed">
              If your mission prioritizes <strong className="text-secondary">solar power harvesting</strong> for a lightweight solar-powered lander, <strong className="text-warm-white">{siteA.solarFlux28d >= siteB.solarFlux28d ? siteA.name : siteB.name}</strong> offers superior continuous sunlight (+{Math.abs(siteA.solarFlux28d - siteB.solarFlux28d)}% higher flux). 
              Conversely, if mission success demands <strong className="text-primary">uninterrupted direct communication</strong> with NASA Deep Space Network antennas without orbital relay satellites, <strong className="text-warm-white">{parseFloat(siteA.dteLineOfSightPct) >= parseFloat(siteB.dteLineOfSightPct) ? siteA.name : siteB.name}</strong> minimizes terrain mask occlusion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

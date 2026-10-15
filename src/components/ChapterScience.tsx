import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DATA_SOURCES, GLOSSARY_ITEMS, FAQ_ITEMS } from '../data/missionData';
import { CheckCircle2, Clock, Search, ChevronDown, ChevronUp, BookOpen, HelpCircle, ShieldCheck, Award } from 'lucide-react';
import { KnowledgeCheck } from './KnowledgeCheck';

export const ChapterScience: React.FC = () => {
  const [activeDrawer, setActiveDrawer] = useState<'none' | 'glossary' | 'faq' | 'exam' | 'integrity'>('none');
  const [glossarySearch, setGlossarySearch] = useState<string>('');
  const [activeGlossaryCat, setActiveGlossaryCat] = useState<string>('all');
  const [faqSearch, setFaqSearch] = useState<string>('');

  const filteredGlossary = GLOSSARY_ITEMS.filter((item) => {
    const matchesCat = activeGlossaryCat === 'all' || item.category === activeGlossaryCat;
    const matchesSearch = item.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
                          item.definition.toLowerCase().includes(glossarySearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const filteredFaq = FAQ_ITEMS.filter((item) => {
    return item.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
           item.answer.toLowerCase().includes(faqSearch.toLowerCase());
  });

  const toggleDrawer = (drawer: 'glossary' | 'faq' | 'exam' | 'integrity') => {
    setActiveDrawer(prev => prev === drawer ? 'none' : drawer);
  };

  return (
    <section id="chapter-science" className="w-full py-20 px-4 sm:px-margin-tablet lg:px-margin-desktop bg-surface-container-lowest border-b border-surface-container-highest/50">
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
            CHAPTER 08 — THE SCIENCE
          </span>
          <h2 className="font-display-hero text-3xl sm:text-5xl lg:text-6xl text-warm-white font-semibold uppercase tracking-tight leading-[1.08]">
            HOW THE CONDITIONS<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-on-surface to-secondary">
              ARE DETERMINED.
            </span>
          </h2>
          <p className="font-body-lg text-lg sm:text-xl text-on-surface-variant leading-relaxed font-light">
            Behind every illumination window is a pipeline of celestial ephemerides, reference frame transformations, and high-resolution laser altimetry. Here is the verified scientific foundation.
          </p>
        </motion.div>

        {/* 1. Peer-Reviewed Repositories & Data Products */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-xs text-outline font-semibold uppercase tracking-wider">
              DATA SOURCES &amp; INTEGRATION STATUS (NASA PDS / JPL NAIF)
            </span>
            <span className="text-xs font-telemetry-sm text-outline">
              ALL PRODUCTS OPEN-ACCESS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DATA_SOURCES.map((source) => {
              const isIntegrated = source.badgeType === 'integrated';
              const isReady = source.badgeType === 'ready';

              return (
                <div 
                  key={source.id}
                  className="p-5 bg-surface-container border border-surface-container-highest flex flex-col justify-between gap-3 shadow-md"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between pb-2 border-b border-surface-container-highest/60">
                      <span className="font-label-caps text-[11px] text-secondary uppercase font-semibold">
                        {source.category}
                      </span>
                      <span className={`px-2 py-0.5 text-[10px] font-telemetry-sm font-bold flex items-center gap-1 ${
                        isIntegrated 
                          ? 'bg-primary-container text-on-primary-container' 
                          : isReady 
                            ? 'bg-primary/20 text-primary border border-primary/40' 
                            : 'bg-secondary/20 text-secondary border border-secondary/40'
                      }`}>
                        {isIntegrated && <CheckCircle2 size={11} />}
                        {isReady && <Clock size={11} />}
                        {source.badge}
                      </span>
                    </div>

                    <h4 className="font-headline-sm text-sm text-warm-white font-bold">{source.title}</h4>
                    <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                      {source.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Deep Reference Interactive Drawers */}
        <div className="flex flex-col gap-3 pt-4">
          <span className="font-label-caps text-xs text-outline font-semibold uppercase tracking-wider">
            DEEP SCIENTIFIC KNOWLEDGE REPOSITORY &amp; SELF-ASSESSMENT
          </span>

          {/* Drawer 1: Technical Glossary */}
          <div className="border border-surface-container-highest bg-surface-container overflow-hidden">
            <button
              onClick={() => toggleDrawer('glossary')}
              className="w-full p-4 sm:p-5 flex items-center justify-between hover:bg-surface-container-high transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <BookOpen size={18} className="text-secondary" />
                <div className="flex flex-col">
                  <span className="font-headline-sm text-base text-warm-white font-semibold uppercase">
                    ASTRONOMICAL &amp; TOPOGRAPHIC GLOSSARY
                  </span>
                  <span className="text-xs text-on-surface-variant font-body-sm">
                    Definitions for topocentric horizons, azimuth, libration, SEZ coordinate frames, and PSRs.
                  </span>
                </div>
              </div>
              {activeDrawer === 'glossary' ? <ChevronUp size={18} className="text-secondary" /> : <ChevronDown size={18} className="text-secondary" />}
            </button>

            <AnimatePresence>
              {activeDrawer === 'glossary' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-surface-container-highest p-6 bg-surface-container-low flex flex-col gap-5"
                >
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative w-full sm:w-72">
                      <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                      <input 
                        type="text"
                        placeholder="Search terminology..."
                        value={glossarySearch}
                        onChange={(e) => setGlossarySearch(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-surface-container-lowest text-on-surface text-xs font-telemetry-sm border border-surface-container-highest outline-none focus:border-secondary"
                      />
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 text-xs font-telemetry-sm">
                      {['all', 'coords', 'geometry', 'terrain', 'light', 'comms'].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setActiveGlossaryCat(cat)}
                          className={`px-2.5 py-1 uppercase transition-colors ${
                            activeGlossaryCat === cat 
                              ? 'bg-secondary text-on-secondary font-bold' 
                              : 'bg-surface-container-lowest text-outline hover:text-on-surface border border-surface-container-highest'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[460px] overflow-y-auto pr-2">
                    {filteredGlossary.map((item) => (
                      <div key={item.id} className="p-4 bg-surface-container-lowest border border-surface-container-highest flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="font-headline-sm text-sm text-secondary font-bold">{item.term}</span>
                          <span className="text-[10px] font-telemetry-sm text-outline uppercase">{item.categoryLabel}</span>
                        </div>
                        <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                          {item.definition}
                        </p>
                        <div className="text-[11px] font-telemetry-sm text-primary pt-1 border-t border-surface-container-highest/60">
                          IMPACT: {item.missionImpact}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Drawer 2: Mission FAQs */}
          <div className="border border-surface-container-highest bg-surface-container overflow-hidden">
            <button
              onClick={() => toggleDrawer('faq')}
              className="w-full p-4 sm:p-5 flex items-center justify-between hover:bg-surface-container-high transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <HelpCircle size={18} className="text-primary" />
                <div className="flex flex-col">
                  <span className="font-headline-sm text-base text-warm-white font-semibold uppercase">
                    FREQUENTLY ASKED SCIENTIFIC QUESTIONS (FAQ)
                  </span>
                  <span className="text-xs text-on-surface-variant font-body-sm">
                    Why polar navigation is distinct from Apollo equatorial missions.
                  </span>
                </div>
              </div>
              {activeDrawer === 'faq' ? <ChevronUp size={18} className="text-primary" /> : <ChevronDown size={18} className="text-primary" />}
            </button>

            <AnimatePresence>
              {activeDrawer === 'faq' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-surface-container-highest p-6 bg-surface-container-low flex flex-col gap-4"
                >
                  <div className="relative w-full sm:w-80">
                    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                    <input 
                      type="text"
                      placeholder="Search FAQ questions..."
                      value={faqSearch}
                      onChange={(e) => setFaqSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-surface-container-lowest text-on-surface text-xs font-telemetry-sm border border-surface-container-highest outline-none focus:border-primary"
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    {filteredFaq.map((faq) => (
                      <div key={faq.id} className="p-4 bg-surface-container-lowest border border-surface-container-highest flex flex-col gap-2">
                        <span className="font-headline-sm text-sm text-warm-white font-bold">{faq.question}</span>
                        <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Drawer 3: Interactive 10-Question Knowledge Exam */}
          <div className="border border-surface-container-highest bg-surface-container overflow-hidden">
            <button
              onClick={() => toggleDrawer('exam')}
              className="w-full p-4 sm:p-5 flex items-center justify-between hover:bg-surface-container-high transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Award size={18} className="text-emerald-400" />
                <div className="flex flex-col">
                  <span className="font-headline-sm text-base text-warm-white font-semibold uppercase">
                    KNOWLEDGE CHECK // 10-QUESTION LUNAR MISSION EXAM
                  </span>
                  <span className="text-xs text-on-surface-variant font-body-sm">
                    Test your understanding of topocentric horizons, DTE geometry, and polar illumination.
                  </span>
                </div>
              </div>
              {activeDrawer === 'exam' ? <ChevronUp size={18} className="text-emerald-400" /> : <ChevronDown size={18} className="text-emerald-400" />}
            </button>

            <AnimatePresence>
              {activeDrawer === 'exam' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-surface-container-highest bg-surface-container-low"
                >
                  <KnowledgeCheck />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Drawer 4: Scientific Integrity Disclosures */}
          <div className="border border-surface-container-highest bg-surface-container overflow-hidden">
            <button
              onClick={() => toggleDrawer('integrity')}
              className="w-full p-4 sm:p-5 flex items-center justify-between hover:bg-surface-container-high transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} className="text-secondary" />
                <div className="flex flex-col">
                  <span className="font-headline-sm text-base text-warm-white font-semibold uppercase">
                    SCIENTIFIC INTEGRITY &amp; DISCLOSURES
                  </span>
                  <span className="text-xs text-on-surface-variant font-body-sm">
                    Transparent distinction between validated flight algorithms and demonstration models.
                  </span>
                </div>
              </div>
              {activeDrawer === 'integrity' ? <ChevronUp size={18} className="text-secondary" /> : <ChevronDown size={18} className="text-secondary" />}
            </button>

            <AnimatePresence>
              {activeDrawer === 'integrity' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-surface-container-highest p-6 bg-surface-container-low flex flex-col gap-4 text-xs font-telemetry-sm text-on-surface-variant"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-surface-container-lowest border border-surface-container-highest flex flex-col gap-2">
                      <span className="font-bold text-primary uppercase">VALIDATED NUMERICAL MODELS:</span>
                      <p className="font-body-sm leading-relaxed">
                        Geometric coordinates and reference transformations follow the IAU/IAG Working Group Cartographic Coordinates standard and NASA SPICE DE440 ephemeris standards.
                      </p>
                    </div>

                    <div className="p-4 bg-surface-container-lowest border border-surface-container-highest flex flex-col gap-2">
                      <span className="font-bold text-secondary uppercase">ILLUSTRATIVE PROTOTYPE LIMITATIONS:</span>
                      <p className="font-body-sm leading-relaxed">
                        Interactive time scrubbers utilize trigonometric approximations between pre-sampled orbital state vectors to ensure 60fps client-side rendering. For certified flight software, exact ray-tracing against full gigabyte-scale LOLA DEM tiles is executed offline.
                      </p>
                    </div>
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

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ChapterProblem } from './components/ChapterProblem';
import { LightGeometry } from './components/LightGeometry';
import { ChapterRevelation } from './components/ChapterRevelation';
import { ChapterTradeoff } from './components/ChapterTradeoff';
import { ChapterSolution } from './components/ChapterSolution';
import { MissionBrowser } from './components/MissionBrowser';
import { ChapterDecision } from './components/ChapterDecision';
import { ResearchLab } from './components/ResearchLab';
import { ChapterScience } from './components/ChapterScience';
import { CinematicClosing } from './components/CinematicClosing';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const sectionIds = [
      'hero',
      'chapter-problem',
      'light-geometry',
      'chapter-revelation',
      'chapter-tradeoff',
      'chapter-solution',
      'mission-browser',
      'chapter-decision',
      'research-lab',
      'chapter-science',
      'chapter-closing',
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black font-body-md text-white flex flex-col selection:bg-white selection:text-black antialiased">
      {/* Top Fixed Header with Reading Progress Bar & Chapter Navigation */}
      <Header activeSection={activeSection} />

      {/* Main Continuous Narrative Flow (Chapters 1 to 9) */}
      <main className="w-full pt-16 bg-black flex flex-col">
        {/* CHAPTER 1 — CURIOSITY */}
        <Hero />

        {/* CHAPTER 2 — THE PROBLEM */}
        <ChapterProblem />

        {/* INTERACTIVE SIMULATION LAB — SOLAR ELEVATION VS TOPOGRAPHIC MASK */}
        <LightGeometry />

        {/* CHAPTER 3 — THE REVELATION */}
        <ChapterRevelation />

        {/* CHAPTER 4 — THE TRADE-OFF */}
        <ChapterTradeoff />

        {/* CHAPTER 5 — THE SOLUTION */}
        <ChapterSolution />

        {/* CHAPTER 6 — THE EXPERIMENT */}
        <MissionBrowser />

        {/* CHAPTER 7 — THE DECISION */}
        <ChapterDecision />

        {/* CHAPTER 8 — RESEARCH LAB 3D ORBITAL CAROUSEL */}
        <ResearchLab />

        {/* CHAPTER 8 — REPOSITORIES, GLOSSARY, FAQ & INTEGRITY */}
        <ChapterScience />

        {/* CHAPTER 9 — CONTINUED EXPLORATION */}
        <CinematicClosing />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;

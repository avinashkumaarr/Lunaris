import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Radio } from 'lucide-react';
import { IMAGES } from '../data/images';

interface HeaderProps {
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? window.scrollY / total : 0;
      setScrollProgress(progress);
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Overview' },
    { id: 'chapter-problem', label: 'The Problem' },
    { id: 'light-geometry', label: 'Solar Resolver' },
    { id: 'chapter-revelation', label: 'The Revelation' },
    { id: 'chapter-tradeoff', label: 'The Trade-Off' },
    { id: 'mission-browser', label: 'Mission Browser' },
    { id: 'chapter-decision', label: 'Site Decision' },
    { id: 'research-lab', label: 'Research Lab' },
    { id: 'chapter-science', label: 'Data & Archives' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/90 backdrop-blur-md border-b border-white/15 shadow-[0_4px_24px_rgba(0,0,0,0.8)]' 
        : 'bg-gradient-to-b from-black/85 via-black/40 to-transparent border-b border-transparent'
    }`}>
      {/* Reading Progress Top Bar */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-[2px] bg-white origin-left"
        style={{ scaleX: scrollProgress }}
      />

      <div className="h-16 w-full px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4">
        {/* Logo and Insignia */}
        <div className="flex items-center gap-4">
          <a href="#hero" className="flex items-center gap-3 group cursor-pointer">
            <div className="relative w-8 h-8 rounded-none overflow-hidden border border-white/40 bg-black flex items-center justify-center p-0.5 transition-transform group-hover:scale-105">
              <img 
                src={IMAGES.lunarisInsignia} 
                alt="LUNARIS Insignia" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display-hero text-base tracking-[0.16em] text-white group-hover:text-primary transition-colors font-bold uppercase">
                LUNARIS
              </span>
              <span className="font-mono text-[9px] text-white/50 tracking-[0.24em] uppercase">
                NASA SPACE APPS 2026 // CLPS
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-6 relative">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative py-1 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                  isActive 
                    ? 'text-white font-bold' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div 
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTA and Telemetry Pill */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-black/60 border border-white/15 text-white/80 font-mono text-[11px] tracking-[0.12em]">
            <span className="w-1.5 h-1.5 bg-[#00FF9D] animate-pulse" />
            <span className="uppercase font-semibold">
              SOUTH POLE // NOMINAL
            </span>
          </div>

          <a 
            href="#mission-browser"
            className="spacex-btn spacex-btn-sm"
          >
            <span>MISSION BROWSER</span>
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="xl:hidden bg-surface-container-low/95 backdrop-blur-xl border-b border-surface-container-highest px-6 py-4 flex flex-col gap-2 overflow-hidden"
          >
            <div className="flex items-center gap-2 pb-2 border-b border-surface-container-highest text-primary text-xs font-telemetry-sm">
              <Radio size={14} className="animate-pulse" />
              <span>MOON_PA_DE440 EPHEMERIS CORE // ONLINE</span>
            </div>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-1.5 text-xs font-telemetry-md uppercase tracking-wider transition-colors flex items-center justify-between ${
                  activeSection === item.id ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-outline text-xs">→</span>
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#mission-browser"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-2 bg-primary-container text-on-primary-container font-telemetry-sm uppercase font-bold"
              >
                Launch Interactive Browser
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

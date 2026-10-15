# LUNARIS — Lunar Mission Browser

<div align="center">

![LUNARIS Insignia](public/favicon.svg)

### 2026 NASA Space Apps Challenge
**Topocentric Solar Irradiance & Direct-to-Earth Communication Horizon Engine**

[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg)](LICENSE)
[![NASA Space Apps](https://img.shields.io/badge/NASA%20Space%20Apps-2026-blue.svg)](https://www.spaceappschallenge.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF.svg)](https://vite.dev/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38B2AC.svg)](https://tailwindcss.com/)

</div>

---

## 🌒 Executive Overview

**LUNARIS** is an interactive, scientific mission analysis console and educational platform designed for the **2026 NASA Space Apps Challenge**. It addresses the complex astrodynamic realities of robotic landers and human expedition habitats targeting the **Lunar South Pole** under NASA’s Artemis and Commercial Lunar Payload Services (CLPS) initiatives.

At the Moon’s extreme latitudes (85°S to 90°S), the lunar spin axis is tilted only **1.54°** relative to the ecliptic. Sunlight does not rise high overhead; it skims continuously along the horizon at grazing angles between -1.5° and +1.5°. Consequently:
- A celestial body reported at **+3.5° elevation** by ephemeris tables may remain in total darkness if a crater wall 12 kilometers away rises to **+5.0°**.
- Earth appears to wobble through a **14° libration box** over 27.3 days, repeatedly severing Direct-to-Earth (DTE) radio links behind terrain massifs.
- **Power windows and communication windows operate out of phase**, necessitating complex operational compromises.

LUNARIS bridges raw planetary datasets with real-time topocentric line-of-sight ray marching to calculate true operational viability across candidate landing sites.

---

## ✨ Core Interactive Features

### 1. 100vh SpaceX-Grade Cinematic Hero Launchpad
- **Full-Bleed 4D Orbital Loop**: Powered by an authentic high-resolution video loop of the lunar horizon with Earth transitioning left-to-right (`public/videos/lunaris-earth-left-to-right-loop.mp4`).
- **Asymmetric Telemetry Anchoring**: SpaceX-inspired lower-left typography with real-time orbital parameters HUD strip (Target Latitude `89.9°S`, Axial Inclination `1.54°`, Earth Distance `384,400 km`, Synodic Cycle `29.53 days`).
- **Signature Ghost CTAs**: Industrial zero-radius buttons featuring bottom-to-top fill slide on hover.

### 2. Interactive Solar Elevation vs. Topographic Mask Resolver
- **Visual Ray Marching Canvas**: Interactive lunar cross-section rendering the geometric horizontal plane (0.0°), incident solar ray vectors (Amber), LOLA terrain profiles, and observer tangent lines.
- **Real-Time Telemetry Gauges**: Real-time evaluation of solar elevation ($\theta_{\text{sun}}$), terrain ridge elevation ($\theta_{\text{mask}}$), azimuth ($\phi_{\text{sun}}$), and illumination margin ($\Delta\theta$).
- **Scenario Presets**: One-click flight scenarios including Mid-Latitude Sunlight, Low Polar Grazing Sun, Geometric Horizon Limit, and Sub-Horizon Polar Night.

### 3. Direct-to-Earth (DTE) Line-of-Sight Cross-Section
- **Libration & Massif Diffraction Simulator**: Dynamically illustrates how a distant crater massif or libration dip cuts RF communications with NASA Deep Space Network (DSN) ground stations despite positive celestial elevation.

### 4. 708-Hour Synodic & Libration Timeline Harmonizer
- **Synchronized Scrubbing**: Visualizes a full 29.53-day lunar synodic day (708 hours), highlighting temporal intersections of **Solar Generation** and **Earth Line-of-Sight**:
  - `OPERATIONAL OPTIMUM`: Simultaneous power harvest and high-bandwidth telemetry downlink.
  - `POWER HARVEST ONLY`: Battery charging with local flash data logging.
  - `BATTERY DISCHARGE COMMS`: RF downlink during terrain shadow.
  - `CRITICAL BLACKOUT`: Payload survival sleep mode.

### 5. Landing Site Decision Engine (7 Artemis & CLPS Sites)
- Interactive 360° radar terrain horizon profiles and multi-criteria comparison matrix covering:
  - **Shackleton Crater Rim** (Peak A & Connecting Ridge)
  - **Malapert Mountain Massif** (Tier 1 High-Elevation Relay)
  - **Haworth Crater Edge** (Cryogenic Cold Trap Margin)
  - **Amundsen Rim Plateau** (Wide Corridor Transit)
  - **Nobile Rim Crater** (Volatiles Prospecting Site)
  - **de Gerlache Rim Massif** (Extended Visibility Crest)

### 6. 3D Orbital Research Lab Carousel
- **Spatial 3D Curved Orbit**: Seven mathematical research workflows rendered as technical instrument cards in a perspective 3D orbit.
- **Pointer Steering**: Move mouse to the left or right navigation zones to steer orbital velocity smoothly.
- **3D Card Flip**: Click any card to trigger a 3D perspective flip revealing underlying input telemetry, mathematical methodologies, formulas, and primary metrics.

### 7. Integrated Science & Planetary Data Archive
- **Open Access Datasets**: Direct links to NASA Planetary Data System (PDS), JPL Horizons DE440 ephemerides, and NAIF SPICE kernels.
- **Astrodynamics Glossary**: Searchable, category-filtered technical dictionary of planetary science terms.
- **Interactive Knowledge Exam**: 5-question mission readiness assessment evaluating understanding of polar lighting geometry.

---

## 🚀 Technology Stack

| Layer | Technology |
|---|---|
| **Runtime & Framework** | [React 19](https://react.dev/) + [TypeScript 5.9](https://www.typescriptlang.org/) |
| **Bundler & Build Tool** | [Vite 8.3](https://vite.dev/) with rolldown code optimization |
| **Styling & Design System** | [Tailwind CSS 3.4](https://tailwindcss.com/) (SpaceX Aerospace Dark Theme) |
| **Animation & Motion** | [Motion / React (Framer Motion)](https://motion.dev/) |
| **Iconography** | [Lucide React](https://lucide.dev/) |
| **Typography** | Space Grotesk, JetBrains Mono, Inter |
| **Linter & Code Quality** | [Oxlint](https://oxc.rs/) |
| **CI / CD** | GitHub Actions Automated Deployment to GitHub Pages |

---

## 🛠️ Local Development & Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0 or higher recommended)
- `npm` (version 9.0 or higher)

### Installation
```bash
# Clone the repository
git clone https://github.com/<your-username>/lunaris.git
cd lunaris

# Install dependencies
npm install

# Start local development server
npm run dev
```
Open `http://localhost:5173/` (or displayed port) in your web browser.

### Production Build & Linting
```bash
# Type check and build optimized bundle for production
npm run build

# Run fast Oxlint code quality verification
npm run lint
```
The production bundle is compiled into the `dist/` directory and is ready for static deployment on any CDN or GitHub Pages.

---

## 📡 Scientific Datasets & Acknowledgments

LUNARIS is built entirely on open-access planetary science products:
- **NASA Lunar Reconnaissance Orbiter (LRO)**: Lunar Orbiter Laser Altimeter (LOLA) Digital Elevation Models (DEMs).
- **NASA Jet Propulsion Laboratory (JPL)**: JPL Horizons On-Line Solar System Data and DE440 Planetary Ephemeris.
- **Navigation and Ancillary Information Facility (NAIF)**: SPICE Lunar Reference Frame Kernels (`MOON_PA_DE440`, `IAU_MOON`).
- **NASA Space Apps Challenge 2026**: Organized by NASA and international space agency partners.

---

## ⚖️ License & Educational Disclaimer

This project is open-source under the terms of the [MIT License](LICENSE).

*Disclaimer: LUNARIS is an independent educational and mission analysis platform developed for the 2026 NASA Space Apps Challenge. It is not an official service of NASA or the Jet Propulsion Laboratory.*

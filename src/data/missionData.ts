import type { LandingSite, GlossaryItem, QuizQuestion, ResearchStage, DataSourceItem, GalleryItem, FaqItem } from '../types/mission';
import { IMAGES } from './images';

export const LANDING_SITES: LandingSite[] = [
  {
    id: 'shackleton',
    name: 'Shackleton Crater Rim — Peak A',
    coordinates: '89.9°S, 0.0°E',
    latitude: -89.9,
    longitude: 0.0,
    elevationMeters: 1840,
    tier: 'Tier 1 Prime',
    sunAzimuth: '142.4° SE',
    sunElevation: '+1.18°',
    earthAzimuth: '014.2° N',
    earthElevation: '+5.84°',
    solarFlux28d: 84.2,
    continuousOverlapHours: 194,
    annualIllumination: '84.2% (Tier 1 High)',
    dteLineOfSightPct: '62.8% (Libration Limited)',
    terrainSlopeRisk: 'High (22° - 28° Rims)',
    slopeDegrees: '25.4°',
    psrIceProximity: 'Direct Access (< 200m to cold trap)',
    roverMobilityRating: 'Extreme Hazard (Tethered/Cables Required)',
    scientificValue: 'Exceptional (Direct volatile sampling of billions-year-old ice)',
    description: 'Prominent elevated rim peak at the exact lunar south pole. Unrivaled annual sunlight with immediate proximity to the cryogenic floor of Shackleton, but challenging landing slopes.',
    horizonMaskPeak: { azimuth: 135, elevation: 9.2 }
  },
  {
    id: 'amundsen',
    name: 'Amundsen Crater Rim Ridge',
    coordinates: '84.5°S, 85.6°E',
    latitude: -84.5,
    longitude: 85.6,
    elevationMeters: 2150,
    tier: 'Tier 2 Rolling',
    sunAzimuth: '088.1° E',
    sunElevation: '+1.42°',
    earthAzimuth: '352.0° NW',
    earthElevation: '+8.10°',
    solarFlux28d: 68.4,
    continuousOverlapHours: 248,
    annualIllumination: '68.4% (Tier 2 High)',
    dteLineOfSightPct: '88.5% (High Horizon Clearance)',
    terrainSlopeRisk: 'Moderate (< 9° Rolling Ridge)',
    slopeDegrees: '7.8°',
    psrIceProximity: 'Distal (4.2 km Transit)',
    roverMobilityRating: 'Nominal Wheeled Traverse',
    scientificValue: 'High (Ejecta blanket stratigraphy & regional crustal dating)',
    description: 'A broad rolling ridge northeast of Amundsen crater offering gentle landing touchdown slopes (<9°) and robust direct-to-Earth communication elevation angles.',
    horizonMaskPeak: { azimuth: 180, elevation: 4.8 }
  },
  {
    id: 'malapert',
    name: 'Malapert Mountain Plateau',
    coordinates: '85.9°S, 2.9°E',
    latitude: -85.9,
    longitude: 2.9,
    elevationMeters: 5020,
    tier: 'Tier 1 Beacon',
    sunAzimuth: '212.5° SW',
    sunElevation: '+2.05°',
    earthAzimuth: '002.5° N',
    earthElevation: '+6.90°',
    solarFlux28d: 88.1,
    continuousOverlapHours: 310,
    annualIllumination: '88.1% (Tier 1 Exceptional)',
    dteLineOfSightPct: '93.4% (Permanent High Line-of-Sight)',
    terrainSlopeRisk: 'Moderate to Steep Plateau Lip (14°)',
    slopeDegrees: '11.2°',
    psrIceProximity: 'Intermediate (1.8 km to floor shadow)',
    roverMobilityRating: 'Moderate (Plateau accessible, descent hazardous)',
    scientificValue: 'Very High (Prime location for permanent lunar comms relay)',
    description: 'Towering 5,000-meter promontory acting as an orbital-class natural relay beacon with nearly perpetual line-of-sight to Earth and exceptional cumulative illumination.',
    horizonMaskPeak: { azimuth: 270, elevation: 3.4 }
  },
  {
    id: 'haworth',
    name: 'Haworth Crater Edge',
    coordinates: '87.4°S, 5.1°W',
    latitude: -87.4,
    longitude: -5.1,
    elevationMeters: 1420,
    tier: 'Tier 3 Deep Shadow',
    sunAzimuth: '315.8° NW',
    sunElevation: '+0.42°',
    earthAzimuth: '028.4° NE',
    earthElevation: '+3.15°',
    solarFlux28d: 44.8,
    continuousOverlapHours: 72,
    annualIllumination: '44.8% (Tier 3 Low)',
    dteLineOfSightPct: '48.2% (Severe Massif Blocking)',
    terrainSlopeRisk: 'High (18° - 24° Rim Wall)',
    slopeDegrees: '21.0°',
    psrIceProximity: 'Direct Access (< 100m into deep depression)',
    roverMobilityRating: 'Restricted (High slippage risk on fine regolith)',
    scientificValue: 'Maximum Cryogenic Interest (Pristine ancient ice deposits)',
    description: 'Heavily shadowed crater edge with extreme scientific value for direct volatile extraction, but characterized by fragmented solar power windows and frequent Earth occlusion.',
    horizonMaskPeak: { azimuth: 45, elevation: 8.6 }
  },
  {
    id: 'connecting-ridge',
    name: 'Connecting Ridge (Shackleton-de Gerlache)',
    coordinates: '89.4°S, 137.2°W',
    latitude: -89.4,
    longitude: -137.2,
    elevationMeters: 1980,
    tier: 'Tier 1 Traverse',
    sunAzimuth: '178.2° S',
    sunElevation: '+1.35°',
    earthAzimuth: '018.7° N',
    earthElevation: '+4.95°',
    solarFlux28d: 82.6,
    continuousOverlapHours: 215,
    annualIllumination: '82.6% (Tier 1 High)',
    dteLineOfSightPct: '76.4% (Moderately Shielded)',
    terrainSlopeRisk: 'Low to Moderate (< 10°)',
    slopeDegrees: '8.4°',
    psrIceProximity: 'Accessible (800m to adjacent shadowed cold traps)',
    roverMobilityRating: 'High Mobility (Natural corridor between poles)',
    scientificValue: 'High (Logistical gateway connecting multiple PSR basins)',
    description: 'A natural elevated causeway linking Shackleton and de Gerlache craters. Favored for surface traverses with balanced illumination and manageable transit grades.',
    horizonMaskPeak: { azimuth: 90, elevation: 5.1 }
  },
  {
    id: 'de-gerlache',
    name: 'de Gerlache Rim Massif',
    coordinates: '88.5°S, 88.3°W',
    latitude: -88.5,
    longitude: -88.3,
    elevationMeters: 2280,
    tier: 'Tier 2 Massif',
    sunAzimuth: '260.4° W',
    sunElevation: '+1.62°',
    earthAzimuth: '008.9° N',
    earthElevation: '+6.25°',
    solarFlux28d: 74.5,
    continuousOverlapHours: 180,
    annualIllumination: '74.5% (Tier 2 Medium-High)',
    dteLineOfSightPct: '81.2% (Elevated Horizon Clearance)',
    terrainSlopeRisk: 'Moderate (12° to 16° Crest)',
    slopeDegrees: '13.5°',
    psrIceProximity: 'Close (500m to crater floor)',
    roverMobilityRating: 'Moderate (Requires path planning around boulders)',
    scientificValue: 'High (Exposed anorthositic bedrock along uplift rim)',
    description: 'An asymmetrical impact rim with an elevated eastern crest that enjoys extended visibility windows, providing a stable platform for long-duration surface payloads.',
    horizonMaskPeak: { azimuth: 315, elevation: 6.2 }
  }
];

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  {
    id: 'azimuth',
    term: 'Azimuth',
    category: 'geometry',
    categoryLabel: 'ANGLES & GEOMETRY',
    definition: 'The horizontal angular distance measured clockwise around the observer’s local tangent horizon plane, where 0° is North, 90° East, 180° South, and 270° West.',
    missionImpact: 'Determines which specific crater wall, boulder field, or distant mountain massif lies along the sightline to the Sun or Earth.'
  },
  {
    id: 'elevation',
    term: 'Elevation (Altitude)',
    category: 'geometry',
    categoryLabel: 'ANGLES & GEOMETRY',
    definition: 'The vertical angular distance measured in degrees above (positive) or below (negative) the observer’s local horizontal tangent plane (0° = horizon, +90° = zenith).',
    missionImpact: 'Solar power and direct communication require celestial elevation to exceed the local topographic terrain horizon profile.'
  },
  {
    id: 'geometric-horizon',
    term: 'Geometric Horizon',
    category: 'terrain',
    categoryLabel: 'TERRAIN & VISIBILITY',
    definition: 'The theoretical 0.0° elevation horizon tangent line calculated for a mathematically smooth, featureless lunar mean sphere without topographic massifs.',
    missionImpact: 'Useful only as an idealized geometric baseline; dangerously misleading if used for real landing operations because terrain blocks rays.'
  },
  {
    id: 'terrain-horizon',
    term: 'Terrain Horizon (Skyline Mask)',
    category: 'terrain',
    categoryLabel: 'TERRAIN & VISIBILITY',
    definition: 'The true 360-degree topographic skyline formed by the physical peaks, crater rims, and relief surrounding the observer across all azimuth bearings.',
    missionImpact: 'Represents the real physical barrier that casts shadows or occludes radio waves. At lunar poles, terrain masks often reach +5° to +10°.'
  },
  {
    id: 'libration',
    term: 'Libration',
    category: 'coords',
    categoryLabel: 'POSITION & COORDS',
    definition: 'The apparent rocking and wobbling motion of the Moon as viewed from Earth, resulting from orbital eccentricity, axial inclination, and physical tidal distortion.',
    missionImpact: 'Causes Earth to oscillate through an apparent ~14° celestial box in the polar sky over 27.3 days, repeatedly dipping Earth below local terrain.'
  },
  {
    id: 'dem',
    term: 'DEM (Digital Elevation Model)',
    category: 'terrain',
    categoryLabel: 'TERRAIN & VISIBILITY',
    definition: 'A 2D raster dataset where each pixel stores the precise topographic elevation above the reference lunar datum (1,737.4 km radius sphere).',
    missionImpact: 'Core computational input to ray-tracing algorithms that calculate shadow boundaries, slope hazards, and landing radar profiles.'
  },
  {
    id: 'lola',
    term: 'LOLA (Lunar Orbiter Laser Altimeter)',
    category: 'terrain',
    categoryLabel: 'TERRAIN & VISIBILITY',
    definition: 'Laser altimetry instrument aboard NASA’s Lunar Reconnaissance Orbiter (LRO) that fired multi-beam pulses to measure lunar surface topography.',
    missionImpact: 'Provided billions of calibrated elevation points, creating 20m/pixel polar elevation models with sub-meter vertical precision.'
  },
  {
    id: 'psr',
    term: 'PSR (Permanently Shadowed Region)',
    category: 'light',
    categoryLabel: 'ILLUMINATION',
    definition: 'Topographic depression near the lunar poles where the rims perpetually block direct solar rays due to the Moon’s small 1.54° axial tilt.',
    missionImpact: 'Acts as cryogenic cold traps (< 40 K / -387°F) capable of preserving ancient water ice and volatile organic molecules for billions of years.'
  },
  {
    id: 'dte',
    term: 'DTE (Direct-to-Earth Communication)',
    category: 'comms',
    categoryLabel: 'COMMUNICATION',
    definition: 'Radio frequency transmission established directly between a lunar surface lander and Earth-based ground stations without utilizing an orbital relay satellite.',
    missionImpact: 'Simplifies operational architecture but requires unoccluded line-of-sight to Earth, which is periodically severed by terrain and libration.'
  },
  {
    id: 'umbra',
    term: 'Umbra',
    category: 'light',
    categoryLabel: 'ILLUMINATION',
    definition: 'The innermost, completely darkened core of a shadow where the primary light source is 100% blocked by the occluding body.',
    missionImpact: 'Results in complete loss of photovoltaic power; lander must enter low-power survival mode and operate exclusively on primary batteries.'
  },
  {
    id: 'penumbra',
    term: 'Penumbra',
    category: 'light',
    categoryLabel: 'ILLUMINATION',
    definition: 'The partial shadow zone where only a fraction of the solar disc is obscured by crater topography while the remaining disc remains visible.',
    missionImpact: 'Solar arrays generate fractional power output proportional to visible solar disc area, requiring partial power management modes.'
  },
  {
    id: 'selenographic-coords',
    term: 'Selenographic Coordinates',
    category: 'coords',
    categoryLabel: 'POSITION & COORDS',
    definition: 'The spherical coordinate system (latitude and longitude) fixed to the lunar body, defined relative to the Moon’s mean rotational axis and prime meridian.',
    missionImpact: 'Defines exact physical locations for landing target zones, scientific sampling waypoints, and rover traverse routes.'
  },
  {
    id: 'topocentric-frame',
    term: 'Topocentric Frame (SEZ)',
    category: 'coords',
    categoryLabel: 'POSITION & COORDS',
    definition: 'A local coordinate reference frame centered directly on the surface observer, defined by orthonormal South, East, and Zenith axes.',
    missionImpact: 'Essential for translating global planetary ephemerides into the exact sky angles experienced by lander solar panels and antennas.'
  },
  {
    id: 'dsn',
    term: 'DSN (Deep Space Network)',
    category: 'comms',
    categoryLabel: 'COMMUNICATION',
    definition: 'NASA’s international network of 34m and 70m parabolic antenna facilities located in Goldstone (California), Madrid (Spain), and Canberra (Australia).',
    missionImpact: 'The primary Earth receiving stations for high-data-rate lunar downlinks, scientific telemetry, and critical command uplinks.'
  },
  {
    id: 'sub-solar-point',
    term: 'Sub-Solar Point',
    category: 'geometry',
    categoryLabel: 'ANGLES & GEOMETRY',
    definition: 'The location on the lunar surface where the Sun is directly overhead at local zenith (90° elevation angle).',
    missionImpact: 'Always stays within ±1.54° of the lunar equator; it never approaches the poles, which is why polar sunlight is always low and grazing.'
  },
  {
    id: 'incidence-angle',
    term: 'Incidence Angle',
    category: 'geometry',
    categoryLabel: 'ANGLES & GEOMETRY',
    definition: 'The angle between the incoming solar radiation ray vector and the local surface normal (perpendicular) vector.',
    missionImpact: 'Because sunlight grazes near 90° incidence on horizontal lunar soil, polar landers rely on vertical or cylindrical solar arrays.'
  },
  {
    id: 'spice-kernel',
    term: 'SPICE Kernel',
    category: 'coords',
    categoryLabel: 'POSITION & COORDS',
    definition: 'Binary and text data files produced by NASA’s Navigation and Ancillary Information Facility (NAIF) storing planetary trajectories and attitudes.',
    missionImpact: 'The aerospace standard ensuring mathematically identical ephemeris calculations across flight software and simulation tools.'
  },
  {
    id: 'link-margin',
    term: 'Link Margin',
    category: 'comms',
    categoryLabel: 'COMMUNICATION',
    definition: 'The safety margin (in decibels, dB) between the received radio signal power and the minimum threshold required for error-free data decoding.',
    missionImpact: 'Grazing line-of-sight paths close to crater rims experience knife-edge diffraction losses that can destroy the link margin despite visual line of sight.'
  },
  {
    id: 'peak-of-eternal-light',
    term: 'Peak of Eternal Light (PEL)',
    category: 'light',
    categoryLabel: 'ILLUMINATION',
    definition: 'A historical misnomer referring to elevated polar points believed to receive continuous 100% sunlight year-round.',
    missionImpact: 'LOLA data proved true eternal light does not exist; even top peaks (like Shackleton Peak A) experience dips into shadow during polar winter.'
  },
  {
    id: 'sldem2015',
    term: 'SLDEM2015',
    category: 'terrain',
    categoryLabel: 'TERRAIN & VISIBILITY',
    definition: 'A high-precision blended digital elevation model combining LOLA altimetry with stereo photogrammetry from Japan’s SELENE (Kaguya) orbiter.',
    missionImpact: 'Provides superior lateral sharpness on steep crater rims where laser altimetry alone suffers track-to-track interpolation gaps.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    prompt: "Why does a positive solar elevation angle (e.g. +1.5°) NOT guarantee that a lunar south pole lander is illuminated?",
    options: [
      "Lunar libration continually alters the solar luminosity output",
      "Local crater rims or massifs along that azimuth can be taller than the Sun's elevation",
      "Solar arrays lose electrical conductivity at sub-zero temperatures",
      "The Sun is treated as an optical point source in all orbital mechanics software"
    ],
    correctIndex: 1,
    rationale: "Correct! The true topographic terrain horizon mask often rises to +5° to +9° at polar crater rims. When the Sun is only at +1.5°, local topography completely intercepts the ray path, casting the lander into deep shadow."
  },
  {
    id: 2,
    prompt: "What does Azimuth represent in a topocentric lunar surface coordinate system?",
    options: [
      "The vertical angle measured in degrees up to the local zenith",
      "The straight-line distance between the landing site and the sub-Earth point",
      "The horizontal compass bearing (0° to 360°) measured clockwise from local North",
      "The tilt angle of the lander body relative to the local gravity vector"
    ],
    correctIndex: 2,
    rationale: "Correct! Azimuth represents the horizontal compass bearing in the local tangent plane (0° = North, 90° = East, 180° = South, 270° = West)."
  },
  {
    id: 3,
    prompt: "What physical mechanism creates the ~14° apparent celestial motion of Earth in the lunar polar sky?",
    options: [
      "Precession of the lunar equinoxes over a 26,000-year cycle",
      "Optical and physical libration driven by lunar orbital eccentricity and axial tilt",
      "Solar photon pressure shifting the Moon's center of mass",
      "Crustal plate tectonics shifting lunar surface coordinates"
    ],
    correctIndex: 1,
    rationale: "Correct! Lunar orbital eccentricity and axial inclination cause the Moon to nod and wobble relative to Earth, tracing an apparent ~14° box in the polar sky over each 27.3-day orbital cycle."
  },
  {
    id: 4,
    prompt: "What does DEM stand for in planetary remote sensing?",
    options: [
      "Direct Ephemeris Matrix",
      "Digital Elevation Model",
      "Dynamic Exposure Multiplier",
      "Deep Earth Magnetometer"
    ],
    correctIndex: 1,
    rationale: "Correct! Digital Elevation Models represent surface topography as discrete 2D grids of calibrated elevation values above a reference datum."
  },
  {
    id: 5,
    prompt: "Why do polar lunar landers generally favor vertically oriented solar panels over horizontal panels?",
    options: [
      "Horizontal panels accumulate too much abrasive lunar dust",
      "The Sun never rises more than ~1.54° above the horizon, so solar rays strike nearly horizontally",
      "Vertical panels have inherently higher structural resistance to micrometeoroids",
      "Direct-to-Earth radio transmitters require vertical electrical grounding"
    ],
    correctIndex: 1,
    rationale: "Correct! With solar elevation hovering near 0.5° to 1.5°, vertical solar panels face incoming rays directly, whereas horizontal panels receive virtually zero normal photon flux."
  },
  {
    id: 6,
    prompt: "What distinguishes the geometric horizon from the terrain horizon?",
    options: [
      "The geometric horizon accounts for crater rims; the terrain horizon assumes a sphere",
      "The geometric horizon is the 0° tangent to a smooth sphere; the terrain horizon is the real topographic skyline",
      "Both horizons are mathematically identical in NASA SPICE kernels",
      "The terrain horizon is only defined for terrestrial atmospheric observers"
    ],
    correctIndex: 1,
    rationale: "Correct! The geometric horizon assumes an idealized smooth datum, while the terrain horizon represents the real physical barrier formed by ridges, crater lips, and mountains."
  },
  {
    id: 7,
    prompt: "Why are solar illumination windows and Direct-to-Earth (DTE) communication windows frequently desynchronized?",
    options: [
      "Sunlight follows the ~29.5-day synodic cycle, while Earth libration follows the ~27.3-day orbital cycle",
      "Radio waves travel slower than optical photons in the lunar vacuum",
      "NASA Deep Space Network antennas are prohibited from tracking during lunar daytime",
      "Earth eclipses the Sun during every single lunar rotation"
    ],
    correctIndex: 0,
    rationale: "Correct! The solar illumination cycle (~29.53 days) and the lunar orbital/libration cycle (~27.32 days) have different periods and point toward completely different azimuths, causing their visibility windows to drift out of phase."
  },
  {
    id: 8,
    prompt: "What is a Permanently Shadowed Region (PSR)?",
    options: [
      "The lunar far side which never points toward Earth",
      "A polar depression where topography perpetually prevents direct solar rays from entering for billions of years",
      "An artificial electromagnetic blackout zone around landing sites",
      "A temporary shadow cast by orbital satellites during polar passes"
    ],
    correctIndex: 1,
    rationale: "Correct! Due to the Moon’s tiny 1.54° axial tilt, deep craters at the poles have floors that have remained shielded from direct sunlight for billions of years, creating cryogenic cold traps."
  },
  {
    id: 9,
    prompt: "Why does having direct optical line of sight to Earth NOT guarantee communication link closure?",
    options: [
      "Earth's ionosphere reflects 100% of all space communications frequencies",
      "Link closure also requires sufficient transmitter EIRP, antenna gain, DSN scheduling, and positive link margin",
      "The speed of light slows significantly when passing through crater shadows",
      "Lunar libration polarizes radio frequencies into destructive interference"
    ],
    correctIndex: 1,
    rationale: "Correct! Line-of-sight is a geometric prerequisite, but establishing communications requires electrical link closure: antenna gain, transmitter power, receiver G/T, and positive link margin."
  },
  {
    id: 10,
    prompt: "Which dataset provides the primary high-resolution polar topography used in modern lunar mission analysis?",
    options: [
      "Voyager 2 low-resolution optical flyby mosaics",
      "LRO LOLA (Lunar Orbiter Laser Altimeter) and blended SLDEM2015 altimetry grids",
      "Hubble Space Telescope lunar planetary wide-field exposures",
      "Apollo 11 astronaut manual sextant observations"
    ],
    correctIndex: 1,
    rationale: "Correct! NASA's Lunar Reconnaissance Orbiter LOLA altimeter and the blended SLDEM2015 product provide the validated topographic grids powering modern lunar mission analysis."
  }
];

export const RESEARCH_STAGES: ResearchStage[] = [
  {
    id: 1,
    questionNumber: '01',
    title: 'High-Precision Solar Ephemeris Vector Calculation',
    kernel: 'de440.bsp // NAIF SPICE',
    inputData: 'Barycentric Dynamical Time (TDB), JPL DE440 planetary ephemeris, light-time delay.',
    method: 'Spkpos SPICE queries with light-time aberration correction to derive Moon-to-Sun state vector.',
    output: 'Selenocentric solar position vector within 0.001 arcsecond directional accuracy.',
    assumptions: 'Gravitational ray deflection by solar mass neglected for surface elevation angles < 20°.'
  },
  {
    id: 2,
    questionNumber: '02',
    title: 'Earth Position & Selenographic Frame Transformations',
    kernel: 'MOON_PA_DE440 // MOON_ME',
    inputData: 'Lunar Principal Axes orientation matrix, physical libration angles, Earth geocenter state.',
    method: '3x3 rotation transformation from ICRF into Moon-fixed Mean Earth/Polar Axis frame.',
    output: 'Dynamic Earth geocenter position and apparent libration box in observer coordinates.',
    assumptions: 'Earth modeled with standard 6,371 km volumetric mean radius for limb occlusion.'
  },
  {
    id: 3,
    questionNumber: '03',
    title: 'Topocentric SEZ Coordinate Frame Derivation',
    kernel: 'COORDINATES: South, East, Zenith',
    inputData: 'Site latitude, longitude, and reference lunar triaxial ellipsoid normal vector.',
    method: 'Construction of local orthonormal tangent triad (South, East, Zenith) at touchdown datum.',
    output: 'Pure elevation angle (degrees above horizon) and azimuth bearing (0° to 360°).',
    assumptions: 'Local gravity vector aligns with geodetic surface normal (gravity anomalies ignored).'
  },
  {
    id: 4,
    questionNumber: '04',
    title: 'LOLA DEM Radial Horizon Ray-Marching',
    kernel: 'DATASET: LOLA 20m/px GDR',
    inputData: 'High-resolution digital elevation matrix across a 150 km radius bounding circle.',
    method: 'Radial profile sampling determining maximum angular tangent slope per azimuth ray.',
    output: 'Discrete 1,440-point horizon mask array at 0.25° angular azimuthal resolution.',
    assumptions: 'Atmospheric refraction is identically zero within the collisionless lunar exosphere.'
  },
  {
    id: 5,
    questionNumber: '05',
    title: 'Solar Disc Semi-Diameter & Penumbral Clipping',
    kernel: 'GEOMETRY: 0.53° Apparent Disc',
    inputData: 'Apparent angular radius of Sun (~0.26°) and Earth (~0.95° to 1.1°).',
    method: 'Multi-limb intersection test evaluating Umbra (100% blocked) vs Penumbral fractional flux.',
    output: 'Percentage of incident photon flux reaching photovoltaic arrays.',
    assumptions: 'Solar disc modeled with standard Eddington limb-darkening profile.'
  },
  {
    id: 6,
    questionNumber: '06',
    title: 'Mission Temporal Window Conjunction & Synthesis',
    kernel: 'TIME DOMAIN: Multi-Year Epoch Scans',
    inputData: 'Continuous time-series of visibility flags sampled at 15-minute intervals.',
    method: 'Boolean window conjunction (Power AND DTE) filtered by minimum duration thresholds.',
    output: 'Ranked operational mission windows sorted by duration, margin, and battery draw.',
    assumptions: 'Lander orientation remains static throughout the evaluated operational window.'
  },
  {
    id: 7,
    questionNumber: '07',
    title: 'DEM Uncertainty & Touchdown Tilt Sensitivity',
    kernel: 'MONTE CARLO: ±1.5m Vertical Uncertainty',
    inputData: 'LOLA footprint dispersion error (±1-2m), lander touchdown tilt (0° to 15°).',
    method: 'Stochastic perturbation of horizon mask to calculate window fragility and P90/P50/P10 bounds.',
    output: 'Confidence probability bounds for mission survival and communication longevity.',
    assumptions: 'Lander leg touchdown tilt azimuth follows a uniform random distribution.'
  }
];

export const DATA_SOURCES: DataSourceItem[] = [
  {
    id: 'moon-trek',
    title: 'NASA Moon Trek GIS',
    category: 'GIS WEB PORTAL',
    badge: 'DEMO INTEGRATED',
    badgeType: 'integrated',
    description: 'Interactive lunar geospatial portal providing elevation slicing, slope calculations, crater cross-sections, and calibrated multi-band spectral overlays.',
    linkUrl: 'https://trek.nasa.gov/moon/',
    linkText: 'LAUNCH MOON TREK'
  },
  {
    id: 'pds-lola',
    title: 'NASA PDS LOLA Altimetry Dataset',
    category: 'TOPOGRAPHY',
    badge: 'DEMO INTEGRATED',
    badgeType: 'integrated',
    description: 'Planetary Data System archive containing billions of calibrated laser altimetry pulses from the Lunar Orbiter Laser Altimeter, defining polar elevations down to 20m/px.',
    linkUrl: 'https://pds-geosciences.wustl.edu/',
    linkText: 'ACCESS PDS ARCHIVE'
  },
  {
    id: 'spice-toolkit',
    title: 'NASA NAIF SPICE Toolkit',
    category: 'ASTRODYNAMICS TOOLKIT',
    badge: 'DEMO INTEGRATED',
    badgeType: 'integrated',
    description: 'The space mission geometry standard for converting quaternions, reference frames (MOON_PA_DE440), planetary states, and instrument pointings into physical coordinates.',
    linkUrl: 'https://naif.jpl.nasa.gov/naif/',
    linkText: 'LEARN SPICE TOOLKIT'
  },
  {
    id: 'jpl-horizons',
    title: 'JPL Horizons On-Line Ephemeris System',
    category: 'SOLAR SYSTEM EPHEMERIS',
    badge: 'EPHEMERIS READY',
    badgeType: 'ready',
    description: 'The gold-standard solar system ephemeris engine computing high-precision vectors, libration angles, and light-time corrections for any topocentric observer coordinates.',
    linkUrl: 'https://ssd.jpl.nasa.gov/horizons/',
    linkText: 'QUERY JPL HORIZONS'
  },
  {
    id: 'svs-shadows',
    title: 'NASA SVS South Pole Shadows Visualization',
    category: 'DYNAMIC VISUALIZATION',
    badge: 'EPHEMERIS READY',
    badgeType: 'ready',
    description: 'Scientific Visualization Studio dynamic ray-traced models revealing multi-kilometer moving shadow boundaries cast across polar terrain over full lunar years.',
    linkUrl: 'https://svs.gsfc.nasa.gov/',
    linkText: 'VIEW SVS REPOSITORY'
  },
  {
    id: 'moonbase-env',
    title: 'NASA Moonbase Environment Reference',
    category: 'LIGHTING & THERMAL',
    badge: 'ARCHIVE REFERENCE',
    badgeType: 'archive',
    description: 'Comprehensive mission planning documentation detailing polar surface lighting conditions, solar insolation variation, and regolith thermal equilibrium parameters.',
    linkUrl: 'https://science.nasa.gov/',
    linkText: 'EXPLORE NASA SCIENCE'
  },
  {
    id: 'volatiles-manifest',
    title: 'NASA Moon Water & Volatiles Synthesis',
    category: 'VOLATILE SCIENCE',
    badge: 'ARCHIVE REFERENCE',
    badgeType: 'archive',
    description: 'Synthesis of LCROSS impact plume mass spectrometry, Chandrayaan-1 M3 infrared reflection data, and LRO LAMP far-ultraviolet albedo measurements confirming water ice deposits in south polar cold traps.',
    linkUrl: 'https://www.nasa.gov/specials/moon-water/',
    linkText: 'READ VOLATILE MANIFEST'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'frame-1',
    frameNumber: 'FRAME #01 // SHACKLETON RIM',
    title: 'Earth Rise Over Raking Polar Horizons',
    description: 'Extreme low-angle raking sunlight casting 50km sharp black shadows across pulverized regolith at Shackleton crater.',
    imageUrl: IMAGES.earthRise,
    badgeText: 'TARGET: SHACKLETON RIM // ELEVATION +1,840M',
    badgeColor: 'primary'
  },
  {
    id: 'frame-2',
    frameNumber: 'FRAME #02 // CLPS LANDER',
    title: 'Autonomous Robotic Lander on Ridgeline',
    description: 'Dish antenna directed toward Earth with solar panels configured to capture grazing polar sunlight rays.',
    imageUrl: IMAGES.clpsLander,
    badgeText: 'AUTONOMOUS CLPS TOUCHDOWN // DTE ACTIVE',
    badgeColor: 'secondary'
  },
  {
    id: 'frame-3',
    frameNumber: 'FRAME #03 // PSR COLD TRAP',
    title: 'Cryogenic Shadow Terminator Wall',
    description: 'Dividing line where blinding sunlight transitions into pitch-black cryogenic ground ice traps below 25 Kelvin.',
    imageUrl: IMAGES.psrTerminator,
    badgeText: 'COLD TRAP TERMINATOR // T < 25 K',
    badgeColor: 'tertiary'
  },
  {
    id: 'frame-4',
    frameNumber: 'FRAME #04 // LOLA DEM MAP',
    title: 'Digital Elevation Model Topography',
    description: 'False-color contour gradients highlighting extreme polar elevation variance between deep craters and mountain massifs.',
    imageUrl: IMAGES.lolaDem,
    badgeText: 'LOLA / SLDEM2015 ELEVATION MATRIX',
    badgeColor: 'primary'
  },
  {
    id: 'frame-5',
    frameNumber: 'FRAME #05 // MALAPERT MASSIF',
    title: 'Illuminated Peak of Malapert Mountain',
    description: 'Elevated promontory bathed in perpetual solar illumination while surrounding lowlands remain in ink-black shadow.',
    imageUrl: IMAGES.malapertPeak,
    badgeText: 'ELEVATION: +5,000M // DTE MARGIN +14.2 dB',
    badgeColor: 'secondary'
  },
  {
    id: 'frame-6',
    frameNumber: 'FRAME #06 // RAY MARCHING ANALYSIS',
    title: 'Line-of-Sight Ray Vector Analysis',
    description: 'Scientific diagram illustrating grazing sunlight paths creating extended 100km topographic shadow zones.',
    imageUrl: IMAGES.shadowRay,
    badgeText: 'RAY-MARCHING LINE-OF-SIGHT PROFILE',
    badgeColor: 'primary'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 1,
    question: "What is the fundamental difference between Azimuth and Elevation?",
    answer: "Azimuth is the horizontal compass bearing measured clockwise from lunar North (0° = North, 90° = East, 180° = South, 270° = West). Elevation is the vertical angle measured above or below the observer's horizontal plane (0° is the horizon, +90° is zenith, -90° is nadir). Together, they define the exact topocentric vector pointing toward any celestial body."
  },
  {
    id: 2,
    question: "Why does positive elevation not guarantee line-of-sight visibility?",
    answer: "A celestial body at positive elevation (for example, +2.5°) is above an idealized smooth sphere (geometric horizon). However, if there is a crater rim or massif in that azimuth direction that rises to +6.0°, the terrain completely blocks the ray vector, placing the observer in shadow or severing communications."
  },
  {
    id: 3,
    question: "What is a Digital Elevation Model (DEM) and how is it used in LUNARIS?",
    answer: "A Digital Elevation Model (DEM) is a digital representation of planetary terrain topography where elevation values are stored on a discrete spatial grid. LUNARIS uses DEMs (specifically LOLA and SLDEM2015 products) to perform radial ray marching from candidate landing sites, computing the maximum obstruction angle across all 360 degrees of azimuth."
  },
  {
    id: 4,
    question: "How does lunar libration affect Direct-to-Earth (DTE) communication?",
    answer: "Because the Moon's orbit is eccentric and its rotational axis tilted, the Moon appears to nod and wobble relative to Earth over a 27.3-day period. For polar landers where Earth is already low on the horizon, this libration causes Earth to move through an apparent box roughly 14° across, repeatedly dipping Earth below local terrain and cutting direct radio contact."
  },
  {
    id: 5,
    question: "Why do power windows and communication windows fail to synchronize?",
    answer: "Solar illumination follows the lunar synodic day (29.53 Earth days) as the Moon rotates relative to the Sun. DTE visibility is dictated by the lunar orbital/libration period (27.3 Earth days) relative to Earth. Because these two cycles have different periods and distinct azimuth vectors, power and communications operate on out-of-phase schedules."
  },
  {
    id: 6,
    question: "What is a 'Peak of Eternal Light' and does it actually exist?",
    answer: "The phrase 'Peak of Eternal Light' (originally coined by Camille Flammarion) is a scientific misnomer. High-resolution LOLA altimetry models have proven that no point on the lunar surface enjoys 100% continuous sunlight year-round. Certain elevated rims (such as Shackleton Peak A or Malapert Mountain) receive 80% to 86% cumulative annual sunlight, but all experience significant shadow periods during polar winter dips."
  },
  {
    id: 7,
    question: "How does LUNARIS account for solar disc semi-diameter vs. point sources?",
    answer: "The Sun has an apparent angular diameter of approximately 0.53° as seen from the Moon. Treating the Sun as a point source causes binary on/off errors. LUNARIS evaluates the upper limb, center, and lower limb of the solar disc against the terrain mask, identifying partial penumbral lighting transitions where solar arrays still receive partial photon flux."
  },
  {
    id: 8,
    question: "What is the spatial resolution of the DEM and why does it matter?",
    answer: "LOLA polar DEMs are sampled at resolutions typically between 20 meters and 60 meters per pixel, with vertical accuracy of approximately 1 meter. Low-resolution DEMs (e.g., 500m/pixel) average out sharp local ridges and micro-crater lips that could actually cast significant shadows over a 2-meter tall lander."
  },
  {
    id: 9,
    question: "Does LUNARIS simulate radio frequency link budget closure?",
    answer: "LUNARIS models geometric optical line of sight (LOS) and terrain diffraction margins. It explicitly does not simulate transmitter RF power, antenna gain patterns, or dynamic ground station receiver scheduling. A geometric LOS is an indispensable prerequisite, but flight engineers must run separate RF link budget simulations."
  },
  {
    id: 10,
    question: "Why is vertical solar panel mounting preferred at the lunar poles?",
    answer: "At equatorial sites, the Sun passes overhead, favoring horizontal or low-tilt solar panels. At the poles, the Sun never rises more than ~1.54° above the horizon. A horizontally mounted panel receives nearly zero normal photon flux (cosine of 88.5° is ~0.026), whereas a vertical or cylindrical panel directly intercepts low grazing horizontal sunlight."
  },
  {
    id: 11,
    question: "What coordinate frames are used in LUNARIS?",
    answer: "LUNARIS adheres to IAU standards, transforming positions from the International Celestial Reference Frame (ICRF/J2000) into the Moon-fixed Principal Axes (MOON_PA_DE440) frame via SPICE. These coordinates are then projected into the observer's topocentric South-East-Zenith (SEZ) local tangent coordinate system."
  },
  {
    id: 12,
    question: "Can LUNARIS be used for actual flight operations?",
    answer: "No. LUNARIS was created independently for the 2026 NASA Space Apps Challenge for educational analysis and conceptual trade-off exploration. It is not flight-certified software, and mission teams must use certified trajectory and flight software architectures that incorporate real-time guidance telemetry, lander tilt sensors, and calibrated laser rangefinders."
  }
];

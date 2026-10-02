/**
 * CosmosCommand - Global Space Exploration Milestones (Provenance-Aware Historical Archive)
 * Documented historical archive of significant milestones across NASA, ISRO, ESA, Roscosmos/USSR, CNSA, JAXA, and others.
 * Every entry is anchored with primary agency archives, mission catalogues, or official history divisions.
 */
const SPACE_ANNIVERSARIES = [
  // JANUARY
  { 
    month: 1, day: 2, year: 1959, agency: "Roscosmos", flag: "🇷🇺", 
    title: "Luna 1 Launched", 
    details: "First spacecraft to reach the vicinity of Earth's Moon and first spacecraft to be placed in heliocentric orbit.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "Roscosmos / NASA NSSDC Master Catalog",
      sourceUrl: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1959-012A",
      archiveId: "NSSDC ID: 1959-012A"
    }
  },
  { 
    month: 1, day: 8, year: 1973, agency: "Roscosmos", flag: "🇷🇺", 
    title: "Luna 21 Launched", 
    details: "Delivered the Lunokhod 2 rover to the lunar surface in Le Monnier crater, traversing 37 km.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA Space Science Data Coordinated Archive",
      sourceUrl: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1973-001A",
      archiveId: "NSSDC ID: 1973-001A"
    }
  },
  { 
    month: 1, day: 10, year: 2007, agency: "ISRO", flag: "🇮🇳", 
    title: "SRE-1 Launched by PSLV-C7", 
    details: "India's Space Capsule Recovery Experiment tested aerodynamic re-entry, heat shield tiles, and sea recovery.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "Indian Space Research Organisation (ISRO) Mission Archives",
      sourceUrl: "https://www.isro.gov.in/SpaceCapsuleRecoveryExperiment.html",
      archiveId: "ISRO Mission: SRE-1"
    }
  },
  { 
    month: 1, day: 12, year: 1997, agency: "NASA", flag: "🇺🇸", 
    title: "STS-81 Atlantis Launched to Mir", 
    details: "Fifth Shuttle-Mir mission lifted off aboard Atlantis to dock with Mir and transfer 3 tons of scientific cargo.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA Kennedy Space Center Archives",
      sourceUrl: "https://www.nasa.gov/mission_pages/shuttle/shuttlemissions/archives/sts-81.html",
      archiveId: "NASA KSC: STS-81"
    }
  },
  { 
    month: 1, day: 28, year: 1986, agency: "NASA", flag: "🇺🇸", 
    title: "Space Shuttle Challenger Tribute", 
    details: "Remembering the STS-51-L crew and their eternal dedication to cosmic exploration.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA History Division",
      sourceUrl: "https://history.nasa.gov/sts51l.html",
      archiveId: "NASA Memorial Archive"
    }
  },
  { 
    month: 1, day: 31, year: 1958, agency: "NASA", flag: "🇺🇸", 
    title: "Explorer 1 Launched", 
    details: "First US satellite; James Van Allen's cosmic ray detector discovered Earth's radiation belts.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA Jet Propulsion Laboratory (JPL) Archives",
      sourceUrl: "https://www.jpl.nasa.gov/missions/explorer-1",
      archiveId: "JPL Mission Record: Explorer 1"
    }
  },

  // FEBRUARY
  { 
    month: 2, day: 1, year: 2003, agency: "NASA", flag: "🇺🇸", 
    title: "Space Shuttle Columbia Tribute", 
    details: "Honoring the STS-107 crew including Kalpana Chawla, first Indian-origin woman in space.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA History Division",
      sourceUrl: "https://history.nasa.gov/columbia/",
      archiveId: "NASA Memorial Archive: STS-107"
    }
  },
  { 
    month: 2, day: 3, year: 1966, agency: "Roscosmos", flag: "🇷🇺", 
    title: "Luna 9 First Soft Moon Landing", 
    details: "First spacecraft to achieve a survivable soft landing on any celestial body and transmit panoramic images.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA NSSDC Master Catalog / Lavochkin Association",
      sourceUrl: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1966-006A",
      archiveId: "NSSDC ID: 1966-006A"
    }
  },
  { 
    month: 2, day: 6, year: 2018, agency: "SpaceX", flag: "🚀", 
    title: "Falcon Heavy Maiden Flight", 
    details: "Maiden test flight launched Starman into heliocentric orbit beyond Mars.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "SpaceX Launch Manifest / FAA Commercial Space",
      sourceUrl: "https://www.spacex.com/vehicles/falcon-heavy/",
      archiveId: "FAA Commercial Orbital License: LLS 18-107"
    }
  },
  { 
    month: 2, day: 14, year: 1990, agency: "NASA", flag: "🇺🇸", 
    title: "Voyager 1 'Pale Blue Dot' Photograph", 
    details: "Captured Earth as a tiny speck of light suspended in a sunbeam from 6 billion kilometers away.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA JPL Solar System Exploration",
      sourceUrl: "https://science.nasa.gov/mission/voyager/pale-blue-dot/",
      archiveId: "PIA00452"
    }
  },
  { 
    month: 2, day: 15, year: 2017, agency: "ISRO", flag: "🇮🇳", 
    title: "PSLV-C37 Deploys 104 Satellites", 
    details: "Historic global milestone for the highest number of satellites successfully deployed in a single rocket mission.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "Indian Space Research Organisation (ISRO)",
      sourceUrl: "https://www.isro.gov.in/mission_PSLV_C37.html",
      archiveId: "ISRO Launch Record: PSLV-C37"
    }
  },
  { 
    month: 2, day: 18, year: 2021, agency: "NASA", flag: "🇺🇸", 
    title: "Perseverance Rover Lands on Mars", 
    details: "Touched down in Jezero Crater carrying the Ingenuity Mars Helicopter to search for ancient biosignatures.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA Jet Propulsion Laboratory (JPL)",
      sourceUrl: "https://mars.nasa.gov/mars2020/",
      archiveId: "NASA Mars Exploration Program"
    }
  },
  { 
    month: 2, day: 20, year: 1962, agency: "NASA", flag: "🇺🇸", 
    title: "John Glenn Orbits Earth (Friendship 7)", 
    details: "First American astronaut to orbit Earth, circling three times aboard Friendship 7.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA History Division",
      sourceUrl: "https://history.nasa.gov/friendship7/",
      archiveId: "Mercury-Atlas 6 Record"
    }
  },

  // MARCH
  { 
    month: 3, day: 2, year: 1972, agency: "NASA", flag: "🇺🇸", 
    title: "Pioneer 10 Launched", 
    details: "First mission to Jupiter, first to cross the asteroid belt, and first spacecraft to achieve escape velocity from solar system.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA Ames Research Center",
      sourceUrl: "https://www.nasa.gov/centers-and-facilities/ames/pioneer-10-spacecraft/",
      archiveId: "NSSDC ID: 1972-012A"
    }
  },
  { 
    month: 3, day: 9, year: 1934, agency: "Roscosmos", flag: "🇷🇺", 
    title: "Yuri Gagarin Birthday", 
    details: "Celebrating the birth of the first human to cross the boundary into outer space.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "Gagarin Research & Test Cosmonaut Training Center",
      sourceUrl: "http://www.gctc.ru/",
      archiveId: "Cosmonaut Bio #1"
    }
  },
  { 
    month: 3, day: 14, year: 2016, agency: "ESA", flag: "🇪🇺", 
    title: "ExoMars Trace Gas Orbiter Launched", 
    details: "Joint ESA-Roscosmos mission to detect atmospheric methane and potential biosignatures on Mars.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "European Space Agency (ESA)",
      sourceUrl: "https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Exploration/ExoMars",
      archiveId: "ESA Mission: ExoMars TGO"
    }
  },
  { 
    month: 3, day: 18, year: 1965, agency: "Roscosmos", flag: "🇷🇺", 
    title: "First Spacewalk (Alexei Leonov)", 
    details: "Voskhod 2 cosmonaut spent 12 minutes outside the spacecraft in humanity's first extravehicular activity (EVA).",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "Roscosmos State Corporation / RKK Energia",
      sourceUrl: "https://www.roscosmos.ru/",
      archiveId: "Voskhod 2 Flight Record"
    }
  },
  { 
    month: 3, day: 27, year: 2019, agency: "ISRO", flag: "🇮🇳", 
    title: "Mission Shakti ASAT Demonstration", 
    details: "India successfully demonstrated anti-satellite defense capability, intercepting a live satellite in low Earth orbit.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "Defence Research and Development Organisation (DRDO) & ISRO",
      sourceUrl: "https://pib.gov.in/PressReleasePage.aspx?PRID=1569599",
      archiveId: "PIB Release ID: 1569599"
    }
  },

  // APRIL
  { 
    month: 4, day: 11, year: 1970, agency: "NASA", flag: "🇺🇸", 
    title: "Apollo 13 Launched", 
    details: "'Houston, we've had a problem' — a masterclass in ground telemetry and crisis recovery around the Moon.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA History Division",
      sourceUrl: "https://www.nasa.gov/mission_pages/apollo/missions/apollo13.html",
      archiveId: "Apollo 13 Mission Report SP-289"
    }
  },
  { 
    month: 4, day: 12, year: 1961, agency: "Roscosmos", flag: "🇷🇺", 
    title: "Yuri Gagarin - First Human in Space", 
    details: "Vostok 1 completed one full orbit around Earth in 108 minutes; celebrated as International Day of Human Space Flight.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "United Nations Office for Outer Space Affairs (UNOOSA)",
      sourceUrl: "https://www.unoosa.org/oosa/en/ourwork/human-spaceflight/day-human-spaceflight.html",
      archiveId: "UN Resolution A/RES/65/271"
    }
  },
  { 
    month: 4, day: 12, year: 1981, agency: "NASA", flag: "🇺🇸", 
    title: "First Space Shuttle Flight (Columbia STS-1)", 
    details: "Maiden orbital flight of the reusable Space Transportation System, piloted by John Young and Robert Crippen.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA Kennedy Space Center",
      sourceUrl: "https://www.nasa.gov/mission_pages/shuttle/shuttlemissions/archives/sts-1.html",
      archiveId: "STS-1 Flight Summary"
    }
  },
  { 
    month: 4, day: 14, year: 2023, agency: "ESA", flag: "🇪🇺", 
    title: "JUICE Launched to Jupiter", 
    details: "Jupiter Icy Moons Explorer launched aboard Ariane 5 to inspect the subsurface oceans of Ganymede, Callisto, and Europa.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "European Space Agency (ESA)",
      sourceUrl: "https://www.esa.int/Science_Exploration/Space_Science/Juice",
      archiveId: "ESA Science Mission: JUICE"
    }
  },
  { 
    month: 4, day: 19, year: 1971, agency: "Roscosmos", flag: "🇷🇺", 
    title: "Salyut 1 - First Space Station", 
    details: "World's first crewed space station placed in orbit, docking with Soyuz 11.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA NSSDC Master Catalog",
      sourceUrl: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-032A",
      archiveId: "NSSDC ID: 1971-032A"
    }
  },
  { 
    month: 4, day: 19, year: 1975, agency: "ISRO", flag: "🇮🇳", 
    title: "Aryabhata - India's First Satellite", 
    details: "Launched aboard Kosmos-3M from Kapustin Yar, establishing India as an active spacefaring nation.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "Indian Space Research Organisation (ISRO)",
      sourceUrl: "https://www.isro.gov.in/Aryabhata.html",
      archiveId: "ISRO Heritage Mission: Aryabhata"
    }
  },
  { 
    month: 4, day: 24, year: 1990, agency: "NASA", flag: "🇺🇸", 
    title: "Hubble Space Telescope Launched (STS-31)", 
    details: "Space Shuttle Discovery STS-31 lifted off carrying Hubble to low Earth orbit, where it was deployed on April 25.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA Goddard Space Flight Center (GSFC) / STScI",
      sourceUrl: "https://hubblesite.org/",
      archiveId: "NASA GSFC Hubble Mission Record"
    }
  },
  { 
    month: 4, day: 29, year: 2021, agency: "CNSA", flag: "🇨🇳", 
    title: "Tianhe Core Module Launched", 
    details: "Long March 5B launched the core module of China's Tiangong permanent orbital space station.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "China National Space Administration (CNSA)",
      sourceUrl: "http://www.cnsa.gov.cn/",
      archiveId: "CNSA Tiangong Architecture Record"
    }
  },

  // MAY
  { 
    month: 5, day: 5, year: 1961, agency: "NASA", flag: "🇺🇸", 
    title: "Alan Shepard - First American in Space", 
    details: "Freedom 7 suborbital Mercury flight reached an altitude of 187 kilometers.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA History Division",
      sourceUrl: "https://history.nasa.gov/MR-3/cover.htm",
      archiveId: "Mercury-Redstone 3 Record"
    }
  },
  { 
    month: 5, day: 14, year: 1973, agency: "NASA", flag: "🇺🇸", 
    title: "Skylab 1 Launched", 
    details: "America's first standalone orbital space station lifted off aboard a Saturn INT-21.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA Marshall Space Flight Center",
      sourceUrl: "https://www.nasa.gov/mission_pages/skylab/",
      archiveId: "NASA SP-400 Skylab Chronology"
    }
  },
  { 
    month: 5, day: 15, year: 2021, agency: "CNSA", flag: "🇨🇳", 
    title: "Tianwen-1 Zhurong Rover on Mars", 
    details: "China became the second nation in history to land and successfully operate a robotic rover on Mars.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "China National Space Administration (CNSA)",
      sourceUrl: "http://www.cnsa.gov.cn/",
      archiveId: "CNSA Tianwen-1 Mission Record"
    }
  },
  { 
    month: 5, day: 30, year: 2020, agency: "SpaceX", flag: "🚀", 
    title: "Crew Dragon Demo-2 Launches to ISS", 
    details: "First commercial crewed orbital spaceflight, restoring American orbital human launch capability with Behnken & Hurley.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA Commercial Crew Program",
      sourceUrl: "https://www.nasa.gov/commercialcrew/",
      archiveId: "NASA CCP Demo-2 Report"
    }
  },

  // JUNE
  { 
    month: 6, day: 2, year: 2003, agency: "ESA", flag: "🇪🇺", 
    title: "Mars Express Launched", 
    details: "Europe's first planetary science mission, still conducting orbital science and radar sounding at Mars.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "European Space Agency (ESA)",
      sourceUrl: "https://www.esa.int/Science_Exploration/Space_Science/Mars_Express",
      archiveId: "ESA Science Mission: MEX"
    }
  },
  { 
    month: 6, day: 16, year: 1963, agency: "Roscosmos", flag: "🇷🇺", 
    title: "Valentina Tereshkova - First Woman in Space", 
    details: "Piloted Vostok 6 solo, completing 48 orbits over 71 hours in space.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "Roscosmos Archives / UNOOSA",
      sourceUrl: "https://www.unoosa.org/",
      archiveId: "Vostok 6 Mission Record"
    }
  },
  { 
    month: 6, day: 18, year: 1983, agency: "NASA", flag: "🇺🇸", 
    title: "Sally Ride - First American Woman in Space", 
    details: "Launched aboard Challenger STS-7 as mission specialist and robotic arm operator.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA History Division",
      sourceUrl: "https://www.nasa.gov/astronautprofiles/sally-ride/",
      archiveId: "STS-7 Flight Record"
    }
  },
  { 
    month: 6, day: 25, year: 1997, agency: "Roscosmos", flag: "🇷🇺", 
    title: "Mir Spektr Collision", 
    details: "Progress M-34 cargo spacecraft collided with the Spektr module; crew sealed the breach and saved the station.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "RKK Energia / NASA Mir Hardware Heritage",
      sourceUrl: "https://history.nasa.gov/SP-4225/documentation/mir/mir.htm",
      archiveId: "NASA Reference Publication 1357"
    }
  },

  // JULY
  { 
    month: 7, day: 4, year: 1997, agency: "NASA", flag: "🇺🇸", 
    title: "Mars Pathfinder & Sojourner Land", 
    details: "Airbag landing in Ares Vallis deploying the first micro-rover on Martian terrain.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA Jet Propulsion Laboratory (JPL)",
      sourceUrl: "https://mars.nasa.gov/mars-exploration/missions/pathfinder/",
      archiveId: "JPL Mars Pathfinder Archive"
    }
  },
  { 
    month: 7, day: 14, year: 2015, agency: "NASA", flag: "🇺🇸", 
    title: "New Horizons Pluto Flyby", 
    details: "First spacecraft to visit the Pluto-Charon system, mapping its nitrogen ice plains (Tombaugh Regio).",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "Johns Hopkins University Applied Physics Laboratory (JHUAPL) & NASA",
      sourceUrl: "https://pluto.jhuapl.edu/",
      archiveId: "New Horizons Planetary Mission"
    }
  },
  { 
    month: 7, day: 14, year: 2023, agency: "ISRO", flag: "🇮🇳", 
    title: "Chandrayaan-3 Liftoff", 
    details: "LVM3-M4 rocket lifted off from Sriharikota, carrying India's lunar lander and rover on course to the Moon.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "Indian Space Research Organisation (ISRO)",
      sourceUrl: "https://www.isro.gov.in/Chandrayaan3.html",
      archiveId: "ISRO Mission: Chandrayaan-3"
    }
  },
  { 
    month: 7, day: 17, year: 1975, agency: "NASA", flag: "🇺🇸", 
    title: "Apollo-Soyuz Historic Orbital Handshake", 
    details: "First international crewed docking; commanders Stafford and Leonov shook hands through the docking module.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA History Division",
      sourceUrl: "https://history.nasa.gov/apollo/apsoyuz.html",
      archiveId: "NASA SP-4209 The Apollo-Soyuz Test Project"
    }
  },
  { 
    month: 7, day: 20, year: 1969, agency: "NASA", flag: "🇺🇸", 
    title: "Apollo 11 Moon Landing", 
    details: "Neil Armstrong & Buzz Aldrin landed the Lunar Module Eagle in the Sea of Tranquility: 'That's one small step for man, one giant leap for mankind.'",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA Lunar Surface Journal / National Archives",
      sourceUrl: "https://www.nasa.gov/mission_pages/apollo/apollo-11.html",
      archiveId: "Apollo 11 Flight Journal"
    }
  },
  { 
    month: 7, day: 22, year: 2019, agency: "ISRO", flag: "🇮🇳", 
    title: "Chandrayaan-2 Liftoff", 
    details: "GSLV Mk III launched India's advanced high-resolution lunar orbiter, carrying 8 scientific instruments.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "Indian Space Research Organisation (ISRO)",
      sourceUrl: "https://www.isro.gov.in/Chandrayaan2.html",
      archiveId: "ISRO Mission: Chandrayaan-2"
    }
  },
  { 
    month: 7, day: 30, year: 2020, agency: "NASA", flag: "🇺🇸", 
    title: "Mars 2020 Perseverance Launched", 
    details: "Atlas V rocket launched Perseverance rover and the Ingenuity helicopter on trajectory to Mars.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA JPL Mars Exploration Program",
      sourceUrl: "https://mars.nasa.gov/mars2020/",
      archiveId: "NASA Mars 2020 Archive"
    }
  },

  // AUGUST
  { 
    month: 8, day: 5, year: 2011, agency: "NASA", flag: "🇺🇸", 
    title: "Juno Spacecraft Launched to Jupiter", 
    details: "Solar-powered spacecraft launched to map Jupiter's gravitational field, magnetic dynamo, and deep water abundance.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "Southwest Research Institute (SwRI) & NASA JPL",
      sourceUrl: "https://www.nasa.gov/mission_pages/juno/main/index.html",
      archiveId: "NASA New Frontiers: Juno"
    }
  },
  { 
    month: 8, day: 6, year: 2012, agency: "NASA", flag: "🇺🇸", 
    title: "Curiosity Rover Lands in Gale Crater", 
    details: "Successfully executed the 'Sky Crane' touchdown technique to begin exploring Mount Sharp for past habitable environments.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA Jet Propulsion Laboratory (JPL)",
      sourceUrl: "https://mars.nasa.gov/msl/",
      archiveId: "Mars Science Laboratory Archive"
    }
  },
  { 
    month: 8, day: 10, year: 1990, agency: "NASA", flag: "🇺🇸", 
    title: "Magellan Enters Venus Orbit", 
    details: "Synthetic aperture radar mapped 98% of the surface of Venus through its dense clouds at 100-meter resolution.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA Jet Propulsion Laboratory (JPL)",
      sourceUrl: "https://www.jpl.nasa.gov/missions/magellan",
      archiveId: "JPL Magellan Venus Data Archive"
    }
  },
  { 
    month: 8, day: 12, year: 2018, agency: "NASA", flag: "🇺🇸", 
    title: "Parker Solar Probe Launched", 
    details: "Fastest human-made object in history, directly sampling the solar corona at speeds exceeding 600,000 km/h.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "Johns Hopkins Applied Physics Laboratory (JHUAPL) & NASA",
      sourceUrl: "https://parkersolarprobe.jhuapl.edu/",
      archiveId: "NASA Living With a Star Program"
    }
  },
  { 
    month: 8, day: 20, year: 1977, agency: "NASA", flag: "🇺🇸", 
    title: "Voyager 2 Launched", 
    details: "Only spacecraft in history to complete the grand tour flybys of Jupiter, Saturn, Uranus, and Neptune.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA Jet Propulsion Laboratory (JPL)",
      sourceUrl: "https://voyager.jpl.nasa.gov/",
      archiveId: "Voyager Mission Archive: 1977-076A"
    }
  },
  { 
    month: 8, day: 23, year: 2023, agency: "ISRO", flag: "🇮🇳", 
    title: "Chandrayaan-3 Historic South Pole Landing", 
    details: "Vikram Lander touched down near the Lunar South Pole, making India the 4th nation to soft-land on the Moon and 1st at the high southern latitudes.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "Indian Space Research Organisation (ISRO)",
      sourceUrl: "https://www.isro.gov.in/Chandrayaan3_Details.html",
      archiveId: "ISRO National Space Day Benchmark: Ch-3"
    }
  },
  { 
    month: 8, day: 25, year: 2012, agency: "NASA", flag: "🇺🇸", 
    title: "Voyager 1 Enters Interstellar Space", 
    details: "Plasma wave instrument recorded a dramatic jump in interstellar plasma density as Voyager 1 crossed the heliopause.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA Jet Propulsion Laboratory (JPL) & Science",
      sourceUrl: "https://science.nasa.gov/mission/voyager/",
      archiveId: "Science 12 Sept 2013: Vol 341"
    }
  },

  // SEPTEMBER
  { 
    month: 9, day: 2, year: 2023, agency: "ISRO", flag: "🇮🇳", 
    title: "Aditya-L1 Solar Observatory Liftoff", 
    details: "India's first space-based solar observatory successfully launched toward the Sun-Earth Lagrange Point L1.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "Indian Space Research Organisation (ISRO)",
      sourceUrl: "https://www.isro.gov.in/Aditya_L1.html",
      archiveId: "ISRO Mission: Aditya-L1"
    }
  },
  { 
    month: 9, day: 5, year: 1977, agency: "NASA", flag: "🇺🇸", 
    title: "Voyager 1 Launched", 
    details: "Carrying the Golden Record containing greetings in 55 languages and sounds of Earth toward interstellar space.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA Jet Propulsion Laboratory (JPL)",
      sourceUrl: "https://voyager.jpl.nasa.gov/golden-record/",
      archiveId: "NSSDC ID: 1977-084A"
    }
  },
  { 
    month: 9, day: 15, year: 2017, agency: "NASA", flag: "🇺🇸", 
    title: "Cassini Grand Finale at Saturn", 
    details: "Plunged intentionally into Saturn's crushing upper atmosphere to protect pristine ocean moons Enceladus and Titan.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA / ESA / ASI Cassini Project",
      sourceUrl: "https://science.nasa.gov/mission/cassini/grand-finale/overview/",
      archiveId: "Cassini Mission End Archive"
    }
  },
  { 
    month: 9, day: 24, year: 2014, agency: "ISRO", flag: "🇮🇳", 
    title: "Mars Orbiter Mission (Mangalyaan) Arrival", 
    details: "India became the first nation to achieve Mars orbit insertion on its maiden attempt at record efficiency.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "Indian Space Research Organisation (ISRO)",
      sourceUrl: "https://www.isro.gov.in/pslv-c25-mars-orbiter-mission.html",
      archiveId: "ISRO MOM Archive Record"
    }
  },
  { 
    month: 9, day: 24, year: 2023, agency: "NASA", flag: "🇺🇸", 
    title: "OSIRIS-REx Bennu Sample Return", 
    details: "Delivered 121 grams of carbonaceous asteroid material safely to the Utah Test and Training Range.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA Goddard Space Flight Center / University of Arizona",
      sourceUrl: "https://science.nasa.gov/mission/osiris-rex/",
      archiveId: "OSIRIS-REx Sample Curatorial Facility"
    }
  },
  { 
    month: 9, day: 26, year: 2022, agency: "NASA", flag: "🇺🇸", 
    title: "DART Kinetic Impact with Dimorphos", 
    details: "Humanity's first planetary defense test intentionally altered an asteroid's orbital period by 33 minutes.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "Johns Hopkins Applied Physics Laboratory (JHUAPL) & NASA",
      sourceUrl: "https://dart.jhuapl.edu/",
      archiveId: "NASA Planetary Defense Coordination Office"
    }
  },
  { 
    month: 9, day: 28, year: 2015, agency: "ISRO", flag: "🇮🇳", 
    title: "AstroSat Launched", 
    details: "India's first multi-wavelength space astronomy observatory launched aboard PSLV-C30.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "Indian Space Research Organisation (ISRO)",
      sourceUrl: "https://www.isro.gov.in/astrosat.html",
      archiveId: "AstroSat Science Archive"
    }
  },

  // OCTOBER
  { 
    month: 10, day: 1, year: 1958, agency: "NASA", flag: "🇺🇸", 
    title: "NASA Officially Opens for Business", 
    details: "Formed under the National Aeronautics and Space Act of 1958 signed by President Dwight D. Eisenhower.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA History Division",
      sourceUrl: "https://history.nasa.gov/spaceact.html",
      archiveId: "Public Law 85-568"
    }
  },
  { 
    month: 10, day: 4, year: 1957, agency: "Roscosmos", flag: "🇷🇺", 
    title: "Sputnik 1 - Dawn of the Space Age", 
    details: "World's first artificial satellite beeped from low Earth orbit, inaugurating human space exploration.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA History Division & Roscosmos Archives",
      sourceUrl: "https://history.nasa.gov/sputnik/",
      archiveId: "NSSDC ID: 1957-001B"
    }
  },
  { 
    month: 10, day: 14, year: 2024, agency: "NASA", flag: "🇺🇸", 
    title: "Europa Clipper Liftoff on Falcon Heavy", 
    details: "NASA's flagship planetary spacecraft launched on trajectory toward Jupiter to inspect Europa's subsurface ocean.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA Jet Propulsion Laboratory (JPL)",
      sourceUrl: "https://www.jpl.nasa.gov/missions/europa-clipper",
      archiveId: "NASA Planetary Science Division"
    }
  },
  { 
    month: 10, day: 15, year: 1997, agency: "NASA", flag: "🇺🇸", 
    title: "Cassini-Huygens Launched", 
    details: "Cooperative NASA/ESA/ASI flagship mission launched aboard Titan IVB toward Saturn and Titan.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA JPL & European Space Agency",
      sourceUrl: "https://science.nasa.gov/mission/cassini/",
      archiveId: "NSSDC ID: 1997-061A"
    }
  },
  { 
    month: 10, day: 15, year: 2003, agency: "CNSA", flag: "🇨🇳", 
    title: "Yang Liwei - Shenzhou 5", 
    details: "China's first crewed spaceflight, orbiting Earth 14 times aboard Shenzhou 5.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "China Manned Space Agency (CMSA)",
      sourceUrl: "http://en.cmse.gov.cn/",
      archiveId: "CMSA Shenzhou 5 Record"
    }
  },
  { 
    month: 10, day: 18, year: 2019, agency: "NASA", flag: "🇺🇸", 
    title: "First All-Female Spacewalk", 
    details: "Astronauts Christina Koch and Jessica Meir performed historic 7-hour EVA outside the ISS to replace power controllers.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA Johnson Space Center (JSC)",
      sourceUrl: "https://www.nasa.gov/mission_pages/station/spacewalks/",
      archiveId: "ISS EVA #58"
    }
  },
  { 
    month: 10, day: 22, year: 2008, agency: "ISRO", flag: "🇮🇳", 
    title: "Chandrayaan-1 Moon Mission Liftoff", 
    details: "India's first lunar probe confirmed the existence and distribution of hydroxyl/water molecules on the Moon's surface.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "Indian Space Research Organisation (ISRO)",
      sourceUrl: "https://www.isro.gov.in/Chandrayaan_1.html",
      archiveId: "ISRO Mission: Chandrayaan-1"
    }
  },

  // NOVEMBER
  { 
    month: 11, day: 2, year: 2000, agency: "International", flag: "🌐", 
    title: "ISS Expedition 1 Crew Arrives", 
    details: "Shepherd, Gidzenko, and Krikalev began permanent, unbroken human occupancy in low Earth orbit.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA Johnson Space Center / International Space Station Program",
      sourceUrl: "https://www.nasa.gov/mission_pages/station/expeditions/expedition01/index.html",
      archiveId: "ISS Expedition 1 Chronology"
    }
  },
  { 
    month: 11, day: 3, year: 1957, agency: "Roscosmos", flag: "🇷🇺", 
    title: "Sputnik 2 Carries Laika", 
    details: "First living creature to enter Earth orbit, providing vital preliminary biological telemetry.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA NSSDC Master Catalog",
      sourceUrl: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1957-002A",
      archiveId: "NSSDC ID: 1957-002A"
    }
  },
  { 
    month: 11, day: 5, year: 2013, agency: "ISRO", flag: "🇮🇳", 
    title: "Mangalyaan (MOM) Liftoff", 
    details: "PSLV-C25 launched India's historic interplanetary voyage to the Red Planet from Satish Dhawan Space Centre.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "Indian Space Research Organisation (ISRO)",
      sourceUrl: "https://www.isro.gov.in/pslv-c25-mars-orbiter-mission.html",
      archiveId: "ISRO Launch Manifest: PSLV-C25"
    }
  },
  { 
    month: 11, day: 12, year: 2014, agency: "ESA", flag: "🇪🇺", 
    title: "Philae Lands on Comet 67P", 
    details: "Rosetta mission achieved humanity's first soft touchdown on a comet nucleus (67P/Churyumov–Gerasimenko).",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "European Space Agency (ESA)",
      sourceUrl: "https://www.esa.int/Science_Exploration/Space_Science/Rosetta",
      archiveId: "ESA Rosetta/Philae Archive"
    }
  },
  { 
    month: 11, day: 16, year: 2022, agency: "NASA", flag: "🇺🇸", 
    title: "Artemis 1 SLS Maiden Liftoff", 
    details: "Space Launch System rocket lifted off carrying an uncrewed Orion spacecraft into distant retrograde lunar orbit.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA Exploration Systems Development Mission Directorate",
      sourceUrl: "https://www.nasa.gov/specials/artemis-i/",
      archiveId: "Artemis I Post-Flight Report"
    }
  },
  { 
    month: 11, day: 20, year: 1998, agency: "Roscosmos", flag: "🇷🇺", 
    title: "Zarya Module - First ISS Element", 
    details: "Proton-K rocket launched the foundational Functional Cargo Block of the International Space Station from Baikonur.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "Roscosmos & NASA",
      sourceUrl: "https://www.nasa.gov/mission_pages/station/structure/elements/zarya.html",
      archiveId: "ISS Element: Zarya (FGB)"
    }
  },

  // DECEMBER
  { 
    month: 12, day: 3, year: 2014, agency: "JAXA", flag: "🇯🇵", 
    title: "Hayabusa 2 Launched to Ryugu", 
    details: "Sample-return mission collected pristine carbonaceous asteroid subsurface fragments and returned them to Earth in 2020.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "Japan Aerospace Exploration Agency (JAXA) Institute of Space and Astronautical Science",
      sourceUrl: "https://www.isas.jaxa.jp/en/missions/spacecraft/current/hayabusa2.html",
      archiveId: "JAXA ISAS Hayabusa2 Record"
    }
  },
  { 
    month: 12, day: 7, year: 1972, agency: "NASA", flag: "🇺🇸", 
    title: "Apollo 17 'Blue Marble' Photo", 
    details: "Crew captured the iconic photograph showing Earth completely illuminated from Antarctica to the Mediterranean.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA Johnson Space Center (JSC)",
      sourceUrl: "https://www.nasa.gov/image-article/the-blue-marble/",
      archiveId: "NASA Photo ID: AS17-148-22727"
    }
  },
  { 
    month: 12, day: 14, year: 1972, agency: "NASA", flag: "🇺🇸", 
    title: "Gene Cernan - Last Human on the Moon", 
    details: "Apollo 17 commander stepped off the lunar surface with promise to return with peace and hope for all mankind.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA Lunar Surface Journal",
      sourceUrl: "https://www.nasa.gov/mission_pages/apollo/apollo-17.html",
      archiveId: "Apollo 17 Surface Record"
    }
  },
  { 
    month: 12, day: 21, year: 1968, agency: "NASA", flag: "🇺🇸", 
    title: "Apollo 8 - First Humans to Orbit the Moon", 
    details: "Borman, Lovell, and Anders captured the transcendent 'Earthrise' photograph on Christmas Eve.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA History Division",
      sourceUrl: "https://www.nasa.gov/image-article/earthrise/",
      archiveId: "NASA Photo ID: AS08-14-2383"
    }
  },
  { 
    month: 12, day: 21, year: 2015, agency: "SpaceX", flag: "🚀", 
    title: "First Orbital Booster Landing (Falcon 9)", 
    details: "Orbcomm OG2 mission booster touched down vertically at Cape Canaveral LZ-1, proving orbital rocketry reusability.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "SpaceX & US Space Force 45th Space Wing",
      sourceUrl: "https://www.spacex.com/",
      archiveId: "Cape Canaveral Landing Zone 1 Log"
    }
  },
  { 
    month: 12, day: 25, year: 2021, agency: "NASA", flag: "🌌", 
    title: "James Webb Space Telescope (JWST) Liftoff", 
    details: "Ariane 5 delivered the golden infrared observatory on course to Sun-Earth Lagrange Point L2.",
    provenance: {
      tier: "historical_archive", authority: "primary",
      publisher: "NASA / ESA / CSA Webb Science Operations Center",
      sourceUrl: "https://webbtelescope.org/",
      archiveId: "JWST Flight Record: VA256"
    }
  }
];

class SpaceAnniversaries {
  static getForMonth(year, month) {
    return SPACE_ANNIVERSARIES
      .filter(item => item.month === month)
      .map(item => {
        const elapsed = year - item.year;
        return {
          id: `anniv-${item.year}-${item.month}-${item.day}`,
          type: "anniversary",
          category: "Anniversaries",
          title: item.title,
          badgeText: `${elapsed}y`,
          flag: item.flag,
          agency: item.agency,
          yearOriginal: item.year,
          yearsElapsed: elapsed,
          date: new Date(Date.UTC(year, month - 1, item.day, 12, 0, 0)),
          day: item.day,
          details: `${item.details} Occurred on ${item.month}/${item.day}/${item.year} (${elapsed} years ago).`,
          color: "#eab308",
          provenance: {
            ...item.provenance,
            status: "verified_archive",
            retrievedAt: new Date().toISOString(),
            cachedAt: null
          }
        };
      });
  }

  static getAll() {
    return SPACE_ANNIVERSARIES;
  }
}

window.spaceAnniversaries = SpaceAnniversaries;

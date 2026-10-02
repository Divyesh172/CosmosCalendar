/**
 * CosmosCommand - Meteor Showers Almanac (Provenance-Aware)
 * Curated from International Astronomical Union (IAU) Meteor Data Center (MDC).
 * Active windows reflect full astronomical observing bounds across month boundaries.
 */
const METEOR_SHOWERS = [
  {
    name: "Quadrantids",
    month: 1,
    peakDay: 3,
    activePeriod: "Dec 28 – Jan 12",
    zhr: 110,
    velocity: 41,
    parentBody: "Asteroid 2003 EH1",
    radiant: "Boötes",
    iauCode: "QUA (010)",
    details: "Intense meteor shower with bright fireballs and a narrow 6-hour peak window.",
    provenance: {
      tier: "ephemeris",
      authority: "primary",
      publisher: "International Astronomical Union (IAU) Meteor Data Center",
      sourceUrl: "https://www.ta3.sk/IAUC22DB/MDC2007/Roje/pojedynczy_obiekt.php?kodstrumienia=00010",
      archiveId: "IAU MDC #00010"
    }
  },
  {
    name: "Lyrids",
    month: 4,
    peakDay: 22,
    activePeriod: "Apr 14 – Apr 30",
    zhr: 18,
    velocity: 49,
    parentBody: "Comet C/1861 G1 (Thatcher)",
    radiant: "Lyra",
    iauCode: "LYR (006)",
    details: "Ancient meteor shower observed for over 2,700 years, known for fast streaks and occasional dust trains.",
    provenance: {
      tier: "ephemeris",
      authority: "primary",
      publisher: "International Astronomical Union (IAU) Meteor Data Center",
      sourceUrl: "https://www.ta3.sk/IAUC22DB/MDC2007/Roje/pojedynczy_obiekt.php?kodstrumienia=00006",
      archiveId: "IAU MDC #00006"
    }
  },
  {
    name: "Eta Aquariids",
    month: 5,
    peakDay: 5,
    activePeriod: "Apr 19 – May 28",
    zhr: 50,
    velocity: 66,
    parentBody: "1P/Halley's Comet",
    radiant: "Aquarius",
    iauCode: "ETA (031)",
    details: "High-speed meteors originating from debris left behind by Halley's Comet; favored in southern latitudes.",
    provenance: {
      tier: "ephemeris",
      authority: "primary",
      publisher: "International Astronomical Union (IAU) Meteor Data Center",
      sourceUrl: "https://www.ta3.sk/IAUC22DB/MDC2007/Roje/pojedynczy_obiekt.php?kodstrumienia=00031",
      archiveId: "IAU MDC #00031"
    }
  },
  {
    name: "Delta Aquariids",
    month: 7,
    peakDay: 30,
    activePeriod: "Jul 12 – Aug 23",
    zhr: 25,
    velocity: 41,
    parentBody: "Comet 96P/Machholz",
    radiant: "Aquarius",
    iauCode: "SDA (005)",
    details: "Steady mid-summer shower, visible best in pre-dawn hours with persistent ionization trails.",
    provenance: {
      tier: "ephemeris",
      authority: "primary",
      publisher: "International Astronomical Union (IAU) Meteor Data Center",
      sourceUrl: "https://www.ta3.sk/IAUC22DB/MDC2007/Roje/pojedynczy_obiekt.php?kodstrumienia=00005",
      archiveId: "IAU MDC #00005"
    }
  },
  {
    name: "Perseids",
    month: 8,
    peakDay: 12,
    activePeriod: "Jul 17 – Aug 24",
    zhr: 100,
    velocity: 59,
    parentBody: "Comet 109P/Swift-Tuttle",
    radiant: "Perseus",
    iauCode: "PER (007)",
    details: "The most popular summer meteor shower, producing vivid fireballs leaving long luminous ionization trails.",
    provenance: {
      tier: "ephemeris",
      authority: "primary",
      publisher: "International Astronomical Union (IAU) Meteor Data Center",
      sourceUrl: "https://www.ta3.sk/IAUC22DB/MDC2007/Roje/pojedynczy_obiekt.php?kodstrumienia=00007",
      archiveId: "IAU MDC #00007"
    }
  },
  {
    name: "Draconids",
    month: 10,
    peakDay: 8,
    activePeriod: "Oct 6 – Oct 10",
    zhr: 10,
    velocity: 20,
    parentBody: "Comet 21P/Giacobini-Zinner",
    radiant: "Draco",
    iauCode: "GIA (009)",
    details: "Slow-moving meteors best observed in early evening twilight shortly after nightfall.",
    provenance: {
      tier: "ephemeris",
      authority: "primary",
      publisher: "International Astronomical Union (IAU) Meteor Data Center",
      sourceUrl: "https://www.ta3.sk/IAUC22DB/MDC2007/Roje/pojedynczy_obiekt.php?kodstrumienia=00009",
      archiveId: "IAU MDC #00009"
    }
  },
  {
    name: "Orionids",
    month: 10,
    peakDay: 21,
    activePeriod: "Oct 2 – Nov 7",
    zhr: 20,
    velocity: 66,
    parentBody: "1P/Halley's Comet",
    radiant: "Orion",
    iauCode: "ORI (008)",
    details: "Swift meteors with prolonged ion trails radiating near Betelgeuse in the constellation Orion.",
    provenance: {
      tier: "ephemeris",
      authority: "primary",
      publisher: "International Astronomical Union (IAU) Meteor Data Center",
      sourceUrl: "https://www.ta3.sk/IAUC22DB/MDC2007/Roje/pojedynczy_obiekt.php?kodstrumienia=00008",
      archiveId: "IAU MDC #00008"
    }
  },
  {
    name: "Leonids",
    month: 11,
    peakDay: 17,
    activePeriod: "Nov 6 – Nov 30",
    zhr: 15,
    velocity: 71,
    parentBody: "Comet 55P/Tempel-Tuttle",
    radiant: "Leo",
    iauCode: "LEO (013)",
    details: "Fastest meteors known, capable of historic meteor storms every 33 years.",
    provenance: {
      tier: "ephemeris",
      authority: "primary",
      publisher: "International Astronomical Union (IAU) Meteor Data Center",
      sourceUrl: "https://www.ta3.sk/IAUC22DB/MDC2007/Roje/pojedynczy_obiekt.php?kodstrumienia=00013",
      archiveId: "IAU MDC #00013"
    }
  },
  {
    name: "Geminids",
    month: 12,
    peakDay: 13,
    activePeriod: "Dec 4 – Dec 20",
    zhr: 150,
    velocity: 35,
    parentBody: "Asteroid 3200 Phaethon",
    radiant: "Gemini",
    iauCode: "GEM (004)",
    details: "The king of meteor showers: bright, multi-colored, and slow-burning meteors from a rocky asteroid.",
    provenance: {
      tier: "ephemeris",
      authority: "primary",
      publisher: "International Astronomical Union (IAU) Meteor Data Center",
      sourceUrl: "https://www.ta3.sk/IAUC22DB/MDC2007/Roje/pojedynczy_obiekt.php?kodstrumienia=00004",
      archiveId: "IAU MDC #00004"
    }
  },
  {
    name: "Ursids",
    month: 12,
    peakDay: 22,
    activePeriod: "Dec 17 – Dec 26",
    zhr: 10,
    velocity: 33,
    parentBody: "Comet 8P/Tuttle",
    radiant: "Ursa Minor",
    iauCode: "URS (015)",
    details: "Final meteor shower of the year, radiating near Kochab in Ursa Minor.",
    provenance: {
      tier: "ephemeris",
      authority: "primary",
      publisher: "International Astronomical Union (IAU) Meteor Data Center",
      sourceUrl: "https://www.ta3.sk/IAUC22DB/MDC2007/Roje/pojedynczy_obiekt.php?kodstrumienia=00015",
      archiveId: "IAU MDC #00015"
    }
  }
];

window.meteorShowersData = METEOR_SHOWERS;

# 🪐 CosmosCommand — Provenance-Aware Space Intelligence & Cosmic Observatory

A research-grade space events dashboard and cosmic observatory aggregating authoritative agency data, scientific ephemeris databases, global launch tracking APIs, and verified space-news publishers.

---

## 🛡️ Core Philosophy: Zero Synthetic Generation & Full Provenance

Traditional space dashboards often fall back to hardcoded mock data and silently reassign dates across calendar views when network connectivity drops or APIs are rate-limited. 

**CosmosCommand enforces a strict Zero-Fabrication Architecture:**
1. **Never Invented:** When an API is unreachable or rate-limited and no cache exists, the system honestly reports `"0 verified events on record for this range"`. It never manufactures or date-shifts artificial events into your calendar.
2. **Strict Fallback Hierarchy:**
   $$\text{Live API} \longrightarrow \text{Fresh Verified Cache} \longrightarrow \text{Stale Cache (explicitly labeled)} \longrightarrow \text{"No Verified Data Available"}$$
3. **First-Class Provenance Attribution:** Every single event carries an explicit provenance metadata record detailing:
   - Data Architecture Tier (Tier 1 Authoritative vs. Tier 2 Aggregator vs. Mathematical Ephemeris)
   - Primary Originating Agency / Publisher
   - Reporting Gateway or API Service
   - Direct link to primary mission archives, catalog numbers, or NASA/IAU records.

---

## 🛰️ Data Source Hierarchy

| Tier | Category | Primary Authority | Reporting Gateway / Engine | Provenance Basis & Precision |
|---|---|---|---|---|
| **Tier 1 (Authoritative)** | Asteroid & Comet Flybys | NASA Jet Propulsion Laboratory (JPL) / CNEOS | Small-Body Database Close-Approach API (`cad.api`) | Primary radar tracking & orbital determination |
| **Tier 1 (Authoritative)** | Solar & Lunar Eclipses | NASA Goddard Space Flight Center (GSFC) | NASA Five Millennium Canon (Espenak & Meeus) | Exact Great Eclipse / Maximum Eclipse UTC instants (minute precision) |
| **Tier 1 (Curated Archive)** | Planetary Oppositions | NASA JPL Horizons Ephemeris | JPL Planetary Ephemeris DE440/441 | Exact opposition instants in UTC; visual alignments separated as conjunction arcs |
| **Tier 1 (Historical)** | Space Milestones | Primary National Agencies (NASA, ISRO, ESA, Roscosmos, CNSA, JAXA) | Curated Historical Archive with NSSDC / Agency Record IDs | Primary agency history offices & launch logs |
| **Tier 2 (Aggregator)** | Rocket Launches | Space Launch Service Providers (SpaceX, ISRO, NASA, Arianespace, etc.) | Launch Library 2 (The Space Devs 2.3.0) | Global flight manifest tracking & launch license filings |
| **Tier 2 (Aggregator)** | Spaceflight News Wire | Originating Newsrooms, Universities, and Research Labs | Spaceflight News API (SNAPI v4) | Aggregated coverage from 40+ professional aerospace publications |
| **Ephemeris Engine** | Moon Phases (4 Quarters) | Jean Meeus Astronomical Algorithms | In-Browser Mathematical Ephemeris Engine | Meeus Chapter 49 periodic perturbation algorithm (exact UTC minutes) |
| **Ephemeris Engine** | Equinoxes & Solstices | Jean Meeus Astronomical Algorithms / USNO | In-Browser Mathematical Ephemeris Engine | Meeus Chapter 27 polynomial canon with Table 27.C periodic perturbations (exact UTC minutes) |
| **Ephemeris Engine** | Meteor Showers | International Astronomical Union (IAU) | IAU Meteor Data Center (MDC) Established Catalog | Official IAU shower codes (001–110), parent bodies, and radiant coordinates |

---

## 🤖 Automated Multi-Agent Space Intelligence Pipeline

CosmosCommand includes an automated, two-phase intelligence pipeline located in `pipeline/`:

1. **Phase 1: Discovery Agent (`pipeline/discovery_agent.py`)**:
   - Harvester polling official NASA Science RSS feeds, European Space Agency (ESA) news wires, and the Spaceflight News API (v4).
   - Normalizes disparate schemas into structured candidate pools.

2. **Phase 2: Source & Integrity Verification Agent (`pipeline/verification_agent.py`)**:
   - Programmatically audits candidates across 4 strict gates:
     - **Authoritative Domain Whitelist:** Whitelists space agencies (`nasa.gov`, `esa.int`, `isro.gov.in`, etc.) and recognized aerospace research institutes (`jhuapl.edu`, `cfa.harvard.edu`, `lasp.colorado.edu`, `space.mit.edu`, `sese.asu.edu`, `caltech.edu`, `astro.univie.ac.at`). Generic academic domains require verified observatory/lab attribution.
     - **ISO-8601 Temporal Syntax Integrity:** Validates strict timestamp parsability.
     - **Aerospace Entity Relevance:** Categorizes mission keywords, spacecraft designations, and celestial terms.
     - **Content Density & Anti-Spam Check:** Rejects clickbait or non-aerospace articles.
   - Computes confidence scores ($\ge 85\%$ required for approval) and signs approved entries with **SHA-256 Cryptographic Provenance Hashes**.
   - Preserves rejected items in a transparent Quarantine Vault.

---

## 🌟 Cockpit Features

1. **Holographic Monthly Calendar Grid**:
   - Color-coded event chips with visible **Provenance Status Dots**:
     - `🟢 Live Verified`
     - `🟡 Verified Cache`
     - `🔵 Ephemeris Computation`
     - `🟣 Historical Archival Record`
   - Real-time multi-filter toggles (Launches, Anniversaries, Celestial, Asteroids, News).
   - Space Agency selector (NASA, ISRO, ESA, SpaceX, JAXA, CNSA, Roscosmos, Rocket Lab).
   - Instant search across missions, payloads, and celestial objects.

2. **3D WebGL Orbital Radar & Orrery (Three.js)**:
   - Interactive, rotating 3D Earth, Moon, and starfield.
   - **Plotted 3D vector trajectories** for active-month Near-Earth Asteroid flybys directly from NASA JPL CNEOS.

3. **Telemetry Dossier & Provenance Modal**:
   - Inspect any event to view complete technical specs, mission parameters, and the dedicated **Data Provenance & Source Attribution** card linking directly to official records.
   - For agent-verified dispatches, renders the official **Source & Integrity Verification Certificate** displaying the SHA-256 signature and gate audit checklist.
   - **1-Click Export to .ICS**: Add verified launches, eclipses, or meteor showers straight to Google Calendar, Apple Calendar, or Outlook.

4. **Deep Space News Wire & Ticker**:
   - Scrolling marquee ticker and expandable side terminal showing live dispatches with publisher attribution and publication dates.

5. **Live T-Minus Countdown HUD**:
   - Real-time ticking timers to the next verified orbital launch, nearest asteroid, and celestial event.

6. **Toggleable Web Audio Telemetry Synthesizer**:
   - Subtle procedural 55Hz interstellar hum and telemetry feedback beeps (defaulted to muted).

---

## 🚀 How to Run

### Method 1: One-Click Windows Launcher
Double-click `start.bat` in the `CosmosCalendar` folder.

### Method 2: Python Command Line
```powershell
cd C:\Users\Abcom\Desktop\CosmosCalendar
python server.py
```
Then navigate to `http://localhost:8080`.

### Method 3: Direct Browser Launch
Open `C:\Users\Abcom\Desktop\CosmosCalendar\index.html` directly in your browser.

### Run the Multi-Agent Pipeline:
```powershell
python pipeline/run_pipeline.py
```

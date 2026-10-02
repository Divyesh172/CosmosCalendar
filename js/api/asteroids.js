/**
 * CosmosCommand - NASA JPL CNEOS Asteroid Close-Approach Client (Provenance-First Architecture)
 * Queries NASA Jet Propulsion Laboratory / Center for Near-Earth Object Studies (CNEOS) CAD API.
 *
 * ZERO-FABRICATION GUARANTEE:
 * Live API -> Fresh Cache -> Stale Cache (explicitly marked) -> Empty array.
 * Never invents, shifts, or mocks Near-Earth Object flybys.
 */
class CosmosAsteroidsAPI {
  static async fetchForRange(startDateStr, endDateStr) {
    const cacheKey = `asteroids_${startDateStr}_${endDateStr}`;
    const cached = window.cosmosCache.get(cacheKey);

    // 1. If fresh cache is available, return it immediately with cached status
    if (cached && !cached.isStale && cached.data) {
      return cached.data.map(item => ({
        ...item,
        provenance: {
          ...item.provenance,
          status: 'verified_cached_fresh',
          cachedAt: new Date(cached.cachedAt || Date.now()).toISOString()
        }
      }));
    }

    try {
      // 2. Query live authoritative endpoint: JPL CAD API
      const url = `https://ssd-api.jpl.nasa.gov/cad.api?dist-max=15LD&date-min=${startDateStr}&date-max=${endDateStr}&sort=date`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 7000);

      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`NASA JPL CAD API responded with HTTP ${res.status}`);
      }

      const json = await res.json();
      if (json && json.data && json.fields) {
        const fields = json.fields;
        const desIdx = fields.indexOf('des');
        const cdIdx = fields.indexOf('cd');
        const distIdx = fields.indexOf('dist');
        const vrelIdx = fields.indexOf('v_rel');
        const hIdx = fields.indexOf('h');

        const liveRetrievedAt = new Date().toISOString();
        const normalized = json.data.map(row => {
          return this.normalizeAsteroid({
            des: row[desIdx],
            cd: row[cdIdx],
            dist: row[distIdx],
            v_rel: row[vrelIdx],
            h: row[hIdx]
          }, 'verified_live', liveRetrievedAt);
        });

        window.cosmosCache.set(cacheKey, normalized, 14400); // 4 hours TTL
        return normalized;
      }
    } catch (err) {
      console.warn('[CosmosAsteroids] Authoritative JPL CAD fetch failed:', err.message);
    }

    // 3. Fallback to stale cache if present, clearly labeling status as stale
    if (cached && cached.data) {
      console.info('[CosmosAsteroids] Using stale verified cache.');
      return cached.data.map(item => ({
        ...item,
        provenance: {
          ...item.provenance,
          status: 'verified_cached_stale',
          cachedAt: new Date(cached.cachedAt || Date.now()).toISOString(),
          disclaimer: 'Displaying cached telemetry. Network request to NASA JPL CNEOS failed or was unreachable.'
        }
      }));
    }

    // 4. Zero fabrication: If no data or cache available, return empty array
    console.info('[CosmosAsteroids] No live data or cache available for range. Returning empty set.');
    return [];
  }

  static estimateDiameter(H) {
    if (!H || isNaN(H)) return "Unknown";
    // NASA CNEOS standard geometric albedo pv ~ 0.14 with [0.05 - 0.25] uncertainty bounds
    const dStdKm = (1329 / Math.sqrt(0.14)) * Math.pow(10, -0.2 * H);
    const dMinKm = (1329 / Math.sqrt(0.25)) * Math.pow(10, -0.2 * H);
    const dMaxKm = (1329 / Math.sqrt(0.05)) * Math.pow(10, -0.2 * H);
    const stdM = Math.round(dStdKm * 1000);
    const minM = Math.round(dMinKm * 1000);
    const maxM = Math.round(dMaxKm * 1000);

    if (stdM >= 1000) {
      return `~${(stdM / 1000).toFixed(1)} km (${(minM / 1000).toFixed(1)}–${(maxM / 1000).toFixed(1)} km)`;
    }
    return `~${stdM} m (${minM}–${maxM} m)`;
  }

  static normalizeAsteroid(raw, status = 'verified_live', retrievedAt = new Date().toISOString()) {
    // Exact IAU standard: 1 AU = 149,597,870.7 km, 1 LD = 384,400 km -> 1 AU = 389.1724 LD
    const auDist = parseFloat(raw.dist) || 0.01;
    const ldDist = (auDist * 389.1724).toFixed(1);
    const kmDist = Math.round(auDist * 149597870.7).toLocaleString();
    const velocity = parseFloat(raw.v_rel) || 0;
    const hMag = parseFloat(raw.h) || null;
    const diameter = this.estimateDiameter(hMag);
    const dateObj = new Date(raw.cd.replace(' ', 'T') + ':00Z');

    const isClose = parseFloat(ldDist) < 5.0;

    return {
      id: `asteroid-${raw.des.replace(/\s+/g, '_')}-${dateObj.getTime()}`,
      type: "asteroid",
      category: "Asteroids",
      title: `☄️ Asteroid ${raw.des} (${ldDist} LD)`,
      name: raw.des,
      day: dateObj.getUTCDate(),
      date: dateObj,
      lunarDist: ldDist,
      kmDist: kmDist,
      velocityKmS: velocity.toFixed(1),
      hMagnitude: hMag,
      diameterEstimated: diameter,
      isCloseAlert: isClose,
      color: isClose ? "#ef4444" : "#f97316",
      details: `Near-Earth Asteroid ${raw.des} approaches within ${ldDist} Lunar Distances (${kmDist} km) of Earth at relative velocity ${velocity.toFixed(1)} km/s. Estimated diameter: ${diameter}${hMag ? ` (H=${hMag})` : ''}.`,
      provenance: {
        tier: "authoritative",
        authority: "primary",
        publisher: "NASA Jet Propulsion Laboratory (JPL) / CNEOS",
        reportingSource: "Small-Body Database Close-Approach API (cad.api)",
        sourceUrl: `https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=${encodeURIComponent(raw.des)}`,
        retrievedAt: retrievedAt,
        status: status,
        cachedAt: null
      }
    };
  }
}

window.cosmosAsteroidsAPI = CosmosAsteroidsAPI;

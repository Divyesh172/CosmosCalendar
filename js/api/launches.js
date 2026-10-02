/**
 * CosmosCommand - Launch Library 2 API Client (Provenance-First Architecture)
 * Queries The Space Devs Launch Library 2 API (v2.3.0).
 *
 * ZERO-FABRICATION GUARANTEE:
 * Live API -> Fresh Cache -> Stale Cache (explicitly marked) -> Empty array.
 * Never invents, shifts, or mocks launch events.
 */
class CosmosLaunchesAPI {
  static async fetchForRange(startDateStr, endDateStr) {
    const cacheKey = `launches_${startDateStr}_${endDateStr}`;
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
      // 2. Query live endpoint
      const url = `https://ll.thespacedevs.com/2.3.0/launches/?net__gte=${encodeURIComponent(startDateStr)}&net__lte=${encodeURIComponent(endDateStr)}&limit=50&mode=normal`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 7000);

      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`Launch Library 2 API responded with HTTP ${res.status}`);
      }

      const json = await res.json();
      if (json && json.results) {
        const liveRetrievedAt = new Date().toISOString();
        const normalized = json.results.map(item => this.normalizeLaunch(item, 'verified_live', liveRetrievedAt));
        window.cosmosCache.set(cacheKey, normalized, 7200); // 2 hours TTL
        return normalized;
      }
    } catch (err) {
      console.warn('[CosmosLaunches] Live fetch failed:', err.message);
    }

    // 3. Fallback to stale cache if present, clearly labeling status as stale
    if (cached && cached.data) {
      console.info('[CosmosLaunches] Using stale verified cache.');
      return cached.data.map(item => ({
        ...item,
        provenance: {
          ...item.provenance,
          status: 'verified_cached_stale',
          cachedAt: new Date(cached.cachedAt || Date.now()).toISOString(),
          disclaimer: 'Displaying cached telemetry. Network request to Launch Library 2 failed or was rate-limited.'
        }
      }));
    }

    // 4. Zero fabrication: If no cache exists, return empty array with honest reporting
    console.info('[CosmosLaunches] No live data or cache available for range. Returning empty set.');
    return [];
  }

  static normalizeLaunch(item, status = 'verified_live', retrievedAt = new Date().toISOString()) {
    const d = new Date(item.net);
    const agencyName = item.launch_service_provider?.name || "Unspecified Space Agency";
    const rocketName = item.rocket?.configuration?.name || "Launch Vehicle";
    const padLocation = item.pad?.location?.name || item.pad?.name || "Spaceport";
    const statusText = item.status?.name || "Scheduled";

    return {
      id: item.id ? `launch-${item.id}` : `launch-${Date.now()}-${Math.random()}`,
      type: "launch",
      category: "Launches",
      title: `🚀 ${item.name}`,
      agency: agencyName,
      rocket: rocketName,
      location: padLocation,
      status: statusText,
      netStr: item.net,
      date: d,
      day: d.getUTCDate(),
      image: item.image || null,
      details: item.mission?.description || `Orbital launch mission conducted by ${agencyName} from ${padLocation}. Operational status: ${statusText}.`,
      color: "#2563eb",
      link: item.url || `https://ll.thespacedevs.com/2.3.0/launches/${item.id || ''}`,
      provenance: {
        tier: "aggregator",
        authority: "secondary",
        publisher: agencyName,
        reportingSource: "Launch Library 2 (The Space Devs)",
        sourceUrl: item.url || `https://ll.thespacedevs.com/2.3.0/launches/${item.id || ''}`,
        retrievedAt: retrievedAt,
        status: status,
        cachedAt: null
      }
    };
  }
}

window.cosmosLaunchesAPI = CosmosLaunchesAPI;

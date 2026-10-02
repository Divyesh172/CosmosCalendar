/**
 * CosmosCommand - Spaceflight News API (SNAPI v4) Client (Provenance-First Architecture)
 * Queries The Space Devs Spaceflight News API (SNAPI v4).
 *
 * ZERO-FABRICATION GUARANTEE:
 * Live API -> Fresh Cache -> Stale Cache (explicitly marked) -> Empty array.
 * Never invents, shifts, or mocks news dispatches across calendar months.
 */
class CosmosNewsAPI {
  static async fetchLatestArticles(limit = 30) {
    const cacheKey = `news_latest_${limit}`;
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
      // 2. Query live aggregator: SNAPI v4
      const url = `https://api.spaceflightnewsapi.net/v4/articles/?limit=${limit}&ordering=-published_at`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 7000);

      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`SNAPI v4 API responded with HTTP ${res.status}`);
      }

      const json = await res.json();
      if (json && json.results) {
        const liveRetrievedAt = new Date().toISOString();
        const articles = json.results.map(raw => this.normalizeArticle(raw, 'verified_live', liveRetrievedAt));
        window.cosmosCache.set(cacheKey, articles, 3600); // 1 hour TTL
        return articles;
      }
    } catch (err) {
      console.warn('[CosmosNews] SNAPI v4 live fetch failed:', err.message);
    }

    // 3. Fallback to stale cache if present
    if (cached && cached.data) {
      console.info('[CosmosNews] Using stale verified cache.');
      return cached.data.map(item => ({
        ...item,
        provenance: {
          ...item.provenance,
          status: 'verified_cached_stale',
          cachedAt: new Date(cached.cachedAt || Date.now()).toISOString(),
          disclaimer: 'Displaying cached news articles. Live SNAPI connection failed.'
        }
      }));
    }

    // 4. Zero fabrication: If no cache exists, return empty array
    console.info('[CosmosNews] No live news or cache available. Returning empty set.');
    return [];
  }

  static normalizeArticle(raw, status = 'verified_live', retrievedAt = new Date().toISOString()) {
    const pubDate = new Date(raw.published_at);
    const publisherName = raw.news_site || "Space News Outlet";

    return {
      id: raw.id ? `news-${raw.id}` : `news-${Date.now()}-${Math.random()}`,
      type: "news",
      category: "News",
      title: `📰 ${raw.title}`,
      headline: raw.title,
      newsSite: publisherName,
      url: raw.url || "#",
      imageUrl: raw.image_url || null,
      summary: raw.summary || "No summary provided by publishing agency.",
      publishedAt: raw.published_at,
      date: pubDate,
      day: pubDate.getUTCDate(),
      color: "#10b981",
      details: `${raw.summary || raw.title} Published by ${publisherName} on ${pubDate.toLocaleDateString()}.`,
      provenance: {
        tier: "aggregator",
        authority: "secondary",
        publisher: publisherName,
        reportingSource: "Spaceflight News API (The Space Devs)",
        sourceUrl: raw.url || "https://api.spaceflightnewsapi.net",
        retrievedAt: retrievedAt,
        status: status,
        cachedAt: null
      }
    };
  }

  /**
   * Filter articles for calendar display in a specific month
   * PROVENANCE RULE: Only display articles whose verified publication date actually falls in that month!
   */
  static getForMonth(articles, year, month) {
    if (!articles || articles.length === 0) return [];

    const monthStart = new Date(Date.UTC(year, month - 1, 1)).getTime();
    const monthEnd = new Date(Date.UTC(year, month, 0, 23, 59, 59)).getTime();

    return articles.filter(a => {
      const ms = new Date(a.date).getTime();
      return ms >= monthStart && ms <= monthEnd;
    });
  }
}

window.cosmosNewsAPI = CosmosNewsAPI;

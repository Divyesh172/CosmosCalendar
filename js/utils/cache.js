/**
 * CosmosCommand - Resilient Local Storage Cache
 * Protects against API rate limits and enables offline mission control operation.
 */
class CosmosCache {
  constructor(prefix = 'cosmos_cmd_') {
    this.prefix = prefix;
  }

  get(key) {
    try {
      const raw = localStorage.getItem(this.prefix + key);
      if (!raw) return null;
      const record = JSON.parse(raw);
      if (Date.now() > record.expiresAt) {
        // Expired, but keep as stale fallback if needed
        return { data: record.data, isStale: true };
      }
      return { data: record.data, isStale: false };
    } catch (e) {
      console.warn('[CosmosCache] Read failed:', e);
      return null;
    }
  }

  set(key, data, ttlSeconds = 7200) {
    try {
      const record = {
        data,
        cachedAt: Date.now(),
        expiresAt: Date.now() + (ttlSeconds * 1000)
      };
      localStorage.setItem(this.prefix + key, JSON.stringify(record));
    } catch (e) {
      console.warn('[CosmosCache] Storage quota or write error:', e);
    }
  }

  clear() {
    try {
      Object.keys(localStorage).forEach(k => {
        if (k.startsWith(this.prefix)) {
          localStorage.removeItem(k);
        }
      });
    } catch (e) {
      console.warn('[CosmosCache] Clear failed:', e);
    }
  }
}

window.cosmosCache = new CosmosCache();

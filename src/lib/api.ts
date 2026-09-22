const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

if (!API_BASE) {
  console.error("❌ VITE_API_URL is not defined in .env");
}

// In-memory cache for GET requests
const apiCache = new Map<string, { data: any; expiry: number }>();
const DEFAULT_TTL_MS = 1000 * 60 * 3; // 3 minutes cache

/**
 * Invalidate in-memory cache for a given endpoint or all endpoints
 */
export function clearApiCache(endpointPrefix?: string) {
  if (!endpointPrefix) {
    apiCache.clear();
  } else {
    for (const key of apiCache.keys()) {
      if (key.startsWith(endpointPrefix)) {
        apiCache.delete(key);
      }
    }
  }
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const method = (options.method || "GET").toUpperCase();
  const cacheKey = `${endpoint}`;

  // Serve from cache if available and still valid for GET requests
  if (method === "GET" && !options.headers?.hasOwnProperty("Authorization")) {
    const cached = apiCache.get(cacheKey);
    if (cached && cached.expiry > Date.now()) {
      return cached.data as T;
    }
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000); // 12 sec timeout

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    clearTimeout(timeout);

    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`API Error ${response.status}: ${text}`);
    }

    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();

      // Store successful GET responses in cache
      if (method === "GET") {
        apiCache.set(cacheKey, {
          data,
          expiry: Date.now() + DEFAULT_TTL_MS,
        });
      } else {
        // Clear relevant cache on write mutations (POST, PUT, DELETE)
        clearApiCache();
      }

      return data as T;
    }

    throw new Error("Invalid JSON response from server");
  } catch (error: unknown) {
    // If request fails but we have stale cache, return stale cache as fallback
    if (method === "GET") {
      const cached = apiCache.get(cacheKey);
      if (cached) {
        console.warn(`Serving stale cache for ${endpoint} due to network error`);
        return cached.data as T;
      }
    }

    if (error instanceof Error && error.name === "AbortError") {
      console.warn("⏱ Request timed out");
      throw new Error("Request timeout");
    }

    console.error("API Fetch Failed:", error instanceof Error ? error.message : error);
    throw error;
  }
}

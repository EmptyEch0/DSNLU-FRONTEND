const API_BASE = import.meta.env.VITE_API_URL;

if (!API_BASE) {
  console.error("❌ VITE_API_URL is not defined in .env");
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000); // 15 sec timeout

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

    // Handle non-JSON responses safely
    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`API Error ${response.status}: ${text}`);
    }

    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    throw new Error("Invalid JSON response from server");
  } catch (error: unknown) {
    if (error instanceof Error && error.name === "AbortError") {
      console.warn("⏱ Request timed out");
      throw new Error("Request timeout");
    }

    console.error("API Fetch Failed:", error.message);
    throw error;
  }
}

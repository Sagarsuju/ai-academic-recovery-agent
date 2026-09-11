/**
 * API Client Base Configuration with Live FastAPI & Fallback Mock Support
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
export const MOCK_DELAY_MS = 300;

export async function mockFetch<T>(mockData: T, delay = MOCK_DELAY_MS): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockData), delay);
  });
}

export async function fetchWithFallback<T>(endpoint: string, options?: RequestInit, fallbackData?: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {})
      }
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    // API Server offline or network error fallback
  }

  if (fallbackData !== undefined) {
    return mockFetch(fallbackData);
  }

  throw new Error(`API Request failed for endpoint: ${endpoint}`);
}

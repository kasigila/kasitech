import { createMemoryConfigStore } from "./memory";
import type { ConfigStore } from "./types";

let cached: ConfigStore | null = null;

/**
 * Resolve configuration store.
 * Prefer Postgres when DATABASE_URL is set; otherwise memory (tests / local).
 * localStorage is never the canonical layer.
 */
export async function getConfigStore(): Promise<ConfigStore> {
  if (cached) return cached;
  if (process.env.DATABASE_URL) {
    try {
      const { createPostgresConfigStore } = await import("./postgres");
      cached = createPostgresConfigStore();
      return cached;
    } catch {
      // fall through
    }
  }
  cached = createMemoryConfigStore();
  return cached;
}

export function useMemoryConfigStoreForTests(): ConfigStore {
  cached = createMemoryConfigStore();
  return cached;
}

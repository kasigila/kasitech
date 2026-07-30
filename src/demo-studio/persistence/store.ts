import { createMemoryConfigStore } from "./memory";
import type { ConfigStore } from "./types";

let cached: ConfigStore | null = null;

export class PersistenceMisconfiguredError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PersistenceMisconfiguredError";
  }
}

function isProductionRuntime(): boolean {
  return (
    process.env.VERCEL_ENV === "production" ||
    process.env.NODE_ENV === "production"
  );
}

function allowMemoryFallback(): boolean {
  // Production / Vercel must never fall back to memory — even under Vitest
  // when tests stub production env to assert fail-safe behaviour.
  if (isProductionRuntime() || process.env.VERCEL === "1") {
    return process.env.DEMO_STUDIO_ALLOW_MEMORY === "1";
  }
  if (process.env.DEMO_STUDIO_ALLOW_MEMORY === "1") return true;
  if (process.env.VITEST === "true" || process.env.NODE_ENV === "test") {
    return true;
  }
  return true; // local development
}

/**
 * Resolve configuration store.
 * Production MUST use Postgres (DATABASE_URL). Memory is tests/local only.
 * localStorage is never the canonical layer.
 */
export async function getConfigStore(): Promise<ConfigStore> {
  if (cached) return cached;

  if (process.env.DATABASE_URL) {
    try {
      const { createPostgresConfigStore } = await import("./postgres");
      cached = createPostgresConfigStore();
      return cached;
    } catch (err) {
      if (isProductionRuntime() || process.env.VERCEL === "1") {
        throw new PersistenceMisconfiguredError(
          `Demo Studio persistence failed to connect to Postgres: ${
            err instanceof Error ? err.message : String(err)
          }`,
        );
      }
      // local with bad DATABASE_URL — fall through only if memory allowed
    }
  }

  if (allowMemoryFallback()) {
    cached = createMemoryConfigStore();
    return cached;
  }

  throw new PersistenceMisconfiguredError(
    "Demo Studio requires DATABASE_URL (Supabase Postgres) in production. Configurations cannot be saved without durable storage.",
  );
}

/** Test helper — force memory store. */
export function useMemoryConfigStoreForTests(): ConfigStore {
  cached = createMemoryConfigStore();
  return cached;
}

export function resetConfigStoreCache(): void {
  cached = null;
}

/** Used by tests to assert production cannot silently use memory. */
export function productionRequiresDatabase(): boolean {
  return isProductionRuntime() || process.env.VERCEL === "1";
}

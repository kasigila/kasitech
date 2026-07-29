import type { ConfigurationSubmission } from "../types";
import { randomUUID } from "node:crypto";

const g = globalThis as unknown as {
  __kasiDemoSubmissions?: ConfigurationSubmission[];
};

function bag(): ConfigurationSubmission[] {
  if (!g.__kasiDemoSubmissions) g.__kasiDemoSubmissions = [];
  return g.__kasiDemoSubmissions;
}

export async function persistSubmissionIntent(input: {
  configurationId: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  message?: string | null;
}): Promise<ConfigurationSubmission> {
  const row: ConfigurationSubmission = {
    id: randomUUID(),
    configurationId: input.configurationId,
    name: input.name,
    businessName: input.businessName,
    email: input.email,
    phone: input.phone,
    message: input.message ?? null,
    createdAt: new Date().toISOString(),
    leadStatus: "pending",
  };

  if (process.env.DATABASE_URL) {
    try {
      const { drizzle } = await import("drizzle-orm/postgres-js");
      const postgres = (await import("postgres")).default;
      const { configurationSubmissions } = await import(
        "../../../drizzle/schema/demo-studio"
      );
      const client = postgres(process.env.DATABASE_URL, {
        prepare: false,
        max: 1,
      });
      const db = drizzle(client);
      await db.insert(configurationSubmissions).values({
        id: row.id,
        configurationId: row.configurationId,
        name: row.name,
        businessName: row.businessName,
        email: row.email,
        phone: row.phone,
        message: row.message,
        leadStatus: "pending",
      });
      await client.end({ timeout: 2 });
      return row;
    } catch {
      // fall through to memory
    }
  }

  bag().push(row);
  return row;
}

export function listMemorySubmissions(): ConfigurationSubmission[] {
  return [...bag()];
}

export function clearMemorySubmissions(): void {
  bag().length = 0;
}

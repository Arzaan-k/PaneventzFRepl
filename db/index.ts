import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from "@shared/schema";

// Connect to the PostgreSQL database if configured
export const isDbConfigured = Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('postgres'));
export const sql = isDbConfigured ? neon(process.env.DATABASE_URL!) : null;
export const db = sql ? drizzle(sql, { schema }) : (null as any);
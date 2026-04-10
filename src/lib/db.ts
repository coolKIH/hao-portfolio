import { Pool } from 'pg';

// This ensures we don't create multiple pools during Next.js hot-reloads in development
const globalForPg = global as unknown as { pool: Pool };

export const pool = globalForPg.pool || new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Required for many hosted Postgres providers
    },
});

if (process.env.NODE_ENV !== 'production') globalForPg.pool = pool;
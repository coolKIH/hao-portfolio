import type { Metadata } from "next";
import { pool } from "@/lib/db";
import TraceClient from "@/components/trace/trace-client";

// Ensure we fetch fresh data on every visit
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Trace",
    description: "Like a wild goose treading snow. Traces left by those who wandered through.",
    openGraph: {
        title: "Trace | Hao Huang",
        description: "Like a wild goose treading snow. Traces left by those who wandered through.",
    },
};

async function getInitialFootprints() {
    try {
        const result = await pool.query(
            `SELECT id, nickname, content, created_at 
       FROM footprints 
       WHERE created_at > NOW() - INTERVAL '7 days' 
       ORDER BY created_at DESC 
       LIMIT 50`
        );

        // Dates must be strings to pass from Server to Client components
        return result.rows.map(row => ({
            ...row,
            created_at: row.created_at.toISOString(),
        }));
    } catch (error) {
        console.error("Footprints SSR Error:", error);
        return [];
    }
}

export default async function Trace() {
    const initialData = await getInitialFootprints();

    return <TraceClient initialData={initialData} />;
}
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { createClient } from "@supabase/supabase-js";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-0dd961f1/health", (c) => {
  return c.json({ status: "ok" });
});

// Get geoguessr favorites endpoint
app.get("/make-server-0dd961f1/geoguessr-favorites", async (c) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    console.log('Attempting to fetch geoguessr favorites...');
    
    // Try to fetch data with explicit column selection to avoid any implicit created_at references
    const { data, error } = await supabase
      .from('geoguessr_favorites')
      .select('cca3, is_favorite, coverage')
      .eq('is_favorite', true)
      .eq('coverage', 'FULL');

    if (error) {
      console.log('Geoguessr favorites database error:', error);
      // If the table doesn't exist or has different columns, return empty array
      if (error.code === '42P01' || error.code === '42703') {
        console.log('Table or column does not exist, returning empty array');
        return c.json({ favorites: [] });
      }
      return c.json({ 
        error: `Database error: ${error.message}`,
        details: error 
      }, 500);
    }

    console.log(`Successfully fetched ${data?.length || 0} geoguessr favorites`);
    return c.json({ favorites: data || [] });
  } catch (error) {
    console.log('Geoguessr favorites server error:', error);
    return c.json({ 
      error: 'Server error while fetching geoguessr favorites',
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

Deno.serve(app.fetch);
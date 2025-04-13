import { createClient } from "@supabase/supabase-js";

console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Supabase API Key:', import.meta.env.VITE_SUPABASE_API_KEY);

export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_API_KEY
);
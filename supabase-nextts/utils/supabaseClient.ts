import { createClient } from "@supabase/supabase-js";

const supa_url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supa_anon_key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supa_url, supa_anon_key);

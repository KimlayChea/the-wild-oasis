import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ilhufbopeixqbiokklpn.supabase.co";
// this key safe, cuz This key is safe to use in a browser if you have enabled Row Level Security for your tables and configured policies.
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsaHVmYm9wZWl4cWJpb2trbHBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NDE4ODksImV4cCI6MjA2MTUxNzg4OX0.iz76WzUV2FhOf-c0NAksh3G23QsyxTBKjPut5dYWxs0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

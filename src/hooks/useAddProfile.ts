import { supabase } from "../lib/supabaseClient";

export async function addProfile(name: string, email: string) {
  const { data, error } = await supabase
    .from("profiles")
    .insert([{ name, email }])
    .select();

  if (error) {
    console.error("Error inserting profile:", error.message);
    return null;
  }
  return data;
}

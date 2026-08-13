import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  const allCookies = cookieStore.getAll();
  console.log("[SUPABASE SERVER] createClient called. Existing cookies:", allCookies.length);
  if (allCookies.length > 0) {
    allCookies.forEach((c) => {
      console.log(`[SUPABASE SERVER]   cookie: ${c.name} = ${c.value.substring(0, 30)}${c.value.length > 30 ? "..." : ""}`);
    });
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const cookies = cookieStore.getAll();
          console.log("[SUPABASE SERVER] getAll() called, returning", cookies.length, "cookies");
          return cookies;
        },
        setAll(cookiesToSet) {
          console.log("[SUPABASE SERVER] setAll() called with", cookiesToSet.length, "cookies to set:");
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              console.log(`[SUPABASE SERVER]   setting: ${name} = ${value.substring(0, 30)}${value.length > 30 ? "..." : ""} (options: ${JSON.stringify(options)})`);
              cookieStore.set(name, value, options);
              console.log(`[SUPABASE SERVER]   ✅ cookieStore.set succeeded for: ${name}`);
            });
          } catch (err) {
            console.error("[SUPABASE SERVER] ❌ cookieStore.set FAILED:", err);
          }
        },
      },
    }
  );
}

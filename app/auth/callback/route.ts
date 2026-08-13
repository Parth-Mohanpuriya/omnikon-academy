import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  console.log("[AUTH CALLBACK] Full URL:", url.toString());
  console.log("[AUTH CALLBACK] Search params:", Object.fromEntries(url.searchParams));

  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") ?? "/dashboard";
  const origin = url.origin;

  console.log("[AUTH CALLBACK] code param present:", !!code);
  console.log("[AUTH CALLBACK] code value:", code ? `${code.substring(0, 10)}...` : null);
  console.log("[AUTH CALLBACK] next param:", next);

  if (code) {
    console.log("[AUTH CALLBACK] Creating Supabase client...");
    const supabase = await createClient();
    console.log("[AUTH CALLBACK] Supabase client created. Calling exchangeCodeForSession...");

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("[AUTH CALLBACK] exchangeCodeForSession FAILED:");
      console.error("[AUTH CALLBACK]   error.name:", error.name);
      console.error("[AUTH CALLBACK]   error.message:", error.message);
      console.error("[AUTH CALLBACK]   error.status:", error.status);
      console.error("[AUTH CALLBACK]   error.code:", error.code);
    } else {
      console.log("[AUTH CALLBACK] exchangeCodeForSession SUCCEEDED:");
      console.log("[AUTH CALLBACK]   user id:", data.user?.id);
      console.log("[AUTH CALLBACK]   user email:", data.user?.email);
      console.log("[AUTH CALLBACK]   session exists:", !!data.session);
      console.log("[AUTH CALLBACK]   session access_token exists:", !!data.session?.access_token);
      console.log("[AUTH CALLBACK]   session refresh_token exists:", !!data.session?.refresh_token);
    }

    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";
      let redirectUrl = `${origin}${next}`;

      if (!isLocalEnv && forwardedHost) {
        redirectUrl = `https://${forwardedHost}${next}`;
      }

      console.log("[AUTH CALLBACK] Redirecting to:", redirectUrl);
      console.log("[AUTH CALLBACK] forwardedHost:", forwardedHost);
      console.log("[AUTH CALLBACK] isLocalEnv:", isLocalEnv);

      const response = NextResponse.redirect(redirectUrl);
      console.log("[AUTH CALLBACK] Redirect response cookies:", response.cookies.getAll().length, "cookies");
      return response;
    }
  } else {
    console.log("[AUTH CALLBACK] No code param — redirecting to error page");
  }

  const errorRedirect = `${origin}/?error=auth_failed`;
  console.log("[AUTH CALLBACK] Error redirect to:", errorRedirect);
  return NextResponse.redirect(errorRedirect);
}

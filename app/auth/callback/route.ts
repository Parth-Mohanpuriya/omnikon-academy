import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";
      let redirectUrl = `${origin}${next}`;

      if (!isLocalEnv && forwardedHost) {
        redirectUrl = `https://${forwardedHost}${next}`;
      }

      const cookieStore = await cookies();
      const response = NextResponse.redirect(redirectUrl);
      cookieStore.getAll().forEach(({ name, value }) => {
        response.cookies.set(name, value);
      });
      return response;
    }
    console.error("Auth code exchange error:", error);
  }

  return NextResponse.redirect(`${origin}/?error=auth_failed`);
}

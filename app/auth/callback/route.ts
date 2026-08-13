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
      const cookieStore = await cookies();
      const response = NextResponse.redirect(`${origin}${next}`);
      cookieStore.getAll().forEach(({ name, value }) => {
        response.cookies.set(name, value);
      });
      return response;
    }
    console.error("Auth code exchange error:", error);
  }

  return NextResponse.redirect(`${origin}/?error=auth_failed`);
}

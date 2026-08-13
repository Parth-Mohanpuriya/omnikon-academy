import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/profile", "/settings"];

export async function proxy(request: NextRequest) {
  console.log("[PROXY] Request path:", request.nextUrl.pathname);
  console.log("[PROXY] Request cookies count:", request.cookies.getAll().length);
  request.cookies.getAll().forEach((c) => {
    console.log(`[PROXY]   cookie: ${c.name} = ${c.value.substring(0, 30)}${c.value.length > 30 ? "..." : ""}`);
  });

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const all = request.cookies.getAll();
          console.log("[PROXY] supabase getAll() called, returning", all.length, "cookies");
          return all;
        },
        setAll(cookiesToSet) {
          console.log("[PROXY] supabase setAll() called with", cookiesToSet.length, "cookies:");
          cookiesToSet.forEach(({ name, value, options }) => {
            console.log(`[PROXY]   setting: ${name} = ${value.substring(0, 30)}${value.length > 30 ? "..." : ""}`);
            request.cookies.set(name, value);
          });
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
          console.log("[PROXY] setAll complete. supabaseResponse cookies:", supabaseResponse.cookies.getAll().length);
        },
      },
    }
  );

  console.log("[PROXY] Calling getUser()...");
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("[PROXY] getUser() error:", error.message);
  }
  console.log("[PROXY] getUser() result:", user ? `user found (id: ${user.id}, email: ${user.email})` : "NO USER");

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtected && !user) {
    console.log("[PROXY] Protected route, no user — redirecting to /");
    return NextResponse.redirect(new URL("/", request.url));
  }

  console.log("[PROXY] Passing through. Response cookies:", supabaseResponse.cookies.getAll().length);
  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

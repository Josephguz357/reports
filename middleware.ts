import { clerkMiddleware } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import type { NeonQueryFunction } from "@neondatabase/serverless"

// Initialize Neon client for middleware to check roles
const connectionString = process.env.POSTGRES_URL ?? ""
let sql: NeonQueryFunction | null = null
if (connectionString) {
  const g = globalThis as Record<string, any>
  if (!g._neonSqlMiddleware) {
    g._neonSqlMiddleware = neon(connectionString)
  }
  sql = g._neonSqlMiddleware as NeonQueryFunction
} else {
  console.warn("⚠️  DATABASE_URL is missing in middleware – role checks will be limited.")
}

export default clerkMiddleware(
  async (auth, req) => {
    const { userId, isPublicRoute } = auth
    const { pathname } = req.nextUrl

    // ── rutas públicas ───────────────────────────────
    if (isPublicRoute) {
      if (userId && pathname === "/login") {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }
      return NextResponse.next()
    }

    // ── sin sesión ────────────────────────────────────
    if (!userId) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    // ── lógica de perfil / roles (Neon) ───────────────
    let profile: { role: string; first_login: boolean } | null = null
    if (sql) {
      try {
        const rows = await sql`
          SELECT role, first_login
          FROM public.profiles
          WHERE id = ${userId}
        `
        profile = rows[0] ?? null
        if (!profile) {
          await sql`
            INSERT INTO public.profiles (id, role, first_login)
            VALUES (${userId}, 'technician', TRUE)
          `
          profile = { role: "technician", first_login: true }
        }
      } catch (err) {
        console.error("Middleware Neon error:", err)
        return NextResponse.redirect(new URL("/login", req.url))
      }
    }

    // ── first-login → change-password ─────────────────
    if (profile?.first_login && pathname !== "/change-password") {
      return NextResponse.redirect(new URL("/change-password", req.url))
    }
    if (!profile?.first_login && pathname === "/change-password") {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    // ── proteger /admin ───────────────────────────────
    if (pathname.startsWith("/admin") && profile?.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    return NextResponse.next()
  },
  { publicRoutes: ["/login", "/api/webhooks(.*)"] },
)

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}

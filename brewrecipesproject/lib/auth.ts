import { cookies } from 'next/headers'
import { createHmac, timingSafeEqual } from 'crypto'

// ─────────────────────────────────────────────────────────────
// Server-side admin gate.
//
// The public site has a demo (localStorage) session used only for
// favourites/purchases. Anything that changes data — uploading images,
// editing or deleting recipes — is protected here instead, so the site
// owner is the ONLY person who can manage content.
//
// Access is granted by a password (ADMIN_PASSWORD) exchanged for a signed,
// httpOnly cookie. No password in the browser, no data mutation without it.
// ─────────────────────────────────────────────────────────────

export const ADMIN_COOKIE = 'brew_admin'

// In local/preview `ADMIN_PASSWORD` may be unset — fall back to a known dev
// value so the panel is reachable, but require a real secret in production.
function adminPassword(): string {
  const fromEnv = process.env.ADMIN_PASSWORD?.trim()
  if (fromEnv) return fromEnv
  if (process.env.NODE_ENV === 'production') {
    // No default in production — the gate stays closed until configured.
    return ''
  }
  return 'brew-admin'
}

function secret(): string {
  return process.env.ADMIN_SESSION_SECRET?.trim() || adminPassword() || 'brew-dev-secret'
}

// The cookie value is an HMAC of a fixed marker — it never contains the
// password itself and can't be forged without the server secret.
export function adminToken(): string {
  return createHmac('sha256', secret()).update('brew-admin-v1').digest('hex')
}

export function verifyPassword(candidate: string): boolean {
  const expected = adminPassword()
  if (!expected) return false
  const a = Buffer.from(candidate)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

export function verifyToken(token: string | undefined): boolean {
  if (!token) return false
  const expected = adminToken()
  const a = Buffer.from(token)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

// For use in Server Components, Server Actions and Route Handlers.
export async function isAdmin(): Promise<boolean> {
  const store = await cookies()
  return verifyToken(store.get(ADMIN_COOKIE)?.value)
}

// Throw from a Server Action / Route Handler when admin access is required.
export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) {
    throw new Error('غير مصرح — يجب تسجيل دخول المدير')
  }
}

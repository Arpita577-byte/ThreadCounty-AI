import type { Session, User } from '@/types/auth'

const STORAGE_KEY = 'threadcounty_session'

const DEMO_USER: User = {
  id: 'usr_demo_001',
  email: 'demo@threadcounty.ai',
  fullName: 'Alex Chen',
  avatarUrl: undefined,
  role: 'user',
  plan: 'professional',
  createdAt: '2025-11-12T08:00:00.000Z',
}

function createSession(user: User): Session {
  return {
    user,
    token: `mock_${crypto.randomUUID?.() ?? Date.now()}`,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  }
}

export function getStoredSession(): Session | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const session = JSON.parse(raw) as Session
    if (new Date(session.expiresAt) < new Date()) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return session
  } catch {
    return null
  }
}

export function storeSession(session: Session): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
}

export function clearSession(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export async function mockSignIn(
  email: string,
  _password: string,
): Promise<Session> {
  await delay(800)
  const session = createSession({
    ...DEMO_USER,
    email: email.trim().toLowerCase(),
    fullName: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
  })
  storeSession(session)
  return session
}

export async function mockSignUp(data: {
  email: string
  fullName: string
  _password: string
}): Promise<Session> {
  await delay(1000)
  const session = createSession({
    ...DEMO_USER,
    id: `usr_${Date.now()}`,
    email: data.email.trim().toLowerCase(),
    fullName: data.fullName.trim(),
    plan: 'free',
    createdAt: new Date().toISOString(),
  })
  storeSession(session)
  return session
}

export async function mockSignOut(): Promise<void> {
  await delay(300)
  clearSession()
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

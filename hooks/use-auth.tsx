'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  getStoredSession,
  mockSignIn,
  mockSignOut,
  mockSignUp,
} from '@/lib/mock/auth'
import type { Session, User } from '@/types/auth'

interface AuthContextValue {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (data: {
    email: string
    password: string
    fullName: string
  }) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setSession(getStoredSession())
    setIsLoading(false)
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    const next = await mockSignIn(email, password)
    setSession(next)
  }, [])

  const signUp = useCallback(
    async (data: { email: string; password: string; fullName: string }) => {
      const next = await mockSignUp({
        email: data.email,
        fullName: data.fullName,
        _password: data.password,
      })
      setSession(next)
    },
    [],
  )

  const signOut = useCallback(async () => {
    await mockSignOut()
    setSession(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      isLoading,
      isAuthenticated: !!session,
      signIn,
      signUp,
      signOut,
    }),
    [session, isLoading, signIn, signUp, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export type UserRole = 'user' | 'admin'

export interface User {
  id: string
  email: string
  fullName: string
  avatarUrl?: string
  role: UserRole
  plan: 'free' | 'student' | 'professional' | 'enterprise'
  createdAt: string
}

export interface Session {
  user: User
  token: string
  expiresAt: string
}

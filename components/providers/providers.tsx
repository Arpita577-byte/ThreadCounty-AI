'use client'

import { AuthProvider } from '@/hooks/use-auth'
import { PlatformDataProvider } from '@/hooks/use-platform-data'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <PlatformDataProvider>{children}</PlatformDataProvider>
    </AuthProvider>
  )
}

import { AuthLayout } from '@/components/auth/auth-layout'
import { LoginForm } from '@/components/auth/login-form'

export const metadata = {
  title: 'Sign In — ThreadCounty',
}

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to access your textile intelligence dashboard"
    >
      <LoginForm />
    </AuthLayout>
  )
}

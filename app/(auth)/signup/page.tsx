import { AuthLayout } from '@/components/auth/auth-layout'
import { SignupForm } from '@/components/auth/signup-form'

export const metadata = {
  title: 'Sign Up — ThreadCounty',
}

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start analyzing fabrics with AI-powered precision"
    >
      <SignupForm />
    </AuthLayout>
  )
}

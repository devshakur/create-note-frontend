import { useState, type FormEvent } from 'react'
import { Lock, Mail, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import banner from '../assets/images/createnote_banner.webp'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { useAuth } from '../context/useAuth'
import { useLogin, useRegister } from '../hooks/useAuth'
import { useCyclingMessage } from '../hooks/useCyclingMessage'
import { queryClient } from '../api/queryClient'
import { profileQueryOptions } from '../hooks/profileQueryOptions'
import RegistrationLayout from '../layouts/RegistrationLayout'

if (typeof document !== 'undefined') {
  const preloadId = 'preload-login-banner'
  if (!document.getElementById(preloadId)) {
    const link = document.createElement('link')
    link.id = preloadId
    link.rel = 'preload'
    link.as = 'image'
    link.href = banner
    link.type = 'image/webp'
    link.fetchPriority = 'high'
    document.head.appendChild(link)
  }
}

type AuthMode = 'login' | 'signup'

const LOGIN_LOADING_MESSAGES = [
  'Signing you in...',
  'Checking your credentials...',
  'Almost there...',
  'Welcome back...',
] as const

const REGISTER_LOADING_MESSAGES = [
  'Creating account...',
  'Registering to database...',
  'Almost there...',
  'Setting things up...',
] as const

const Login = () => {
  const [mode, setMode] = useState<AuthMode>('login')
  const isSignUp = mode === 'signup'

  const navigate = useNavigate()
  const { setSession } = useAuth()
  const {
    login,
    error: loginError,
    isLoading: isLoginLoading,
  } = useLogin()
  const {
    register,
    error: registerError,
    isLoading: isRegisterLoading,
  } = useRegister()

  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  const loginLoadingMessage = useCyclingMessage(
    isLoginLoading,
    LOGIN_LOADING_MESSAGES,
  )
  const registerLoadingMessage = useCyclingMessage(
    isRegisterLoading,
    REGISTER_LOADING_MESSAGES,
  )

  const isLoginValid =
    loginForm.email.trim().length > 0 && loginForm.password.trim().length > 0
  const isSignupValid =
    signupForm.name.trim().length > 0 &&
    signupForm.email.trim().length > 0 &&
    signupForm.password.trim().length > 0

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isLoginValid || isLoginLoading) return

    try {
      const response = await login(loginForm)
      if (!response?.data) return

      const profile = await queryClient.fetchQuery(profileQueryOptions)
      setSession(profile)
      navigate('/dashboard')
    } catch {
      // error is catched via loginError
    }
  }

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isSignupValid || isRegisterLoading) return

    try {
      const response = await register(signupForm)
      if (!response) return

      setLoginForm({ email: signupForm.email, password: '' })
      setSignupForm({ name: '', email: '', password: '' })
      setMode('login')
    } catch {
      // error is catched via registerError
    }
  }

  return (
    <RegistrationLayout imageSrc={banner} imageAlt="Your notes, always with you">
      <div>
        <div
          className={`relative grid transform-3d transition-transform duration-700 ease-[cubic-bezier(0.4,0.2,0.2,1)] ${
            isSignUp ? 'transform-[rotateY(180deg)]' : 'transform-[rotateY(0deg)]'
          }`}
        >
          <div
            className={`col-start-1 row-start-1 self-center backface-hidden ${
              isSignUp ? 'pointer-events-none' : ''
            }`}
            aria-hidden={isSignUp}
          >
            <AuthPanel
              eyebrow="Welcome back 👋"
              title="Login to your account"
              subtitle="Enter your details below to continue"
            >
              <form
                className="flex w-full flex-col gap-3 md:w-[80%]"
                onSubmit={handleLogin}
              >
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  value={loginForm.email}
                  onChange={(e) =>
                    setLoginForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  leftIcon={<Mail className="size-4" />}
                />
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  leftIcon={<Lock className="size-4" />}
                />
                <div className="flex items-center justify-between">
                  <label className="flex cursor-pointer items-center gap-1.5 text-xs text-neutral-500">
                    <input
                      type="checkbox"
                      name="remember"
                      className="size-3.5 accent-(--primary)"
                    />
                    Remember me
                  </label>
                  <button
                    type="button"
                    className="text-xs text-[#FFBE3B] hover:text-[#FFBE3B]/80"
                  >
                    Forgot password?
                  </button>
                </div>
                {loginError ? (
                  <p className="text-xs text-red-500">{loginError}</p>
                ) : null}
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={!isLoginValid || isLoginLoading}
                >
                  {loginLoadingMessage ?? 'Login'}
                </Button>
                <p className="flex items-center justify-center gap-1 text-sm text-neutral-500">
                  Don&apos;t have an account?
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="text-xs font-medium text-[#FFBE3B] hover:text-[#FFBE3B]/80"
                  >
                    Sign up
                  </button>
                </p>
              </form>
            </AuthPanel>
          </div>

          <div
            className={`col-start-1 row-start-1 self-center backface-hidden transform-[rotateY(180deg)] ${
              isSignUp ? '' : 'pointer-events-none'
            }`}
            aria-hidden={!isSignUp}
          >
            <AuthPanel
              eyebrow="Get started"
              title="Create your account"
              subtitle="Fill in your details to get started"
            >
              <form
                className="flex w-full flex-col gap-3 md:w-[80%]"
                onSubmit={handleRegister}
              >
                <Input
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  autoComplete="name"
                  required
                  value={signupForm.name}
                  onChange={(e) =>
                    setSignupForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  leftIcon={<User className="size-4" />}
                />
                <Input
                  label="Email"
                  name="signup-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  value={signupForm.email}
                  onChange={(e) =>
                    setSignupForm((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  leftIcon={<Mail className="size-4" />}
                />
                <Input
                  label="Password"
                  name="signup-password"
                  type="password"
                  placeholder="Create a password"
                  autoComplete="new-password"
                  required
                  value={signupForm.password}
                  onChange={(e) =>
                    setSignupForm((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  leftIcon={<Lock className="size-4" />}
                />
                {registerError ? (
                  <p className="text-xs text-red-500">{registerError}</p>
                ) : null}
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={!isSignupValid || isRegisterLoading}
                >
                  {registerLoadingMessage ?? 'Sign up'}
                </Button>
                <p className="flex items-center justify-center gap-1 text-sm text-neutral-500">
                  Already have an account?
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-xs font-medium text-[#FFBE3B] hover:text-[#FFBE3B]/80"
                  >
                    Login
                  </button>
                </p>
              </form>
            </AuthPanel>
          </div>
        </div>
      </div>
    </RegistrationLayout>
  )
}

interface AuthPanelProps {
  eyebrow: string
  title: string
  subtitle: string
  children: React.ReactNode
}

const AuthPanel = ({ eyebrow, title, subtitle, children }: AuthPanelProps) => (
  <div className="flex flex-col gap-8 rounded-2xl bg-white">
    <header className="flex flex-col gap-1.5">
      <p className="text-sm text-neutral-500">{eyebrow}</p>
      <h4 className="text-md font-bold text-black">{title}</h4>
      <p className="text-sm text-neutral-500">{subtitle}</p>
    </header>
    {children}
  </div>
)

export default Login

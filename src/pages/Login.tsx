import { useState } from 'react'
import { Eye, Lock, Mail, User } from 'lucide-react'
import banner from '../assets/images/createnote_banner.png'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import RegistrationLayout from '../layouts/RegistrationLayout'

type AuthMode = 'login' | 'signup'

const Login = () => {
  const [mode, setMode] = useState<AuthMode>('login')
  const isSignUp = mode === 'signup'

  return (
    <RegistrationLayout imageSrc={banner} imageAlt="Your notes, always with you">
      <div>
        <div
          className={`relative grid transform-3d transition-transform duration-700 ease-[cubic-bezier(0.4,0.2,0.2,1)] ${
            isSignUp ? 'transform-[rotateY(180deg)]' : 'transform-[rotateY(0deg)]'
          }`}
        >
          {/* Login face */}
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
                onSubmit={(e) => e.preventDefault()}
              >
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  leftIcon={<Mail className="size-4" />}
                />
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  leftIcon={<Lock className="size-4" />}
                  rightIcon={<Eye className="size-4" />}
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
                <Button type="submit" variant="primary" fullWidth>
                  Login
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

          {/* Signup face */}
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
                onSubmit={(e) => e.preventDefault()}
              >
                <Input
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  autoComplete="name"
                  leftIcon={<User className="size-4" />}
                />
                <Input
                  label="Email"
                  name="signup-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  leftIcon={<Mail className="size-4" />}
                />
                <Input
                  label="Password"
                  name="signup-password"
                  type="password"
                  placeholder="Create a password"
                  autoComplete="new-password"
                  leftIcon={<Lock className="size-4" />}
                  rightIcon={<Eye className="size-4" />}
                />
                <Button type="submit" variant="primary" fullWidth>
                  Sign up
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

import { useState } from 'react'
import { useNavigate } from 'react-router'
import { ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    navigate('/mfa')
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Logo + wordmark */}
      <div className="flex items-center gap-2 justify-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <ShieldCheck className="size-6 text-primary-foreground" />
        </div>
        <span className="text-lg font-semibold text-foreground">GroupAuth</span>
      </div>

      {/* Heading */}
      <h1 className="text-xl font-semibold text-foreground text-center">
        Sign in to BSW Group
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email address
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-medium text-foreground">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          className="w-full rounded-md"
        >
          Sign in
        </Button>
      </form>

      {/* Forgot password */}
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        className="text-sm text-primary hover:underline"
      >
        Forgot password?
      </a>

      {/* Footer */}
      <p className="text-xs text-muted-foreground text-center">
        Secured by GroupAuth
      </p>
    </div>
  )
}

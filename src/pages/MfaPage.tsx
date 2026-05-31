import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'

const COUNTDOWN_START = 30
const OTP_LENGTH = 6

export function MfaPage() {
  const navigate = useNavigate()
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [countdown, setCountdown] = useState(COUNTDOWN_START)
  const [countdownActive, setCountdownActive] = useState(true)
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])

  const allFilled = otp.every((d) => d !== '')

  // Countdown timer
  useEffect(() => {
    if (!countdownActive) return
    if (countdown <= 0) {
      setCountdownActive(false)
      return
    }
    const id = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(id)
          setCountdownActive(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [countdownActive, countdown])

  function handleResend() {
    setCountdown(COUNTDOWN_START)
    setCountdownActive(true)
  }

  function focusSlot(index: number) {
    inputsRef.current[index]?.focus()
  }

  function handleChange(index: number, value: string) {
    // Allow only digits
    if (!/^\d*$/.test(value)) return

    // If user types into an already-filled slot, take the last typed char
    const digit = value.slice(-1)

    const next = [...otp]
    next[index] = digit
    setOtp(next)

    if (digit && index < OTP_LENGTH - 1) {
      focusSlot(index + 1)
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace') {
      if (otp[index] !== '') {
        // Clear current slot
        const next = [...otp]
        next[index] = ''
        setOtp(next)
      } else if (index > 0) {
        // Move to previous slot
        const next = [...otp]
        next[index - 1] = ''
        setOtp(next)
        focusSlot(index - 1)
      }
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)
    if (!pasted) return

    const next = Array(OTP_LENGTH).fill('')
    for (let i = 0; i < pasted.length; i++) {
      next[i] = pasted[i]
    }
    setOtp(next)

    // Focus the last filled slot (or last slot if fully filled)
    const lastIdx = Math.min(pasted.length, OTP_LENGTH - 1)
    focusSlot(lastIdx)
  }

  function handleVerify() {
    navigate('/dashboard')
  }

  const secondsFormatted = `0:${String(countdown).padStart(2, '0')}`

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Icon */}
      <div className="flex items-center justify-center rounded-full bg-primary/10 p-3 text-primary">
        <Smartphone className="size-7" />
      </div>

      {/* Heading */}
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-xl font-semibold">Two-factor authentication</h1>
        <p className="text-sm text-muted-foreground">
          Enter the code from your authenticator app
        </p>
      </div>

      {/* OTP slots */}
      <div className="flex justify-center gap-2">
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { inputsRef.current[i] = el }}
            type="text"
            inputMode="numeric"
            maxLength={2}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            className="size-12 rounded-md bg-input text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label={`Digit ${i + 1}`}
          />
        ))}
      </div>

      {/* Verify button */}
      <Button
        className="w-full"
        disabled={!allFilled}
        onClick={handleVerify}
      >
        Verify
      </Button>

      {/* Footer links */}
      <div className="flex flex-col items-center gap-1 text-sm">
        <button
          type="button"
          className="text-primary hover:underline"
          onClick={() => {/* no-op for MVP */}}
        >
          Use a backup code instead
        </button>

        {countdownActive ? (
          <span className="text-muted-foreground">
            Resend code in {secondsFormatted}
          </span>
        ) : (
          <button
            type="button"
            className="text-primary hover:underline"
            onClick={handleResend}
          >
            Resend code
          </button>
        )}
      </div>
    </div>
  )
}

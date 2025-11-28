'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/profile/create')
      router.refresh()
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8 rounded-3xl bg-white/20 backdrop-blur-xl p-8 shadow-2xl border border-white/30">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white drop-shadow-lg">
            Реєстрація
          </h2>
          <p className="mt-2 text-center text-sm text-white/90">
            Або{' '}
            <Link href="/login" className="font-medium text-white hover:text-white/80 underline">
              увійдіть
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          {error && (
            <div className="rounded-xl bg-red-500/30 backdrop-blur-sm border border-red-400/50 p-4">
              <p className="text-sm text-white font-medium">{error}</p>
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-xl border border-white/30 bg-white/20 backdrop-blur-sm px-4 py-3 text-white placeholder-white/70 focus:z-10 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 sm:text-sm"
                placeholder="Email адреса"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Пароль
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="relative block w-full rounded-xl border border-white/30 bg-white/20 backdrop-blur-sm px-4 py-3 text-white placeholder-white/70 focus:z-10 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 sm:text-sm"
                placeholder="Пароль (мінімум 6 символів)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-xl border border-white/30 bg-white/30 backdrop-blur-sm px-4 py-3 text-sm font-semibold text-white hover:bg-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 transition-all duration-200 shadow-lg"
            >
              {loading ? 'Реєстрація...' : 'Зареєструватися'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


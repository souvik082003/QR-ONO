import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase/supabaseClient'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    const { error: authError } = await supabase.auth.signUp({ email, password })
    setLoading(false)

    if (authError) {
      setError(authError.message)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass-card-cyan p-10 max-w-md w-full text-center animate-slide-up">
          <div className="text-5xl mb-4" style={{ color: '#4dd8e6', textShadow: '0 0 20px rgba(77,216,230,0.8)' }}>✓</div>
          <h2 className="font-cinzel text-2xl text-white mb-3">Account Created</h2>
          <p className="font-manrope text-white/50 text-sm mb-6">
            Check your email to confirm your account, then come back and sign in.
          </p>
          <Link to="/login">
            <button className="btn-solid-cyan w-full">Go to Login</button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 scanline-bg">
      {/* Ambient glow */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle, #e84393, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="relative w-full max-w-md animate-slide-up">
        <div className="text-center mb-6">
          <Link to="/">
            <h1 className="font-orbitron font-black text-3xl text-neon-cyan tracking-widest mb-2">QR-ONO</h1>
          </Link>
          <p className="font-cinzel text-xs tracking-[0.3em] text-white/30 uppercase">Create Hunter Profile</p>
        </div>

        <div className="glass-card-pink relative p-6 corner-decoration">
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-pink-neon/50 to-transparent" />

          <h2 className="font-cinzel text-xl text-white mb-6 text-center tracking-wide">Register</h2>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg border border-pink-neon/40 bg-pink-neon/5 text-pink-neon text-sm font-manrope">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div>
              <label className="block font-manrope text-xs text-white/40 uppercase tracking-widest mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hunter@arena.io"
                className="input-neon"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block font-manrope text-xs text-white/40 uppercase tracking-widest mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                className="input-neon"
                autoComplete="new-password"
              />
            </div>

            <div>
              <label className="block font-manrope text-xs text-white/40 uppercase tracking-widest mb-2">Confirm Password</label>
              <input
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repeat password"
                className="input-neon"
                autoComplete="new-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-solid-cyan w-full mt-2"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="font-manrope text-sm text-white/40">
              Already have an account?{' '}
              <Link to="/login" className="text-cyan-neon hover:text-cyan-light transition-colors underline underline-offset-2">
                Sign in
              </Link>
            </p>
          </div>

          <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-neon/30 to-transparent" />
        </div>
      </div>
    </div>
  )
}

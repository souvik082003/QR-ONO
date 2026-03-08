import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../supabase/supabaseClient'
import { getUserScore } from '../utils/scoreUtils'

const QRLogo = () => (
  <div
    className="w-20 h-20 border-2 border-cyan-neon/60 rounded-2xl flex items-center justify-center animate-float mx-auto mb-5"
    style={{ boxShadow: '0 0 30px rgba(77,216,230,0.4), inset 0 0 20px rgba(77,216,230,0.05)' }}
  >
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <rect x="2" y="2" width="16" height="16" rx="2" stroke="#4dd8e6" strokeWidth="2"/>
      <rect x="26" y="2" width="16" height="16" rx="2" stroke="#4dd8e6" strokeWidth="2"/>
      <rect x="2" y="26" width="16" height="16" rx="2" stroke="#4dd8e6" strokeWidth="2"/>
      <rect x="6" y="6" width="8" height="8" rx="1" fill="#4dd8e6"/>
      <rect x="30" y="6" width="8" height="8" rx="1" fill="#4dd8e6"/>
      <rect x="6" y="30" width="8" height="8" rx="1" fill="#4dd8e6"/>
      <rect x="26" y="26" width="5" height="5" fill="#e84393"/>
      <rect x="33" y="26" width="5" height="5" fill="#e84393"/>
      <rect x="26" y="33" width="5" height="5" fill="#e84393"/>
      <rect x="33" y="33" width="5" height="5" fill="#4dd8e6"/>
      <rect x="39" y="26" width="3" height="3" fill="#4dd8e6"/>
      <rect x="26" y="39" width="3" height="3" fill="#4dd8e6"/>
    </svg>
  </div>
)

export default function HomePage() {
  const [user, setUser] = useState(undefined) // undefined = still checking
  const [score, setScore] = useState(0)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) getUserScore(session.user.id).then(s => setScore(s ?? 0))
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
      if (session?.user) getUserScore(session.user.id).then(s => setScore(s ?? 0))
      else setScore(0)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  // Still checking auth - show nothing to avoid flash
  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-2 border-cyan-neon/20" />
          <div className="absolute inset-0 rounded-full border-t-2 border-cyan-neon animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden scanline-bg">
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #4dd8e6, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #e84393, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="relative z-10 w-full max-w-xs text-center animate-fade-in">
        <QRLogo />

        <h1 className="font-orbitron font-black text-4xl tracking-wider mb-1"
          style={{ background: 'linear-gradient(135deg, #4dd8e6, #88f0ff, #e84393)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          QR-ONO
        </h1>
        <p className="font-cinzel text-xs tracking-[0.3em] text-white/30 uppercase mb-8">
          Scan. Answer. Conquer.
        </p>

        {user ? (
          /* LOGGED IN */
          <div className="flex flex-col items-center gap-5">
            {/* Score badge */}
            <div
              className="glass-card-cyan px-8 py-4 rounded-2xl text-center w-full"
              style={{ boxShadow: '0 0 24px rgba(77,216,230,0.2)' }}
            >
              <p className="font-manrope text-xs text-white/40 uppercase tracking-widest mb-1">Your Points</p>
              <p
                className="font-orbitron text-5xl font-bold"
                style={{ color: '#4dd8e6', textShadow: '0 0 20px rgba(77,216,230,0.7)' }}
              >
                {score}
              </p>
              <p className="font-manrope text-xs text-white/30 mt-1">pts</p>
            </div>

            {/* Scan button */}
            <Link to="/scan" className="w-full">
              <button
                className="btn-solid-cyan w-full"
                style={{ minHeight: '60px', fontSize: '16px', letterSpacing: '0.1em' }}
              >
                📷  Scan QR Code
              </button>
            </Link>

            {/* Subtle leaderboard link */}
            <Link to="/leaderboard" className="font-manrope text-xs text-white/30 hover:text-cyan-neon transition-colors underline underline-offset-4">
              View Leaderboard
            </Link>
          </div>
        ) : (
          /* LOGGED OUT */
          <div className="flex flex-col gap-4 w-full">
            <Link to="/register" className="w-full">
              <button
                className="btn-solid-cyan w-full"
                style={{ minHeight: '56px', fontSize: '15px' }}
              >
                Register
              </button>
            </Link>
            <Link to="/login" className="w-full">
              <button
                className="btn-neon-cyan w-full"
                style={{ minHeight: '56px', fontSize: '15px' }}
              >
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

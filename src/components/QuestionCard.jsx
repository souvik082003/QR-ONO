export default function QuestionCard({ question, children }) {
  return (
    <div className="glass-card-cyan relative p-5 sm:p-8 animate-slide-up corner-decoration">
      {/* Top accent line */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-neon/50 to-transparent" />

      {/* Question label */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-2 h-2 rounded-full bg-pink-neon" style={{ boxShadow: '0 0 6px #e84393' }} />
        <span className="font-orbitron text-xs tracking-[0.2em] text-white/40 uppercase">Question</span>
      </div>

      {/* Question text */}
      <p className="font-cinzel text-base sm:text-xl text-white leading-relaxed mb-6">
        {question}
      </p>

      {/* Answer options slot */}
      <div className="flex flex-col gap-3">
        {children}
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-pink-neon/30 to-transparent" />
    </div>
  )
}

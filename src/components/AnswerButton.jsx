/**
 * A single MCQ answer button.
 *
 * Props:
 *   label       - "A" | "B" | "C" | "D"
 *   text        - option text
 *   selected    - bool (this option is currently selected)
 *   result      - null | "correct" | "wrong"  (after submission)
 *   disabled    - bool
 *   onClick     - handler
 */
export default function AnswerButton({ label, text, selected, result, disabled, onClick }) {
  const baseClass =
    'w-full flex items-center gap-4 px-4 py-4 rounded-xl border text-left font-manrope text-base transition-all duration-200 cursor-pointer'

  let stateClass = ''

  if (result === 'correct') {
    stateClass = 'border-green-400/80 bg-green-400/10 text-green-300'
  } else if (result === 'wrong') {
    stateClass = 'border-pink-neon/60 bg-pink-neon/10 text-pink-neon/80'
  } else if (selected) {
    stateClass = 'border-cyan-neon/80 bg-cyan-neon/10 text-cyan-light'
  } else {
    stateClass = 'border-white/10 bg-white/3 text-white/70 hover:border-cyan-neon/40 hover:bg-cyan-neon/5 hover:text-white'
  }

  const disabledClass = disabled ? 'pointer-events-none' : ''

  const resultIcon =
    result === 'correct' ? '✓' :
    result === 'wrong'   ? '✗' :
    null

  return (
    <button
      className={`${baseClass} ${stateClass} ${disabledClass}`}
      onClick={onClick}
      disabled={disabled}
      style={{
        touchAction: 'manipulation',
        minHeight: '52px',
        ...(result === 'correct'
          ? { boxShadow: '0 0 15px rgba(74,222,128,0.2)' }
          : result === 'wrong' && selected
          ? { boxShadow: '0 0 15px rgba(232,67,147,0.2)' }
          : selected
          ? { boxShadow: '0 0 15px rgba(77,216,230,0.15)' }
          : {}),
      }}
    >
      {/* Label badge */}
      <span
        className="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center font-orbitron text-xs font-bold border"
        style={
          result === 'correct'
            ? { borderColor: 'rgba(74,222,128,0.6)', color: '#4ade80', background: 'rgba(74,222,128,0.1)' }
            : result === 'wrong' && selected
            ? { borderColor: 'rgba(232,67,147,0.6)', color: '#e84393', background: 'rgba(232,67,147,0.1)' }
            : selected
            ? { borderColor: 'rgba(77,216,230,0.8)', color: '#4dd8e6', background: 'rgba(77,216,230,0.1)' }
            : { borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.4)', background: 'transparent' }
        }
      >
        {resultIcon ?? label}
      </span>

      {/* Option text */}
      <span className="flex-1">{text}</span>
    </button>
  )
}

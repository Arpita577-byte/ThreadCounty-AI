export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`}
    >
      {/* Primary mesh blobs */}
      <div
        className="absolute -left-32 -top-40 size-[50rem] rounded-full opacity-70 blur-[100px]"
        style={{
          background:
            'radial-gradient(circle, oklch(0.66 0.18 250 / 0.4), transparent 55%)',
          animation: 'aurora-drift 20s ease-in-out infinite',
        }}
      />
      <div
        className="absolute -right-40 top-0 size-[44rem] rounded-full opacity-60 blur-[100px]"
        style={{
          background:
            'radial-gradient(circle, oklch(0.72 0.15 165 / 0.35), transparent 55%)',
          animation: 'aurora-drift 24s ease-in-out infinite reverse',
        }}
      />
      <div
        className="absolute -bottom-40 left-1/4 size-[46rem] rounded-full opacity-50 blur-[100px]"
        style={{
          background:
            'radial-gradient(circle, oklch(0.58 0.16 280 / 0.32), transparent 55%)',
          animation: 'aurora-drift 28s ease-in-out infinite',
        }}
      />
      <div
        className="absolute right-1/4 top-1/3 size-[30rem] rounded-full opacity-30 blur-[80px]"
        style={{
          background:
            'radial-gradient(circle, oklch(0.66 0.18 250 / 0.25), transparent 60%)',
          animation: 'aurora-drift 16s ease-in-out infinite',
        }}
      />

      {/* Mesh gradient overlay */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          background: `
            radial-gradient(at 20% 30%, oklch(0.66 0.18 250 / 0.5) 0%, transparent 50%),
            radial-gradient(at 80% 20%, oklch(0.72 0.15 165 / 0.4) 0%, transparent 50%),
            radial-gradient(at 60% 80%, oklch(0.58 0.16 280 / 0.35) 0%, transparent 50%)
          `,
        }}
      />

      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          animation: 'grid-pan 18s linear infinite',
          color: 'oklch(0.97 0.005 250)',
          maskImage:
            'radial-gradient(ellipse 80% 70% at 50% 30%, black, transparent 85%)',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, oklch(0.13 0.012 265 / 0.6) 100%)',
        }}
      />
    </div>
  )
}

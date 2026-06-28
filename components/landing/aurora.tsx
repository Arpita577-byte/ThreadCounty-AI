export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`}
    >
      {/* animated mesh-gradient blobs */}
      <div
        className="absolute -left-24 -top-32 size-[42rem] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, oklch(0.66 0.18 250 / 0.35), transparent 60%)',
          animation: 'aurora-drift 18s ease-in-out infinite',
        }}
      />
      <div
        className="absolute -right-32 top-10 size-[38rem] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, oklch(0.72 0.15 165 / 0.3), transparent 60%)',
          animation: 'aurora-drift 22s ease-in-out infinite reverse',
        }}
      />
      <div
        className="absolute bottom-[-12rem] left-1/3 size-[40rem] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, oklch(0.58 0.16 280 / 0.28), transparent 60%)',
          animation: 'aurora-drift 26s ease-in-out infinite',
        }}
      />
      {/* animated grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          animation: 'grid-pan 14s linear infinite',
          color: 'oklch(0.97 0.005 250)',
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 80%)',
        }}
      />
    </div>
  )
}

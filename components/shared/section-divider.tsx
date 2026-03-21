type SectionDividerProps = {
  label?: string
}

function CrosshairIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="text-muted-foreground/50">
      <line x1="5.5" y1="0" x2="5.5" y2="11" stroke="currentColor" strokeWidth="1" />
      <line x1="0" y1="5.5" x2="11" y2="5.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

export function SectionDivider({ label }: SectionDividerProps) {
  return (
    <div className="relative h-6">
      {/* Full-width horizontal line — extends to viewport edges */}
      <div className="absolute left-1/2 top-1/2 h-px w-screen -translate-x-1/2 grid-line-h opacity-60" />

      {/* Left intersection: + marker + label */}
      <div className="absolute -left-6 top-1/2 -translate-y-1/2 lg:-left-12">
        <span className="absolute left-[-5px] top-[-5px]">
          <CrosshairIcon />
        </span>
        {label && (
          <span className="absolute bottom-[10px] left-0 whitespace-nowrap font-mono text-[10px] tracking-[0.1em] text-muted-foreground/50">
            {label}
          </span>
        )}
      </div>

      {/* Right intersection: + marker + label */}
      <div className="absolute -right-6 top-1/2 -translate-y-1/2 lg:-right-12">
        <span className="absolute right-[-5px] top-[-5px]">
          <CrosshairIcon />
        </span>
        {label && (
          <span className="absolute bottom-[10px] right-0 whitespace-nowrap font-mono text-[10px] tracking-[0.1em] text-muted-foreground/50">
            {label}
          </span>
        )}
      </div>
    </div>
  )
}

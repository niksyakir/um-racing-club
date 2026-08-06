export default function ImagePlaceholder({ label }) {
  return (
    <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-dashed border-white/20 bg-gradient-navy text-white shadow-elevated">
      <div className="absolute inset-0 bg-[image:var(--gradient-navy-radial)]" />
      <div className="relative flex flex-col items-center gap-2 text-center">
        <svg
          className="h-8 w-8 text-gold"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="9" cy="10.5" r="1.75" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16l5-4 3 3 4-5 6 6" />
        </svg>
        <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
          {label}
        </span>
        <span className="text-[10px] font-medium uppercase tracking-wide text-gold/80">
          Photo coming soon
        </span>
      </div>
    </div>
  );
}

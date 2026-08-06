const ACCENT_BAR = {
  gold: "before:bg-gradient-gold",
  red: "before:bg-race-red",
  navy: "before:bg-gradient-navy",
};

export default function Card({ children, accent = "gold", className = "" }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-navy/10 bg-white p-6 shadow-elevated transition-all duration-300 before:absolute before:inset-x-0 before:top-0 before:h-1 before:content-[''] ${ACCENT_BAR[accent]} hover:-translate-y-1 hover:shadow-premium ${className}`}
    >
      {children}
    </div>
  );
}

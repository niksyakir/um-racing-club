"use client";

import { useEffect, useState } from "react";

const UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

function TimeUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-4xl tracking-wide text-gold md:text-6xl">
        {value}
      </span>
      <span className="mt-1 text-xs font-semibold uppercase tracking-widest text-white/70">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer({ eventAt, eventName }) {
  // Stays null until the client mounts, so the server-rendered HTML
  // never contains a time-dependent value React would have to hydrate
  // against a different client-side value.
  const [now, setNow] = useState(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const initialTick = setTimeout(tick, 0);
    const interval = setInterval(tick, 1000);

    return () => {
      clearTimeout(initialTick);
      clearInterval(interval);
    };
  }, []);

  if (now === null) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
        {UNITS.map((unit) => (
          <TimeUnit key={unit.key} value="--" label={unit.label} />
        ))}
      </div>
    );
  }

  const diff = new Date(eventAt).getTime() - now;

  if (diff <= 0) {
    return (
      <p className="font-display text-3xl tracking-wide text-gold md:text-4xl">
        {eventName} is happening now!
      </p>
    );
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
      <TimeUnit value={days} label="Days" />
      <TimeUnit value={String(hours).padStart(2, "0")} label="Hours" />
      <TimeUnit value={String(minutes).padStart(2, "0")} label="Minutes" />
      <TimeUnit value={String(seconds).padStart(2, "0")} label="Seconds" />
    </div>
  );
}

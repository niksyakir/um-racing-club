"use client";

import { useState } from "react";

export default function SponsorLogo({ src, alt, initial }) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-navy font-display text-lg text-gold">
        {initial}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="h-10 w-20 object-contain"
      onError={() => setErrored(true)}
    />
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const ALL_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/achievements", label: "Achievements" },
  { href: "/current-car", label: "Current Car" },
  { href: "/sponsors", label: "Our Sponsors" },
  { href: "/merchandise", label: "Merchandise" },
  { href: "/contact", label: "Contact" },
  { href: "/apply", label: "Apply" },
];

const PRIMARY_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/achievements", label: "Achievements" },
];

const MORE_LINKS = [
  { href: "/current-car", label: "Current Car" },
  { href: "/sponsors", label: "Our Sponsors" },
  { href: "/merchandise", label: "Merchandise" },
  { href: "/contact", label: "Contact" },
  { href: "/apply", label: "Apply" },
];

function linkClass(active) {
  return `relative py-1 text-sm font-semibold uppercase tracking-wide transition-colors hover:text-gold ${
    active
      ? "text-gold after:absolute after:-bottom-[13px] after:left-0 after:h-0.5 after:w-full after:bg-gold"
      : "text-white/90"
  }`;
}

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreActive = MORE_LINKS.some((link) => link.href === pathname);

  return (
    <header className="fixed top-0 z-50 h-16 w-full border-b border-white/10 bg-navy/60 text-white backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" onClick={() => setIsOpen(false)} className="relative h-10 w-36">
          <Image
            src="/image/UM Racing Logo.jpg"
            alt="UM Racing"
            fill
            priority
            sizes="144px"
            className="object-contain object-left"
          />
        </Link>

        <ul className="hidden items-center gap-5 lg:flex">
          {PRIMARY_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={linkClass(pathname === link.href)}>
                {link.label}
              </Link>
            </li>
          ))}

          <li className="relative">
            <button
              type="button"
              onClick={() => setIsMoreOpen((open) => !open)}
              aria-expanded={isMoreOpen}
              className={`flex items-center gap-1 ${linkClass(moreActive)}`}
            >
              More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`h-3.5 w-3.5 transition-transform ${isMoreOpen ? "rotate-180" : ""}`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {isMoreOpen && (
              <>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setIsMoreOpen(false)}
                  className="fixed inset-0 z-40 cursor-default bg-transparent"
                />
                <ul className="absolute right-0 top-full z-50 mt-3 w-48 rounded-lg border border-white/10 bg-navy py-2 shadow-xl">
                  {MORE_LINKS.map((link) => {
                    const active = pathname === link.href;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setIsMoreOpen(false)}
                          className={`block px-4 py-2 text-sm font-medium ${
                            active ? "bg-white/10 text-gold" : "text-white/90 hover:bg-white/5"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          className="flex items-center justify-center rounded p-2 lg:hidden"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {isOpen && (
        <ul className="flex flex-col gap-1 border-t border-white/10 bg-navy px-4 pb-4 lg:hidden">
          {ALL_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded px-2 py-2 text-sm font-medium ${
                    active ? "bg-white/10 text-gold" : "text-white/90 hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </header>
  );
}

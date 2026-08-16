"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { DASHBOARD_ROLES, hasAnyRole } from "@/lib/auth/roles";

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

function linkClass(active) {
  return `relative py-1 text-sm font-semibold uppercase tracking-wide transition-colors hover:text-gold ${
    active
      ? "text-gold after:absolute after:-bottom-[13px] after:left-0 after:h-0.5 after:w-full after:bg-gold"
      : "text-white/90"
  }`;
}

export default function Navbar({ user = null, roles = [], profile = null }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const initial = user?.email?.charAt(0).toUpperCase() ?? "?";
  const canAccessDashboard = hasAnyRole(roles, DASHBOARD_ROLES);
  const isTransparent = pathname === "/" && !isScrolled && !isMenuOpen;

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 60);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    function handleKeydown(event) {
      if (event.key === "Escape") setIsMenuOpen(false);
    }
    window.addEventListener("keydown", handleKeydown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [isMenuOpen]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setIsAccountOpen(false);
    setIsMenuOpen(false);
    router.push("/");
    router.refresh();
  }

  const dashboardLink = canAccessDashboard && (
    <Link
      href="/dashboard"
      onClick={() => setIsMenuOpen(false)}
      className="rounded-full border border-gold/50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-gold transition-colors hover:bg-gold hover:text-navy"
    >
      Dashboard
    </Link>
  );

  const accountControl = (
    <div className="relative">
      {user ? (
        <>
          <button
            type="button"
            onClick={() => setIsAccountOpen((open) => !open)}
            aria-expanded={isAccountOpen}
            aria-label="Account menu"
            className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-gold font-display text-sm text-navy shadow-soft transition-transform hover:scale-105"
          >
            {profile?.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.avatar_url} alt="" className="h-full w-full object-cover" />
            ) : (
              initial
            )}
          </button>

          {isAccountOpen && (
            <>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setIsAccountOpen(false)}
                className="fixed inset-0 z-40 cursor-default bg-transparent"
              />
              <div className="absolute right-0 top-full z-50 mt-3 w-56 overflow-hidden rounded-lg border border-white/10 bg-navy py-2 shadow-xl">
                <p className="truncate px-4 py-2 text-xs font-medium text-white/60" title={user.email}>
                  Signed in as
                  <br />
                  <span className="text-sm font-semibold text-white">{user.email}</span>
                </p>
                <div className="my-1 border-t border-white/10" />
                <Link
                  href="/profile"
                  onClick={() => setIsAccountOpen(false)}
                  className="block w-full px-4 py-2 text-left text-sm font-medium text-white/90 hover:bg-white/5"
                >
                  My Profile
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left text-sm font-medium text-white/90 hover:bg-white/5"
                >
                  Log out
                </button>
              </div>
            </>
          )}
        </>
      ) : (
        <Link href="/login" onClick={() => setIsMenuOpen(false)} className={linkClass(pathname === "/login")}>
          Team Login
        </Link>
      )}
    </div>
  );

  return (
    <>
      <header
        className={`fixed top-0 z-50 h-16 w-full text-white transition-colors duration-300 ${
          isTransparent
            ? "border-b border-white/10 bg-navy/60 backdrop-blur-md"
            : "border-b border-white/10 bg-navy shadow-elevated"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="relative h-10 w-36">
            <Image
              src="/image/UM Racing Logo.jpg"
              alt="UM Racing"
              fill
              priority
              sizes="144px"
              className="object-contain object-left"
            />
          </Link>

          <div className="flex items-center gap-4">
            {dashboardLink}
            {accountControl}

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-white/90 transition-colors hover:text-gold"
            >
              {isMenuOpen ? "Close" : "Menu"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-gradient-navy text-white transition-opacity duration-300 ease-out ${
          isMenuOpen ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-[image:var(--gradient-navy-radial)]" />

        <nav className="relative flex h-16 shrink-0 items-center justify-between px-4 md:px-6">
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="relative h-10 w-36">
            <Image
              src="/image/UM Racing Logo.jpg"
              alt="UM Racing"
              fill
              sizes="144px"
              className="object-contain object-left"
            />
          </Link>

          <div className="flex items-center gap-4">
            {dashboardLink}
            {accountControl}

            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
              className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-white/90 transition-colors hover:text-gold"
            >
              Close
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </nav>

        <div className="relative flex flex-1 flex-col justify-center px-6 md:px-16">
          <ul className="space-y-3 md:space-y-5">
            {ALL_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`font-display block text-4xl uppercase tracking-wide transition-colors sm:text-5xl md:text-7xl ${
                      active ? "text-gold" : "text-white/90 hover:text-gold"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

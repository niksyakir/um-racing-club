"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
  return `relative py-1 text-sm font-semibold uppercase tracking-wide hover:underline ${
    active
      ? "after:absolute after:-bottom-[13px] after:left-0 after:h-0.5 after:w-full after:bg-current"
      : ""
  }`;
}

export default function Navbar({ user = null, roles = [], profile = null }) {
  const pathname = usePathname();
  const router = useRouter();
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [heroFade, setHeroFade] = useState(0);
  const initial = user?.email?.charAt(0).toUpperCase() ?? "?";
  const canAccessDashboard = hasAnyRole(roles, DASHBOARD_ROLES);
  const fade = pathname === "/" ? heroFade : 1;
  const textColor = fade < 0.2 ? "white" : "#141c46";

  useEffect(() => {
    if (pathname !== "/") return;

    const navbar = document.getElementById("site-navbar");
    const main = document.querySelector("main");
    if (!navbar || !main) return;

    let hero = null;

    function updateFade() {
      if (!hero) {
        setHeroFade(0);
        return;
      }

      const scrollTop = window.scrollY;
      const heroEnd = hero.getBoundingClientRect().bottom + scrollTop - navbar.offsetHeight;
      const fadeStart = heroEnd * 0.2;
      const progress = heroEnd > 0 ? (scrollTop - fadeStart) / (heroEnd - fadeStart) : 1;
      setHeroFade(Math.max(0, Math.min(1, progress)));
    }

    const resizeObserver = new ResizeObserver(updateFade);
    resizeObserver.observe(navbar);

    function connectHero() {
      const nextHero = main.querySelector("#home-hero");
      if (nextHero === hero) return;

      if (hero) resizeObserver.unobserve(hero);
      hero = nextHero;
      if (hero) resizeObserver.observe(hero);
      updateFade();
    }

    // Client navigation can render the loading UI before the homepage hero.
    const contentObserver = new MutationObserver(connectHero);
    contentObserver.observe(main, { childList: true, subtree: true });
    connectHero();
    window.addEventListener("scroll", updateFade, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateFade);
      contentObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;

    function handleOutsideClick(event) {
      if (!menuRef.current?.contains(event.target)) setIsMenuOpen(false);
    }

    function handleKeydown(event) {
      if (event.key !== "Escape") return;
      setIsMenuOpen(false);
      menuButtonRef.current?.focus();
    }

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeydown);
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
      className="rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide border-current/25 transition-[background-color] hover:bg-[#141c46]/5"
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
            className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-gold font-display text-sm shadow-soft transition-transform hover:scale-105 text-inherit"
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
        id="site-navbar"
        className={`fixed top-0 z-50 h-16 w-full ${fade === 1 ? "border-b border-[#141c46]/10 shadow-elevated" : ""}`}
        style={{ backgroundColor: `rgb(255 255 255 / ${fade})`, color: textColor }}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="relative h-10 w-36">
            <Image
              src="/image/UM Racing Logo.png"
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

            <div ref={menuRef} className="relative">
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setIsMenuOpen((open) => !open)}
                aria-expanded={isMenuOpen}
                aria-controls="site-nav-links"
                aria-label="Navigation menu"
                className="flex h-11 w-11 items-center justify-center rounded-md hover:bg-current/10"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <ul
                id="site-nav-links"
                hidden={!isMenuOpen}
                className="absolute right-0 top-full z-50 mt-2 max-h-[calc(100dvh-4rem)] w-52 overflow-y-auto rounded-lg border border-white/10 bg-navy py-2 text-white shadow-xl"
              >
                {ALL_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={pathname === href ? "page" : undefined}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-2 text-sm font-semibold hover:bg-white/10 hover:text-gold aria-[current=page]:text-gold"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

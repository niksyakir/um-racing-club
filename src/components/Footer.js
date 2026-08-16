import Link from "next/link";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/achievements", label: "Achievements" },
  { href: "/sponsors", label: "Our Sponsors" },
  { href: "/apply", label: "Apply" },
  { href: "/privacy", label: "Privacy Policy" },
];

const SOCIAL_LINKS = [
  {
    href: "https://instagram.com/akiumformula",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "https://tiktok.com/@akiumformula",
    label: "TikTok",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M16.5 3c.4 2.2 1.9 3.7 4.1 3.9v3c-1.5.1-2.9-.4-4.1-1.3v6.7c0 3.4-2.7 6.1-6.1 6.1S4.3 18.7 4.3 15.3s2.7-6.1 6.1-6.1c.4 0 .8 0 1.1.1v3.1a3 3 0 1 0 2.1 2.9V3h2.9z" />
      </svg>
    ),
  },
  {
    href: "https://facebook.com/akiumformula",
    label: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M13.5 21v-7.5H16l.4-3H13.5V8.4c0-.9.2-1.5 1.5-1.5h1.6V4.3C16.3 4.2 15.3 4 14.2 4c-2.4 0-4 1.5-4 4.1v2.4H7.7v3h2.5V21h3.3z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:px-6">
        <div>
          <p className="text-lg font-extrabold text-white">UM RACING</p>
          <p className="mt-2 max-w-xs text-sm">
            Universiti Malaya&apos;s Formula Student team, building the
            university&apos;s first electric race car.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gold">
            Quick Links
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gold">
            Contact
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            <li>akium.fs@gmail.com</li>
            <li>Faculty of Engineering, Universiti Malaya</li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gold">
            Follow Us
          </p>
          <ul className="mt-3 flex gap-4">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-gold hover:text-gold"
                >
                  {social.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/60">
        © {new Date().getFullYear()} UM Racing Team. All rights reserved.
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  DASHBOARD_ROLES,
  SPONSORS_ROLES,
  ACHIEVEMENTS_ROLES,
  APPLICATIONS_ROLES,
  USERS_ROLES,
  EVENT_ROLES,
  hasAnyRole,
} from "@/lib/auth/roles";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", roles: DASHBOARD_ROLES },
  { href: "/dashboard/sponsors", label: "Sponsors", roles: SPONSORS_ROLES },
  { href: "/dashboard/achievements", label: "Achievements", roles: ACHIEVEMENTS_ROLES },
  { href: "/dashboard/applications", label: "Applications", roles: APPLICATIONS_ROLES },
  { href: "/dashboard/event", label: "Event Countdown", roles: EVENT_ROLES },
  { href: "/dashboard/users", label: "Users & Roles", roles: USERS_ROLES },
];

export default function Sidebar({ roles, email }) {
  const pathname = usePathname();
  const router = useRouter();
  const items = NAV_ITEMS.filter((item) => hasAnyRole(roles, item.roles));

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <aside className="w-full shrink-0 border-b border-navy/10 bg-white md:w-56 md:border-b-0 md:border-r">
      <div className="flex flex-col gap-1 p-4">
        <nav className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-col md:overflow-visible md:px-0 md:pb-0">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 rounded px-3 py-2 text-sm font-semibold whitespace-nowrap ${
                  active ? "bg-navy/10 text-navy" : "text-gray-600 hover:bg-navy/5 hover:text-navy"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-4 border-t border-navy/10 pt-4">
          <p className="truncate px-3 text-xs text-gray-500" title={email}>
            {email}
          </p>
          <Link
            href="/"
            className="mt-2 block rounded px-3 py-2 text-sm font-medium text-gray-600 hover:bg-navy/5 hover:text-navy"
          >
            ← Back to site
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-1 block w-full rounded px-3 py-2 text-left text-sm font-medium text-race-red hover:bg-race-red/5"
          >
            Log out
          </button>
        </div>
      </div>
    </aside>
  );
}

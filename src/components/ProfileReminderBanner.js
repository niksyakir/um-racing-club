"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileReminderBanner({ user, profile }) {
  const pathname = usePathname();

  if (!user || profile?.profile_completed || pathname === "/profile") {
    return null;
  }

  return (
    <div className="bg-gold px-4 py-2 text-center text-sm font-semibold text-navy">
      Welcome! Please finish setting up your profile.{" "}
      <Link href="/profile" className="underline underline-offset-2 hover:text-navy/70">
        Complete Profile &rarr;
      </Link>
    </div>
  );
}

import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileReminderBanner from "@/components/ProfileReminderBanner";
import { getRoles } from "@/lib/auth/getRole";
import { SITE_URL, SITE_NAME } from "@/lib/siteConfig";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

const description =
  "Universiti Malaya's Formula Student team, building the university's first electric race car.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description,
  openGraph: {
    title: SITE_NAME,
    description,
    siteName: SITE_NAME,
    type: "website",
    images: ["/image/team.jpeg"],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description,
    images: ["/image/team.jpeg"],
  },
};

export default async function RootLayout({ children }) {
  const { user, roles, profile } = await getRoles();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar user={user} roles={roles} profile={profile} />
        <main className="flex-1 pt-16">
          <ProfileReminderBanner user={user} profile={profile} />
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Chakra_Petch, Inter } from "next/font/google";
import { Footer, Header } from "@/components/layout";
import { RouteGridOverlay } from "@/components/layout/RouteGridOverlay";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// The display face. Only the bold cut is loaded: every display role in the
// spec (logo, chips, menu, step names, numbers, wordmark) is set at 700.
const chakra = Chakra_Petch({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-chakra",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.shortName}, ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description:
    "Full-stack engineer building production systems: AI-integrated platforms, " +
    "booking and payments flows, and data pipelines that run unattended.",
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${chakra.variable}`}>
      <body>
        <Header />
        {/* One grid overlay for the whole page, not one per section: the
            column rules run unbroken from the header to the footer's top rule
            (audit A3). The wrapper is the overlay's positioned ancestor and
            ends where the footer begins, so the footer — which the reference
            keeps rule-free — never needs to paint over anything. */}
        <div className="relative">
          <RouteGridOverlay />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}

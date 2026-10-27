import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer, Header } from "@/components/layout";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.shortName} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description:
    "Full-stack engineer building production systems — AI-integrated platforms, " +
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
    <html lang="en" className={inter.variable}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

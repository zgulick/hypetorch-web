import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";
import StructuredData from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HypeTorch - Turn Podcast Conversations into Competitive Intelligence",
  description: "Universal narrative intelligence platform. Turn podcast conversations into competitive intelligence across sports, entertainment, crypto, and business. JORDN, RODMN & PIPN algorithms measure real influence beyond social metrics.",
  keywords: "podcast analysis, narrative intelligence, competitive intelligence, influence measurement, JORDN algorithm, RODMN algorithm, crypto intelligence, sports analytics, entertainment analytics",
  authors: [{ name: "HypeTorch" }],
  creator: "HypeTorch",
  publisher: "HypeTorch",
  metadataBase: new URL('https://hypetorch.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hypetorch.com',
    title: 'HypeTorch - Turn Podcast Conversations into Competitive Intelligence',
    description: 'Universal narrative intelligence platform. Turn podcast conversations into competitive intelligence across sports, entertainment, crypto, and business.',
    siteName: 'HypeTorch',
    images: [
      {
        url: '/hypetorch-logo.svg',
        width: 1200,
        height: 630,
        alt: 'HypeTorch - Athlete Influence Intelligence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HypeTorch - Turn Podcast Conversations into Competitive Intelligence',
    description: 'Universal narrative intelligence platform. Turn podcast conversations into competitive intelligence across industries.',
    images: ['/hypetorch-logo.svg'],
    creator: '@hypetorch',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/hypetorch-logo.svg",
    shortcut: "/favicon.svg",
    apple: "/hypetorch-logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body className={`${geistSans.variable} antialiased`}>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}

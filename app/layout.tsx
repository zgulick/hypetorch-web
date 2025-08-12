import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HypeTorch",
  description: "Advanced analytics for off-court performance",
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
      <body className={`${geistSans.variable} antialiased`}>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}

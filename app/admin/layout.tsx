import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import AdminSidebar from '@/components/admin/AdminSidebar';
import "./admin.css"; // Add this at the top with other imports

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HypeTorch Admin",
  description: "Admin Dashboard for HypeTorch",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className={'flex min-h-screen ${adminStyles.adminContent}'}>
          <AdminSidebar />
          <main className={'flex-1 p-8 overflow-y-auto ${adminStyles.adminContent}'}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
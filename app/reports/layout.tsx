import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Sports Analytics Reports & Dashboards | HypeTorch",
  description: "View comprehensive athlete influence analytics, HYPE scores, and sports marketing intelligence reports. Track athlete performance and marketing ROI with data-driven insights.",
  keywords: "sports analytics reports, athlete performance dashboards, HYPE scores, sports marketing analytics, athlete influence reports",
  openGraph: {
    title: "Sports Analytics Reports & Dashboards | HypeTorch", 
    description: "View comprehensive athlete influence analytics, HYPE scores, and sports marketing intelligence reports.",
    url: "https://hypetorch.com/reports",
  },
  alternates: {
    canonical: '/reports',
  },
}

export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
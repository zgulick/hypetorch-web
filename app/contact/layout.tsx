import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Contact HypeTorch - Sports Marketing Analytics Support",
  description: "Get in touch with HypeTorch for athlete influence analytics, sports marketing intelligence, custom reports, and partnership opportunities. Contact our analytics team today.",
  keywords: "contact hypetorch, sports marketing support, athlete analytics consultation, custom sports reports, partnership inquiries",
  openGraph: {
    title: "Contact HypeTorch - Sports Marketing Analytics Support",
    description: "Get in touch with HypeTorch for athlete influence analytics, sports marketing intelligence, and custom reports.",
    url: "https://hypetorch.com/contact",
  },
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
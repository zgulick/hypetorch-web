import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "About HypeTorch - Athlete Analytics & Sports Intelligence Platform",
  description: "Learn about HypeTorch's mission to revolutionize sports marketing with data-driven athlete influence analytics. Discover our HYPE score algorithm and sports intelligence platform.",
  keywords: "about hypetorch, athlete analytics company, sports intelligence platform, HYPE score algorithm, sports marketing data",
  openGraph: {
    title: "About HypeTorch - Athlete Analytics & Sports Intelligence Platform",
    description: "Learn about HypeTorch's mission to revolutionize sports marketing with data-driven athlete influence analytics.",
    url: "https://hypetorch.com/about",
  },
  alternates: {
    canonical: '/about',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
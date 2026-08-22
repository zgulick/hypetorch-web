import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "About HypeTorch — How It Works and Where the Data Comes From",
  description: "HypeTorch measures who podcasts are actually talking about. Built on public RSS feeds, with a transparent, fully published methodology.",
  keywords: "about hypetorch, podcast analytics, influence measurement, JORDN score, PIPN score, public RSS feeds",
  openGraph: {
    title: "About HypeTorch — How It Works and Where the Data Comes From",
    description: "HypeTorch measures who podcasts are actually talking about. Built on public RSS feeds, transparent methodology.",
    url: "https://hypetorch.com/about",
  },
  // Overridden explicitly: the root layout's twitter description still carries the
  // old "universal narrative intelligence platform" positioning, and openGraph
  // alone does not displace it.
  twitter: {
    title: "About HypeTorch — How It Works and Where the Data Comes From",
    description: "HypeTorch measures who podcasts are actually talking about. Built on public RSS feeds, with a transparent, fully published methodology.",
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

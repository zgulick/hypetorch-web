import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Methodology — How JORDN, PIPN and RODMN Are Calculated",
  description: "Full calculation methodology, data sources, retention policy, and known limitations for HypeTorch's influence metrics.",
  keywords: "hypetorch methodology, JORDN algorithm, PIPN score, RODMN score, podcast analytics methodology, influence measurement",
  openGraph: {
    title: "Methodology — How JORDN, PIPN and RODMN Are Calculated",
    description: "Full calculation methodology, data sources, retention policy, and known limitations for HypeTorch's influence metrics.",
    url: "https://hypetorch.com/methodology",
  },
  alternates: {
    canonical: '/methodology',
  },
}

export default function MethodologyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

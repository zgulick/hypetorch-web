export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "HypeTorch",
    "description": "Data-driven athlete analytics platform for marketing teams. Measure real influence beyond likes and views. Optimize sports marketing ROI with objective influence scores.",
    "url": "https://hypetorch.com",
    "logo": "https://hypetorch.com/hypetorch-logo.svg",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "hypetorch@gmail.com",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://twitter.com/hypetorch"
    ],
    "offers": {
      "@type": "Offer",
      "name": "Sports Analytics & Athlete Intelligence Reports",
      "description": "Comprehensive athlete influence analytics and sports marketing intelligence reports",
      "category": "Sports Analytics Services"
    },
    "service": [
      {
        "@type": "Service",
        "name": "Athlete Influence Analytics",
        "description": "Data-driven measurement of athlete influence and marketing impact beyond traditional social media metrics"
      },
      {
        "@type": "Service", 
        "name": "Sports Marketing Intelligence",
        "description": "Comprehensive analytics platform for optimizing sports marketing ROI and partnership decisions"
      },
      {
        "@type": "Service",
        "name": "Custom Sports Reports",
        "description": "Personalized athlete analytics reports and custom dashboards for marketing teams"
      }
    ],
    "industry": "Sports Technology",
    "keywords": "athlete analytics, sports marketing, influence measurement, athletic partnerships, sports media analytics, endorsement ROI"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
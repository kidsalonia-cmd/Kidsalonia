import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noIndex?: boolean;
}

const BASE_URL = "https://www.kidsalonia.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/image/kidsaloniaNEWbanner.jpeg`;

const SEO = ({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  jsonLd,
  noIndex = false,
}: SEOProps) => {
  const fullTitle = title.includes("KidSalonia") ? title : `${title} | KidSalonia`;
  const canonicalUrl = canonical || BASE_URL;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en-IN" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      <meta name="geo.region" content="IN-HR" />
      <meta name="geo.placename" content="Gurugram" />
      <meta name="geo.position" content="28.5035;77.0386" />
      <meta name="ICBM" content="28.5035, 77.0386" />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={`${fullTitle} - KidSalonia`} />
      <meta property="og:site_name" content="KidSalonia" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;

// Reusable JSON-LD schemas
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  "@id": "https://www.kidsalonia.com/#localbusiness",
  name: "KidSalonia",
  alternateName: "KidSalonia Kids Salon",
  description:
    "A Premium Kids Salon Where Every Little Moment Is Designed With Care — From Gentle Haircuts To Playful Nail Art.",
  url: "https://www.kidsalonia.com",
  telephone: "+918130307036",
  email: "sales@kidsalonia.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ground floor, A-19 JMD Suburbio 2",
    addressLocality: "Gurugram",
    addressRegion: "Haryana",
    addressCountry: "IN",
  },
  areaServed: [
    "Gurugram",
    "Sector 67 Gurugram",
    "Sohna Road",
    "DLF Gurugram",
    "Delhi NCR",
  ],
  geo: {
    "@type": "GeoCoordinates",
    latitude: 28.5035,
    longitude: 77.0386,
  },
  hasMap: "https://maps.google.com/?q=KidSalonia%20JMD%20Suburbio%202%20Gurugram",
  paymentAccepted: ["Cash", "UPI", "Credit Card", "Debit Card"],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Wednesday", "Thursday", "Friday"],
      opens: "11:30",
      closes: "20:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "10:30",
      closes: "21:00",
    },
  ],
  priceRange: "₹₹",
  image: "https://www.kidsalonia.com/image/kidsaloniaNEWbanner.jpeg",
  logo: "https://www.kidsalonia.com/favicon.webp",
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Kids Haircut" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Kids Nail Art" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Kids Skin Care" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Mundan Ceremony" },
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "500",
    bestRating: "5",
  },
  sameAs: [
    "https://www.instagram.com/kidsalonia",
    "https://www.facebook.com/kidsalonia"
  ],
};

export const createBlogPostSchema = (blog: {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  slug: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: blog.title,
  description: blog.excerpt,
  image: blog.image,
  datePublished: new Date(blog.date).toISOString(),
  dateModified: new Date(blog.date).toISOString(),
  author: {
    "@type": "Organization",
    name: blog.author,
    url: "https://www.kidsalonia.com",
  },
  publisher: {
    "@type": "Organization",
    name: "KidSalonia",
    logo: {
      "@type": "ImageObject",
      url: "https://www.kidsalonia.com/image/logo.webp",
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `https://www.kidsalonia.com/insights/${blog.slug}`,
  },
});

export const createFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

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

export const BASE_URL = "https://www.kidsalonia.com";
export const BUSINESS_NAME = "KidSalonia";
export const BUSINESS_PHONE = "+918130307036";
export const BUSINESS_PHONE_ALT = "+919773864949";
export const BUSINESS_ADDRESS =
  "Ground Floor, A-19 JMD Suburbio 2, Gurugram, Haryana 122101";

const DEFAULT_OG_IMAGE = `${BASE_URL}/image/kidsaloniaNEWbanner.jpeg`;
const LOCAL_BUSINESS_ID = `${BASE_URL}/#localbusiness`;
const ORGANIZATION_ID = `${BASE_URL}/#organization`;

const coreServiceNames = [
  "Kids Haircut",
  "Baby First Haircut",
  "Mundan Ceremony",
  "Children's Hair Styling",
  "Nail Art",
  "Nail Extensions",
  "Manicure",
  "Pedicure",
  "Birthday Grooming",
  "Family Salon Services",
];

const serviceAreaNames = [
  "Gurugram",
  "Gurgaon",
  "Sohna Road",
  "Golf Course Extension Road",
  "New Gurgaon",
  "DLF Gurugram",
  "Manesar",
  "Sohna",
  "Faridabad",
  "South Delhi",
  "Dwarka",
  "Noida",
  "Greater Noida",
  "Ghaziabad",
  "Delhi NCR",
];

const SEO = ({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  jsonLd,
  noIndex = false,
}: SEOProps) => {
  const fullTitle = title.includes(BUSINESS_NAME)
    ? title
    : `${title} | ${BUSINESS_NAME}`;

  const canonicalUrl = canonical || `${BASE_URL}/`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en-IN" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      <meta
        name="robots"
        content={
          noIndex
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }
      />
      <meta
        name="googlebot"
        content={
          noIndex
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }
      />

      <meta name="geo.region" content="IN-HR" />
      <meta name="geo.placename" content="Gurugram" />
      <meta name="geo.position" content="28.5035;77.0386" />
      <meta name="ICBM" content="28.5035, 77.0386" />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={`${fullTitle} - KidSalonia`} />
      <meta property="og:site_name" content={BUSINESS_NAME} />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: BUSINESS_NAME,
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    "@id": `${BASE_URL}/#logo`,
    url: `${BASE_URL}/favicon.webp`,
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: BUSINESS_PHONE,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    {
      "@type": "ContactPoint",
      telephone: BUSINESS_PHONE_ALT,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
  ],
  sameAs: [
    "https://www.instagram.com/kidsalonia",
    "https://www.facebook.com/kidsalonia",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: BUSINESS_NAME,
  url: BASE_URL,
  publisher: { "@id": ORGANIZATION_ID },
  inLanguage: "en-IN",
};

const structuredServiceAreas = serviceAreaNames.map((name) => ({
  "@type": name === "Delhi NCR" ? "AdministrativeArea" : "Place",
  name,
}));

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["HairSalon", "BeautySalon", "NailSalon", "LocalBusiness"],
  "@id": LOCAL_BUSINESS_ID,
  name: BUSINESS_NAME,
  alternateName: "KidSalonia Kids Salon & Nail Studio",
  description:
    "KidSalonia is a child-friendly kids salon, hairdresser, nail art studio, manicure and pedicure destination in Gurugram for kids, families and moms.",
  url: BASE_URL,
  telephone: BUSINESS_PHONE,
  email: "sales@kidsalonia.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ground Floor, A-19 JMD Suburbio 2",
    addressLocality: "Gurugram",
    addressRegion: "Haryana",
    postalCode: "122101",
    addressCountry: "IN",
  },
  areaServed: structuredServiceAreas,
  geo: {
    "@type": "GeoCoordinates",
    latitude: 28.5035,
    longitude: 77.0386,
  },
  hasMap:
    "https://maps.google.com/?q=KidSalonia%20A-19%20JMD%20Suburbio%202%20Gurugram",
  paymentAccepted: ["Cash", "UPI", "Credit Card", "Debit Card"],
  currenciesAccepted: "INR",
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
  image: {
    "@type": "ImageObject",
    "@id": `${BASE_URL}/#primaryimage`,
    url: DEFAULT_OG_IMAGE,
  },
  logo: { "@id": `${BASE_URL}/#logo` },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: BUSINESS_PHONE,
      contactType: "booking and customer support",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    {
      "@type": "ContactPoint",
      telephone: BUSINESS_PHONE_ALT,
      contactType: "booking and customer support",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
  ],
  knowsAbout: [
    "Kids haircuts",
    "Baby first haircuts",
    "Toddler haircuts",
    "Mundan ceremonies",
    "Children's hair styling",
    "Kids nail art",
    "Nail extensions",
    "Manicure",
    "Pedicure",
    "Child-friendly salon experiences",
    "Salon hygiene for children",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    "@id": `${BASE_URL}/#service-catalog`,
    name: "KidSalonia Services",
    itemListElement: coreServiceNames.map((name) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name,
        provider: { "@id": LOCAL_BUSINESS_ID },
      },
    })),
  },
  makesOffer: coreServiceNames.map((name) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name,
      provider: { "@id": LOCAL_BUSINESS_ID },
      areaServed: structuredServiceAreas,
    },
  })),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "69",
    bestRating: "5",
  },
  parentOrganization: { "@id": ORGANIZATION_ID },
  sameAs: organizationSchema.sameAs,
};

export const createBreadcrumbSchema = (
  items: { name: string; url: string }[]
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

const getAreaServedType = (locationName: string) => {
  if (/Delhi NCR/i.test(locationName)) return "AdministrativeArea";
  if (/^(Gurgaon|Gurugram|Sohna|Manesar|Faridabad|Noida|Ghaziabad)/i.test(locationName)) {
    return "City";
  }
  return "Place";
};

const extractLocationFromServiceName = (serviceName: string) => {
  const location = serviceName.split(/\sin\s/i).pop()?.trim();
  return location || "Gurugram";
};

export const createServiceSchema = ({
  name,
  description,
  url,
  serviceType = name,
  areaServedName,
}: {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
  areaServedName?: string;
}) => {
  const locationName = areaServedName || extractLocationFromServiceName(name);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    serviceType,
    description,
    url,
    provider: { "@id": LOCAL_BUSINESS_ID },
    areaServed: {
      "@type": getAreaServedType(locationName),
      name: locationName,
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: url,
      servicePhone: BUSINESS_PHONE,
      serviceLocation: { "@id": LOCAL_BUSINESS_ID },
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url,
      seller: { "@id": LOCAL_BUSINESS_ID },
    },
    mainEntityOfPage: { "@id": url },
  };
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
    url: BASE_URL,
  },
  publisher: { "@id": ORGANIZATION_ID },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${BASE_URL}/insights/${blog.slug}`,
  },
});

export const createFAQSchema = (
  faqs: { question: string; answer: string }[]
) => ({
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
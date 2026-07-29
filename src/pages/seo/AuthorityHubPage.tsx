import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialSidebar from "@/components/SocialSidebar";
import SEO, {
  BASE_URL,
  createBreadcrumbSchema,
  createFAQSchema,
  localBusinessSchema,
  organizationSchema,
  websiteSchema,
} from "@/components/SEO";
import { seoServices } from "@/data/services";

const PHONE = "+918130307036";

const locationLinks = [
  { label: "Gurgaon", to: "/kids-haircut-gurgaon" },
  { label: "Sector 67, Gurugram", to: "/kids-salon-sector-67-gurugram" },
  { label: "Sohna Road", to: "/kids-salon-near-sohna-road-gurugram" },
  { label: "DLF Gurugram", to: "/kids-salon-near-dlf-gurugram" },
  { label: "New Gurgaon", to: "/locations/kids-salon-new-gurgaon" },
  { label: "Faridabad", to: "/locations/kids-salon-faridabad" },
  { label: "South Delhi", to: "/locations/kids-salon-south-delhi" },
  { label: "Dwarka", to: "/locations/kids-salon-dwarka" },
  { label: "Noida", to: "/locations/kids-salon-noida" },
  { label: "Greater Noida West", to: "/locations/kids-salon-greater-noida-west" },
  { label: "Ghaziabad", to: "/locations/kids-salon-ghaziabad" },
  { label: "Delhi NCR", to: "/locations/kids-salon-delhi-ncr" },
];

const hubLinks = [
  { slug: "hair-services", label: "Kids Hair Services" },
  { slug: "kids-haircut", label: "Kids Haircut Guide" },
  { slug: "baby-first-haircut", label: "Baby First Haircut" },
  { slug: "mundan", label: "Mundan Guide" },
  { slug: "kids-nail-care", label: "Kids Nail Care" },
];

type ContentSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

type HubConfig = {
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  categories: string[];
  serviceSlugs?: string[];
  topics: { title: string; text: string }[];
  sections: ContentSection[];
  faqs: { question: string; answer: string }[];
};

const hubConfigs: Record<string, HubConfig> = {
  "hair-services": {
    title: "Kids Hair Services in Gurgaon",
    description:
      "Explore child-friendly haircuts, styling and grooming services at KidSalonia Gurgaon for babies, toddlers, boys and girls.",
    eyebrow: "Hair services hub",
    intro:
      "KidSalonia provides age-appropriate haircuts and styling in a colourful, child-focused salon environment. This guide helps parents compare services, prepare children for an appointment and choose the right option for everyday grooming or special occasions.",
    categories: ["kids-salon", "hairdresser"],
    topics: [
      { title: "Choose by age", text: "Match the service to your child's age, confidence level, hair texture and ability to sit comfortably." },
      { title: "Plan for comfort", text: "Choose a rested time of day and bring a familiar toy, snack or reference photo when useful." },
      { title: "Think about maintenance", text: "Select a haircut that works with school routines, sports, weather and the time available for daily styling." },
      { title: "Book event styling early", text: "Birthday, festival and party appointments are easier to plan when the desired look is discussed in advance." },
    ],
    sections: [
      {
        heading: "A complete children's hair service guide",
        paragraphs: [
          "Children need a different salon approach from adults. The haircut itself matters, but patience, communication, gentle handling and a welcoming setting often determine whether the visit feels positive. Parents can help by explaining the child's routine, sensitivities and preferred result before the service begins.",
          "KidSalonia's hair services cover first haircuts, toddler trims, boys and girls haircuts, everyday grooming and styling for special occasions. Each service page provides more detail and connects to location-specific pages across Gurgaon and nearby NCR communities.",
        ],
      },
      {
        heading: "How to choose the right service",
        paragraphs: [
          "For babies and toddlers, comfort and speed are usually the priority. For school-age children, the best haircut is often one that looks neat while remaining easy to wash, brush and manage. For parties and celebrations, parents may prefer temporary styling that suits the outfit and event schedule.",
        ],
        bullets: [
          "Baby first haircut for an important family milestone",
          "Toddler haircut with a calm, patient approach",
          "Boys and girls haircuts for school and everyday grooming",
          "Kids hair styling for birthdays, festivals and functions",
        ],
      },
      {
        heading: "Preparing a nervous child",
        paragraphs: [
          "Avoid presenting the haircut as a test the child must pass. Use simple language, explain that the stylist will trim the hair, and let the child know that a parent will remain nearby. A familiar object or favourite video may help younger children settle.",
          "If a child has sensory sensitivities, dislikes the sound of clippers or has had a difficult haircut before, share that information while booking. It helps the team plan the appointment and discuss realistic options with the parent.",
        ],
      },
      {
        heading: "Hair care between appointments",
        paragraphs: [
          "A suitable home routine helps the haircut stay manageable. Use gentle detangling, avoid pulling through knots, and choose products appropriate for the child's scalp and hair type. Regular trims can reduce split ends and keep fringes or shaped cuts comfortable around the eyes and ears.",
        ],
      },
    ],
    faqs: [
      { question: "Which children's hair services does KidSalonia offer?", answer: "Services include kids haircuts, baby first haircuts, toddler haircuts, boys and girls haircuts, styling and selected family salon services." },
      { question: "Do I need an appointment?", answer: "Advance booking is recommended so the team can confirm the preferred service, stylist availability and expected duration." },
      { question: "Can parents request a particular style?", answer: "Yes. Bring a reference image and discuss whether the style suits the child's hair texture, length, routine and maintenance preference." },
      { question: "What should I share before the service?", answer: "Tell the team about sensitivities, previous haircut experiences, preferred tools and the result you want before the service begins." },
    ],
  },
  "kids-haircut": {
    title: "Kids Haircut Guide for Gurgaon Parents",
    description:
      "A practical kids haircut guide covering babies, toddlers, boys, girls, preparation, styles and booking at KidSalonia Gurgaon.",
    eyebrow: "Kids haircut hub",
    intro:
      "A successful children's haircut combines patience, hygiene, clear communication and a style that suits the child's age, hair texture and daily routine. Use this guide to prepare for the appointment and explore relevant services and locations.",
    categories: ["kids-salon"],
    serviceSlugs: ["kids-haircut-gurgaon", "baby-first-haircut", "toddler-haircut", "boys-haircut", "girls-haircut", "kids-hair-styling"],
    topics: [
      { title: "Before the visit", text: "Choose a calm time, explain the appointment simply and bring a reference photo when you have a specific look in mind." },
      { title: "During the haircut", text: "Stay reassuring, allow the stylist to work patiently and avoid adding pressure if the child needs a short pause." },
      { title: "Choosing a style", text: "Consider hair texture, face shape, school rules, weather and how much daily maintenance is realistic." },
      { title: "After the haircut", text: "Follow gentle washing, brushing and styling habits so the new cut remains comfortable and easy to manage." },
    ],
    sections: [
      {
        heading: "What makes a good kids haircut experience?",
        paragraphs: [
          "A children's haircut should be planned around the child rather than treated like a smaller version of an adult appointment. Young children may need extra explanation, a slower introduction to tools and reassurance from a parent. Clear communication at the beginning helps the stylist understand the desired length and finish.",
          "Parents should also think beyond the photograph of a haircut. The most practical style is one that works with the child's natural hair, school schedule, activity level and willingness to sit for brushing or styling at home.",
        ],
      },
      {
        heading: "Haircut ideas by age",
        paragraphs: [
          "Babies often need only a light tidy-up around the eyes, ears or neckline. Toddlers benefit from simple cuts that can be completed efficiently. School-age children may want more involvement in choosing the style, which can make the appointment easier and improve confidence in the final result.",
        ],
        bullets: [
          "Soft, minimal trims for babies",
          "Easy-maintenance shapes for active toddlers",
          "Neat school-ready cuts for boys",
          "Trims, fringes and layers for girls",
          "Event styling for birthdays and celebrations",
        ],
      },
      {
        heading: "Helping children who dislike haircuts",
        paragraphs: [
          "Some children dislike capes, water spray, hair falling on the skin or the sound of clippers. Mention these concerns while booking. A parent can also practise simple steps at home, such as sitting in a chair, touching the hair gently and hearing a low-volume clipper sound from a distance.",
          "If the child becomes upset, remaining calm is usually more helpful than repeatedly asking the child to stop crying. A short pause, distraction or simplified haircut may be more appropriate than forcing a detailed style in one visit.",
        ],
      },
      {
        heading: "How often should children get a haircut?",
        paragraphs: [
          "There is no fixed schedule for every child. Short shaped cuts may need more frequent maintenance, while longer styles can often go longer between trims. Parents can book when hair begins covering the eyes, tangling more easily or losing the intended shape.",
        ],
      },
    ],
    faqs: [
      { question: "What should parents bring for a child's haircut?", answer: "Bring any reference photo, comfort item and information about the child's usual hair routine. Parents should also share any sensitivities before the service begins." },
      { question: "Can the stylist recommend a haircut?", answer: "Yes. The team can suggest age-appropriate options based on hair texture, face shape, school requirements and maintenance preference." },
      { question: "What if my child cries during the haircut?", answer: "Crying is common, especially during early visits. Stay close, remain calm and allow the team to adjust the pace or simplify the service when needed." },
      { question: "Should hair be washed before the appointment?", answer: "Clean, detangled hair can make consultation easier. Ask the team while booking if your selected service includes washing or requires any preparation." },
    ],
  },
  "baby-first-haircut": {
    title: "Baby First Haircut Guide for Gurgaon Parents",
    description:
      "Prepare for your baby's first haircut with practical timing, comfort, hygiene, appointment and aftercare guidance from KidSalonia Gurgaon.",
    eyebrow: "Baby haircut hub",
    intro:
      "A baby's first haircut is an important family milestone. A calm appointment, gentle handling and realistic expectations can make the experience more comfortable for both baby and parents.",
    categories: ["kids-salon"],
    serviceSlugs: ["baby-first-haircut", "toddler-haircut", "kids-haircut-gurgaon"],
    topics: [
      { title: "Choose the right time", text: "Book when your baby is usually rested, fed and most comfortable rather than close to a nap or meal." },
      { title: "Bring familiar comfort", text: "A favourite toy, snack, blanket or video can help the salon environment feel less unfamiliar." },
      { title: "Agree on the trim", text: "Discuss exactly how much hair should be removed and whether you want to preserve a small lock as a keepsake." },
      { title: "Keep aftercare simple", text: "Use gentle scalp care, avoid harsh products and watch for any temporary sensitivity after the appointment." },
    ],
    sections: [
      {
        heading: "When should a baby have the first haircut?",
        paragraphs: [
          "There is no universal age for a baby's first haircut. Some babies develop thick hair early, while others need no trim for much longer. Parents commonly consider a first haircut when hair repeatedly falls into the eyes, becomes difficult to manage, grows unevenly or feels uncomfortable around the ears and neck.",
          "Family tradition and personal preference can also influence timing. The most useful question is not whether the baby has reached a specific age, but whether a small trim would improve comfort or make the hair easier to care for.",
        ],
      },
      {
        heading: "How to prepare your baby",
        paragraphs: [
          "Choose an appointment time that matches the baby's normal routine. A rested and recently fed baby is often more settled than one who is tired or hungry. Avoid making major changes to the routine on the same day when possible.",
          "Bring one or two familiar comfort items rather than too many distractions. Parents can also show the baby a comb at home and gently touch the hair before the visit so the sensation feels less new.",
        ],
        bullets: [
          "Book away from usual nap and meal times",
          "Bring a favourite toy, snack or comfort blanket",
          "Carry a change of clothes in case loose hair causes irritation",
          "Save a reference photo if you want a particular result",
          "Tell the team about skin, scalp or sensory concerns",
        ],
      },
      {
        heading: "What to expect during the appointment",
        paragraphs: [
          "The first appointment is usually focused on a neat, comfortable result rather than a complicated style. The stylist may begin by letting the baby become familiar with the chair, cape, comb or spray. A parent can stay close and help with reassurance and distraction.",
          "Babies may move, cry or need a pause. This does not mean the appointment has failed. The safest plan is often to work patiently, prioritise essential trimming and avoid forcing unnecessary detail when the baby has reached their limit.",
        ],
      },
      {
        heading: "Choosing the first haircut style",
        paragraphs: [
          "For many babies, a light trim around the fringe, ears and neckline is enough. The natural direction of growth, curls and fine baby hair should guide the shape. Parents should explain whether they want to keep the hair long, even out uneven growth or create a shorter easy-care style.",
          "A photograph can help communicate the idea, but the final result should be adapted to the baby's existing length and texture. Ask how the cut will grow out and what simple care will be needed at home.",
        ],
      },
      {
        heading: "Baby haircut hygiene and safety",
        paragraphs: [
          "Parents should feel comfortable asking about clean tools, fresh coverings and the method planned for the service. Any known scalp sensitivity, skin condition, recent irritation or medical concern should be shared before the haircut starts.",
          "A haircut is a grooming service, not medical treatment. Persistent scalp redness, sores, unusual hair loss or other health concerns should be discussed with an appropriate healthcare professional rather than managed through a salon appointment.",
        ],
      },
      {
        heading: "Aftercare following the first haircut",
        paragraphs: [
          "Loose trimmed hair can feel itchy, so change the baby's clothing and gently clean the neck and skin after the appointment. Follow the baby's normal mild washing routine unless the team advises waiting for a short period. Avoid introducing a new strong product immediately after the haircut.",
          "Check the scalp for temporary irritation and use gentle brushing. The next trim can be scheduled according to growth and comfort; there is no need to follow a fixed calendar if the hair remains manageable.",
        ],
      },
      {
        heading: "Making the milestone memorable",
        paragraphs: [
          "Some parents take before-and-after photographs or preserve a small lock of hair. Mention this before the service so it can be planned neatly. Keep expectations flexible: a calm family memory is more important than achieving a highly detailed hairstyle during a baby's first visit.",
        ],
      },
    ],
    faqs: [
      { question: "What is the best age for a baby's first haircut?", answer: "There is no required age. Choose a time based on hair growth, comfort, family preference and whether the hair is becoming difficult to manage." },
      { question: "Can a parent stay close during the haircut?", answer: "Yes. Parents can remain with their baby and help provide reassurance during the service." },
      { question: "What if my baby cries?", answer: "Crying is common in a new environment. The team can slow down, use distraction, take a short pause or focus only on the essential trim." },
      { question: "How long does a first haircut take?", answer: "Timing varies with the baby's comfort, movement, hair and chosen trim. Ask for an estimated duration when booking and keep the schedule flexible." },
      { question: "Can I keep a lock of hair?", answer: "Yes. Tell the team before the haircut so a suitable lock can be collected cleanly as a keepsake." },
      { question: "What should my baby wear?", answer: "Choose comfortable clothing and bring a change of clothes. Loose hair can sometimes remain around the neck even when a cape is used." },
      { question: "Should I wash my baby's hair before or after?", answer: "Follow the baby's usual gentle routine and ask the salon whether any preparation is needed. Avoid harsh or unfamiliar products around the appointment." },
    ],
  },
  mundan: {
    title: "Mundan Ceremony and Baby Head Shave Guide",
    description:
      "Plan a hygienic and comfortable mundan or baby head shave appointment at KidSalonia Gurgaon with preparation, service and aftercare guidance.",
    eyebrow: "Mundan hub",
    intro:
      "Mundan is an important family tradition. This guide explains how to prepare for a salon-based head shave, what to discuss before the appointment and how to care for the scalp afterwards.",
    categories: ["mundan"],
    topics: [
      { title: "Book adequate time", text: "Advance booking allows the team to discuss the child's age, comfort, expected duration and family requirements." },
      { title: "Confirm hygiene", text: "Ask about clean tools, fresh coverings and how the service will be performed before the appointment begins." },
      { title: "Support the child", text: "Choose a rested time and keep a parent nearby with familiar comfort items and calm reassurance." },
      { title: "Plan scalp care", text: "Discuss gentle cleaning, sun protection and what to avoid immediately after the head shave." },
    ],
    sections: [
      {
        heading: "Planning a salon-based mundan",
        paragraphs: [
          "Families observe mundan in different ways, so the salon should understand whether the appointment is only for the head shave or part of a larger ceremony. Explain the child's age, hair length, previous grooming experience and any timing requirements when booking.",
          "Allow enough time before and after the appointment. Avoid rushing directly into travel, photographs or a crowded event if the child may need feeding, rest or comfort after the service.",
        ],
      },
      {
        heading: "Preparation before the appointment",
        paragraphs: [
          "Choose a time when the baby or child is usually calm. Bring familiar items, spare clothing and anything required for the family's ceremony. Share information about scalp irritation, birthmarks, sensitive areas or medical concerns before the service starts.",
        ],
        bullets: [
          "Confirm the appointment and expected duration",
          "Discuss the planned shaving method and tools",
          "Bring a comfort item and spare clothes",
          "Tell the team about scalp sensitivity or skin concerns",
          "Plan a quiet period after the service",
        ],
      },
      {
        heading: "During the mundan service",
        paragraphs: [
          "A parent should remain available to reassure and help position the child safely. Movement and crying can occur, especially with younger children. The service should proceed patiently, with pauses when needed and safety taking priority over speed.",
          "Ask in advance if the family wants to collect the hair for ceremonial reasons. Clear communication prevents confusion once the service has begun.",
        ],
      },
      {
        heading: "Scalp care after mundan",
        paragraphs: [
          "The freshly shaved scalp may feel sensitive. Use gentle cleaning and avoid strongly fragranced or unfamiliar products. Protect the scalp from intense sun and friction, and follow any practical aftercare discussed during the appointment.",
          "Minor temporary sensitivity may occur, but persistent redness, cuts, swelling or other health concerns should be assessed by a healthcare professional.",
        ],
      },
    ],
    faqs: [
      { question: "Is advance booking required for mundan?", answer: "Advance booking is strongly recommended so the team can allocate sufficient time and explain preparation before the family travels." },
      { question: "What should parents ask before the service?", answer: "Confirm appointment timing, expected duration, hygiene practices, the planned method and aftercare recommendations relevant to the child." },
      { question: "Can the family collect the shaved hair?", answer: "Discuss this requirement while booking and again before the service begins so the team can prepare appropriately." },
      { question: "What should the child wear?", answer: "Choose comfortable clothing and bring a spare set because small cut hairs can remain on fabric and cause itching." },
      { question: "How should the scalp be protected afterwards?", answer: "Use gentle care, reduce friction and protect the scalp from strong sun. Seek medical advice for persistent irritation or injury." },
    ],
  },
  "kids-nail-care": {
    title: "Kids Nail Care and Nail Art Guide",
    description:
      "Explore kids nail art, manicure and pedicure services with age-appropriate design, hygiene and booking guidance from KidSalonia Gurgaon.",
    eyebrow: "Nail care hub",
    intro:
      "Children's nail services should focus on hygiene, comfort and age-appropriate styling. This guide connects parents with nail art, manicure and pedicure options for everyday grooming, birthdays and celebrations.",
    categories: ["nail-art", "manicure", "pedicure"],
    topics: [
      { title: "Keep designs age-appropriate", text: "Simple patterns, small accents and event-themed ideas are often easier and more comfortable for children." },
      { title: "Prioritise hygiene", text: "Ask about clean tools, preparation steps and the products planned for the child's service." },
      { title: "Match the occasion", text: "Discuss colours and designs before birthdays, festivals, school functions or family celebrations." },
      { title: "Protect nail health", text: "Avoid aggressive filing, cutting or removal and follow gentle home-care advice after the appointment." },
    ],
    sections: [
      {
        heading: "What children's nail care should focus on",
        paragraphs: [
          "Kids nail services should be gentle and simple. The aim is neat grooming or fun styling without aggressive treatment of the nail or surrounding skin. Parents should tell the team about sensitivities, nail biting, damaged nails or previous reactions before products are applied.",
          "The child's age, patience and reason for the appointment should guide the service. A short, simple design may be more enjoyable than a complicated look that requires the child to remain still for too long.",
        ],
      },
      {
        heading: "Nail art for birthdays and celebrations",
        paragraphs: [
          "Birthday and festival nail art can use simple themes, dots, stars, flowers, colour accents or designs coordinated with an outfit. Share inspiration before the appointment so the team can discuss what is practical for the child's nail size and available time.",
        ],
        bullets: [
          "Birthday-themed colours and accents",
          "Simple festival nail designs",
          "Party looks coordinated with clothing",
          "Minimal designs for shorter appointments",
        ],
      },
      {
        heading: "Kids manicure and pedicure guidance",
        paragraphs: [
          "A children's manicure or pedicure should prioritise cleaning, gentle shaping and comfort. Avoid treating a child's service as an adult cosmetic procedure. Parents can ask what steps are included and which products will be used before booking.",
          "Children with cuts, infection, swelling, painful nails or persistent skin problems should receive appropriate medical advice rather than a cosmetic nail service.",
        ],
      },
      {
        heading: "Aftercare at home",
        paragraphs: [
          "Encourage gentle hand washing, avoid picking at nail art and use age-appropriate removal methods. Do not scrape or peel products from the nail surface. Keep nails clean and monitor for irritation after trying a new product.",
        ],
      },
    ],
    faqs: [
      { question: "Do you offer nail art for birthdays?", answer: "Yes. Families can discuss simple, age-appropriate nail art options for birthdays, parties and celebrations." },
      { question: "Should nail services be booked in advance?", answer: "Booking is recommended, especially for multiple services or appointments before an event." },
      { question: "Can parents choose the design?", answer: "Yes. Bring an inspiration image and discuss what is suitable for the child's age, nail size and appointment time." },
      { question: "What if the child has damaged or irritated nails?", answer: "Avoid cosmetic services on painful, infected or significantly damaged nails and seek advice from an appropriate healthcare professional." },
      { question: "How should nail art be removed?", answer: "Use the gentle removal method recommended for the product and avoid peeling or scraping it from the nail." },
    ],
  },
};

const getServicePath = (slug: string) => `/${slug.endsWith("-gurgaon") ? slug : `${slug}-gurgaon`}`;

const AuthorityHubPage = () => {
  const { hubSlug = "" } = useParams();
  const config = hubConfigs[hubSlug];

  if (!config) {
    return (
      <div className="min-h-screen bg-background">
        <SEO title="Guide Not Found" description="The requested KidSalonia guide could not be found." canonical={`${BASE_URL}/guides/hair-services`} noIndex />
        <Header />
        <main className="container mx-auto max-w-4xl px-4 py-24 text-center">
          <h1 className="text-4xl font-bold">Guide not found</h1>
          <Link to="/guides/hair-services" className="mt-8 inline-flex rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground">Explore our guides</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const services = seoServices.filter((service) =>
    config.serviceSlugs
      ? config.serviceSlugs.includes(service.slug)
      : config.categories.includes(service.category)
  );
  const canonical = `${BASE_URL}/guides/${hubSlug}`;
  const breadcrumb = createBreadcrumbSchema([
    { name: "Home", url: `${BASE_URL}/` },
    { name: "Guides", url: `${BASE_URL}/guides/hair-services` },
    { name: config.title, url: canonical },
  ]);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: config.title,
    description: config.description,
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#localbusiness` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: service.serviceName,
        url: `${BASE_URL}${getServicePath(service.slug)}`,
      })),
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={config.title}
        description={config.description}
        canonical={canonical}
        jsonLd={[organizationSchema, websiteSchema, localBusinessSchema, collectionSchema, createFAQSchema(config.faqs), breadcrumb]}
      />
      <Header />
      <SocialSidebar />

      <main>
        <section className="bg-gradient-to-br from-pink-50 via-white to-orange-50 py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">{config.eyebrow}</p>
            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">{config.title}</h1>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground md:text-xl">{config.intro}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={`tel:${PHONE}`} className="rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground">Call 81303 07036</a>
              <Link to="/contact-us" className="rounded-full border bg-background px-7 py-3 font-semibold">Book an appointment</Link>
            </div>
          </div>
        </section>

        <nav aria-label="Guide topics" className="border-y bg-background">
          <div className="container mx-auto flex max-w-6xl gap-3 overflow-x-auto px-4 py-4">
            {hubLinks.map((hub) => (
              <Link key={hub.slug} to={`/guides/${hub.slug}`} className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold ${hub.slug === hubSlug ? "bg-primary text-primary-foreground" : "hover:border-primary"}`}>
                {hub.label}
              </Link>
            ))}
          </div>
        </nav>

        <section className="py-14 md:py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-bold">What parents should consider</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {config.topics.map((topic) => (
                <article key={topic.title} className="rounded-2xl border bg-card p-6 shadow-sm">
                  <h3 className="text-xl font-semibold">{topic.title}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{topic.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/30 py-14 md:py-20">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="space-y-12">
              {config.sections.map((section) => (
                <article key={section.heading}>
                  <h2 className="text-3xl font-bold">{section.heading}</h2>
                  <div className="mt-5 space-y-4 text-lg leading-8 text-muted-foreground">
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                  {section.bullets && (
                    <ul className="mt-5 grid gap-3 md:grid-cols-2">
                      {section.bullets.map((bullet) => <li key={bullet} className="rounded-xl border bg-background p-4 font-medium">{bullet}</li>)}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-bold">Explore related services</h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">Open a service page for detailed benefits, FAQs and links to Gurgaon sectors, townships and nearby communities.</p>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Link key={service.slug} to={getServicePath(service.slug)} className="rounded-2xl border bg-background p-6 transition hover:border-primary hover:shadow-md">
                  <p className="text-sm font-semibold capitalize text-primary">{service.category.replace(/-/g, " ")}</p>
                  <h3 className="mt-2 text-xl font-bold">{service.serviceName}</h3>
                  <p className="mt-3 line-clamp-3 leading-7 text-muted-foreground">{service.intro}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/40 py-14 md:py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-bold">Find KidSalonia services near you</h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">Explore local pages for Gurgaon sectors, major townships and nearby Delhi NCR communities.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {locationLinks.map((location) => (
                <Link key={location.to} to={location.to} className="rounded-full border bg-background px-5 py-3 font-semibold transition hover:border-primary hover:text-primary">{location.label}</Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="container mx-auto max-w-5xl px-4">
            <h2 className="text-3xl font-bold">Frequently asked questions</h2>
            <div className="mt-8 space-y-4">
              {config.faqs.map((faq) => (
                <details key={faq.question} className="rounded-2xl border bg-card p-5">
                  <summary className="cursor-pointer list-none font-semibold">{faq.question}</summary>
                  <p className="mt-4 leading-7 text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary py-14 text-primary-foreground">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl font-bold">Plan your KidSalonia appointment</h2>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/85">Call ahead to confirm the service, appointment duration and preferred timing before travelling.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href={`tel:${PHONE}`} className="inline-flex rounded-full bg-background px-7 py-3 font-bold text-foreground">Call 81303 07036</a>
              <Link to="/contact-us" className="inline-flex rounded-full border border-primary-foreground/40 px-7 py-3 font-bold">Contact KidSalonia</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AuthorityHubPage;

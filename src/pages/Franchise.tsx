import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  ClipboardCheck,
  GraduationCap,
  Handshake,
  Heart,
  IndianRupee,
  MapPin,
  Megaphone,
  Phone,
  Scissors,
  ShieldCheck,
  Sparkles,
  Store,
  TrendingUp,
  Users,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialSidebar from "@/components/SocialSidebar";
import SEO, {
  BASE_URL,
  createBreadcrumbSchema,
  createFAQSchema,
  organizationSchema,
  websiteSchema,
} from "@/components/SEO";

const franchiseFAQs = [
  {
    question: "Who can become a Kidsalonia franchise partner?",
    answer:
      "Entrepreneurs, salon professionals, investors, parents, and business owners who are passionate about creating a premium grooming experience for children can apply for a Kidsalonia franchise.",
  },
  {
    question: "How much space is required for a Kidsalonia franchise?",
    answer:
      "The ideal space depends on the chosen format and location. A standard Kidsalonia outlet generally requires approximately 700 to 1,500 square feet in a family-friendly commercial area.",
  },
  {
    question: "What investment is required?",
    answer:
      "The total investment depends on the outlet size, city, property condition, interiors, equipment, and selected franchise format. Our franchise team provides a detailed commercial proposal after evaluating your location and business goals.",
  },
  {
    question: "Does Kidsalonia provide staff training?",
    answer:
      "Yes. We provide operational guidance, service training, customer experience standards, product knowledge, hygiene protocols, and ongoing support for the franchise team.",
  },
  {
    question: "Will Kidsalonia help with marketing?",
    answer:
      "Yes. Franchise partners receive brand guidelines, launch support, digital marketing guidance, promotional creatives, campaign ideas, and local marketing recommendations.",
  },
  {
    question: "Can I open a Kidsalonia franchise outside Gurugram?",
    answer:
      "Yes. We welcome franchise enquiries from Delhi NCR and other high-potential cities across India, subject to location feasibility and territory availability.",
  },
];

const benefits = [
  {
    icon: Award,
    title: "Distinctive Kids-First Brand",
    description:
      "Build a business around a specialised salon experience created exclusively for children and families.",
  },
  {
    icon: TrendingUp,
    title: "Growing Market Opportunity",
    description:
      "Serve modern parents looking for safe, premium, convenient, and child-friendly grooming services.",
  },
  {
    icon: GraduationCap,
    title: "Training and Support",
    description:
      "Receive support for service standards, team training, operations, hygiene, and customer experience.",
  },
  {
    icon: Megaphone,
    title: "Marketing Assistance",
    description:
      "Get launch guidance, brand creatives, digital marketing support, and local promotion strategies.",
  },
  {
    icon: Store,
    title: "Outlet Setup Guidance",
    description:
      "Benefit from recommendations for layout, interiors, equipment, branding, and customer flow.",
  },
  {
    icon: Handshake,
    title: "Long-Term Partnership",
    description:
      "Work with a brand focused on sustainable growth, quality service, and strong partner relationships.",
  },
];

const supportItems = [
  "Location evaluation and market assessment",
  "Outlet layout and interior design guidance",
  "Brand identity and signage standards",
  "Equipment and product recommendations",
  "Recruitment and staff training guidance",
  "Standard operating procedures",
  "Service menu and pricing recommendations",
  "Launch marketing and promotional support",
  "Digital marketing and local SEO guidance",
  "Ongoing operational reviews and support",
];

const processSteps = [
  {
    number: "01",
    title: "Submit Your Enquiry",
    description:
      "Share your contact details, preferred city, location, and investment expectations.",
  },
  {
    number: "02",
    title: "Business Discussion",
    description:
      "Our team connects with you to understand your background, goals, and preferred franchise format.",
  },
  {
    number: "03",
    title: "Location Evaluation",
    description:
      "We assess the proposed property, surrounding market, accessibility, and family catchment area.",
  },
  {
    number: "04",
    title: "Commercial Proposal",
    description:
      "You receive the proposed business model, estimated setup requirements, and partnership terms.",
  },
  {
    number: "05",
    title: "Agreement and Setup",
    description:
      "After approval, the franchise agreement is completed and outlet development begins.",
  },
  {
    number: "06",
    title: "Training and Launch",
    description:
      "Your team is trained, the outlet is prepared, and launch marketing activities are activated.",
  },
];

const locationOptions = [
  "Gurugram",
  "Manesar",
  "Sohna",
  "Faridabad",
  "Delhi",
  "Noida",
  "Greater Noida",
  "Ghaziabad",
  "Other city",
];

const investmentOptions = [
  "Below ₹25 lakh",
  "₹25 lakh – ₹40 lakh",
  "₹40 lakh – ₹60 lakh",
  "₹60 lakh – ₹1 crore",
  "Above ₹1 crore",
];

const franchiseSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Kidsalonia Franchise Opportunity",
  description:
    "Start a Kidsalonia kids salon franchise with brand, training, outlet setup, marketing, and operational support.",
  provider: {
    "@type": "Organization",
    name: "Kidsalonia",
    url: BASE_URL,
  },
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  serviceType: "Kids Salon Franchise",
  url: `${BASE_URL}/franchise`,
};

const Franchise = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "");
    const phone = String(formData.get("phone") || "");
    const email = String(formData.get("email") || "");
    const city = String(formData.get("city") || "");
    const investment = String(formData.get("investment") || "");
    const location = String(formData.get("location") || "");
    const experience = String(formData.get("experience") || "");
    const message = String(formData.get("message") || "");

    const whatsappMessage = [
      "Hello Kidsalonia, I am interested in a franchise opportunity.",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Preferred City: ${city}`,
      `Investment Range: ${investment}`,
      `Property/Location: ${location || "Not specified"}`,
      `Business Experience: ${experience || "Not specified"}`,
      `Message: ${message || "Not specified"}`,
    ].join("\n");

    setSubmitted(true);

    window.open(
      `https://wa.me/9971073888?text=${encodeURIComponent(
        whatsappMessage,
      )}`,
      "_blank",
      "noopener,noreferrer",
    );

    form.reset();
  };

  return (
    <>
      <SEO
        title="Kidsalonia Franchise Opportunity | Start a Kids Salon Franchise"
        description="Start a Kidsalonia kids salon franchise in Gurugram, Delhi NCR, or another city. Get outlet setup, training, marketing, and operational support."
        canonical={`${BASE_URL}/franchise`}
        keywords={[
          "Kidsalonia franchise",
          "kids salon franchise",
          "children salon franchise India",
          "kids salon business opportunity",
          "salon franchise Gurugram",
          "salon franchise Delhi NCR",
          "kids grooming franchise",
        ]}
        schema={[
          organizationSchema,
          websiteSchema,
          franchiseSchema,
          createBreadcrumbSchema([
            {
              name: "Home",
              url: BASE_URL,
            },
            {
              name: "Franchise",
              url: `${BASE_URL}/franchise`,
            },
          ]),
          createFAQSchema(franchiseFAQs),
        ]}
      />

      <Header />
      <SocialSidebar />

      <main className="overflow-hidden bg-white">
        {/* Hero */}
        <section className="relative isolate bg-gradient-to-br from-pink-50 via-white to-purple-50 pt-28">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-pink-200/40 blur-3xl" />
            <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-purple-200/40 blur-3xl" />
          </div>

          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-4 py-2 text-sm font-semibold text-pink-700 shadow-sm">
                <Sparkles className="h-4 w-4" />
                Franchise opportunities now open
              </div>

              <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Build a joyful business with{" "}
                <span className="text-pink-600">Kidsalonia</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Bring a trusted, child-friendly salon experience to your city.
                Become a Kidsalonia franchise partner and receive support across
                outlet planning, training, operations, branding, and marketing.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#franchise-form"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-pink-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-pink-200 transition hover:-translate-y-0.5 hover:bg-pink-700"
                >
                  Apply for Franchise
                  <ArrowRight className="h-5 w-5" />
                </a>

                <a
                  href="tel:+919773864949"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 font-semibold text-slate-800 transition hover:border-pink-300 hover:text-pink-700"
                >
                  <Phone className="h-5 w-5" />
                  Speak to Our Team
                </a>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  ["Specialised", "Kids salon concept"],
                  ["Complete", "Setup guidance"],
                  ["Ongoing", "Business support"],
                ].map(([heading, text]) => (
                  <div
                    key={text}
                    className="rounded-2xl border border-white bg-white/80 p-4 shadow-sm backdrop-blur"
                  >
                    <p className="text-xl font-bold text-slate-900">{heading}</p>
                    <p className="mt-1 text-sm text-slate-600">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div
              id="franchise-form"
              className="scroll-mt-28 rounded-3xl border border-pink-100 bg-white p-6 shadow-2xl shadow-pink-100/70 sm:p-8"
            >
              <div className="mb-7">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-pink-600">
                  Partner with us
                </p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  Request franchise details
                </h2>
                <p className="mt-3 text-slate-600">
                  Complete the form and our franchise team will connect with
                  you.
                </p>
              </div>

              {submitted && (
                <div className="mb-6 flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>
                    Thank you. Your enquiry has been prepared and opened in
                    WhatsApp.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-semibold text-slate-700"
                    >
                      Full name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-sm font-semibold text-slate-700"
                    >
                      Phone number *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      inputMode="tel"
                      placeholder="+91 98XXXXXXXX"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Email address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="city"
                      className="mb-1.5 block text-sm font-semibold text-slate-700"
                    >
                      Preferred city *
                    </label>
                    <select
                      id="city"
                      name="city"
                      required
                      defaultValue=""
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
                    >
                      <option value="" disabled>
                        Select city
                      </option>

                      {locationOptions.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="investment"
                      className="mb-1.5 block text-sm font-semibold text-slate-700"
                    >
                      Investment range *
                    </label>
                    <select
                      id="investment"
                      name="investment"
                      required
                      defaultValue=""
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
                    >
                      <option value="" disabled>
                        Select range
                      </option>

                      {investmentOptions.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Proposed property or locality
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="Example: Sector 65, Gurugram"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="experience"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Business experience
                  </label>
                  <input
                    id="experience"
                    name="experience"
                    type="text"
                    placeholder="Briefly describe your experience"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Additional details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="Tell us about your plans"
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-pink-600 px-6 py-4 font-bold text-white shadow-lg shadow-pink-200 transition hover:bg-pink-700"
                >
                  Submit Franchise Enquiry
                  <ArrowRight className="h-5 w-5" />
                </button>

                <p className="text-center text-xs leading-5 text-slate-500">
                  By submitting this form, you agree to be contacted by the
                  Kidsalonia franchise team.
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* Why Kidsalonia */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-pink-600">
                Why partner with us
              </p>
              <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                A business designed around happy children and confident parents
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Kidsalonia combines specialised grooming services, playful
                experiences, family-focused hospitality, and structured
                operating support.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map(({ icon: Icon, title, description }) => (
                <article
                  key={title}
                  className="group rounded-3xl border border-slate-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-pink-200 hover:shadow-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-50 text-pink-600 transition group-hover:bg-pink-600 group-hover:text-white">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-slate-900">
                    {title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Opportunity */}
        <section className="bg-slate-950 py-20 text-white sm:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-pink-400">
                The opportunity
              </p>

              <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                Create a premium grooming destination for families
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-300">
                Parents increasingly value businesses that understand
                children’s comfort, safety, hygiene, and emotional needs.
                Kidsalonia gives franchise partners a focused concept designed
                for this growing audience.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Purpose-built experience for children",
                  "Multiple service and celebration opportunities",
                  "Strong potential for repeat family visits",
                  "Suitable for premium residential and retail markets",
                  "Scalable concept for multiple locations",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-pink-400" />
                    <span className="text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                {
                  icon: Scissors,
                  title: "Kids Hair Services",
                  text: "Haircuts, styling, hair care, and special occasion looks.",
                },
                {
                  icon: Sparkles,
                  title: "Nails and Pampering",
                  text: "Child-friendly nail services and gentle pampering experiences.",
                },
                {
                  icon: Heart,
                  title: "Birthday Experiences",
                  text: "Memorable grooming and celebration packages for children.",
                },
                {
                  icon: Users,
                  title: "Family Relationships",
                  text: "Build repeat business through trust, service, and convenience.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
                >
                  <Icon className="h-8 w-8 text-pink-400" />
                  <h3 className="mt-5 text-xl font-bold">{title}</h3>
                  <p className="mt-3 leading-7 text-slate-300">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Franchise format */}
        <section className="bg-gradient-to-b from-white to-pink-50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-pink-600">
                Business requirements
              </p>

              <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Indicative franchise profile
              </h2>

              <p className="mt-5 text-lg text-slate-600">
                Final requirements vary according to the city, property,
                format, and commercial potential.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Building2,
                  label: "Recommended space",
                  value: "700–1,500 sq. ft.",
                  note: "Depending on format",
                },
                {
                  icon: MapPin,
                  label: "Preferred location",
                  value: "Family catchment",
                  note: "Premium retail or residential area",
                },
                {
                  icon: CircleDollarSign,
                  label: "Investment",
                  value: "Custom proposal",
                  note: "Based on site and format",
                },
                {
                  icon: ClipboardCheck,
                  label: "Setup timeline",
                  value: "Site dependent",
                  note: "After approvals and handover",
                },
              ].map(({ icon: Icon, label, value, note }) => (
                <div
                  key={label}
                  className="rounded-3xl border border-pink-100 bg-white p-7 text-center shadow-sm"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-50 text-pink-600">
                    <Icon className="h-7 w-7" />
                  </div>
                  <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-slate-500">
                    {label}
                  </p>
                  <p className="mt-2 text-xl font-extrabold text-slate-900">
                    {value}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">{note}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-sm text-slate-500">
              These figures are indicative and do not constitute a financial
              commitment, guarantee, or final commercial offer.
            </p>
          </div>
        </section>

        {/* Support */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-pink-600">
                Franchise support
              </p>

              <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Support from planning to launch and beyond
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                Our franchise model is designed to help partners maintain a
                consistent Kidsalonia experience while building a strong local
                business.
              </p>

              <div className="mt-8 rounded-3xl bg-pink-600 p-7 text-white">
                <ShieldCheck className="h-10 w-10" />
                <h3 className="mt-5 text-2xl font-bold">
                  Quality-led operations
                </h3>
                <p className="mt-3 leading-7 text-pink-50">
                  We focus on child safety, hygiene, service consistency, team
                  behaviour, and a welcoming family experience.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {supportItems.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-pink-600" />
                  <p className="font-medium leading-6 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-pink-600">
                Franchise journey
              </p>

              <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                From enquiry to grand opening
              </h2>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {processSteps.map((step) => (
                <article
                  key={step.number}
                  className="relative rounded-3xl border border-slate-200 bg-white p-7"
                >
                  <span className="text-5xl font-black text-pink-100">
                    {step.number}
                  </span>

                  <h3 className="mt-5 text-xl font-bold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Locations */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] bg-gradient-to-br from-purple-700 to-pink-600 px-6 py-12 text-white sm:px-10 lg:px-14">
              <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-pink-100">
                    Expansion locations
                  </p>

                  <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                    Bring Kidsalonia to your city
                  </h2>

                  <p className="mt-5 max-w-2xl text-lg leading-8 text-purple-100">
                    We are evaluating opportunities across Gurugram, Manesar,
                    Sohna, Faridabad, Delhi, Noida, Greater Noida, Ghaziabad,
                    and other promising Indian cities.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {locationOptions.slice(0, -1).map((location) => (
                      <span
                        key={location}
                        className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium"
                      >
                        {location}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl bg-white p-7 text-slate-900 shadow-xl">
                  <MapPin className="h-10 w-10 text-pink-600" />
                  <h3 className="mt-5 text-2xl font-bold">
                    Have a suitable location?
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    Share the property size, locality, frontage, floor, and
                    nearby landmarks with our team for an initial evaluation.
                  </p>

                  <a
                    href="#franchise-form"
                    className="mt-6 inline-flex items-center gap-2 font-bold text-pink-600 hover:text-pink-700"
                  >
                    Submit location details
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-pink-50 py-20 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-pink-600">
                Frequently asked questions
              </p>

              <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Kidsalonia franchise FAQs
              </h2>
            </div>

            <div className="mt-12 space-y-4">
              {franchiseFAQs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl border border-pink-100 bg-white p-6 shadow-sm"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-bold text-slate-900">
                    {faq.question}
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pink-50 text-xl text-pink-600 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>

                  <p className="mt-4 max-w-3xl leading-7 text-slate-600">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-pink-100 bg-white px-6 py-14 shadow-xl shadow-pink-100/50 sm:px-12">
              <IndianRupee className="mx-auto h-12 w-12 text-pink-600" />

              <h2 className="mt-6 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Ready to explore a Kidsalonia franchise?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Tell us about your city, preferred location, and business
                plans. Our team will help you understand the next steps.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                  href="#franchise-form"
                  className="inline-flex items-center gap-2 rounded-full bg-pink-600 px-7 py-3.5 font-bold text-white transition hover:bg-pink-700"
                >
                  Apply Now
                  <ArrowRight className="h-5 w-5" />
                </a>

                <a
                  href="tel:+919773864949"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-7 py-3.5 font-bold text-slate-800 transition hover:border-pink-300 hover:text-pink-600"
                >
                  <Phone className="h-5 w-5" />
                  Call Franchise Team
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Franchise;
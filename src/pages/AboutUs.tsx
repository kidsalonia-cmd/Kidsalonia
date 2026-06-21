import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialSidebar from "@/components/SocialSidebar";
import SEO, { localBusinessSchema, createFAQSchema } from "@/components/SEO";
import { Link } from "react-router-dom";
import { Heart, Shield, Sparkles, Star, Scissors, Smile } from "lucide-react";
import aboutHero from "@/assets/gallery/gallery-20.png";

const aboutFAQs = [
  {
    question: "Why choose a kids salon instead of a regular salon?",
    answer:
      "A kids salon like KidSalonia is specifically designed for children — from the playful interiors and child-sized chairs to trained stylists who know how to keep little ones calm and happy. We use only kid-safe, hypoallergenic products, and the entire experience is built around making your child feel comfortable, safe, and excited about their visit.",
  },
];

const AboutUs = () => {
  const jsonLd = [
    localBusinessSchema,
    createFAQSchema(aboutFAQs),
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About KidSalonia",
      description:
        "Learn about KidSalonia — Gurugram's premium child-friendly salon where every visit is designed with care, comfort, and fun.",
      url: "https://www.kidsalonia.com/about-us",
      mainEntity: {
        "@type": "Organization",
        name: "KidSalonia",
        url: "https://www.kidsalonia.com",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="About Us | KidSalonia - Premium Kids Salon Gurugram"
        description="KidSalonia is Gurugram's trusted child-friendly salon. Safe products, trained stylists, and a playful space designed to make every child smile. Learn our story."
        canonical="https://www.kidsalonia.com/about-us"
        jsonLd={jsonLd}
      />
      <Header />
      <SocialSidebar />

      <main>
        {/* Hero Section */}
        <section className="relative">
          <div className="w-full h-[320px] md:h-[420px] overflow-hidden">
            <img
              src={aboutHero}
              alt="Happy child getting a haircut at KidSalonia kids salon in Gurugram"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
          </div>
          <div className="absolute bottom-8 left-0 right-0 text-center px-4">
            <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground drop-shadow-lg">
              About KidSalonia
            </h1>
            <p className="mt-2 text-primary-foreground/90 text-lg md:text-xl font-medium drop-shadow">
              Where Every Little Moment Is Designed With Care
            </p>
          </div>
        </section>

        {/* Intro */}
        <section className="max-w-4xl mx-auto px-6 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            Why We Started KidSalonia
          </h2>
          <div className="prose prose-lg text-muted-foreground max-w-none space-y-4">
            <p>
              It started with a simple observation — watching a toddler cry through
              a haircut at a regular salon. The loud dryers, the unfamiliar smells,
              the tall chairs that weren't built for tiny legs. That moment stayed
              with us.
            </p>
            <p>
              We asked ourselves: <em>why isn't there a place designed entirely
              around how children feel?</em> A place where a haircut isn't something
              to dread, but something to look forward to. That question became
              KidSalonia — Gurugram's premium kids salon, born out of a genuine love
              for children and a deep understanding of what parents truly want: safety,
              comfort, and a smile on their child's face.
            </p>
          </div>
        </section>

        {/* Philosophy */}
        <section className="bg-secondary/40 py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Our Philosophy: The Experience Matters More Than the Haircut
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg">
              <p>
                At KidSalonia, we believe a kids haircut salon should feel like an
                adventure, not an appointment. Our child-friendly salon is designed
                from the ground up with little ones in mind — cartoon-themed chairs,
                playful interiors, favourite shows on screen, and stylists who know
                exactly how to turn a nervous first-timer into a giggling, happy child.
              </p>
              <p>
                We don't rush. We don't force. We let your child settle in at their
                own pace, because we know that when a child feels safe, everything
                else falls into place.
              </p>
            </div>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="max-w-5xl mx-auto px-6 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">
            What Makes Us Different
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "100% Kid-Safe Products",
                desc: "Every product we use is hypoallergenic, tear-free, and specifically formulated for children's delicate skin and hair.",
              },
              {
                icon: Smile,
                title: "Trained Kids Stylists",
                desc: "Our team is specially trained in professional kids hair care — they know how to handle wiggly toddlers and shy teenagers alike.",
              },
              {
                icon: Sparkles,
                title: "A Space Built for Fun",
                desc: "From rainbow mirrors to cartoon chairs, every corner of our salon for kids is designed to spark joy and curiosity.",
              },
              {
                icon: Heart,
                title: "Parent-Friendly Environment",
                desc: "Comfortable seating for parents, full visibility, and a clean, hygienic space you can trust completely.",
              },
              {
                icon: Star,
                title: "Beyond Just Haircuts",
                desc: "Nail art, party makeup, skin care, mundan ceremonies — we're a complete grooming destination for children.",
              },
              {
                icon: Scissors,
                title: "Personalised Attention",
                desc: "No assembly lines here. Every child gets unhurried, one-on-one attention from their stylist.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-md transition"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Designed for Kids, Trusted by Parents */}
        <section className="bg-primary/5 py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Designed for Kids. Trusted by Parents.
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg">
              <p>
                Over the years, hundreds of families across Gurugram have made
                KidSalonia their go-to safe salon for children. Parents tell us
                their kids actually <em>ask</em> to come back — and honestly, that's
                the best compliment we could ever receive.
              </p>
              <p>
                We understand the hesitation that comes with a child's first haircut
                or a toddler's mundan ceremony. That's why we take extra care to
                create an environment where your child feels like a little star, not
                a patient. Our 4.8-star rating from 500+ families isn't just a
                number — it's a reflection of trust we've earned, one happy child at
                a time.
              </p>
            </div>
          </div>
        </section>

        {/* Our Services Approach */}
        <section className="max-w-4xl mx-auto px-6 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            Our Approach to Kids' Grooming
          </h2>
          <div className="space-y-4 text-muted-foreground text-lg">
            <p>
              Whether it's a simple trim or an elaborate birthday party makeover,
              we approach every service with the same care and attention. Our kids
              salon uses only premium, dermatologically tested products. We keep our
              tools sterilised, our stations spotless, and our stylists updated with
              the latest techniques in children's grooming.
            </p>
            <p>
              From gentle haircuts and creative nail art to soothing skin care
              treatments — every service is tailored to be age-appropriate,
              comfortable, and genuinely enjoyable for your child.
            </p>
          </div>
        </section>

        {/* AEO Section */}
        <section className="bg-secondary/40 py-10">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
              Why Choose a Kids Salon Instead of a Regular Salon?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              A kids salon like KidSalonia is specifically designed for children —
              from the playful interiors and child-sized chairs to trained stylists
              who know how to keep little ones calm and happy. We use only kid-safe,
              hypoallergenic products, and the entire experience is built around
              making your child feel comfortable, safe, and excited about their visit.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 md:py-20 text-center px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Give Your Child the Salon Experience They Deserve?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Walk in or book an appointment — we'd love to welcome your little one
              to the KidSalonia family. 💛
            </p>
            <Link
              to="/contact-us"
              className="inline-block bg-primary text-primary-foreground font-bold px-10 py-3.5 rounded-full text-lg hover:opacity-90 transition"
            >
              Book Now
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;

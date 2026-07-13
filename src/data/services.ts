export type SEOServicePage = {
  slug: string;
  category:
    | "kids-salon"
    | "nail-art"
    | "mundan"
    | "manicure"
    | "pedicure"
    | "hairdresser";
  title: string;
  h1: string;
  metaDescription: string;
  serviceName: string;
  serviceType: string;
  intro: string;
  benefits: string[];
  faqs: { question: string; answer: string }[];
};

export const seoServices: SEOServicePage[] = [
  {
    slug: "kids-haircut-gurgaon",
    category: "kids-salon",
    title: "Kids Haircut Gurgaon | Safe & Stylish Haircuts for Children",
    h1: "Kids Haircut in Gurgaon",
    metaDescription:
      "Book kids haircut in Gurgaon at KidSalonia. Safe, child-friendly haircuts for boys, girls, toddlers and babies near Airia Mall.",
    serviceName: "Kids Haircut Gurgaon",
    serviceType: "Kids Haircut",
    intro:
      "KidSalonia offers safe, comfortable and stylish kids haircuts in Gurgaon for babies, toddlers, boys and girls. Our salon is designed to make children feel relaxed while parents enjoy a smooth grooming experience.",
    benefits: [
      "Child-friendly salon environment",
      "Experienced kids hairdressers",
      "Safe products for children",
      "Located near Airia Mall, Gurugram",
    ],
    faqs: [
      {
        question: "Do you offer kids haircuts in Gurgaon?",
        answer:
          "Yes, KidSalonia offers kids haircuts for babies, toddlers, boys and girls in Gurugram.",
      },
      {
        question: "Is appointment required?",
        answer:
          "Appointments are recommended. You can call +91 81303 07036 or +91 97738 64949.",
      },
    ],
  },
  {
    slug: "baby-first-haircut-gurgaon",
    category: "kids-salon",
    title: "Baby First Haircut Gurgaon | KidSalonia",
    h1: "Baby First Haircut in Gurgaon",
    metaDescription:
      "Make your baby's first haircut special at KidSalonia Gurgaon. Safe, hygienic and child-friendly first haircut experience.",
    serviceName: "Baby First Haircut Gurgaon",
    serviceType: "Baby First Haircut",
    intro:
      "A baby’s first haircut is a special memory. KidSalonia provides a gentle, hygienic and comfortable first haircut experience for babies in Gurgaon.",
    benefits: [
      "Gentle handling for babies",
      "Hygienic tools",
      "Parent-friendly experience",
      "Comfortable kids salon setup",
    ],
    faqs: [
      {
        question: "Do you provide baby first haircut services?",
        answer:
          "Yes, we provide baby first haircut services in a safe kids salon environment.",
      },
      {
        question: "Can parents stay with the baby?",
        answer:
          "Yes, parents can stay with the baby during the haircut.",
      },
    ],
  },
  {
    slug: "mundan-gurgaon",
    category: "mundan",
    title: "Mundan Ceremony Gurgaon | Hygienic Baby Mundan at KidSalonia",
    h1: "Mundan Ceremony in Gurgaon",
    metaDescription:
      "Book hygienic mundan ceremony in Gurgaon at KidSalonia. Safe baby mundan and first haircut services near Airia Mall.",
    serviceName: "Mundan Ceremony Gurgaon",
    serviceType: "Mundan",
    intro:
      "KidSalonia offers hygienic mundan services in Gurgaon for babies and young children. Our team ensures a calm, clean and safe experience for families.",
    benefits: [
      "Hygienic mundan setup",
      "Experienced staff",
      "Safe for babies and toddlers",
      "Comfortable family environment",
    ],
    faqs: [
      {
        question: "Do you offer mundan in Gurgaon?",
        answer:
          "Yes, KidSalonia offers baby mundan and first haircut ceremony services in Gurugram.",
      },
      {
        question: "Is the mundan service hygienic?",
        answer:
          "Yes, we maintain hygiene and use clean tools for every service.",
      },
    ],
  },
  {
    slug: "nail-art-gurgaon",
    category: "nail-art",
    title: "Nail Art Gurgaon | Stylish Nail Designs at KidSalonia",
    h1: "Nail Art in Gurgaon",
    metaDescription:
      "Get stylish nail art in Gurgaon at KidSalonia. Gel nail art, kids nail art, party nails and custom nail designs near Airia Mall.",
    serviceName: "Nail Art Gurgaon",
    serviceType: "Nail Art",
    intro:
      "KidSalonia offers creative nail art in Gurgaon for kids, moms and families. Choose from simple, cute, party-ready and custom nail designs.",
    benefits: [
      "Creative nail designs",
      "Kids-friendly nail art options",
      "Party and festive styles",
      "Located in Gurugram",
    ],
    faqs: [
      {
        question: "Do you provide nail art in Gurgaon?",
        answer:
          "Yes, KidSalonia provides nail art services including kids nail art and custom designs.",
      },
      {
        question: "Do you offer gel nail art?",
        answer:
          "Yes, gel nail art options are available depending on your preference.",
      },
    ],
  },
  {
    slug: "manicure-gurgaon",
    category: "manicure",
    title: "Manicure Gurgaon | Kids & Family Manicure at KidSalonia",
    h1: "Manicure in Gurgaon",
    metaDescription:
      "Book manicure in Gurgaon at KidSalonia. Kids manicure, spa manicure and family nail care services near Airia Mall.",
    serviceName: "Manicure Gurgaon",
    serviceType: "Manicure",
    intro:
      "KidSalonia offers manicure services in Gurgaon for kids, moms and families. Our manicure services focus on clean, neat and beautiful hands.",
    benefits: [
      "Kids and family manicure",
      "Clean and hygienic process",
      "Gentle nail care",
      "Salon near Airia Mall",
    ],
    faqs: [
      {
        question: "Do you provide manicure services?",
        answer:
          "Yes, KidSalonia provides manicure services for kids and families.",
      },
      {
        question: "Is manicure safe for kids?",
        answer:
          "Yes, we use gentle methods suitable for children.",
      },
    ],
  },
  {
    slug: "pedicure-gurgaon",
    category: "pedicure",
    title: "Pedicure Gurgaon | Kids & Family Pedicure at KidSalonia",
    h1: "Pedicure in Gurgaon",
    metaDescription:
      "Book pedicure in Gurgaon at KidSalonia. Kids pedicure, spa pedicure and family foot care services near Airia Mall.",
    serviceName: "Pedicure Gurgaon",
    serviceType: "Pedicure",
    intro:
      "KidSalonia offers pedicure services in Gurgaon for kids, moms and families. Enjoy clean, comfortable and relaxing foot care.",
    benefits: [
      "Kids and family pedicure",
      "Hygienic setup",
      "Relaxing foot care",
      "Convenient Gurugram location",
    ],
    faqs: [
      {
        question: "Do you provide pedicure services in Gurgaon?",
        answer:
          "Yes, KidSalonia provides pedicure services for kids and families.",
      },
      {
        question: "Can children get pedicure services?",
        answer:
          "Yes, we offer gentle kids pedicure options.",
      },
    ],
  },
  {
    slug: "hairdresser-gurgaon",
    category: "hairdresser",
    title: "Hairdresser Gurgaon | Kids & Family Hairdresser at KidSalonia",
    h1: "Hairdresser in Gurgaon",
    metaDescription:
      "Visit KidSalonia for hairdresser services in Gurgaon including kids haircut, styling, baby haircut and family salon services.",
    serviceName: "Hairdresser Gurgaon",
    serviceType: "Hairdresser",
    intro:
      "KidSalonia is a trusted hairdresser in Gurgaon for kids and families. We provide kids haircut, baby haircut, styling and family grooming services.",
    benefits: [
      "Experienced hairdressers",
      "Kids and family grooming",
      "Comfortable salon environment",
      "Near Airia Mall, Gurugram",
    ],
    faqs: [
      {
        question: "Is KidSalonia a hairdresser in Gurgaon?",
        answer:
          "Yes, KidSalonia provides hairdresser services for kids and families in Gurgaon.",
      },
      {
        question: "Do you offer hair styling?",
        answer:
          "Yes, hair styling services are available for children and families.",
      },
    ],
  },
];

export const getServiceBySlug = (slug: string) =>
  seoServices.find((service) => service.slug === slug);
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
  faqs: {
    question: string;
    answer: string;
  }[];
};

const bookingAnswer =
  "Appointments are recommended. Call KidSalonia at +91 81303 07036 or +91 97738 64949 to check availability and book.";

export const seoServices: SEOServicePage[] = [
  {
    slug: "kids-haircut-gurgaon",
    category: "kids-salon",
    title: "Kids Haircut Gurgaon | Child-Friendly Salon",
    h1: "Kids Haircut in Gurgaon",
    metaDescription:
      "Book a kids haircut in Gurgaon at KidSalonia. Child-friendly haircuts for babies, toddlers, boys and girls near Airia Mall.",
    serviceName: "Kids Haircut",
    serviceType: "Kids Haircut",
    intro:
      "KidSalonia provides comfortable and stylish kids haircuts for babies, toddlers, boys and girls in a colourful, child-friendly salon environment.",
    benefits: [
      "Experienced kids hairdressers",
      "Calm and child-friendly environment",
      "Hygienic tools and safe products",
      "Convenient Gurgaon location",
    ],
    faqs: [
      {
        question: "Do you provide haircuts for toddlers?",
        answer:
          "Yes, our trained team provides patient and comfortable haircut services for toddlers and young children.",
      },
      {
        question: "How can I book a kids haircut?",
        answer: bookingAnswer,
      },
    ],
  },
  {
    slug: "baby-first-haircut",
    category: "kids-salon",
    title: "Baby First Haircut Gurgaon | Memorable First Haircut",
    h1: "Baby First Haircut in Gurgaon",
    metaDescription:
      "Make your baby's first haircut memorable at KidSalonia Gurgaon with gentle handling, hygiene and a child-friendly salon experience.",
    serviceName: "Baby First Haircut",
    serviceType: "Baby First Haircut",
    intro:
      "A baby's first haircut is a special family moment. KidSalonia provides a gentle, hygienic and comfortable experience for babies and parents.",
    benefits: [
      "Gentle handling for babies",
      "Clean and hygienic equipment",
      "Parent-friendly experience",
      "Comfortable salon environment",
    ],
    faqs: [
      {
        question: "Can parents stay with the baby?",
        answer:
          "Yes, parents can remain with their baby throughout the first haircut service.",
      },
      {
        question: "Is advance booking recommended?",
        answer: bookingAnswer,
      },
    ],
  },
  {
    slug: "toddler-haircut",
    category: "kids-salon",
    title: "Toddler Haircut Gurgaon | Patient Kids Hairdressers",
    h1: "Toddler Haircut in Gurgaon",
    metaDescription:
      "Book a toddler haircut in Gurgaon at KidSalonia. Patient hairdressers, hygienic tools and a comfortable kids salon environment.",
    serviceName: "Toddler Haircut",
    serviceType: "Toddler Haircut",
    intro:
      "Our toddler haircut service focuses on patience, comfort and gentle styling so young children can enjoy a positive salon experience.",
    benefits: [
      "Patient and trained team",
      "Comfortable seating for children",
      "Age-appropriate haircut styles",
      "Safe grooming practices",
    ],
    faqs: [
      {
        question: "What if my toddler is nervous?",
        answer:
          "Our team uses a calm and patient approach to help nervous toddlers settle comfortably.",
      },
      {
        question: "Can I book a quieter time?",
        answer: bookingAnswer,
      },
    ],
  },
  {
    slug: "boys-haircut",
    category: "kids-salon",
    title: "Boys Haircut Gurgaon | Stylish Kids Haircuts",
    h1: "Boys Haircut in Gurgaon",
    metaDescription:
      "Get a stylish boys haircut in Gurgaon at KidSalonia. Modern, school-ready and easy-maintenance haircut options for children.",
    serviceName: "Boys Haircut",
    serviceType: "Boys Haircut",
    intro:
      "KidSalonia offers neat, stylish and easy-to-maintain boys haircuts suitable for school, parties and everyday grooming.",
    benefits: [
      "Modern boys haircut styles",
      "School-ready grooming",
      "Child-friendly hairdressers",
      "Comfortable salon setup",
    ],
    faqs: [
      {
        question: "Can you suggest a haircut style?",
        answer:
          "Yes, our hairdressers can recommend styles based on hair texture, face shape and maintenance preference.",
      },
      {
        question: "How do I book?",
        answer: bookingAnswer,
      },
    ],
  },
  {
    slug: "girls-haircut",
    category: "kids-salon",
    title: "Girls Haircut Gurgaon | Stylish Haircuts for Kids",
    h1: "Girls Haircut in Gurgaon",
    metaDescription:
      "Book a girls haircut in Gurgaon at KidSalonia for stylish trims, layers, fringes and child-friendly hair styling.",
    serviceName: "Girls Haircut",
    serviceType: "Girls Haircut",
    intro:
      "Our girls haircut service includes neat trims, layers, fringes and age-appropriate styles designed for comfort and easy maintenance.",
    benefits: [
      "Age-appropriate haircut styles",
      "Gentle detangling and handling",
      "Styling advice for parents",
      "Safe products for children",
    ],
    faqs: [
      {
        question: "Do you offer trims and layers?",
        answer:
          "Yes, our team offers trims, layers, fringes and other suitable haircut options for girls.",
      },
      {
        question: "Is booking required?",
        answer: bookingAnswer,
      },
    ],
  },
  {
    slug: "kids-hair-styling",
    category: "kids-salon",
    title: "Kids Hair Styling Gurgaon | Party & Event Hairstyles",
    h1: "Kids Hair Styling in Gurgaon",
    metaDescription:
      "Book kids hair styling in Gurgaon for birthdays, parties, school events and special occasions at KidSalonia.",
    serviceName: "Kids Hair Styling",
    serviceType: "Kids Hair Styling",
    intro:
      "KidSalonia creates comfortable and attractive hairstyles for children's birthdays, parties, school functions and family celebrations.",
    benefits: [
      "Party-ready hairstyles",
      "Comfortable styling for children",
      "Styles for boys and girls",
      "Suitable for special occasions",
    ],
    faqs: [
      {
        question: "Do you style hair for birthdays?",
        answer:
          "Yes, we offer children's hair styling for birthdays, parties and other special events.",
      },
      {
        question: "Should I book in advance?",
        answer: bookingAnswer,
      },
    ],
  },
  {
    slug: "kids-party-makeup",
    category: "kids-salon",
    title: "Kids Party Makeup Gurgaon | Safe Party Makeover",
    h1: "Kids Party Makeup in Gurgaon",
    metaDescription:
      "Book gentle kids party makeup in Gurgaon at KidSalonia for birthdays, school functions and special celebrations.",
    serviceName: "Kids Party Makeup",
    serviceType: "Kids Party Makeup",
    intro:
      "Our kids party makeup service provides a light, age-appropriate makeover for birthdays, school functions and celebrations.",
    benefits: [
      "Age-appropriate party makeup",
      "Gentle application",
      "Suitable for birthdays and events",
      "Comfortable salon experience",
    ],
    faqs: [
      {
        question: "Is the makeup suitable for children?",
        answer:
          "We keep children's party makeup light and age-appropriate, with comfort as the priority.",
      },
      {
        question: "How can I reserve a slot?",
        answer: bookingAnswer,
      },
    ],
  },
  {
    slug: "kids-birthday-makeover",
    category: "kids-salon",
    title: "Kids Birthday Makeover Gurgaon | Hair & Nail Styling",
    h1: "Kids Birthday Makeover in Gurgaon",
    metaDescription:
      "Celebrate with a kids birthday makeover in Gurgaon including hair styling, nail art and party-ready grooming at KidSalonia.",
    serviceName: "Kids Birthday Makeover",
    serviceType: "Kids Birthday Makeover",
    intro:
      "Make birthdays extra special with a child-friendly makeover including hair styling, grooming and optional nail art.",
    benefits: [
      "Birthday-ready hair styling",
      "Optional kids nail art",
      "Child-friendly experience",
      "Customisable makeover options",
    ],
    faqs: [
      {
        question: "What is included in the birthday makeover?",
        answer:
          "The package can include hair styling, grooming and nail art depending on the selected services.",
      },
      {
        question: "How should I book?",
        answer: bookingAnswer,
      },
    ],
  },
  {
    slug: "mundan",
    category: "mundan",
    title: "Mundan Ceremony Gurgaon | Hygienic Baby Mundan",
    h1: "Mundan Ceremony in Gurgaon",
    metaDescription:
      "Book a hygienic mundan ceremony in Gurgaon at KidSalonia. Safe full head shave and first haircut services for babies and children.",
    serviceName: "Mundan Ceremony",
    serviceType: "Mundan Ceremony",
    intro:
      "KidSalonia offers hygienic mundan services for babies and children in a calm, clean and family-friendly salon environment.",
    benefits: [
      "Hygienic tools and setup",
      "Experienced salon team",
      "Comfortable for babies and toddlers",
      "Family-friendly environment",
    ],
    faqs: [
      {
        question: "Do you provide complete head shave services?",
        answer:
          "Yes, we provide full head shave and mundan services for babies and children.",
      },
      {
        question: "Is advance booking recommended?",
        answer: bookingAnswer,
      },
    ],
  },
  {
    slug: "baby-mundan",
    category: "mundan",
    title: "Baby Mundan Gurgaon | Safe & Hygienic Service",
    h1: "Baby Mundan in Gurgaon",
    metaDescription:
      "Book baby mundan in Gurgaon at KidSalonia with hygienic tools, patient staff and a comfortable environment for families.",
    serviceName: "Baby Mundan",
    serviceType: "Baby Mundan",
    intro:
      "Our baby mundan service is designed to provide a hygienic and calm experience for babies and their families.",
    benefits: [
      "Patient handling",
      "Clean equipment",
      "Comfortable family setting",
      "Experienced staff",
    ],
    faqs: [
      {
        question: "Is the equipment cleaned before every mundan?",
        answer:
          "Yes, hygiene and clean equipment are important parts of our mundan service.",
      },
      {
        question: "How can I book baby mundan?",
        answer: bookingAnswer,
      },
    ],
  },
  {
    slug: "traditional-mundan",
    category: "mundan",
    title: "Traditional Mundan Gurgaon | First Haircut Ceremony",
    h1: "Traditional Mundan in Gurgaon",
    metaDescription:
      "Arrange a traditional mundan and first haircut service in Gurgaon at KidSalonia in a clean and child-friendly setting.",
    serviceName: "Traditional Mundan",
    serviceType: "Traditional Mundan",
    intro:
      "KidSalonia supports families seeking a traditional first haircut or mundan service in a hygienic, comfortable salon setting.",
    benefits: [
      "Respectful family experience",
      "Hygienic full head shave",
      "Suitable for babies and children",
      "Convenient Gurgaon location",
    ],
    faqs: [
      {
        question: "Can family members attend?",
        answer:
          "Family members can accompany the child, subject to available salon space and appointment timing.",
      },
      {
        question: "How do I schedule it?",
        answer: bookingAnswer,
      },
    ],
  },
  {
    slug: "hygienic-mundan",
    category: "mundan",
    title: "Hygienic Mundan Gurgaon | Clean Baby Head Shave",
    h1: "Hygienic Mundan in Gurgaon",
    metaDescription:
      "Choose hygienic mundan in Gurgaon at KidSalonia with clean equipment, careful handling and a child-friendly salon environment.",
    serviceName: "Hygienic Mundan",
    serviceType: "Hygienic Mundan",
    intro:
      "Our hygienic mundan service focuses on clean equipment, careful handling and a comfortable experience for the child.",
    benefits: [
      "Clean and sanitised setup",
      "Careful shaving process",
      "Experienced team",
      "Comfort for parents and children",
    ],
    faqs: [
      {
        question: "What hygiene measures are followed?",
        answer:
          "We use clean tools and maintain a hygienic service area for every mundan appointment.",
      },
      {
        question: "Can I book by phone?",
        answer: bookingAnswer,
      },
    ],
  },
  {
    slug: "nail-art",
    category: "nail-art",
    title: "Nail Art Gurgaon | Stylish Custom Nail Designs",
    h1: "Nail Art in Gurgaon",
    metaDescription:
      "Get stylish nail art in Gurgaon at KidSalonia. Choose kids nail art, party nails, gel designs and customised nail styles.",
    serviceName: "Nail Art",
    serviceType: "Nail Art",
    intro:
      "KidSalonia offers creative nail art for kids, teens and moms, including simple designs, party styles and customised looks.",
    benefits: [
      "Creative custom designs",
      "Kids-friendly options",
      "Party and festive styles",
      "Professional nail care",
    ],
    faqs: [
      {
        question: "Do you offer custom nail designs?",
        answer:
          "Yes, customers can discuss colours and design preferences with our nail team.",
      },
      {
        question: "How do I book nail art?",
        answer: bookingAnswer,
      },
    ],
  },
  {
    slug: "kids-nail-art",
    category: "nail-art",
    title: "Kids Nail Art Gurgaon | Cute Child-Friendly Designs",
    h1: "Kids Nail Art in Gurgaon",
    metaDescription:
      "Book kids nail art in Gurgaon at KidSalonia for cute, colourful and child-friendly nail designs.",
    serviceName: "Kids Nail Art",
    serviceType: "Kids Nail Art",
    intro:
      "Our kids nail art service includes colourful, cute and age-appropriate designs created in a comfortable salon environment.",
    benefits: [
      "Child-friendly designs",
      "Cute and colourful options",
      "Suitable for birthdays",
      "Gentle nail service",
    ],
    faqs: [
      {
        question: "Can children choose their nail design?",
        answer:
          "Yes, children can choose from available colours and age-appropriate design options.",
      },
      {
        question: "Is an appointment needed?",
        answer: bookingAnswer,
      },
    ],
  },
  {
    slug: "gel-nail-art",
    category: "nail-art",
    title: "Gel Nail Art Gurgaon | Long-Lasting Nail Designs",
    h1: "Gel Nail Art in Gurgaon",
    metaDescription:
      "Book gel nail art in Gurgaon at KidSalonia for glossy, attractive and longer-lasting customised nail designs.",
    serviceName: "Gel Nail Art",
    serviceType: "Gel Nail Art",
    intro:
      "Gel nail art offers a glossy finish and longer-lasting designs for parties, events and everyday style.",
    benefits: [
      "Glossy finish",
      "Longer-lasting designs",
      "Wide colour selection",
      "Custom design options",
    ],
    faqs: [
      {
        question: "How long does gel nail art last?",
        answer:
          "Duration varies with nail condition and aftercare, but gel designs generally last longer than regular polish.",
      },
      {
        question: "How can I reserve a slot?",
        answer: bookingAnswer,
      },
    ],
  },
  {
    slug: "gel-nail-extension",
    category: "nail-art",
    title: "Gel Nail Extension Gurgaon | Stylish Nail Extensions",
    h1: "Gel Nail Extensions in Gurgaon",
    metaDescription:
      "Get gel nail extensions in Gurgaon at KidSalonia with customised length, shape, colour and nail art options.",
    serviceName: "Gel Nail Extension",
    serviceType: "Gel Nail Extension",
    intro:
      "Our gel nail extension service helps create polished, elegant nails with customised length, shape and colour.",
    benefits: [
      "Custom nail length and shape",
      "Glossy finish",
      "Multiple colour options",
      "Optional nail art",
    ],
    faqs: [
      {
        question: "Can I choose the nail shape?",
        answer:
          "Yes, available nail shapes and lengths can be discussed during the appointment.",
      },
      {
        question: "How do I book nail extensions?",
        answer: bookingAnswer,
      },
    ],
  },
  {
    slug: "acrylic-nail-extension",
    category: "nail-art",
    title: "Acrylic Nail Extension Gurgaon | Custom Nail Shapes",
    h1: "Acrylic Nail Extensions in Gurgaon",
    metaDescription:
      "Book acrylic nail extensions in Gurgaon at KidSalonia for customised nail length, shape and creative designs.",
    serviceName: "Acrylic Nail Extension",
    serviceType: "Acrylic Nail Extension",
    intro:
      "Acrylic nail extensions provide added length and strength with several shape, colour and nail art choices.",
    benefits: [
      "Custom length and shape",
      "Strong nail enhancement",
      "Creative nail design options",
      "Professional application",
    ],
    faqs: [
      {
        question: "Are acrylic extensions available in different shapes?",
        answer:
          "Yes, shape and length options can be selected based on your preference and natural nails.",
      },
      {
        question: "Is advance booking required?",
        answer: bookingAnswer,
      },
    ],
  },
  {
    slug: "french-nail-art",
    category: "nail-art",
    title: "French Nail Art Gurgaon | Classic French Manicure",
    h1: "French Nail Art in Gurgaon",
    metaDescription:
      "Get elegant French nail art in Gurgaon at KidSalonia with classic, modern and customised French tip styles.",
    serviceName: "French Nail Art",
    serviceType: "French Nail Art",
    intro:
      "French nail art offers a clean and elegant finish suitable for everyday wear, parties and formal occasions.",
    benefits: [
      "Classic elegant appearance",
      "Modern French tip options",
      "Suitable for special occasions",
      "Clean professional finish",
    ],
    faqs: [
      {
        question: "Can French tips be customised?",
        answer:
          "Yes, colours and design details can be customised based on available options.",
      },
      {
        question: "How can I book?",
        answer: bookingAnswer,
      },
    ],
  },
  {
    slug: "bridal-nail-art",
    category: "nail-art",
    title: "Bridal Nail Art Gurgaon | Wedding Nail Designs",
    h1: "Bridal Nail Art in Gurgaon",
    metaDescription:
      "Book bridal nail art in Gurgaon at KidSalonia for elegant wedding nails, customised colours and detailed designs.",
    serviceName: "Bridal Nail Art",
    serviceType: "Bridal Nail Art",
    intro:
      "Our bridal nail art service creates elegant, event-ready nail designs matched to wedding outfits and personal style.",
    benefits: [
      "Wedding-ready nail designs",
      "Custom colours and detailing",
      "Elegant finish",
      "Advance design consultation",
    ],
    faqs: [
      {
        question: "Should bridal nail art be booked in advance?",
        answer:
          "Yes, advance booking is recommended so design preferences and appointment timing can be planned.",
      },
      {
        question: "How can I reserve an appointment?",
        answer: bookingAnswer,
      },
    ],
  },
  {
    slug: "nail-refill",
    category: "nail-art",
    title: "Nail Refill Gurgaon | Gel & Acrylic Nail Maintenance",
    h1: "Nail Refill in Gurgaon",
    metaDescription:
      "Book nail refill in Gurgaon at KidSalonia for gel and acrylic extension maintenance, reshaping and colour refresh.",
    serviceName: "Nail Refill",
    serviceType: "Nail Refill",
    intro:
      "A nail refill helps maintain existing gel or acrylic extensions by filling growth areas and refreshing the finish.",
    benefits: [
      "Extension maintenance",
      "Improved nail appearance",
      "Shape and colour refresh",
      "Professional nail care",
    ],
    faqs: [
      {
        question: "When should I get a nail refill?",
        answer:
          "Refill timing depends on nail growth and extension condition. Our nail team can assess them during your visit.",
      },
      {
        question: "How do I book?",
        answer: bookingAnswer,
      },
    ],
  },
  {
    slug: "nail-extension-removal",
    category: "nail-art",
    title: "Nail Extension Removal Gurgaon | Professional Removal",
    h1: "Nail Extension Removal in Gurgaon",
    metaDescription:
      "Book professional nail extension removal in Gurgaon at KidSalonia for careful gel or acrylic nail removal.",
    serviceName: "Nail Extension Removal",
    serviceType: "Nail Extension Removal",
    intro:
      "Professional extension removal helps reduce unnecessary damage compared with peeling or removing extensions at home.",
    benefits: [
      "Professional removal process",
      "Careful handling of natural nails",
      "Suitable for gel and acrylic",
      "Optional nail care afterward",
    ],
    faqs: [
      {
        question: "Should I remove nail extensions at home?",
        answer:
          "Professional removal is recommended because peeling extensions at home can damage natural nails.",
      },
      {
        question: "Can I book removal by phone?",
        answer: bookingAnswer,
      },
    ],
  },
  {
    slug: "manicure",
    category: "manicure",
    title: "Manicure Gurgaon | Professional Hand & Nail Care",
    h1: "Manicure in Gurgaon",
    metaDescription:
      "Book manicure in Gurgaon at KidSalonia for clean nail shaping, hand care and relaxing manicure services.",
    serviceName: "Manicure",
    serviceType: "Manicure",
    intro:
      "KidSalonia provides manicure services focused on clean nails, neat shaping, hand care and a relaxing salon experience.",
    benefits: [
      "Clean nail shaping",
      "Hand and cuticle care",
      "Hygienic process",
      "Suitable for families",
    ],
    faqs: [
      {
        question: "What is included in a manicure?",
        answer:
          "The exact service may include nail shaping, cleaning, cuticle care and finishing depending on the selected package.",
      },
      {
        question: "How can I book?",
        answer: bookingAnswer,
      },
    ],
  },
  {
    slug: "kids-manicure",
    category: "manicure",
    title: "Kids Manicure Gurgaon | Gentle Nail Care for Children",
    h1: "Kids Manicure in Gurgaon",
    metaDescription:
      "Book a gentle kids manicure in Gurgaon at KidSalonia with child-friendly nail shaping, cleaning and optional nail colour.",
    serviceName: "Kids Manicure",
    serviceType: "Kids Manicure",
    intro:
      "Our kids manicure is a gentle nail care service designed to keep children's hands and nails neat and clean.",
    benefits: [
      "Gentle child-friendly service",
      "Basic nail cleaning and shaping",
      "Optional kids nail colour",
      "Comfortable salon setting",
    ],
    faqs: [
      {
        question: "Is manicure suitable for children?",
        answer:
          "Yes, our kids manicure uses a gentle approach appropriate for children's nails.",
      },
      {
        question: "How do I reserve a slot?",
        answer: bookingAnswer,
      },
    ],
  },
  {
    slug: "spa-manicure",
    category: "manicure",
    title: "Spa Manicure Gurgaon | Relaxing Hand & Nail Care",
    h1: "Spa Manicure in Gurgaon",
    metaDescription:
      "Enjoy a spa manicure in Gurgaon at KidSalonia with relaxing hand care, nail shaping and professional grooming.",
    serviceName: "Spa Manicure",
    serviceType: "Spa Manicure",
    intro:
      "Our spa manicure combines professional nail grooming with relaxing hand care for a refreshed and polished appearance.",
    benefits: [
      "Relaxing hand care",
      "Professional nail shaping",
      "Clean and hygienic process",
      "Polished finish",
    ],
    faqs: [
      {
        question: "How is a spa manicure different?",
        answer:
          "A spa manicure generally includes additional hand-care and relaxation steps beyond basic nail grooming.",
      },
      {
        question: "How can I book?",
        answer: bookingAnswer,
      },
    ],
  },
  {
    slug: "pedicure",
    category: "pedicure",
    title: "Pedicure Gurgaon | Professional Foot & Nail Care",
    h1: "Pedicure in Gurgaon",
    metaDescription:
      "Book pedicure in Gurgaon at KidSalonia for hygienic foot care, nail shaping and relaxing grooming services.",
    serviceName: "Pedicure",
    serviceType: "Pedicure",
    intro:
      "KidSalonia offers hygienic and comfortable pedicure services for clean nails, groomed feet and a relaxing salon experience.",
    benefits: [
      "Foot and nail grooming",
      "Clean and hygienic setup",
      "Relaxing service",
      "Suitable for families",
    ],
    faqs: [
      {
        question: "What does a pedicure include?",
        answer:
          "Services vary by package and may include nail cleaning, shaping and foot-care steps.",
      },
      {
        question: "How do I book a pedicure?",
        answer: bookingAnswer,
      },
    ],
  },
  {
    slug: "kids-pedicure",
    category: "pedicure",
    title: "Kids Pedicure Gurgaon | Gentle Foot Care for Children",
    h1: "Kids Pedicure in Gurgaon",
    metaDescription:
      "Book a gentle kids pedicure in Gurgaon at KidSalonia for child-friendly foot and toenail grooming.",
    serviceName: "Kids Pedicure",
    serviceType: "Kids Pedicure",
    intro:
      "Our kids pedicure uses a gentle approach to help keep children's feet and toenails neat, clean and comfortable.",
    benefits: [
      "Gentle child-friendly process",
      "Basic toenail grooming",
      "Comfortable salon environment",
      "Hygienic service",
    ],
    faqs: [
      {
        question: "Is pedicure safe for kids?",
        answer:
          "Yes, our kids pedicure is performed gently and adapted for children's needs.",
      },
      {
        question: "Can I book by phone?",
        answer: bookingAnswer,
      },
    ],
  },
  {
    slug: "spa-pedicure",
    category: "pedicure",
    title: "Spa Pedicure Gurgaon | Relaxing Foot Care",
    h1: "Spa Pedicure in Gurgaon",
    metaDescription:
      "Enjoy a relaxing spa pedicure in Gurgaon at KidSalonia with professional nail grooming and foot care.",
    serviceName: "Spa Pedicure",
    serviceType: "Spa Pedicure",
    intro:
      "Our spa pedicure provides relaxing foot care along with professional toenail grooming for a refreshed feeling.",
    benefits: [
      "Relaxing foot-care experience",
      "Professional nail grooming",
      "Hygienic salon setup",
      "Comfortable service",
    ],
    faqs: [
      {
        question: "What is included in a spa pedicure?",
        answer:
          "The selected spa package may include nail grooming and additional relaxing foot-care steps.",
      },
      {
        question: "Is advance booking recommended?",
        answer: bookingAnswer,
      },
    ],
  },
  {
    slug: "crystal-jelly-pedicure",
    category: "pedicure",
    title: "Crystal Jelly Pedicure Gurgaon | Relaxing Jelly Spa",
    h1: "Crystal Jelly Pedicure in Gurgaon",
    metaDescription:
      "Book a crystal jelly pedicure in Gurgaon at KidSalonia for a fun, relaxing and comfortable foot-care experience.",
    serviceName: "Crystal Jelly Pedicure",
    serviceType: "Crystal Jelly Pedicure",
    intro:
      "The crystal jelly pedicure offers a fun and relaxing foot-care experience with professional nail grooming.",
    benefits: [
      "Unique jelly spa experience",
      "Relaxing foot care",
      "Professional grooming",
      "Comfortable salon service",
    ],
    faqs: [
      {
        question: "What is a crystal jelly pedicure?",
        answer:
          "It is a specialised pedicure experience using a jelly-style soak along with nail and foot-care steps.",
      },
      {
        question: "How can I book?",
        answer: bookingAnswer,
      },
    ],
  },
  {
    slug: "hairdresser",
    category: "hairdresser",
    title: "Hairdresser Gurgaon | Kids & Family Hair Services",
    h1: "Hairdresser in Gurgaon",
    metaDescription:
      "Visit KidSalonia for hairdresser services in Gurgaon including kids haircuts, baby haircuts, styling and family grooming.",
    serviceName: "Hairdresser",
    serviceType: "Hairdresser",
    intro:
      "KidSalonia provides professional hairdresser services for kids and families, including haircuts, styling and grooming.",
    benefits: [
      "Experienced hairdressers",
      "Kids and family services",
      "Comfortable environment",
      "Convenient Gurgaon location",
    ],
    faqs: [
      {
        question: "Do you provide family hairdresser services?",
        answer:
          "Yes, KidSalonia provides a range of hair and grooming services for children and families.",
      },
      {
        question: "How do I book?",
        answer: bookingAnswer,
      },
    ],
  },
  {
    slug: "hair-spa",
    category: "hairdresser",
    title: "Hair Spa Gurgaon | Nourishing Hair Care",
    h1: "Hair Spa in Gurgaon",
    metaDescription:
      "Book a hair spa in Gurgaon at KidSalonia for nourishing hair care, conditioning and a relaxing salon experience.",
    serviceName: "Hair Spa",
    serviceType: "Hair Spa",
    intro:
      "Our hair spa service focuses on conditioning, nourishment and a relaxing hair-care experience.",
    benefits: [
      "Hair conditioning",
      "Relaxing salon experience",
      "Professional application",
      "Suitable treatment guidance",
    ],
    faqs: [
      {
        question: "Who can take a hair spa?",
        answer:
          "Suitability depends on age, hair condition and the selected product. Our team can guide you before service.",
      },
      {
        question: "How can I book?",
        answer: bookingAnswer,
      },
    ],
  },
  {
    slug: "hair-wash",
    category: "hairdresser",
    title: "Hair Wash Gurgaon | Professional Shampoo & Conditioning",
    h1: "Professional Hair Wash in Gurgaon",
    metaDescription:
      "Book a professional hair wash in Gurgaon at KidSalonia with shampoo, conditioning and gentle salon care.",
    serviceName: "Hair Wash",
    serviceType: "Hair Wash",
    intro:
      "KidSalonia provides professional shampoo and conditioning services with gentle handling and suitable hair-care products.",
    benefits: [
      "Professional shampoo service",
      "Gentle conditioning",
      "Suitable for children and families",
      "Comfortable salon care",
    ],
    faqs: [
      {
        question: "Can children get a professional hair wash?",
        answer:
          "Yes, professional hair wash services are available, subject to age and individual comfort.",
      },
      {
        question: "How can I book?",
        answer: bookingAnswer,
      },
    ],
  },
  {
    slug: "hair-styling",
    category: "hairdresser",
    title: "Hair Styling Gurgaon | Party & Event Hairstyles",
    h1: "Hair Styling in Gurgaon",
    metaDescription:
      "Book hair styling in Gurgaon at KidSalonia for parties, birthdays, family functions and special occasions.",
    serviceName: "Hair Styling",
    serviceType: "Hair Styling",
    intro:
      "Our hair styling services help children and families prepare for birthdays, parties, celebrations and special events.",
    benefits: [
      "Event-ready hairstyles",
      "Styles for kids and families",
      "Professional finishing",
      "Custom styling options",
    ],
    faqs: [
      {
        question: "Do you provide styling for events?",
        answer:
          "Yes, styling is available for birthdays, parties, family celebrations and other events.",
      },
      {
        question: "Should styling be booked in advance?",
        answer: bookingAnswer,
      },
    ],
  },
  {
    slug: "hair-colouring",
    category: "hairdresser",
    title: "Hair Colouring Gurgaon | Professional Hair Colour",
    h1: "Hair Colouring in Gurgaon",
    metaDescription:
      "Book professional hair colouring in Gurgaon at KidSalonia with colour consultation and salon application.",
    serviceName: "Hair Colouring",
    serviceType: "Hair Colouring",
    intro:
      "KidSalonia provides professional hair colouring services with consultation on colour preferences and suitable options.",
    benefits: [
      "Colour consultation",
      "Professional application",
      "Multiple shade options",
      "Aftercare guidance",
    ],
    faqs: [
      {
        question: "Can I discuss colour options before booking?",
        answer:
          "Yes, our team can discuss available colours and suitability before the service.",
      },
      {
        question: "How can I book?",
        answer: bookingAnswer,
      },
    ],
  },
  {
    slug: "hair-highlights",
    category: "hairdresser",
    title: "Hair Highlights Gurgaon | Stylish Colour Highlights",
    h1: "Hair Highlights in Gurgaon",
    metaDescription:
      "Book hair highlights in Gurgaon at KidSalonia for stylish colour placement, consultation and professional salon application.",
    serviceName: "Hair Highlights",
    serviceType: "Hair Highlights",
    intro:
      "Hair highlights can add dimension and colour to your hairstyle with placement chosen according to the desired look.",
    benefits: [
      "Custom colour placement",
      "Professional consultation",
      "Multiple shade options",
      "Modern styling result",
    ],
    faqs: [
      {
        question: "Can highlight colours be customised?",
        answer:
          "Yes, colour and placement can be discussed based on your desired result and hair condition.",
      },
      {
        question: "How do I book?",
        answer: bookingAnswer,
      },
    ],
  },
];

export const getServiceBySlug = (slug: string) =>
  seoServices.find((service) => service.slug === slug);
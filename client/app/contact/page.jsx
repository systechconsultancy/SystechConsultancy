import Contact from "./Contact";

export const metadata = {

  title: "Contact",
  description: "Have questions about studying in Germany? Contact our expert team for mentorship, consulting, or partnership inquiries. We're here to help you succeed.",

  alternates: {
    canonical: "/contact",
  },

  openGraph: {
    title: "Get in Touch with Systech Consultancy",
    description: "Your direct pathway to studying in Germany starts here. Contact us for expert guidance.",
    url: "/contact",
    siteName: 'Systech Consultancy',
    images: [
      {
        url: '/og-banner.png',
        width: 1200,
        height: 630,
        alt: 'Contact Systech Consultancy for German education guidance',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: "Get in Touch with Systech Consultancy",
    description: "Your direct pathway to studying in Germany starts here. Contact us for expert guidance.",
    images: ['/og-banner.png'],
  },
};

export default function ContactPage() {
  return <Contact />;
}
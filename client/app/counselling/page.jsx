import Counselling from "./Counselling"

export const metadata = {
    title: "Book a Counselling Session",
    description: "Book a 1-on-1 or group session for expert guidance on studying in Germany. Get clarity on universities, applications, visas, and your career path.",

    alternates: {
        canonical: "/counselling",
    },

    openGraph: {
        title: "Book Your Strategy Call | Systech Consultancy",
        description: "Get personalized, expert-led guidance for your journey to study in Germany.",
        url: "/counselling",
        siteName: 'Systech Consultancy',
        images: [
            {
                url: '/og-banner.png',
                width: 1200,
                height: 630,
                alt: 'Counselling Session Booking for Systech Consultancy',
            },
        ],
        locale: 'en_IN',
        type: 'website',
    },

    twitter: {
        card: 'summary_large_image',
        title: "Book Your Strategy Call | Systech Consultancy",
        description: "Get personalized, expert-led guidance for your journey to study in Germany.",
        images: ['/og-banner.png'],
    },
};

export default function CounsellingPage() {
    return <Counselling />;
}
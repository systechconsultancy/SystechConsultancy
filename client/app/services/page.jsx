import Link from "next/link";
import { services } from "./data.js";

export const metadata = {
  title: "Services",
  description: "Explore our comprehensive services for studying in Germany, including individual counselling, visa guidance, application assistance, and profile evaluation.",
  openGraph: {
    title: "Services for Studying in Germany | Systech Consultancy",
    description: "From university shortlisting to visa guidance, discover all the ways we can support your journey.",
    images: [{
      url: '/og-banner.png',
      width: 1200,
      height: 630,
    }],
  }
};

const Services = () => {
  return (
    <main className="px-6 md:px-10 lg:px-20 py-8 bg-white text-gray-800">
      <section className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
          Our Services
        </h1>

        <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-16">
          Our end-to-end support is designed to give you clarity and confidence at every stage of your journey to study in <strong className="text-blue-500">Germany and the EU</strong>.
        </p>

        {services.map((section) => (
          <div key={section.category} className="mb-14">
            <h2 className="text-2xl font-semibold mb-6 border-l-4 border-blue-500 pl-4">
              {section.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items.map((service) => (
                <div
                  key={service.title}
                  className="rounded-2xl shadow-md border border-gray-100 p-6 bg-gradient-to-br from-white to-blue-50 hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-semibold text-blue-700 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="mt-10 text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">Ready to Start Your Journey?</h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-8">
          Let's discuss your profile and build a personalized roadmap for your success in Germany.
        </p>
        <Link
          href="/counselling"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition-all duration-300 hover:scale-105"
        >
          Book a Counselling Session
        </Link>
      </section>
    </main>
  )
}

export default Services
export const metadata = {
  title: "Our Services",
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
  const services = [
    {
      category: "Core Services",
      items: [
        {
          title: "Individual Counselling",
          description: "One-on-one personalized mentoring with our expert to help you plan your higher education journey to Germany.",
        },
        {
          title: "Group Counselling",
          description: "Collaborative sessions for students with similar aspirations—cost-effective, yet insightful.",
        },
        {
          title: "Application Submission Assistance",
          description: "We help you prepare and submit your university applications with complete accuracy and timeliness.",
        },
        {
          title: "University Shortlisting",
          description: "Get a personalized list of German universities based on your profile, goals, and financial plan.",
        },
        {
          title: "Profile Evaluation",
          description: "We assess your academic and professional credentials to guide you on realistic and ambitious options.",
        },
      ],
    },
    {
      category: "Pre-Departure Preparation",
      items: [
        {
          title: "Visa Guidance",
          description: "Step-by-step assistance for your German student visa—from documentation to interview readiness.",
        },
        {
          title: "Passport Guidance",
          description: "Support for applying or renewing your passport in alignment with your application timeline.",
        },
        {
          title: "Blocked Account & Insurance Guidance",
          description: "Get help setting up Fintiba/Expatrio accounts and health insurance compliant with German laws.",
        },
        {
          title: "Pre-Departure Orientation",
          description: "Workshops to prepare you culturally, academically, and logistically before you leave for Germany.",
        },
      ],
    },
    {
      category: "Language & Skills Development",
      items: [
        {
          title: "Language Preparation",
          description: "Training paths for German and IELTS—covering A1 to B2 and strategies to clear with confidence.",
        },
        {
          title: "Skill Building",
          description: "Enhance your academic, digital, and professional skillsets to excel in the German education system.",
        },
      ],
    },
    {
      category: "Specialized Support",
      items: [
        {
          title: "R&D / Research Support",
          description: "Mentorship for thesis-based programs, research proposal writing, and professor outreach in Germany.",
        },
      ],
    },
  ];
  return (
    <main className="px-6 md:px-10 lg:px-20 py-16 bg-white text-gray-800">
      <section className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10">
          Our Services
        </h1>

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
    </main>
  )
}

export default Services
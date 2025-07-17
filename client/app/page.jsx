import Link from "next/link";
import Image from "next/image";
import LinkedInIcon from "./icons/LinkedInIcon";
import XingIcon from "./icons/XingIcon";
import TelephoneIcon from "./icons/TelephoneIcon";
import MailIcon from "./icons/MailIcon";

  export const metadata = {
    title: "Study in Germany | Systech Consultancy",
    description:
      "Led by a former German R&D Director, we offer expert-led strategy, admission, and visa support for students aspiring to study in Germany.",
    openGraph: {
      title: "Systech Consultancy — Study in Germany",
      description:
        "Study in Germany with mentorship from a 20+ year German industry veteran. Book your strategy session today.",
      url: "https://systechconsultancy.in/",
      type: "website",
      images: [
        {
          url: "https://systechconsultancy.in/og-banner.png",
          width: 1200,
          height: 630,
          alt: "Systech Consultancy Banner",
        },
      ],
    },
    alternates: {
      canonical: "https://systechconsultancy.in/",
    },
  };


export default function Home() {
  return (
    <>



      <section className="bg-gradient-to-r from-blue-50 to-white py-4 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-blue-900 leading-tight">
              Your Gateway to{" "}
              <span className="text-[#ad34d9]">World-Class Education</span> and Careers in{" "}
              <span className="text-[#ad34d9]">Germany</span> & the EU
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Our consultancy is led by a 20‑year German industry veteran — delivering insider-level guidance,
              program strategy, and professional networking for students across all disciplines.
            </p>
            <Link href="/counselling">
              <button className="cursor-pointer bg-gradient-to-r from-[#FF6B00] via-white to-[#00A859] hover:brightness-105 text-blue-900 font-semibold py-3 px-4 rounded-xl shadow-md border border-blue-200 transition-all duration-300 ease-in-out">
                Reserve Your Counselling Slot Today
              </button>
            </Link>
          </div>

          {/* Hero Image */}
          <div className="flex flex-col items-center lg:items-start relative">
            <div className="relative w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] xl:w-[600px] aspect-[16/10]">
              <Image
                src="/hero_section_img.png"
                alt="Mentor and student brainstorming"
                fill
                priority={true}
                className="object-cover rounded-2xl shadow-2xl border border-gray-200"
              />
            </div>
            <div className="flex gap-7 mt-3 w-full items-center justify-center">
              <a
                href="https://www.linkedin.com/in/malikireddy/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                <LinkedInIcon />
              </a>

              <a
                href="https://www.xing.com/profile/Malikireddy_KrishnaReddy04177"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Xing"
                className="text-green-600 hover:text-green-800 transition-colors"
              >
                <XingIcon />
              </a>

              <a
                href="tel:+919390330592"
                aria-label="Call"
                className="text-gray-700 hover:text-black transition-colors"
              >
                <TelephoneIcon />
              </a>

              {/* Mail */}
              <a
                href="mailto:contact@systechconsultancy.in"
                aria-label="Email"
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                <MailIcon />
              </a>

            </div>
          </div>

        </div>
      </section>

      <section className="py-4 px-6 md:px-12 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-8">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-900 leading-tight ">
            Powered by <span className="text-[#ad34d9]">20+ Years</span> of German Industry Experience
          </h2>

          <p className="text-lg md:text-xl text-gray-700 text-justify leading-relaxed max-w-3xl">
            With two decades of senior leadership in Germany's high-tech and engineering sectors, our founder brings unmatched real-world insights and industry access — now made available to you through structured, career-aligned guidance. This isn’t generic counselling; it’s mentorship built on actual German experience.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            {[
              "Strategic Program Planning",
              "Real-World Industry Insights",
              "Access to German Networks",
              "Mentorship Across All Fields",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
              >
                <span className="bg-blue-600 text-white p-2 rounded-full text-sm">✔</span>
                <span className="text-gray-800 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-4 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-900 mb-12 leading-tight">
            Why Choose <span className="text-[#00A859]">Germany</span>?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Affordable, World-Class Education",
                desc: "Minimal semester fees (€150–350) at top-ranked universities.",
              },
              {
                title: "Launch Your Global Career",
                desc: "Secure your future with an 18‑month job seeker visa, opening doors to top-tier companies across the EU.",
              },
              {
                title: "Industry‑University Synergy",
                desc: "Hands-on exposure through tie-ups with top German companies.",
              },
              {
                title: "Cultural & Personal Growth",
                desc: "Safe, multicultural life with part-time work and EU travel access.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-gradient-to-b from-blue-50 to-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 text-left"
              >
                <h3 className="text-lg font-semibold text-blue-900 mb-2">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-4 px-6 md:px-12 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-900 leading-tight text-justify sm:text-center">
            What We Provide <span className="text-[#ad34d9]">— End-to-End Support</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Strategic Program Selection",
                desc: "We don’t just list options—we align your profile with the most suitable German universities and programs across fields like CS, management, data, design, mechanical, and more.",
              },
              {
                title: "Application to Visa Guidance",
                desc: "From selecting universities, admission processes, blocked account setup, and visa interview prep—we simplify the entire process.",
              },
              {
                title: "Expert-Led Mentorship & Career Access",
                desc: "Get mentored by a 20-year German industry expert and gain insider insights, long-term guidance, and exposure to real German work culture and networks.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 text-left"
              >
                <h3 className="text-lg font-semibold text-blue-900 mb-2">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-4 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-900 leading-tight">
            How We Work
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1. Strategy Call",
                desc: "Zero‑commitment session to explore your ambitions and define the roadmap.",
              },
              {
                step: "2. Personalized Roadmap",
                desc: "Receive your program shortlist, refined SOP/CV, and visa timeline.",
              },
              {
                step: "3. Mentorship & Network",
                desc: "Regular sessions + access to Germany-based industry connections.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-gradient-to-b from-blue-50 to-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 text-left"
              >
                <h3 className="text-lg font-semibold text-blue-900 mb-2">{item.step}</h3>
                <p className="text-gray-700 leading-relaxed text-justify">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-4 px-6 md:px-12 lg:px-20 text-center bg-white">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight text-blue-900">
            Your Germany Path Starts Here
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-justify sm:text-center text-gray-700">
            No false promises—just clarity, industry-driven mentorship, and real advisory access.
          </p>
          <Link 
            href="/counselling"
            className="cursor-pointer bg-gradient-to-r from-[#000000] via-[#DD0000] to-[#FFCE00] hover:brightness-105 text-white font-semibold py-3 px-4 rounded-xl shadow-md border border-gray-300 transition-all duration-300 ease-in-out"
          >
            Reserve Your Counselling Slot Today
          </Link>

        </div>
      </section>
    </>
  );
}

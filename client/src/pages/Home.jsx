import { Link } from "react-router-dom";
import HeroImg from "../assets/hero_section_img.png";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>

      <Helmet>
        <title>Study in Germany with Industry-led Mentorship | Systech Consultancy</title>
        <meta name="description" content="Led by a former German R&D Director, we offer expert-led strategy, admission, and visa support for students aspiring to study in Germany." />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Systech Consultancy — Study in Germany" />
        <meta property="og:description" content="Study in Germany with mentorship from a 20+ year German industry veteran. Book your strategy session today." />
        <meta property="og:image" content="https://systechconsultancy.in/og-banner.png" />
        <meta property="og:url" content="https://systechconsultancy.in/" />
        <meta property="og:type" content="website" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://systechconsultancy.in/" />
      </Helmet>

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
            <Link to="/counselling">
              <button className="cursor-pointer bg-gradient-to-r from-[#FF6B00] via-white to-[#00A859] hover:brightness-105 text-blue-900 font-semibold py-3 px-4 rounded-xl shadow-md border border-blue-200 transition-all duration-300 ease-in-out">
                Reserve Your Counselling Slot Today
              </button>
            </Link>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center md:justify-end">
            <div className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] xl:w-[600px] aspect-[16/10]">
              <img
                src={HeroImg}
                alt="Mentor and student brainstorming"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover rounded-2xl shadow-2xl border border-gray-200"
              />
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
            ].map((item, i) => (
              <div
                key={i}
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
                title: "Clear Post‑Study Pathway",
                desc: "18‑month job seeker visa with excellent career prospects.",
              },
              {
                title: "Industry‑University Synergy",
                desc: "Hands-on exposure through tie-ups with top German companies.",
              },
              {
                title: "Cultural & Personal Growth",
                desc: "Safe, multicultural life with part-time work and EU travel access.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
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
            ].map((item, idx) => (
              <div
                key={idx}
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
            ].map((item, idx) => (
              <div
                key={idx}
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
          <Link to="/counselling">
            <button className="cursor-pointer bg-gradient-to-r from-[#000000] via-[#DD0000] to-[#FFCE00] hover:brightness-105 text-white font-semibold py-3 px-4 rounded-xl shadow-md border border-gray-300 transition-all duration-300 ease-in-out">
              Reserve Your Counselling Slot Today
            </button>
          </Link>

        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import Image from "next/image";

// app/page.jsx

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
                loading="lazy"
                decoding="async"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                </svg>
              </a>

              <a
                href="https://www.xing.com/profile/Malikireddy_KrishnaReddy04177"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Xing"
                className="text-green-600 hover:text-green-800 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 28 31"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path fill="#0698A0" d="m1.81 5.986 3.655 6.479L0 22.021h6.515l5.429-9.556-3.656-6.479z" />
                  <path fill="#B7DF4B" d="M21.207 0 10.67 18.644 17.464 31h6.615l-6.905-12.356L27.713 0z" />
                </svg>
              </a>

              <a
                href="tel:+919390330592"
                aria-label="Call"
                className="text-gray-700 hover:text-black transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="w-6 h-6"
                >
                  <path
                    d="M38.29 38.29 37 39.64a3.22 3.22 0 0 1-3.05.86l-.25-.06C19.83 37 11.05 28.17 7.56 14.34l-.06-.24a3.22 3.22 0 0 1 .86-3l1.35-1.39a3.24 3.24 0 0 1 4.58 0l4 4a3.23 3.23 0 0 1 0 4.58l-.91.91a5.31 5.31 0 0 0-.25 7.16 41.75 41.75 0 0 0 4.51 4.51 5.31 5.31 0 0 0 7.16-.25l.91-.91a3.3 3.3 0 0 1 4.58 0l4 4a3.23 3.23 0 0 1 0 4.58z"
                    fill="#4891d3"
                  />
                  <path
                    d="M16 17a1 1 0 0 1-.71-.29l-7-7a1 1 0 0 1 1.42-1.42l7 7a1 1 0 0 1 0 1.42A1 1 0 0 1 16 17zM36 37a1 1 0 0 1-.71-.29l-7-7a1 1 0 0 1 1.42-1.42l7 7a1 1 0 0 1 0 1.42A1 1 0 0 1 36 37z"
                    fill="#2d72bc"
                  />
                  <path
                    d="M32 24a1 1 0 0 1-1-1 6 6 0 0 0-6-6 1 1 0 0 1 0-2 8 8 0 0 1 8 8 1 1 0 0 1-1 1z"
                    fill="#a1d51c"
                  />
                  <path
                    d="M37 24a1 1 0 0 1-1-1 11 11 0 0 0-11-11 1 1 0 0 1 0-2 13 13 0 0 1 13 13 1 1 0 0 1-1 1z"
                    fill="#a1d51c"
                  />
                  <path
                    d="M42 24a1 1 0 0 1-1-1A16 16 0 0 0 25 7a1 1 0 0 1 0-2 18 18 0 0 1 18 18 1 1 0 0 1-1 1z"
                    fill="#a1d51c"
                  />
                  <path
                    d="m39.71 32.29-4-4a5.26 5.26 0 0 0-7.42 0l-.91.91a3.24 3.24 0 0 1-4.44.15 38.62 38.62 0 0 1-4.29-4.29 3.24 3.24 0 0 1 .15-4.44l.91-.91a5.26 5.26 0 0 0 0-7.42l-4-4a5.26 5.26 0 0 0-7.42 0L7 9.64a5.22 5.22 0 0 0-1.39 4.95l.06.24c3.68 14.6 13 23.87 27.54 27.55l.25.06a4.74 4.74 0 0 0 1.24.16 5.28 5.28 0 0 0 3.71-1.55l1.35-1.34a5.26 5.26 0 0 0-.05-7.42z"
                    fill="#192835"
                  />
                </svg>

              </a>

              {/* Mail */}
              <a
                href="mailto:contact@systechconsultancy.in"
                aria-label="Email"
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
                </svg>
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
          <Link href="/counselling">
            <button className="cursor-pointer bg-gradient-to-r from-[#000000] via-[#DD0000] to-[#FFCE00] hover:brightness-105 text-white font-semibold py-3 px-4 rounded-xl shadow-md border border-gray-300 transition-all duration-300 ease-in-out">
              Reserve Your Counselling Slot Today
            </button>
          </Link>

        </div>
      </section>
    </>
  );
}

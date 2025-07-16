import Image from "next/image";
import Link from "next/link";
import LinkedInIcon from "../icons/LinkedInIcon";
import XingIcon from "../icons/XingIcon";
import TelephoneIcon from "../icons/TelephoneIcon";
import MailIcon from "../icons/MailIcon";

export const metadata = {
  title: "About",
  description: "Learn about Systech Consultancy's mission to provide expert, mentorship-driven guidance for Indian students aspiring to study in Germany, led by 20-year industry veteran Malikireddy Krishna Reddy.",
  openGraph: {
    title: "About Systech Consultancy",
    description: "Discover our expert-led approach to German higher education.",
    images: [{
      url: '/og-banner.png',
      width: 1200,
      height: 630,
    }],
  }
};

export default function About() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-blue-50 to-white py-6 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 md:px-16">
          <h1 className="text-blue-900 font-bold leading-tight text-[clamp(1.8rem,4vw,2.8rem)] text-center mb-6">
            About <span className="text-pink-500">SystechConsultancy</span>
          </h1>

          <div className="space-y-6 text-[clamp(1rem,2.2vw,1.15rem)] text-gray-700 text-justify leading-relaxed">
            <p>
              <strong>SystechConsultancy</strong> is a specialized Indo-German higher education consultancy built on deep industry roots, real mentorship, and results-oriented guidance. We help Indian students and professionals unlock admission to Germany’s top public universities—by aligning aspirations with structured strategy and local expertise.
            </p>

            <p>
              Unlike typical study-abroad agencies, our guidance is led directly by <strong>Malikireddy Krishna Reddy</strong>, an R&D Director with 20+ years of experience at Mercedes-Benz, Bosch, Siemens, and more. Our advice isn’t outsourced—it’s based on firsthand insight from someone who has lived, worked, and succeeded in Germany’s academic and professional ecosystem.
            </p>

            <p>
              We work closely with students to build the right program fit, navigate housing and part-time jobs after arrival. Every service is tailored — not templated — because your journey deserves clarity, confidence, and long-term career value.
            </p>

            <p className="text-gray-800 font-medium">
              🤝 <strong>Strategic Tie-Ups:</strong> We collaborate with trusted global and domestic partners to strengthen our student services — from visa guidance and university selection to post-arrival integration in Germany.
            </p>

          </div>

        </div>
      </section>

      {/* FOUNDER SECTION */}
      <section className="bg-white py-6 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-blue-900 text-[clamp(1.6rem,4vw,2.3rem)] font-semibold mb-10">
            Meet the Visionary Behind Our Journey
          </h2>

          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Image + Divider Wrapper */}
            <div className="flex flex-col items-center lg:items-start relative">

              <Image
                src="/founder.jpg"
                alt="Malikireddy Krishna Reddy"
                width={300}
                height={300}
                className="rounded-3xl w-[250px] h-[250px] lg:w-[300px] lg:h-[300px] object-cover shadow-lg"
              />

              <div className="flex gap-5 mt-3 w-full items-center justify-center">
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
                  href="mailto:malikireddy@hotmail.com"
                  aria-label="Email"
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  <MailIcon />
                </a>

              </div>

              {/* Divider for large screens */}
              <div className="hidden lg:block h-full w-[2px] bg-gray-300 absolute right-[-32px] top-0 bottom-0" />
            </div>


            {/* Text Section */}
            <div className="flex-1 space-y-6 text-[clamp(1rem,2vw,1.1rem)] text-gray-800">
              <p className="leading-relaxed text-justify">
                With over two decades in German R&D, Malikireddy Krishna Reddy is an engineer, innovator, and educator with firsthand experience at Mercedes-Benz, Bosch, Siemens, and more. His mentorship reflects the perfect blend of technical depth, academic clarity, and cultural insight.
              </p>

              <ul className="space-y-4 leading-relaxed">
                <li>🎓 <strong>Education:</strong> M.S. Automotive Systems – RWTH Aachen, Germany</li>
                <li>⚙️ <strong>Expertise:</strong> Systems Engineering, MBSE, MBD, CFD, Powertrain, Safety Systems</li>
                <li>🏢 <strong>Experience:</strong> 21+ years in the German automotive & renewable sectors</li>
                <li>📘 <strong>Patents:</strong> Multiple innovations in control systems, injectors, and blade friction</li>
                <li>🌍 <strong>Consulting:</strong> Indo-European training, cross-cultural hiring, project strategy</li>
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* DIFFERENTIATORS */}
      <section className="bg-gray-50 py-6 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-blue-900 text-[clamp(1.6rem,4vw,2.3rem)] font-semibold mb-10">
            What Sets <span className="text-pink-500">SystechConsultancy</span> Apart?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-gray-800 text-[clamp(1rem,2vw,1.1rem)]">
            {[
              {
                title: "🎯 Program Strategy, Not Guesswork",
                desc: "We align your academic/professional profile with the right German universities—not just based on rankings, but real placement outcomes and visa success."
              },
              {
                title: "🧠 Real Mentor, Not Middlemen",
                desc: "Your journey is personally overseen by our founder—not outsourced to junior agents. You learn from someone who’s lived, worked, and thrived in Germany."
              },
              {
                title: "📈 Visa & Beyond",
                desc: "We offer deep support—SOP drafts, blocked accounts, CV rewrites, visa interview prep, part-time job guidance, post-arrival housing, and more."
              }
            ].map(({ title, desc }) => (
              <div
                key={title}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-justify"
              >
                <h4 className="text-lg font-semibold text-blue-800 mb-2">{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDO-GERMAN EDGE */}
      <section className="bg-gradient-to-r from-pink-100 via-blue-50 to-green-100 py-6 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-blue-900 text-[clamp(1.6rem,4vw,2.3rem)] font-semibold mb-10">
            Our Indo-German Advantage
          </h2>
          <div className="grid md:grid-cols-2 gap-10 text-[clamp(1rem,2vw,1.1rem)] text-gray-800 leading-relaxed">
            <ul className="space-y-4 list-disc list-inside">
              <li><strong>🇮🇳 Rooted in India:</strong> We understand India’s academic systems, student pain-points, and middle-class constraints.</li>
              <li><strong>🇩🇪 Fluent in Germany:</strong> With 20+ years in Germany, we know the inside workings of universities, visa offices, and industries.</li>
              <li><strong>🎙️ Cultural Bridging:</strong> We train you to thrive in German work and social environments with confidence and clarity.</li>
            </ul>
            <ul className="space-y-4 list-disc list-inside">
              
              <li><strong>📦 End-to-End Support:</strong> From program curation to departure to post-arrival checklists—we offer complete handholding.</li>
              <li><strong>🔗 Lifetime Mentorship:</strong> Stay connected even after landing in Germany—for jobs, internships, and PR advice.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-6 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-[clamp(1.6rem,4vw,2.2rem)] font-bold text-blue-900 mb-4">
            Let’s Design Your Germany Roadmap
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Don’t rely on luck. Build your journey with guidance, structure, and mentorship from someone who’s lived the path you’re aiming for.
          </p>
          <Link 
            href="/counselling"
            className="cursor-pointer bg-gradient-to-r from-[#000000] via-[#DD0000] to-[#FFCE00] hover:brightness-105 text-white font-semibold py-3 px-4 rounded-xl shadow-md border border-gray-300 transition-all duration-300 ease-in-out"
          >
            Book Your Strategy Call Now
          </Link>
        </div>
      </section>
    </>
  );
}

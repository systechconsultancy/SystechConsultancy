import React from "react";

export default function About() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-blue-900 font-bold text-balance leading-tight text-[clamp(1.8rem,4vw,2.8rem)] mb-6 transition-all">
              About <span className="text-pink-500">SystechConsultancy</span>
            </h1>
            <p className="text-gray-700 text-[clamp(1rem,2.2vw,1.15rem)] leading-relaxed mb-6 transition-all text-justify">
              SystechConsultancy is more than a consultancy — it's a bridge between India's aspirations and Germany's world-class education ecosystem. Our mission is to equip ambitious Indian students and professionals with strategic, structured pathways to higher education and career access in Europe.
            </p>
            <p className="text-gray-700 text-[clamp(0.95rem,2vw,1.1rem)] text-justify transition-all">
              Every student receives personal attention, and every decision is backed by real-world insight—not assumptions. We're led by deep-rooted Indo-German experience, making the journey smooth, authentic, and future-proof.
            </p>
          </div>
          <img
            src="/assets/about-indo-german.jpg"
            alt="Germany and India education pathway"
            className="w-full rounded-xl shadow-xl transition duration-500 hover:scale-[1.02]"
          />
        </div>
      </section>

      {/* FOUNDER SECTION */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-blue-900 text-[clamp(1.6rem,4vw,2.3rem)] font-semibold mb-6">
            Meet the Visionary Behind Our Journey
          </h2>
          <p className="text-gray-700 text-[clamp(1rem,2vw,1.15rem)] max-w-3xl mx-auto mb-12 leading-relaxed text-balance">
            With over two decades in German R&D, Maliki Reddy Krishna Reddy is an engineer, innovator, and educator with firsthand experience at Mercedes-Benz, Bosch, Siemens, and more. His mentorship reflects the perfect blend of technical depth, academic clarity, and cultural insight.
          </p>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <img
              src="/assets/founder-portrait.jpg"
              alt="Maliki Reddy"
              className="w-full rounded-xl shadow-lg transition duration-500 hover:scale-105"
            />
            <ul className="text-left space-y-4 text-[clamp(0.95rem,2vw,1.05rem)] text-gray-800 leading-relaxed">
              <li>
                🎓 <strong>Education:</strong> M.S. Automotive Systems – RWTH Aachen, Germany
              </li>
              <li>
                ⚙️ <strong>Expertise:</strong> Systems Engineering, MBSE, MBD, CFD, Powertrain, Safety Systems
              </li>
              <li>
                🏢 <strong>Experience:</strong> 21+ years in the German automotive & renewable sectors
              </li>
              <li>
                📘 <strong>Patents:</strong> Multiple innovations in control systems, injectors, and blade friction
              </li>
              <li>
                🌍 <strong>Consulting:</strong> Indo-European training, cross-cultural hiring, project strategy
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATORS */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-10">
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
            ].map(({ title, desc }, i) => (
              <div
                key={i}
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
      <section className="bg-gradient-to-r from-pink-100 via-blue-50 to-green-100 py-16 px-4 sm:px-6 lg:px-10">
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
              <li><strong>✍️ Tailored SOPs:</strong> Every student gets a professionally edited, impactful Statement of Purpose and CV—not templates.</li>
              <li><strong>📦 End-to-End Support:</strong> From program curation to departure to post-arrival checklists—we offer complete handholding.</li>
              <li><strong>🔗 Lifetime Mentorship:</strong> Stay connected even after landing in Germany—for jobs, internships, and PR advice.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-[clamp(1.6rem,4vw,2.2rem)] font-bold text-blue-900 mb-4">
            Let’s Design Your Germany Roadmap
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Don’t rely on luck. Build your journey with guidance, structure, and mentorship from someone who’s lived the path you’re aiming for.
          </p>
          <a href="/counselling">
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition-all duration-300 hover:scale-105">
              Book Strategy Call for ₹250
            </button>
          </a>
        </div>
      </section>
    </>
  );
}

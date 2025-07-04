import founderImg from "../assets/founder.jpg";

export default function About() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-10">
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
              We work closely with students to build the right program fit, craft , and navigate housing and part-time jobs after arrival. Every service is tailored—not templated—because your journey deserves clarity, confidence, and long-term career value.
            </p>

            <p className="text-gray-800 font-medium">
              🤝 <strong>Strategic Tie-Ups:</strong> We collaborate with trusted global and domestic partners to strengthen our student services — from visa guidance and university selection to post-arrival integration in Germany.
            </p>

          </div>

        </div>
      </section>

      {/* FOUNDER SECTION */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-blue-900 text-[clamp(1.6rem,4vw,2.3rem)] font-semibold mb-10">
            Meet the Visionary Behind Our Journey
          </h2>

          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Image + Divider Wrapper */}
            <div className="flex flex-col items-center lg:items-start relative">

              <img
                src={founderImg}
                alt="Malikireddy Krishna Reddy"
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
                  href="mailto:malikireddy@hotmail.com"
                  aria-label="Email"
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
                  </svg>
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

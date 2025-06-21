import { Link } from "react-router-dom";
export default function Home() {
  return (
    <>
      <section className="bg-gradient-to-r from-blue-50 to-white py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-5xl font-bold text-blue-900 mb-4 leading-tight">
              Your Strategic Partner for <span className="text-pink-500">Germany & EU’s</span> Higher Education
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Our consultancy is led by a 20‑year German industry veteran — delivering insider-level guidance, program strategy, and professional networking for students across all disciplines.
            </p>
            <Link to="/counselling">
              <button className="cursor-pointer bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition">
                Book a Strategy Call for 250₹
              </button>
            </Link>
          </div>
          <div>
            <img src="/assets/hero-mentorship.jpg" alt="Mentor and student brainstorming" className="rounded-xl shadow-xl w-full" />
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-semibold text-blue-900">
            Powered by 20+ Years of German Industry Experience
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            With two decades of senior leadership in Germany's high-tech and engineering sectors, our founder brings unmatched real-world insights and industry access—now made available to you through structured, career-aligned guidance. This isn’t generic counselling; it’s mentorship built on actual German experience.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 pt-4">
            {[
              "Strategic Program Planning",
              "Real-World Industry Insights",
              "Access to German Networks",
              "Mentorship Across All Fields",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-white p-4 rounded-xl shadow hover:shadow-md transition"
              >
                <span className="bg-blue-600 text-white p-2 rounded-full">✔</span>
                <span className="text-gray-800 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center text-green-400 mb-12">
            Why Germany?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[{
              title: "Affordable, World-Class Education",
              desc: "Minimal semester fees (€150–350) at top-ranked universities."
            }, {
              title: "Clear Post‑Study Pathway",
              desc: "18‑month job seeker visa + excellent chance for career operations."
            }, {
              title: "Industry‑University Synergy",
              desc: "Hands-on exposure through university tie-ups with top companies."
            }, {
              title: "Cultural & Personal Growth",
              desc: "Safe, multicultural, part-time work + European travel."
            }].map((item, idx) => (
              <div key={idx} className="bg-gradient-to-b from-white to-blue-50 p-6 rounded-xl shadow-md">
                <h3 className="font-bold text-blue-900 mt-4 mb-2">{item.title}</h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-blue-900 mb-12">
            What We Provide
            <span className="text-pink-500">—End to End Support</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[{
              title: "Strategic Program Selection",
              desc: "We don’t just list options—we align your profile with the most suitable German universities and programs across fields like CS, management, data, design, mechanical, and more."
            },
            {
              title: "Application to Visa Guidance",
              desc: "From selecting universities, admission processes, blocked account setup, and visa interview prep—we simplify the entire process."
            },
            {
              title: "Expert-Led Mentorship & Career Access",
              desc: "Get mentored by a 20-year German industry expert and gain insider insights, long-term guidance, and exposure to real German work culture and networks."
            }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition text-justify">
                <h3 className="text-xl font-semibold mb-2 text-black">{item.title}</h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-semibold text-blue-900">How We Work</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[{
              step: "1. Strategy Call",
              desc: "Zero‑commitment session to explore your ambitions and define the roadmap."
            }, {
              step: "2. Personalized Roadmap",
              desc: "Receive your program shortlist, refined SOP/CV, and visa timeline."
            }, {
              step: "3. Mentorship & Network",
              desc: "Regular sessions + access to Germany-based industry connections."
            }].map((item, idx) => (
              <div key={idx} className="bg-gradient-to-b from-blue-50 to-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold mb-2">{item.step}</h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <blockquote className="p-8 bg-white rounded-xl shadow-xl italic text-gray-700 relative">
            <span className="absolute -top-5 left-5 text-6xl text-pink-200">“</span>
            <p className="mt-4">
              “The strategic counsel combined with insider network introductions truly boosted my confidence throughout the application process.”
            </p>
            <footer className="mt-6 text-right font-semibold">— Ananya, Aspiring CS Student</footer>
          </blockquote>
        </div>
      </section> */}

      <section className="py-16 px-6 bg-gradient-to-r from-pink-500 via-violet-500 to-blue-600 text-white text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">Your Germany Path Starts Here</h2>
          <p className="text-lg">
            No false promises—just clarity, industry-driven mentorship, and real advisory access.
          </p>
          <Link to="/contact">
            <button className="cursor-pointer bg-white text-pink-500 font-semibold py-3 px-8 rounded shadow-lg hover:bg-gray-100 transition">
              Schedule Your Strategy Call
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}

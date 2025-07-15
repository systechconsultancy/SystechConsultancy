import React from "react";

export default function Contact() {
  return (
    <>
      {/* CONTACT HERO */}
      <section className="bg-gradient-to-r from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-blue-900 mb-4 leading-tight text-balance">
            Get in Touch with <span className="text-pink-500">SystechConsultancy</span>
          </h1>
          <p className="text-gray-700 text-[clamp(1rem,2vw,1.15rem)] max-w-2xl mx-auto">
            Whether you're a student exploring Germany or a parent with questions—we’re here to guide you. Reach out for mentorship, consulting, or partnerships.
          </p>
        </div>
      </section>

      {/* FORM & INFO SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-10 bg-gray-50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
          {/* CONTACT FORM */}
          <form className="bg-white p-8 rounded-xl shadow-md space-y-6 transition-all text-black">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">Contact Form</h2>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium text-gray-800">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full border-b border-gray-400 bg-transparent px-0 py-2 focus:outline-none focus:border-pink-500 transition"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-800">Email</label>
                <input
                  type="email"
                  required
                  className="w-full border-b border-gray-400 bg-transparent px-0 py-2 focus:outline-none focus:border-pink-500 transition"
                  placeholder="you@gmail.com"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-800">Phone</label>
                <input
                  type="tel"
                  className="w-full border-b border-gray-400 bg-transparent px-0 py-2 focus:outline-none focus:border-pink-500 transition"
                  placeholder="9999999999"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-800">Subject</label>
                <input
                  type="text"
                  className="w-full border-b border-gray-400 bg-transparent px-0 py-2 focus:outline-none focus:border-pink-500 transition"
                  placeholder="e.g. Counselling, Partnership"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-800">Message</label>
              <textarea
                rows="5"
                className="w-full border-b border-gray-400 bg-transparent px-0 py-2 focus:outline-none focus:border-pink-500 transition resize-y"
                placeholder="How can we help you?"
              />
            </div>

            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-md shadow-md transition"
            >
              Submit Message
            </button>
          </form>

          {/* CONTACT DETAILS */}
          <div className="bg-white p-8 rounded-xl shadow-md space-y-6 transition-all text-gray-800 text-[clamp(1rem,2vw,1.1rem)]">
            <h2 className="text-2xl font-semibold text-blue-900">Contact Information</h2>

            <div>
              <p className="mb-1 font-medium">Address:</p>
              <p className="text-gray-700">
                Systech Consultancy, Indu Royal Homes,<br />
                Nandyal, Andhra Pradesh, India<br />
                PIN – 518501
              </p>
            </div>

            <div>
              <p className="mb-1 font-medium">Phone Numbers:</p>
              <p className="text-gray-700">
                <a href="tel:+919390330592" className="hover:text-blue-400">+91 9390330592</a><br />
                <a href="tel:+918096343600" className="hover:text-blue-400">+91 8096343600</a>
              </p>
            </div>

            <div>
              <p className="mb-1 font-medium">Email:</p>
              <p className="text-gray-700">
                <a href="mailto:contact@systechconsultancy.in" className="hover:text-blue-400">
                  contact@systechconsultancy.in
                </a>
              </p>
            </div>

            <div>
              <p className="mb-1 font-medium">Support Hours:</p>
              <p className="text-gray-700">
                Mon–Sun, 10AM – 6PM IST
              </p>
            </div>

            <div className="w-full flex justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3479.327911865857!2d78.46019807458907!3d15.496127154526404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTXCsDI5JzQ2LjAiTiA3OMKwMjcnNDYuMCJF!5e1!3m2!1sen!2sin!4v1751396296729!5m2!1sen!2sin"
                width="100%"
                height="250"
                style={{ border: 0, maxWidth: "600px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Systech Consultancy Location"
              />
            </div>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-pink-500 text-white py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">Prefer Talking Directly?</h2>
          <p className="text-lg">
            Schedule a one-on-one strategy call and get started with clarity.
          </p>
          <a href="/counselling">
            <button className="bg-white text-pink-600 hover:text-pink-700 font-semibold py-3 px-8 rounded shadow-md transition hover:scale-105">
              Book Now for ₹250
            </button>
          </a>
        </div>
      </section>
    </>
  );
}
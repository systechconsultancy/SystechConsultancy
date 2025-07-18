"use client";
import { useState } from "react";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  DevicePhoneMobileIcon,
  ListBulletIcon,
} from "@heroicons/react/24/solid";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((res) => setTimeout(res, 1000));
    setStatus("success");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#b0eeeb] to-[#f5f2f3] py-10 px-4 lg:px-16">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden ring-1 ring-gray-200">
        {/* Left Section */}
        <div className="col-span-12 lg:col-span-5 bg-gradient-to-br from-indigo-500 to-indigo-900 text-white p-10 flex flex-col justify-between space-y-8">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="a" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M0 0h40v40H0z" fill="none" /><path d="M20 0v40M0 20h40" stroke="white" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#a)" />
            </svg>
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-semibold mb-3">Let's Connect</h2>
            <p className="text-blue-100 mb-6">
              Reach out to us for inquiries, support, or consultation. We're here to help.
            </p>
            <div className="space-y-4 text-sm">
              <div className="space-y-3">
                <ContactItem
                  icon={<PhoneIcon className="w-5 h-5 text-blue-300" />}
                  label="+91 93903 30592"
                  link="tel:+919390330592"
                />
                <ContactItem
                  icon={<PhoneIcon className="w-5 h-5 text-blue-300" />}
                  label="+91 80963 43600"
                  link="tel:+918096343600"
                />
              </div>
              <ContactItem
                icon={<EnvelopeIcon className="w-5 h-5 text-blue-300" />}
                label="contact@systechconsultancy.in"
                link="mailto:contact@systechconsultancy.in"
              />
              <div className="flex gap-3 items-start">
                <MapPinIcon className="w-5 h-5 text-blue-300 mt-1" />
                <span>
                  Indu Royal Homes, Nandyal, Andhra Pradesh 518501, India
                </span>
              </div>
            </div>
          </div>

          <div className="text-sm">
            <h3 className="text-white font-medium mb-2">Additional Info</h3>
            <p className="text-blue-100">
              We guide students, assist with applications, and simplify your journey abroad.
            </p>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="col-span-12 lg:col-span-7 bg-slate-50/80 p-10 transition duration-300 ease-in-out">
          <h2 className="text-xl font-semibold text-gray-800 mb-5">
            Send Us a Message
          </h2>

          {status === "success" ? (
            <div className="bg-green-50 border border-green-200 rounded-md p-6 text-center text-green-700 space-y-2 animate-fade-in">
              <p>Thank you! Your message has been sent.</p>
              <p className="text-sm text-gray-600">We typically respond within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-sm text-black">
              <InputField
                icon={<UserIcon className="h-4 w-4 text-gray-400" />}
                name="name"
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <InputField
                icon={<DevicePhoneMobileIcon className="h-4 w-4 text-gray-400" />}
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <InputField
                icon={<EnvelopeIcon className="h-4 w-4 text-gray-400" />}
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <InputField
                icon={<ListBulletIcon className="h-4 w-4 text-gray-400" />}
                name="subject"
                type="text"
                placeholder="Subject"
                value={formData.subject || ""}
                onChange={handleChange}
                required
              />
              <TextAreaField
                icon={<ChatBubbleLeftRightIcon className="h-4 w-4 text-gray-400" />}
                name="message"
                placeholder="Your Query"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition ${status === "sending" ? "opacity-60 cursor-not-allowed" : ""
                  }`}
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// Contact Info Row
function ContactItem({ icon, label, link }) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      {link ? (
        <a href={link} className="hover:underline">
          {label}
        </a>
      ) : (
        <span>{label}</span>
      )}
    </div>
  );
}

// Input
function InputField({ icon, ...props }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</span>
      <input
        {...props}
        className="w-full bg-slate-100 pl-10 pr-3 py-2.5 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
}

// Select
function SelectField({ icon, name, value, onChange, options }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-slate-100 pl-10 pr-3 py-2.5 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// TextArea
function TextAreaField({ icon, ...props }) {
  return (
    <div className="relative">
      <span className="absolute top-4 left-3">{icon}</span>
      <textarea
        {...props}
        rows="4"
        className="w-full bg-slate-100 pl-10 pr-3 py-2.5 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
}

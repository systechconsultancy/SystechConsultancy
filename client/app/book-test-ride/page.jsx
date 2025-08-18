// app/book-test-ride/page.jsx

import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: "Book Your Oben Rorr Test Ride | DriveDock",
  description: "Schedule your test ride for the all-electric Oben Rorr performance bike at our DriveDock locations.",
};

export default function BookTestRidePage() {
  const contactNumber = "+919390330592"; // Your contact number here

  return (
    <main className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Image Banner */}
          <div className="relative w-full h-64 sm:h-80">
            <Image
              src="/oben-rorr-banner.jpg" // Ensure this image is in your /public folder
              alt="Oben Rorr Electric Bike"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content Section */}
          <div className="p-8 sm:p-12 text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-900 leading-tight">
              You're One Step Away from an Electric Thrill
            </h1>
            <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto text-justify">
              Experience the future of performance biking. The Oben Rorr combines stunning design with instant acceleration for an unforgettable ride. Schedule your personal test ride today at one of our DriveDock locations.
            </p>

            {/* Contact Information Box */}
            <div className="mt-10 bg-blue-50 border-2 border-dashed border-blue-200 rounded-xl p-8">
              <h2 className="text-xl font-semibold text-gray-800">
                To Book Your Slot, Call Us Directly At:
              </h2>
              
              <a 
                href={`tel:${contactNumber}`}
                className="mt-4 inline-block text-3xl sm:text-4xl font-bold text-red-600 tracking-wider transition-transform duration-200 hover:scale-105"
              >
                {contactNumber}
              </a>

              <p className="mt-2 text-sm text-gray-600">
                Our team is ready to assist you. Limited slots available!
              </p>
            </div>

            {/* Back to Home Button */}
            <div className="mt-12">
              <Link href="/" className="text-blue-600 font-semibold hover:underline">
                &larr; Back to Consultancy Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
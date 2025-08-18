// app/components/DriveDockAdPopup.jsx

"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function DriveDockAdPopup() {
  const [isOpen, setIsOpen] = useState(true);

  const closePopup = (e) => {
    e.stopPropagation(); 
    e.preventDefault();
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    // Main container positioned at the bottom-right
    <div className="fixed bottom-0 right-0 m-1 lg:m-0 lg:bottom-1 lg:right-3 z-50 max-w-md">
      {/* The Link wraps the entire card, making it all clickable */}
      <Link href="/book-test-ride" className="block">
        <div 
          className="relative flex items-center gap-4 rounded-xl bg-[#2d8bb0] p-4 text-white shadow-2xl"
        >
          {/* Close Button */}
          <button 
            onClick={closePopup}
            className="absolute top-2 right-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-slate-600 text-white transition hover:bg-red-600"
            aria-label="Close popup"
          >
            <span className="text-xl leading-none">&times;</span>
          </button>

          {/* Image Column */}
          <div className="flex-shrink-0">
            <Image 
                src="/oben-rorr-banner.jpg" // <-- Your image path here
                alt="Oben Rorr EV Bike"
                width={100}
                height={100}
                className="rounded-lg object-cover"
            />
          </div>

          {/* Text Content Column */}
          <div className="flex-1">
            <h3 className="text-lg font-bold">
              Test Ride the Oben Rorr
            </h3>
            <p className="mt-1 text-sm text-slate-300">
              Now available at DriveDock. Click to book your ride!
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
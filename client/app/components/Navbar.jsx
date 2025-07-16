'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { label: "Home", path: "/" },
        { label: "About", path: "/about" },
        { label: "Services", path: "/services" },
        { label: "Counselling", path: "/counselling" },
    ];

    const isActive = (path) => pathname === path;

    const navLinks = navItems.map(({ label, path }) => (
        <li key={label} className="relative group">
            <Link
                href={path}
                onClick={() => setIsOpen(false)} // This won't affect desktop
                className={`text-base font-medium ${isActive(path)
                    ? "underline text-white"
                    : "text-gray-100 hover:text-white"
                    }`}
                aria-current={isActive(path) ? "page" : undefined}
            >
                {label}
                {
                    !isActive(path) && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                }
            </Link>
        </li>
    ));

    return (
        <nav className="bg-amber-700 text-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-2 md:py-2">

                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center gap-3">
                            <Image
                                src="/logo.png"
                                alt="Systech Consultancy Logo"
                                width={120}
                                height={50}
                                className="h-10 sm:h-12 md:h-14 w-auto object-contain"
                                priority // Add priority=true to the logo as it's always visible on load
                            />
                            {/* Brand Text */}
                            <div className="flex flex-col leading-tight">
                                <span className="text-base sm:text-base md:text-2xl font-semibold text-white">
                                    Systech Consultancy
                                </span>
                                <span className="text-xs sm:text-sm text-gray-200 -mt-1 tracking-wide">
                                    Empowering Your Vision
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex space-x-8 items-center">
                        {navLinks}
                        <li>
                            <Link href="/contact" className="inline-block group">
                                <button className="px-5 py-2 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300">
                                    Contact Us
                                </button>
                            </Link>
                        </li>
                    </ul>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="focus:outline-none"
                            aria-label="Toggle navigation"
                        >
                            {isOpen ? (
                                <XMarkIcon className="h-7 w-7 text-white" />
                            ) : (
                                <Bars3Icon className="h-7 w-7 text-white" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-amber-700 px-4 pb-4 space-y-4">
                    <ul className="space-y-2">
                        {navLinks}
                        <li>
                            <Link href="/contact" onClick={() => setIsOpen(false)}>
                                <button className="w-full px-4 py-2 mt-2 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300">
                                    Contact Us
                                </button>
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LogoutButton from "./Logout";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

// Sidebar Nav Items Example (customize as needed)
const navItems = [
  { href: "/", label: "Dashboard", icon: "🏠" },
  { href: "/workshops", label: "Workshops", icon: "📚" },
  { href: "/bookings/today", label: "Today’s Bookings", icon: "📅" },
  { href: "/bookings/history", label: "Booking History", icon: "🕓" },
  { href: "/stats/monthly", label: "Monthly Stats", icon: "📈" },
  { href: "/stats/yearly", label: "Yearly Stats", icon: "📊" },
  { href: "/stats/geo", label: "State/City Stats", icon: "🗺️" },
  { href: "/stats/demographic", label: "Demographics", icon: "👥" },
  { href: "/notifications", label: "Notifications", icon: "🔔" },
  { href: "/exports", label: "Exports", icon: "📤" },
  { href: "/settings", label: "Settings", icon: "⚙️" },
];

export default function DashboardShell({ session, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-[#0f172a] text-white
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          {/* Sidebar header with logo/user/close */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 min-w-0">
              <Image src="/logo.png" alt="Systech Logo" width={36} height={36} className="rounded-full flex-shrink-0" />
              <div className="overflow-hidden">
                <p className="text-base font-bold truncate">{session?.name || "Administrator"}</p>
                <p className="text-xs text-gray-400 truncate">{session?.role || "Admin"}</p>
              </div>
            </div>
            {/* Hide close button on desktop */}
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
              className="sm:hidden ml-2 flex-shrink-0 p-1 rounded hover:bg-gray-100"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          {/* Nav */}
          <ul className="space-y-2 font-medium">
            {navItems.map(({ href, label, icon }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center p-2 rounded-lg group ${isActive ? 'bg-white text-black font-semibold' : 'hover:bg-gray-100 hover:text-black text-white'}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="text-lg">{icon}</span>
                    <span className="ml-3">{label}</span>
                  </Link>
                </li>
              );
            })}

          </ul>
          {/* Logout at sidebar bottom */}
          <div className="absolute bottom-4 left-0 w-full px-3">
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col sm:ml-64 min-w-0">
        {/* Header */}
        <header className="sticky top-0 bg-white border-b border-gray-200 z-10 flex items-center min-h-[64px] px-4 py-3">
          {/* Hamburger */}
          <button
            className="inline-flex items-center p-2 mr-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
          {/* Branding */}
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
                <span className="text-base sm:text-base md:text-2xl font-semibold">
                  Systech Consultancy
                </span>
                <span className="text-xs sm:ml-2 text-gray-700 italic sm:text-sm">{session?.role || "Admin"} Dashboard</span>
              </div>
            </Link>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}

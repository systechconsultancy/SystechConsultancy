// components/Sidebar.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Today’s Bookings", href: "/bookings/today" },
  { label: "Booking History", href: "/bookings/history" },
  { label: "Stats", href: "/stats/monthly" },
  { label: "Notifications", href: "/notifications" },
  { label: "Exports", href: "/exports" },
  { label: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white shadow-md h-full hidden md:block">
      <div className="p-6 text-xl font-bold text-blue-600">Systech Admin</div>
      <nav className="px-4">
        {navItems.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className={`block py-2 px-4 rounded-md mb-1 hover:bg-blue-100 ${
              pathname === href ? "bg-blue-200 font-medium" : "text-gray-700"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

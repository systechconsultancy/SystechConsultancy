import Link from "next/link";
import Image from "next/image";
import { getAdminSession } from "./lib/getAdminSession";
import LogoutButton from "./Logout";

export const metadata = {
  title: "Systech Admin Dashboard",
  description: "Admin Panel for Systech Consultancy – Empowering Your Vision",
};

export default async function DashboardLayout({ children }) {
  const session = await getAdminSession();

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Sidebar */}
      <aside className="max-w-fit min-w-[256px] bg-[#0f172a] text-white flex flex-col p-6 shadow-lg">

        <div className="flex items-center gap-3 mb-6 pr-2">
          <Image
            src="/logo.png"
            alt="Systech Logo"
            width={48}
            height={48}
            className="rounded-full flex-shrink-0"
          />
          <div className="flex flex-col justify-center min-w-0">
            <p className="text-base font-semibold text-white truncate leading-tight">
              {session?.name || "Administrator"}
            </p>
            <p className="text-sm text-gray-400 truncate leading-tight">
              {session?.role || "Admin"}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3 text-sm font-medium">
          <Link href="/" className="hover:text-yellow-400 transition">🏠 Dashboard</Link>
          <Link href="/bookings/today" className="hover:text-yellow-400 transition">📅 Today’s Bookings</Link>
          <Link href="/bookings/history" className="hover:text-yellow-400 transition">🕓 Booking History</Link>
          <Link href="/stats/monthly" className="hover:text-yellow-400 transition">📈 Monthly Stats</Link>
          <Link href="/stats/yearly" className="hover:text-yellow-400 transition">📊 Yearly Stats</Link>
          <Link href="/stats/geo" className="hover:text-yellow-400 transition">🗺️ State/City Stats</Link>
          <Link href="/stats/demographic" className="hover:text-yellow-400 transition">👥 Demographics</Link>
          <Link href="/notifications" className="hover:text-yellow-400 transition">🔔 Notifications</Link>
          <Link href="/exports" className="hover:text-yellow-400 transition">📤 Exports</Link>
          <Link href="/settings" className="hover:text-yellow-400 transition">⚙️ Settings</Link>
        </nav>

        {/* Logout */}
        <div className="mt-auto pt-6">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 px-10 py-8">
        <header className="mb-6 border-b pb-4 flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Systech Logo"
            width={60}
            height={60}
            className="rounded-md"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Systech Consultancy</h1>
            <p className="text-sm text-gray-500 italic">
              {session?.role || "Admin"} Dashboard
            </p>
          </div>
        </header>

        <div>{children}</div>
      </main>
    </div>
  );
}

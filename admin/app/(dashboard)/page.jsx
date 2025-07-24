import { getAdminSession } from './lib/getAdminSession';

export default async function DashboardPage() {
  const session = await getAdminSession();

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <section>
        <h1 className="text-3xl font-bold text-gray-800 flex items-center flex-wrap gap-2">
          Welcome,
          <span className="text-indigo-600 font-semibold text-2xl sm:text-3xl max-w-[80vw] truncate whitespace-nowrap">
            {session?.name || "Admin"}
          </span>
        </h1>
      </section>


      {/* Placeholder for future charts or tables */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
        <h3 className="text-lg font-semibold text-gray-800">Homepage module is under development</h3>
      </section>
    </div>
  );
}

// A reusable and enhanced component for the stat cards
function StatCard({ title, value, icon, bgColor, change, changeText }) {
  return (
    <div className={`relative p-6 rounded-2xl shadow-lg text-white overflow-hidden ${bgColor}`}>
      <div className="absolute top-0 right-0 -mr-4 -mt-4">
        <div className="p-4 bg-white/20 rounded-full">
          {icon}
        </div>
      </div>
      <p className="text-sm font-medium opacity-80">{title}</p>
      <div className="flex items-end gap-4 mt-2">
        <h2 className="text-4xl font-bold">{value}</h2>
        {change && (
          <div className="flex items-center gap-1 text-sm font-semibold bg-white/20 px-2 py-0.5 rounded-full">
            <ArrowUpIcon className="w-4 h-4" />
            <span>{change}</span>
          </div>
        )}
      </div>
      {change && <p className="text-xs opacity-70 mt-1">{changeText}</p>}
    </div>
  );
}
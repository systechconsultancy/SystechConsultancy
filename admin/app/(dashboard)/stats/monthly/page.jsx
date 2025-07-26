"use client";
import { useState, useEffect } from 'react';
import CityDistributionChart from '../CityDistributionChart';
import UserTypeChart from '../UserTypeChart';

export default function MonthlyStatsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/stats/monthly?year=${date.year}&month=${date.month}`, {
          credentials: 'include' // Send auth cookie with the request
        });
        if (!res.ok) throw new Error('Failed to fetch stats');
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setStats(null); // Clear old data on error
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [date]);

  const handleDateChange = (e) => {
    setDate({ ...date, [e.target.name]: parseInt(e.target.value) });
  };

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Monthly Statistics</h1>
        <p className="text-gray-500 mt-1">An overview of bookings for the selected month.</p>
      </header>

      {/* Date Selector */}
      <div className="flex gap-4 mb-8 bg-white p-4 rounded-lg shadow-sm border">
        <select name="month" value={date.month} onChange={handleDateChange} className="p-2 border rounded-md">
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
          ))}
        </select>
        <select name="year" value={date.year} onChange={handleDateChange} className="p-2 border rounded-md">
          {years.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="text-center p-8">Loading stats...</div>
      ) : stats ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <StatCard title="Total Bookings" value={stats.totalBookings} />
            {/* You can add more stat cards here if needed */}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border"><UserTypeChart stats={stats} /></div>
            <div className="bg-white p-6 rounded-xl shadow-sm border"><CityDistributionChart stats={stats} /></div>
          </div>
        </>
      ) : (
        <div className="text-center p-8">No data available for the selected period.</div>
      )}
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-4xl font-bold mt-2 text-gray-800">{value}</h2>
    </div>
  );
}
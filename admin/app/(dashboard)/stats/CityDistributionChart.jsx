"use client";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function CityDistributionChart({ stats }) {
  // Add this check to ensure data exists before rendering
  if (!stats || !stats.byCity || stats.byCity.length === 0) {
    return <div className="text-center p-4">No city data to display.</div>;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Bookings by City' },
    },
  };

  const data = {
    labels: stats.byCity.map(c => c._id || 'Unknown'), // Handle null city
    datasets: [{
      label: 'Bookings',
      data: stats.byCity.map(c => c.count),
      backgroundColor: 'rgba(59, 130, 246, 0.7)',
    }],
  };

  return <Bar options={options} data={data} />;
}
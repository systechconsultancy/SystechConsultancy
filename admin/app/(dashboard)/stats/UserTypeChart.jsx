"use client";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function UserTypeChart({ stats }) {
  // Add this check to ensure data exists before rendering
  if (!stats || !stats.byType || stats.byType.length === 0) {
    return <div className="text-center p-4">No user type data to display.</div>;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Bookings by User Type' },
    },
  };
  
  const data = {
    labels: stats.byType.map(t => t._id.charAt(0).toUpperCase() + t._id.slice(1)),
    datasets: [{
      label: '# of Bookings',
      data: stats.byType.map(t => t.count),
      backgroundColor: ['rgba(54, 162, 235, 0.7)', 'rgba(255, 99, 132, 0.7)'],
    }],
  };
  
  return <Pie options={options} data={data} />;
}
import { cookies } from 'next/headers';
import { format } from 'date-fns';
import Pagination from '@/components/Pagination'; // We will create this next

async function getBookingHistory(page = 1) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('access_token');
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/bookings/history?page=${page}&limit=10`, {
      headers: { 'Cookie': `access_token=${token?.value}` },
      cache: 'no-store',
    });

    if (!res.ok) return { bookings: [], totalPages: 1, currentPage: 1 };
    return res.json();
  } catch (error) {
    console.error("Failed to fetch booking history:", error);
    return { bookings: [], totalPages: 1, currentPage: 1 };
  }
}

export default async function BookingHistoryPage({ searchParams }) {
  const currentPage = Number(searchParams.page) || 1;
  const { bookings, totalPages } = await getBookingHistory(currentPage);

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Booking History</h1>
        <p className="text-gray-500 mt-1">A complete log of all past and present bookings.</p>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-50 text-xs text-gray-600 uppercase">
              <tr>
                <th className="px-6 py-3">Booked For</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Contact Details</th>
                <th className="px-6 py-3">Mode</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{format(new Date(booking.dateOfCall), 'dd MMM yyyy')}</td>
                  <td className="px-6 py-4">
                    {booking.type === 'Group' ? `Group (${booking.students.length})` : 'Individual'}
                  </td>
                  <td className="px-6 py-4">
                    {booking.type === 'Group' ? (
                      <ul className="list-disc list-inside space-y-1">
                        {booking.students.map(s => <li key={s._id} className="font-medium">{s.name} <span className="text-gray-500 font-normal">({s.email})</span></li>)}
                      </ul>
                    ) : (
                      <div>
                        <p className="font-medium">{booking.name}</p>
                        <p className="text-gray-500">{booking.email}</p>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 capitalize">{booking.mode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Pagination Component */}
      <div className="mt-6">
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
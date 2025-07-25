import { cookies } from 'next/headers';
import { format } from 'date-fns';

// This is a Server Component, so we can fetch data directly.
async function getTodaysBookings() {
  try {
    // 1. Get the authentication cookie on the server
    const cookieStore = cookies();
    const token = cookieStore.get('access_token');

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/bookings/today`, { 
      headers: {
        // 2. Send the cookie to the backend API for authentication
        'Cookie': `access_token=${token?.value}`
      },
      cache: 'no-store' // Always fetch the latest data for this page
    });

    if (!res.ok) {
      console.error("Failed to fetch today's bookings:", res.statusText);
      return { date: new Date(), bookings: [] };
    }
    return res.json();
  } catch (error) {
    console.error("Error in getTodaysBookings:", error);
    return { date: new Date(), bookings: [] };
  }
}

export default async function TodaysBookingsPage() {
  const { date, bookings } = await getTodaysBookings();

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Today's Bookings
        </h1>
        <p className="text-gray-500 mt-1">
          {format(new Date(date), 'EEEE, dd MMMM yyyy')}
        </p>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {bookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-50 text-xs text-gray-600 uppercase">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Phone</th>
                  <th className="px-6 py-3">Mode</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {booking.type.startsWith('Group') ? (
                        // Display all names for a group
                        <ul className="list-disc list-inside">
                          {booking.students.map(s => <li key={s._id}>{s.name}</li>)}
                        </ul>
                      ) : (
                        // Display single name for an individual
                        booking.name
                      )}
                    </td>
                    <td className="px-6 py-4">{booking.type}</td>
                    <td className="px-6 py-4">
                      {booking.type.startsWith('Group') ? (
                        <ul>
                          {booking.students.map(s => <li key={s._id}>{s.email}</li>)}
                        </ul>
                      ) : (
                        booking.email
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {booking.type.startsWith('Group') ? (
                        <ul>
                          {booking.students.map(s => <li key={s._id}>{s.phone}</li>)}
                        </ul>
                      ) : (
                        booking.phone
                      )}
                    </td>
                    <td className="px-6 py-4 capitalize">{booking.mode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center p-12">
            <h3 className="text-lg font-semibold text-gray-700">No Bookings for Today</h3>
            <p className="text-gray-500 mt-2">Check back later or view the full booking history.</p>
          </div>
        )}
      </div>
    </div>
  );
}
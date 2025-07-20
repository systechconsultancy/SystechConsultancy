export default function BookingHistoryPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Booking History</h2>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <p className="text-gray-600">
          This page will show all past bookings in reverse chronological order, with filters and pagination.
        </p>
        <div className="mt-4 p-4 border border-dashed border-gray-300 rounded-lg text-gray-500 text-sm">
          Booking history table will be integrated here.
        </div>
      </div>
    </div>
  );
}

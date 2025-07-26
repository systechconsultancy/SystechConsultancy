import Student from '../../models/Student.js';

export const getMonthlyStats = async (req, res) => {
  try {
    // Get the year and month from query params, or default to the current month
    const year = parseInt(req.query.year) || new Date().getFullYear();
    const month = parseInt(req.query.month) || new Date().getMonth() + 1;

    // Define the start and end of the month
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const stats = await Student.aggregate([
      // Stage 1: Match documents within the date range and with isPaid: true
      {
        $match: {
          isPaid: true,
          dateOfCall: { $gte: startDate, $lte: endDate }
        }
      },
      // Stage 2: Run multiple aggregation pipelines in parallel
      {
        $facet: {
          totalBookings: [{ $count: 'count' }],
          bookingsByType: [{ $group: { _id: '$userType', count: { $sum: 1 } } }],
          bookingsByCity: [{ $group: { _id: '$city', count: { $sum: 1 } } }, { $sort: { count: -1 } }]
        }
      }
    ]);
    
    // Format the results into a clean object
    const formattedStats = {
      totalBookings: stats[0].totalBookings[0]?.count || 0,
      byType: stats[0].bookingsByType,
      byCity: stats[0].bookingsByCity,
    };

    res.json(formattedStats);
  } catch (error) {
    console.error("Error fetching monthly stats:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
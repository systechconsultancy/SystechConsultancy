import DailyBookingSummary from '../../models/DailyBookingSummary.js';
import Student from '../../models/Student.js';
import Group from '../../models/Group.js';

/**
 * @desc    Get all confirmed bookings for the current day
 * @route   GET /api/admin/bookings/today
 * @access  Private/Admin
 */
export const getTodaysBookings = async (req, res) => {
    try {
        // 1. Calculate the start and end of today
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        // 2. Find the summary document for today
        const summary = await DailyBookingSummary.findOne({
            date: {
                $gte: todayStart,
                $lte: todayEnd,
            },
        })
            .populate({
                path: 'students',
                select: 'name email phone mode userType' // Select fields to return
            })
            .populate({
                path: 'groups',
                populate: {
                    path: 'students',
                    select: 'name email phone userType' // Get details of students within the group
                }
            });

        if (!summary) {
            // If no bookings today, return an empty array
            return res.json({
                date: todayStart,
                bookings: []
            });
        }

        // 3. Combine individual and group students into a single list
        const individualBookings = summary.students.map(student => ({
            type: 'Individual',
            ...student._doc
        }));

        const groupBookings = summary.groups.map(group => ({
            type: `Group (${group.students.length})`,
            _id: group._id,
            dateOfCall: group.dateOfCall,
            mode: group.mode,
            students: group.students
        }));

        res.json({
            date: summary.date,
            bookings: [...individualBookings, ...groupBookings]
        });

    } catch (error) {
        console.error("Error fetching today's bookings:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const getBookingHistory = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Get the end of today to include all of today's bookings
        const endOfToday = new Date();
        endOfToday.setHours(23, 59, 59, 999);

        // Fetch all paid individual bookings
        const individualBookings = await Student.find({
            isPaid: true,
            counsellingType: 'individual'
        }).select('name email phone mode userType dateOfCall');

        // Fetch all paid group bookings
        const groupBookings = await Group.find({ isPaid: true })
            .select('dateOfCall mode')
            .populate('students', 'name email phone userType');

        // Combine both lists
        const allBookings = [
            ...individualBookings.map(b => ({ ...b._doc, type: 'Individual' })),
            ...groupBookings.map(b => ({ ...b._doc, type: 'Group' }))
        ];

        // ✅ **THE FIX IS HERE** ✅
        // Filter the combined list to include only past and present bookings
        const filteredHistory = allBookings.filter(booking => new Date(booking.dateOfCall) <= endOfToday);

        // Sort the filtered list by appointment date, newest first
        const sortedHistory = filteredHistory.sort((a, b) => new Date(b.dateOfCall) - new Date(a.dateOfCall));

        const totalBookings = sortedHistory.length;

        // Paginate the final list
        const paginatedBookings = sortedHistory.slice(skip, skip + limit);

        res.json({
            bookings: paginatedBookings,
            currentPage: page,
            totalPages: Math.ceil(totalBookings / limit),
            totalBookings,
        });

    } catch (error) {
        console.error("Error fetching booking history:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
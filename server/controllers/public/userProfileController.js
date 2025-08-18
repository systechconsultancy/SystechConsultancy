import User from '../../models/User.js';

// @desc    Get user profile
// @route   GET /api/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    // req.user is attached by the protectUser middleware
    const user = await User.findById(req.user._id).select('-password -refreshToken');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    // 1. Create a whitelist of fields the user is allowed to update
    const allowedUpdates = [
      'name',
      'city',
      'profileImageUrl',
      'profileSummary',
      'resumeUrl',
      'skills',
      'education',
      'workExperience', // Renamed from 'professional'
      'certifications',
      'achievements'
    ];

    const updateData = {};

    // 2. Build the update object with only the allowed fields from the request
    for (const key of Object.keys(req.body)) {
      if (allowedUpdates.includes(key)) {
        updateData[key] = req.body[key];
      }
    }

    // 3. Find the user and update their data atomically
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateData },
      { new: true, runValidators: true, context: 'query' }
    ).select('-password -refreshToken');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Update Profile Error:", error);
    // Handle potential validation errors from the database
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation failed', errors: error.errors });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};
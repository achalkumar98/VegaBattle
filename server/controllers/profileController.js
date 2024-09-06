const User = require('../models/User');

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; 
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with user data
    res.json({
      name: user.name,
      battlesWon: user.battlesWon,
      // Add any additional user data you want to display
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Failed to fetch profile data' });
  }
};

module.exports = { getProfile };

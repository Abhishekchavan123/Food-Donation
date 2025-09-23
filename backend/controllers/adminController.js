const User = require("../models/User");
const NGO = require("../models/NGO");
const Donation = require("../models/Donation");

// Dashboard summary
exports.getDashboard = async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const ngosCount = await NGO.countDocuments();
    const donationsCount = await Donation.countDocuments();

    res.json({
      users: usersCount,
      ngos: ngosCount,
      donations: donationsCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

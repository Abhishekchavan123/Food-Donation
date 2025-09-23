const Donation = require("../models/Donation");

// Create a donation
exports.createDonation = async (req, res) => {
  try {
    const { foodType, quantity, pickupLocation } = req.body;

    const donation = await Donation.create({
      donor: req.user.id, // comes from auth middleware
      foodType,
      quantity,
      pickupLocation,
    });

    res.status(201).json({ message: "Donation created successfully", donation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all donations (admin/ngo only)
exports.getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find().populate("donor").populate("assignedNGO");
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Accept a donation (NGO)
exports.acceptDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) return res.status(404).json({ message: "Donation not found" });

    donation.status = "accepted";
    donation.assignedNGO = req.user.id; // NGO accepting
    await donation.save();

    res.json({ message: "Donation accepted", donation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark as completed
exports.completeDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) return res.status(404).json({ message: "Donation not found" });

    donation.status = "completed";
    await donation.save();

    res.json({ message: "Donation marked as completed", donation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

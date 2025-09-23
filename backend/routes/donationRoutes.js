const express = require("express");
const {
  createDonation,
  getAllDonations,
  acceptDonation,
  completeDonation,
} = require("../controllers/donationController");
const { protect, isNGO, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Donor creates donation
router.post("/", protect, createDonation);

// Admin/NGO gets all donations
router.get("/", protect, getAllDonations);

// NGO accepts donation
router.put("/:id/accept", protect, isNGO, acceptDonation);

// NGO marks completed
router.put("/:id/complete", protect, isNGO, completeDonation);

module.exports = router;

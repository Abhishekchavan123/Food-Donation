const express = require("express");
const { registerNGO, getAllNGOs, verifyNGO } = require("../controllers/ngoController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Public: Register NGO
router.post("/register", registerNGO);

// Public: Get NGOs
router.get("/", getAllNGOs);

// Admin: Verify NGO
router.put("/:id/verify", protect, isAdmin, verifyNGO);

module.exports = router;

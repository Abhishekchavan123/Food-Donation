const express = require("express");
const { getDashboard, getAllUsers, deleteUser } = require("../controllers/adminController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/dashboard", protect, isAdmin, getDashboard);
router.get("/users", protect, isAdmin, getAllUsers);
router.delete("/users/:id", protect, isAdmin, deleteUser);

module.exports = router;

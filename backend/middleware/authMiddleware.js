const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect routes (only logged-in users)
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Role-based middleware
exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access required" });
  }
};

exports.isNGO = (req, res, next) => {
  if (req.user && req.user.role === "ngo") {
    next();
  } else {
    res.status(403).json({ message: "NGO access required" });
  }
};

exports.isDonor = (req, res, next) => {
  if (req.user && req.user.role === "donor") {
    next();
  } else {
    res.status(403).json({ message: "Donor access required" });
  }
};

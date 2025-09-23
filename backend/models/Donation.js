const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    donor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    foodType: { type: String, required: true },
    quantity: { type: String, required: true },
    pickupLocation: { type: String, required: true },
    status: { type: String, enum: ["pending", "accepted", "completed"], default: "pending" },
    assignedNGO: { type: mongoose.Schema.Types.ObjectId, ref: "NGO" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donation", donationSchema);

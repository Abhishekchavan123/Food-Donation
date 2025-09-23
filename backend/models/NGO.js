const mongoose = require("mongoose");

const ngoSchema = new mongoose.Schema(
  {
    ngoName: { type: String, required: true },
    registrationId: { type: String, required: true, unique: true },
    contactPerson: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NGO", ngoSchema);

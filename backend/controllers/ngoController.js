const NGO = require("../models/NGO");

// Register NGO
exports.registerNGO = async (req, res) => {
  try {
    const { ngoName, registrationId, contactPerson, phone, address } = req.body;

    const exists = await NGO.findOne({ registrationId });
    if (exists) return res.status(400).json({ message: "NGO already registered" });

    const ngo = await NGO.create({
      ngoName,
      registrationId,
      contactPerson,
      phone,
      address,
    });

    res.status(201).json({ message: "NGO registered successfully", ngo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all NGOs
exports.getAllNGOs = async (req, res) => {
  try {
    const ngos = await NGO.find();
    res.json(ngos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify NGO (admin only)
exports.verifyNGO = async (req, res) => {
  try {
    const ngo = await NGO.findById(req.params.id);
    if (!ngo) return res.status(404).json({ message: "NGO not found" });

    ngo.verified = true;
    await ngo.save();

    res.json({ message: "NGO verified successfully", ngo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

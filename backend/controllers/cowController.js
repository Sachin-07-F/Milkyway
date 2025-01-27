const Cow = require("../models/Cow");

// Add a cow
exports.addCow = async (req, res) => {
  try {
    const { name, age, grade, production, description, image } = req.body;

    const cow = new Cow({
      name,
      age,
      grade,
      production,
      description,
      image,
      owner: req.user.id, // `req.user.id` comes from the JWT payload
    });

    await cow.save();
    res.status(201).json({ success: true, message: "Cow added successfully", cow });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error adding cow", error: err.message });
  }
};

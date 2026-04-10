const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//  REGISTER
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json("User already exists");
    }

    //  hash password
    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashed,
    });

    await user.save();

    res.json("User registered successfully");
  } catch (err) {
    console.log("REGISTER ERROR:", err);
    res.status(500).json("Registration failed");
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json("User not found");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).json("Wrong password");
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET 
    );

    res.json({ token });
  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json("Login failed");
  }
});

module.exports = router;
const express = require("express");
const User = require("./user.model");
const generateToken = require("../middleware/generateToken");
const router = express.Router();

//register endpoint
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).send({ message: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(400).send({ message: err.message });
  }
});

//login endpoint

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid password" });
    }
    const token = await generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.status(200).send({
      message: "User logged in successfully",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        bio: user.bio,
        profession: user.profession,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error logging in: " + error.message);
  }
});

//logout endpoint
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).send({ message: "User logged out successfully" });
});
//delete user

router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error deleting user:" + error.message);
  }
});

//get all users

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error getting users:" + error.message);
  }
});
module.exports = router;

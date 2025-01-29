const jwt = require("jsonwebtoken");
const User = require("../users/user.model");

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const generateToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    //  JWT signing
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "365d",
    });

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    return null; 
  }
};

module.exports = generateToken;

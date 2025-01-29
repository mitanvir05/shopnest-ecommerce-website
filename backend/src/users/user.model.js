const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  profileImage: String,
  bio: { type: String, maxlength: 255 },
  profession: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Hashing passwords before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next(); 
  
  try {
    const salt = await bcrypt.genSalt(10); // Generate salt
    user.password = await bcrypt.hash(user.password, salt); // Hash password
    next();
  } catch (error) {
    next(error);
  }
});

// Comparing passwords for login

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};
const User = model("User", userSchema); 

module.exports = User;

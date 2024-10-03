const mongoose = require("mongoose");
const validator = require("validator");
const userRole = require("../utils/userRole");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
    validate: [validator.isEmail, "Enter valid email address"],
  },
  role: {
    type: String,
    enum: [userRole.USER, userRole.ADMIN, userRole.MANAGER],
    default: userRole.USER,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },
  token: {
    type: String,
  },
  avatar: {
    type: String,
    default: "/uploads/profile.png",
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);

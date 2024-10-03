const mongoose = require("mongoose");
const validator = require("validator");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    validate: {
      validator: (value) => {
        return /^[a-zA-Z\s]+$/.test(value);
      },
    },
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
});

module.exports = mongoose.model("Course", courseSchema);

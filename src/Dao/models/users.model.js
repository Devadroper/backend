import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
    default: 0
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user'
  },
  photo: {
    type: String,
    default: 'https://i.imgur.com/avx2DwE.jpg'
  },
  isGithub: {
    type: Boolean,
    required: true,
    default: false
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    default: [],
  },
});

export const userModel = mongoose.model("users", userSchema);

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },

  fullname: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
});

export const User = mongoose.model("User", UserSchema);

const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    default: undefined,
  },
  password: {
    type: String,
    required: true,
    default: undefined,
  },
  birth: {
    type: String,
    required: true,
    default: undefined,
  },
  phoneNumber: {
    type: String,
    required: true,
    default: undefined,
  },
  state: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Users", UserSchema);

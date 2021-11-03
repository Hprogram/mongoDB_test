const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  version: {
    type: String,
    required: true,
  },
  music: {
    type: Object,
    required: true,
  },

  therapy: {
    type: Object,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Categorys", CategorySchema);

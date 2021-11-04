const mongoose = require("mongoose");

const PlaylistSchema = mongoose.Schema({
  playlistName: {
    type: String,
    required: true,
  },
  playlistDesciption: {
    type: String,
    required: true,
  },
  songs: {
    type: [Object],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Playlists", PlaylistSchema);

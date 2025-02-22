const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genre: { type: String, required: true },
  posterURL: { type: String, required: true },
  backdropURL: { type: String, required: true },
  videoURL: { type: String, required: true },
  director: { type: String, required: true },
  cast: [{ type: String }],
  releaseDate: { type: Date, default: Date.now },
  duration: { type: Number },
  isFeatured: { type: Boolean, default: false },
  isTrending: { type: Boolean, default: false },
  isOriginal: { type: Boolean, default: false },
  rating: { type: Number }
});

module.exports = mongoose.model('Content', contentSchema);
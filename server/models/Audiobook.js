const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user: { type: String, required: true },
    rating: { type: Number, required: true },
    review: { type: String, required: true },
});

const audiobookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    author: { type: String, required: true },
    genre: [String],
    description: String,
    rating: { type: Number, default: 0 },
    reviews: [reviewSchema],
    img: { type: String, required: true }
});

const Audiobook = mongoose.model("Audiobook", audiobookSchema);

module.exports = Audiobook;

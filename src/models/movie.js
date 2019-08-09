const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId; // Generar string aleatorio

const movieSchema = new Schema({
    movieId: ObjectId,
    title: String,
    year: Number,
    description: {
        type: String,
    },
    image: [String],
    theme: {
        type: String,
        enum: ["comedia", "drama", "terror", "acción"],
    },
    director: {
        type: String,
        default: "Gerardo Medina"
    }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = { Movie }
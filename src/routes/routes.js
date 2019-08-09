const express = require("express");
const path = require('path');
const router = express.Router();
const { Movie } = require("../models/movie");

router.get("/", (req, res, next) => {
    res.status(200).sendFile(path.resolve("src/views/index.html"));
});

// CREATE
router.post("/api/v1/pelicula", (req, res, next) => {
    const { title, year, description, image, theme, director } = req.body;
    const newMovie = Movie({
        title,
        year,
        description,
        image,
        theme,
        director
    });
    newMovie.save((err, pelicula) => {
        err ? res.status(409).send(err.message) : res.status(201).send(pelicula)
    });
});

// READ
router.get("/api/v1/pelicula", (req, res, next) => {
    Movie.find().exec()
        .then(movies => res.status(200).send(movies))
        .catch(err => res.status(404).send(err));
});

router.get("/api/v1/peliculaById/", (req, res, next) => {
    const { id } = req.query;
    Movie.findById(id).exec()
        .then(movies => res.status(200).send(movies))
        .catch(err => res.status(404).send(err));
});

router.get("/api/v1/busqueda/pelicula", (req, res, next) => {
    const { q } = req.query;
    Movie.find({ title: q }).exec()
        .then(movie => {
            movie.length > 0
                ? res.status(200).send(movie)
                : res.status(404).send("Not found")
        })
        .catch(err => res.status(404).send(err))
});

// UPDATE

// Modificar todo el objeto o registro
router.put("/api/v1/peliculas/update", (req, res, next) => {
    const { id } = req.query;
    const body = req.body;

    Movie.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then(newMovie => {
            if (newMovie !== null) {
                res.status(202).send(newMovie)
            } else {
                res.status(304).send("Registro no encontrado, imposible modificar")
            }
        })
        .catch(err => res.status(404).send(err))
});

// Modificar parcialmente el registro
router.patch("/api/v1/peliculas/update", (req, res, next) => {
    const { id } = req.query;
    const body = req.body;

    Movie.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then(newMovie => {
            if (newMovie !== null) {
                res.status(202).send(newMovie)
            } else {
                res.status(304).send("Registro no encontrado, imposible modificar")
            }
        })
        .catch(err => res.status(404).send(err))
});

// DELETE
router.delete("/api/v1/peliculas/delete", (req, res, next) => {
    const { id } = req.query;

    Movie.findByIdAndRemove(id).exec()
        .then(pelicula => {
            pelicula !== null
                ? res.status(200).send({ mensaje: "Película borrada exitosamente", body: pelicula })
                : res.status(304).send({ mensaje: "Registro no eliminado " })
        })
        .catch(err => res.status(304).send({ mensaje: "Registro no eliminado " }))
});

module.exports = { router };

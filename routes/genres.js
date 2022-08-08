const express = require("express");
const { Genre, validate } = require("../models/genre");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const genres = await Genre.find();
    res.status(200).send(genres);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send("Genre not found");
    return res.status(200).send(genre);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const response = validate(req.body);
    if (response) return res.status(400).send(response.details[0].message);

    let genre = new Genre(req.body);
    genre = await genre.save();

    res.status(200).send(genre);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const response = validate(req.body);
    if (response) return res.status(400).send(response.details[0].message);

    const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!genre) res.status(404).send("Genre not found");
    return res.status(200).send(genre);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const genre = await Genre.findByIdAndDelete(req.params.id);
    if (!genre) res.status(404).send("Genre not found");
    return res.status(200).send(genre);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;

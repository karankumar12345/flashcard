const express = require('express');
const Flashcard = require('../models/flashcard');
const router = express.Router();

// Create a new flashcard
router.post('/flashcards', async (req, res) => {
  try {
    const flashcard = new Flashcard(req.body);
    await flashcard.save();
    res.status(201).json(flashcard);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all flashcards
router.get('/flashcards', async (req, res) => {
  try {
    const flashcards = await Flashcard.find();
    res.status(200).json(flashcards);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a flashcard
router.put('/flashcards/:id', async (req, res) => {
  try {
    const flashcard = await Flashcard.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(flashcard);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a flashcard
router.delete('/flashcards/:id', async (req, res) => {
  try {
    await Flashcard.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

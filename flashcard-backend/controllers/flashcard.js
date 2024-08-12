const db = require('../config/db');

exports.getAllFlashcards = (req, res) => {
  db.query('SELECT * FROM flashcards', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.addFlashcard = (req, res) => {
  const { question, answer } = req.body;
  db.query('INSERT INTO flashcards (question, answer) VALUES (?, ?)', [question, answer], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, question, answer });
  });
};

exports.updateFlashcard = (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  db.query('UPDATE flashcards SET question = ?, answer = ? WHERE id = ?', [question, answer, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id, question, answer });
  });
};

exports.deleteFlashcard = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM flashcards WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.sendStatus(204);
  });
};

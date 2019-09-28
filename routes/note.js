var express = require('express');
var router = express.Router();
var Note = require('../model/Note');

router.get('/', (req, res) => {
  Note.find({userId: req.auth.userId}, (err, data) => {
    res.status(200).send(data);
  })
});

router.put('/', (req, res) => {
  console.log(req.body);
  if (req.body.id) {
    Note.findByIdAndUpdate(req.body.id, {...req.body, lastModifiedAt: new Date()}, {new: true}, (err, note) => {
      res.status(201).send(note);
    })
  } else {
    let note = new Note(req.body);
    note.userId = req.auth.userId;
    note.createdAt = new Date();
    note.lastModifiedAt = note.createdAt;
    note.save();
    res.status(201).send(note);
  }
});

router.delete('/:id', (req, res) => {
  Note.findByIdAndDelete(req.params.id, (err, note) => {
    res.status(201).send(note);
  })
});

module.exports = router;

var express = require('express');
var router = express.Router();
var Bookmark = require('../model/Bookmark');

router.get('/', (req, res) => {
  Bookmark.find({userId: req.auth.userId}, (err, data) => {
    res.status(200).send(data);
  })  
});

router.put('/', (req, res) => {
  if (req.body.id) {
    Bookmark.findByIdAndUpdate(req.body.id, {...req.body, lastModifiedAt: new Date()}, {new: true}, (err, bookmark) => { 
      res.status(201).send(bookmark);  
    })
  } else {
    let bookmark = new Bookmark(req.body);
    bookmark.userId = req.auth.userId;
    bookmark.createdAt = new Date();
    bookmark.lastModifiedAt = bookmark.createdAt;
    bookmark.save();
    res.status(201).send(bookmark);  
  }
});

router.delete('/:id', (req, res) => {
  Bookmark.findByIdAndDelete(req.params.id, (err, bookmark) => {
    res.status(201).send(bookmark);
  })
});

module.exports = router;

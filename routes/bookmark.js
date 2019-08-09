var express = require('express');
var router = express.Router();
var Bookmark = require('../model/Bookmark');

router.put('/', (req, res) => {
  let bookmark = new Bookmark(req.body);
  bookmark.userId = req.auth.userId;
  bookmark.createdAt = new Date();
  bookmark.lastModifiedAt = bookmark.createdAt;
  bookmark.save();
  res.status(201).send(bookmark);  
});

router.get('/', (req, res) => {
  Bookmark.find({userId: req.auth.userId}, (err, data) => {
    res.status(200).send(data);
  })  
});

module.exports = router;

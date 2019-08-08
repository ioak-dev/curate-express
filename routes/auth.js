var express = require('express');
var router = express.Router();
var User = require('../model/User');
var CryptoJS = require("crypto-js");
var crypto = require("crypto");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/keys', (req, res) => {
    // User.find({}, (err, users) => {
    //     res.json(users);
    // });
    const salt = crypto.randomBytes(40).toString('hex');
    const solution = crypto.randomBytes(40).toString('hex');
    res.json({
      salt: salt,
      solution: solution
    });
});

router.post('/signup', (req, res) => {
  let user = new User(req.body);
  user.save();
  res.status(201).send(user);
});

module.exports = router;

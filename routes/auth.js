var express = require('express');
var router = express.Router();
var User = require('../model/User');
var crypto = require("crypto");
var jwt = require('jsonwebtoken');

const jwtsecret = 'jwtsecret';

router.get('/keys', (req, res) => {
  User.findOne({email: req.params.email}, (err, user) => {
    if (!user) {
      res.status(200).send(user.problem);
    } else {
      res.status(404).send();
    } 
  });
    // res.json({
    //   salt: crypto.randomBytes(40).toString('hex'),
    //   solution: crypto.randomBytes(40).toString('hex')
    // });
});

router.post('/signup', (req, res) => {
  let user = new User(req.body);
  user.save();
  res.status(200).send(user);
});

router.get('/keys/:email', (req, res) => {
  User.findOne({email: req.params.email}, (err, user) => {
    if (user) {
      res.status(200).send(user.problem);
    } else {
      res.status(404).send();
    } 
  });
});

router.post('/signin', (req, res) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if (!user) {
      res.status(404).send();
    }
    if (user.solution === req.body.solution) {
      console.log(user);
      res.status(200).send({
        name: user.name,
        token: jwt.sign({ userId: user.id }, jwtsecret),
        secret: 'none'
      });
    }
  });
});

module.exports = router;

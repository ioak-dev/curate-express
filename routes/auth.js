var express = require('express');
var router = express.Router();
var User = require('../model/User');
var crypto = require("crypto");
var jwt = require('jsonwebtoken');
import { sendForgetPasswordResetCode } from '../services/email';
const jwtsecret = 'jwtsecret';

router.get('/keys', (req, res) => {
  res.json({
    salt: crypto.randomBytes(40).toString('hex'),
    solution: crypto.randomBytes(40).toString('hex')
  });
});

router.post('/signup', (req, res) => {
  let user = new User(req.body);
  user.save();
  res.status(200).send(user);
});

router.post('/sendResetCode', (req, res) => {
  // generate unique code
  User.findOne({email: req.body.email}, (err, user) => {
    if (user) {
      user.resetCode = 'generated code';
      user.save();
      sendForgetPasswordResetCode(user.email, 'generated code');
    }
  });
});

router.post('/reset', (req, res) => {
  User.findOne({resetCode: req.body.resetCode}, (err, user) => {
    if (user) {
      user.problem = req.body.problem;
      user.solution = req.body.solution;
      user.resetCode = null;
      user.save();
      res.status(200).send(user.problem);
    } else {
      res.status(404).send();
    }
  });
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
      res.status(200).send({
        name: user.name,
        email: user.email,
        token: jwt.sign({ userId: user.id }, jwtsecret),
        secret: 'none'
      });
    }
  });
});

module.exports = router;

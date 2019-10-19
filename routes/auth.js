var express = require('express');
var router = express.Router();
var User = require('../model/User');
var crypto = require("crypto");
var jwt = require('jsonwebtoken');
var path = require('path');
var nodeMailer = require('nodemailer');
var bodyParser = require('body-parser');

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
  User.findOne({email: req.body.email}, (err, user) => {
    if (user) {
      user.resetCode = req.body.resetCode;
      user.save();
      sendForgetPasswordResetCode(user.email, user.resetCode);
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

function sendForgetPasswordResetCode(to, resetCode) {
  console.log('inside sendForgetPasswordResetCode function');
  let htmlbody = 'Hi<br>We received a request to reset your password. Click the link below to choose a new' +
      ' one.<br><br><br>http://localhost:3000/#/reset?code='+resetCode;
  sendEmail(to, 'Password Reset Link- ioak.com', htmlbody);
}

function sendEmail(to, subject, htmlbody) {
  console.log('inside send email function');
  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'curate.ioak@gmail.com',
      pass: 'v1$3GLd!Y55w%J72!Xwy^EWj#'
    }
  });
  let mailOptions = {
    from: 'curate.ioak@gmail.com',
    to: 'amarendrait@gmail.com',
    subject: subject,
    html: htmlbody
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    res.render('index');
  });
}

module.exports = router;

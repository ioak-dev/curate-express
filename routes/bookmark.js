var express = require('express');
var router = express.Router();
var User = require('../model/User');
var crypto = require("crypto");
var jwt = require('jsonwebtoken');

const jwtsecret = 'jwtsecret';

router.put('/', (req, res) => {
  console.log(req.headers);
  
  jwt.verify(req.headers.authorization.split(" ")[1], jwtsecret, function(err, decoded) {
    if (decoded) {
      res.json('test');
    } else {
      res.status(401).send();
    }
    
  });
  
});

module.exports = router;

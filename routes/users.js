var express = require('express');
var router = express.Router();
var User = require('../model/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/auth', (req, res) => {
    User.find({}, (err, users) => {
        res.json(users);
    });
});

module.exports = router;

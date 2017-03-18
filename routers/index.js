var express = require('express');
var router = express.Router();
var Puppy = require('../models/db').Puppy;
var Park = require('../models/db').Park;

module.exports = router;

router.get('/', function(req, res, next) {
  Puppy.findAll({
    where: req.query
  })
  .then(res.send.bind(res))
  .catch(next);
});



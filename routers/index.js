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

router.get('/:id', function(req, res, next) {
  Puppy.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(function(puppy) {
    if (!puppy) {
      res.send('No puppy found!')
    } else {
      console.log(puppy.greet());
      res.json(puppy)
    }
  })
  .catch(next);
});

router.put('/:id', function(req, res, next) {
  Puppy.update(req.body, {
    where: {
      id: req.params.id,
    },
    returning: true,
  })
  .then(function(thingsUpdateReturns) {
    console.log("thingsUpdateReturns: " + thingsUpdateReturns);
    console.log(thingsUpdateReturns[1]);
    console.log(thingsUpdateReturns[1][0]);
    return thingsUpdateReturns[1][0];
  })
  .then(function(actualUpdatedPuppy) {
    res.send(actualUpdatedPuppy);
  })
  .catch(next);
});

router.post('/', function(req, res, next) {
  Puppy.create(req.body)
  .then(function(puppy) {
    res.send(puppy);
  })
  .catch(next);
});


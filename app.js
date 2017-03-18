var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var db = require('./models/db').db;
var router = require('./routers');

var app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/public')));

app.use('/puppies', router);

app.use('*', function(req, res, next) {
  res.send('This is the default route');
})

var server = app.listen(3000, function() {
  console.log("listening on port: ", server.address().port, "...")
  db.sync({force: false})
  .then(function(message) {
    console.log('...and the db is synced!');
  }).catch(function(err) {
    console.error(err);
  });
});


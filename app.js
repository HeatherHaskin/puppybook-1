var express = require('express');

var app = express();

var server = app.listen(3000, function() {
  console.log("listening on port: ", server.address().port, "...")
  // db.sync({force: true}).then(function(message) {
  //   console.log("...and the db is synced!");
  // }).catch(function(err) {
  //   throw err;
  // })
});

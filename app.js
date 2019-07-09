'use strict';

var express = require('express');
var app = express();

var admin = require("firebase-admin");
var serviceAccount = require("./modolabsjll-firebase-adminsdk-sj7ow-316c82c4df.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://modolabsjll.firebaseio.com"
});

var database = admin.database();

app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.get('/insert', function (req, res) {

  var ref = database.ref('list');
  var usersRef = ref.child("users");

  usersRef.set({
    alanisawesome: {
      date_of_birth: "June 22, 1912",
      full_name: "Alan Turing"
    },
    gracehop: {
      date_of_birth: "December 9, 1906",
      full_name: "Grace Hopper"
    }
  });

  console.log(database.ref);
  res.send('Inserted!');

});

app.get('/update', function (req, res) {

  var ref = database.ref('list');
  var usersRef = ref.child("users");
  var hopperRef = usersRef.child("gracehop");

  hopperRef.update({
    "nickname": "Amazing Grace"
  });

  res.send('Updated!');

});

app.get('/get', function (req, res) {

    res.send('getter');
    var ref = database.ref('list');
    ref.on("value", function(snapshot) {
        res.json(snapshot.val());
      console.log(snapshot);
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
});

app.get('/param', function (req, res) {

    var value = req.query.color1
    console.log(req.query);
    console.log(value);
    res.send('Param 1' + value);
});
app.get('/param?building', function (req, res) {

    res.send('Param 2');
});
app.get('/param/:building', function (req, res) {

    res.send('Param 3');
});

if (module === require.main) {
  // [START server]
  // Start the server
  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}

module.exports = app;
/*
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
*/

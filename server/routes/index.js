var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Hike = mongoose.model('hikes');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hikes' });
});

//get ALL hikes
router.get('/hikes', function(req, res, next) {
  Hike.find(function (err, hikes){
    console.log(hikes);
    res.json(hikes);
  });
});

//get SINGLE hike
router.get('/hike/:id', function(req, res, next) {
  var id = {"_id": req.params.id};
  Hike.findOne(id, function (err, hikes){
    console.log(hikes);
    res.json(hikes);
  });
});

//post ALL hikes
router.post('/hikes', function(req, res, next) {
  var newHike = new Hike(req.body);
  newHike.save(function (err, hikes){
    console.log(hikes);
    res.json({Message: "Hike was saved to database successfully!"});
  });
});


//update SINGLE hike

//delete SINGLE hike



// *** added to db to test ***//
var hike1 = new Hike({
  Name: "Maroon Bells",
  Location: "Aspen, CO",
  Difficulty: "Beginner",
  Duration: 2
});

var hike2 = new Hike({
  Name: "Sky Pond",
  Location: "Rocky Mountain National Park, Estes Park, CO",
  Difficulty: "Advanced",
  Duration: 5
});

//save hike in db
hike1.save(function(err) {
  if (err) throw err;
  console.log('Hike saved successfully!');
});

hike2.save(function(err) {
  if (err) throw err;
  console.log('Hike saved successfully!');
});

module.exports = router;


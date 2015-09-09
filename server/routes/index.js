var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Hike = mongoose.model('hikes');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'See Some Hikes' });
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
  newHike.save(function (err, hike){
    console.log(hike);
    res.json({Message: "Hike was saved to database successfully!"});
  });
});

//update SINGLE hike
router.put('/hike/:id', function(req, res, next) {
  var id = {"_id": req.params.id};
  var update = req.body;
  var options = {new: true};
  Hike.findOneAndUpdate(id, update, options, function (err, hikes){
    console.log(hikes);
    res.json(hikes);
  });
});

//delete SINGLE hike
router.delete('/hike/:id', function(req, res, next) {
  var id = {"_id": req.params.id};
  Hike.findOneAndRemove(id, function (err, hikes){
    console.log(hikes);
    res.json({Message: "Hike successfully removed from database."});
  });
});

// // *** added to db to test ***//
// var hike1 = new Hike({
//   Name: "Maroon Bells",
//   Location: "Aspen, CO",
//   Difficulty: "Beginner",
//   Duration: 2
// });

// var hike2 = new Hike({
//   Name: "Sky Pond",
//   Location: "Rocky Mountain National Park, Estes Park, CO",
//   Difficulty: "Advanced",
//   Duration: 5
// });

// //save hike in db
// hike1.save(function(err) {
//   if (err) throw err;
//   console.log('Hike saved successfully!');
// });

// hike2.save(function(err) {
//   if (err) throw err;
//   console.log('Hike saved successfully!');
// });

module.exports = router;


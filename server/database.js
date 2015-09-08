var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Hike = new Schema(
  {
    Name: String,
    Location: String,
    Difficulty: String,
    Duration: Number
  }
);

mongoose.model('hikes', Hike);

mongoose.connect('mongodb://process.env.MONGO_URI');



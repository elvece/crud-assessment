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

// setting the stage for more advanced uses of enviornment variables
process.env.DB_HOST = 'mongodb://localhost/01-crud-assessment';
mongoose.connect(process.env.DB_HOST);

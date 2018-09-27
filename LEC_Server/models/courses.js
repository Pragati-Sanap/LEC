var mongoose = require('mongoose');
// var mongooseTimestamp = require("mongoose-timestamp");
var Schema = mongoose.Schema;

var course = new Schema({
    course_id:String,
    course_name:String,
});
// course.plugin(mongooseTimestamp);
// mongoose.model('course', course);
module.exports = mongoose.model('course',course);


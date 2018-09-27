var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    course_id: String,
    package_id: String,
    institute_id: String,
    email_id: { type: String, unique: true, required: true },
    first_name: String,
    gender: String,
    last_name: String,
    student_id: String,
    password: String
});

module.exports = mongoose.model('user', user);
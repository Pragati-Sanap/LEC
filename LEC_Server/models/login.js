var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
var login = new Schema({
    course_id: String,
    package_id: String,
    institute_id: String,
    email_id: { type: String, unique: true, required: true },
    first_name: String,
    gender: String,
    last_name: String,
    student_id: Number,
    password: String
});

login.plugin(AutoIncrement, {inc_field: 'student_id'});


module.exports = mongoose.model('login', login);
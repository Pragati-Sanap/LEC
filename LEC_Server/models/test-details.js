var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var test_details = new Schema({
    attempts_remaining: String,
    instructions: String,
    subjects: String,
    test_details: {
        attempts_allowed: String,
        description: String,
        duration: String,
        instruction_id: String,
        name: String,
        passing_score: String,
        test_id: String,
        total_marks: String,
        total_questions: String,
        total_marks: String
    },
    test_status: String,
    time_remaining: String,
    total_attempted_questions: String,
    test_id:String
})

module.exports = mongoose.model('test_details', test_details);

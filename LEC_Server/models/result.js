var mongoose=require('mongoose');
var Schema = mongoose.Schema;


var result=new Schema({
    attempt:String,
    correct_answer: Number,
        marks_obtained: Number,
        negative_marks: Number,
        passing_status: String,
        percentage: String,
        questions_left: Number,
        right_marks: Number,
        test_time: Date,
        total_attempted: Number,
        wrong_answer:Number,
        test_given_id:Number,
        student: {
            first_name: String,
            student_id: Number
        },
        test: {
            attempt: Number,
            duration: Number,
            name: String,
            passing_score: Number,
            show_result: String,
            start_time: Date,
            test_id: String,
            test_type: String,
            total_marks: Number,
            total_questions: Number
        }
        
})

module.exports = mongoose.model('result', result);
       
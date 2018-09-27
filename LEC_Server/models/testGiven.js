
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// const AutoIncrement = require('mongoose-sequence')(mongoose);

var testGiven = new Schema({
   data:{
    test_id: String,
    answer_given: [{
        option_id:String,
        is_correct:String
    }],
    current_qtime: Array,
    groups: [Array],
    options: {},
    questions: [{}],
    test_name: String
   } ,
    institute_id: String,
    package_id: String,
    student_id: String,
    test_given_id: {type:Number,unique:true},
    actual_answer:[],
    status:String,
    remaining_time:Number
})
// testGiven.plugin(AutoIncrement, { inc_field: 'option.option_id' });

module.exports = mongoose.model('testGiven', testGiven);
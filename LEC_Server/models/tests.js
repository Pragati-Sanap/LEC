var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var tests=new Schema({
    attempts_allowed:String,
attempts_remaining:String,
duration:String,
name:String,
sr_no:String,
status:String,
subjects:String,
test_filter_key:String,
test_id:String,
total_marks:String
})

module.exports = mongoose.model('tests', tests);

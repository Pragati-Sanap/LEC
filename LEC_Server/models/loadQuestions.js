var mongoose=require('mongoose');
var Schema = mongoose.Schema;

const AutoIncrement = require('mongoose-sequence')(mongoose);

var createQuestions=new Schema({
    test_id:String,
    answer_given:[Array],
    current_qtime: Array,
    groups:[Array],
    options:{},      
    questions:[{String}],
    test_name:String
})
createQuestions.plugin(AutoIncrement, {inc_field: 'option.option_id'});

module.exports = mongoose.model('createQuestions', createQuestions);



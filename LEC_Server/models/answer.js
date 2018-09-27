var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var actualanswer=new Schema({
        test_id:String,
        answer:[]
    })
    
module.exports = mongoose.model('actualanswer', actualanswer);
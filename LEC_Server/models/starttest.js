var mongoose=require('mongoose');
var Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

var starttest=new Schema({
time_remaining:Number,
status:String,
test_given_id:{type:Number},
package_id:String,
random:Date,
student_id:String,
test_id:String,
})
starttest.plugin(AutoIncrement,  {inc_field: 'test_given_id'});

module.exports = mongoose.model('starttest', starttest);


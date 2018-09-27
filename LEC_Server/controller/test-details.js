var detailsModel = require('../models/test-details');
var testsModel = require('../models/tests');
var test_details = {


    create: function (req, res) {
        console.log(req.body.test_id);
        testsModel.findOne({ test_id: req.body.test_id }, function (err, docs) {
            console.log(docs);
            if (err || !docs || (req.body.test_id !== docs.test_id)) {
                res.status(500).json({ status: 'error', message: 'User Does Not exist' + err, docs: '' });
            }
            else {
                console.log(docs.status);
                if (docs.status == 'START' || docs.status == 'RE-ATTEMPT') {
                    var details = new detailsModel();
                        details.attempts_remaining = docs.attempts_remaining,
                        details.instructions = "<ul>↵	<li>Each question has Correct Marks as well as Negative marks which are displayed in the right corner of test model</li>↵	<li>Only one attempt for test is allowed</li>↵	<li>You can submit your test before given time time</li>↵</ul>↵",
                        details.subjects = docs.subjects,
                        details.test_details.attempts_allowed = docs.attempts_allowed,
                        details.test_details.description = docs.name + ' is an Objective test based on Time with Multiple Options and you need to select a correct solution from a set of choices',
                        details.test_details.duration = docs.duration,
                        details.test_details.instruction_id = "0000000004",
                        details.test_details.name = docs.name,
                        details.test_details.passing_score = (docs.total_marks / 4),
                        details.test_details.test_id = docs.test_id,
                        details.test_details.total_marks = docs.total_marks,
                        details.test_details.total_questions = (docs.total_marks / 4),
                        details.test_status = docs.status,
                        details.time_remaining = (docs.duration * 60),
                        details.total_attempted_questions = 0
                        details.test_id = docs.test_id,
                        details.save(function (err, doc) {
                            if (err) {
                                console.log("err");
                                console.log(err.message);
                                res.status(409).json({ status: 'error', message: 'database error ', docs: '' });
                            }
                            else {
                                res.status(200).json({ status: 'success', message: 'success', docs: doc });
                            }
                        })
                }
                else if (docs.status == 'INCOMPLETE') {
                    console.log(req.body.test_id !== docs.test_id);
                    console.log(req.body.test_id)
                    console.log(docs.test_id);

                    detailsModel.findOne({ test_id: req.body.test_id }, function (err, docs) {
                        console.log('inside update details');
                        console.log(docs);
                        if (err || !docs || (req.body.test_id != docs.test_id)) {
                            res.status(500).json({ status: 'success', message: 'User Does Not exist', docs: '' });
                        }
                        else {
                            docs.test_status='INCOMPLETE';
                            docs.save(function(err,doc){
                                if(err){
                                    console.log('err'+ err);
                                }
                                else{
                                    res.status(200).json({ status: 'success', message: 'success', docs: doc });
                                }
                            })
                        }
                    })
                }

            }

        })
    }

}

module.exports = test_details;



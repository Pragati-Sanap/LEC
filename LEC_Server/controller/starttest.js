var starttestModel = require('../models/starttest')
var testsModel = require('../models/tests');
var testGivenModel = require('../models/testGiven');
var detailsModel = require('../models/test-details');
var loginModel = require('../models/login');
var questionModel = require('../models/loadQuestions');
var answerModel = require('../models/answer');
var resultModel = require('../models/result');
answer: String;
var starttest = {
    starttest: function (req, res) {
        console.log(req.body);
        loginModel.findOne({ student_id: req.body.student_id }, function (err, docs) {
            console.log(docs);
            if (err || !docs || (req.body.student_id != docs.student_id)) {
                console.log(docs);

                res.status(500).json({ status: 'error', message: 'User Does Not exist' + err, docs: '' });
            }
            else {
                console.log(req.body.test_id);
                // details.test_details.test_id
                testsModel.findOne({ test_id: req.body.test_id }, function (err, docs) {
                    console.log(docs);
                    // if (docs.status == 'START' || docs.status == 'RE-ATTEMPT') {
                    if (err || !docs || (req.body.test_id != docs.test_id)) {
                        res.status(500).json({ status: 'error', message: 'User Does Not exist', docs: '' });
                    }
                    else {
                        var test = new starttestModel();
                        test.time_remaining = (docs.duration * 60),
                            test.status = "start",
                            test.package_id = req.body.package_id,
                            test.random = req.body.random,
                            test.student_id = req.body.student_id,
                            test.test_id = req.body.test_id
                        test.save(function (err, doc) {
                            if (err) {
                                console.log("err");
                                console.log(err.message);
                                res.status(500).json({ status: 'error', message: 'Test is  already registered ', docs: '' });
                            }
                            else {
                                res.send(doc);
                            }
                        })
                    }
                    // } else if (docs.status == 'INCOMPLETE') {
                    //     starttestModel.findOne({ test_id: req.body.test_id }, function (err, docs) {
                    //         if (err || !docs || (req.body.test_id != docs.test_id)) {
                    //             res.status(500).json({ status: 'success', message: 'User Does Not exist', docs: '' });
                    //         }
                    //         else {
                    //             res.send(docs);
                    //         }
                    //     })
                    // }
                })
            }
        })
    },
    createanswer: function (req, res) {
        var ans = new answerModel();
        ans.test_id = req.body.test_id;
        ans.answer = req.body.answer;

        ans.save(function (err, doc) {
            if (err) {
                console.log("err");
                console.log(err.message);
                res.status(500).json({ status: 'error', message: 'Test is  already registered ', docs: '' });
            }
            else {
                res.status(200).json({ status: 'success', message: 'Answer is  created ', docs: doc });
            }
        })
    },
    createQuestions: function (req, res) {
        console.log(req.body.test_id);
        testsModel.findOne({ test_id: req.body.test_id }, function (err, docs) {
            console.log(req.body.test_id);
            if (err || !docs || (req.body.test_id !== docs.test_id)) {
                console.log(docs);

                res.status(500).json({ status: 'error', message: 'User Does Not exist', docs: '' });
            }
            else {
                var question = new questionModel();
                question.test_id = req.body.test_id,
                    console.log(docs);
                var length = (docs.total_marks / 4);
                console.log(length);
                question.answer_given = new Array(length),
                    question.current_qtime = [],
                    question.groups = docs.subjects,
                    console.log(req.body.options)
                question.options = req.body.options,
                    question.test_name = docs.test_name;
                console.log('Creating question');
                question.save(function (err, doc) {
                    if (err) {
                        console.log("err");
                        console.log(err.message);
                        res.status(400).json({ status: 'error', message: 'Database Error', docs: '' });
                    }
                    else {
                        for (i = 0; i < length; i++) {
                            doc.current_qtime.push(0);
                        }
                        console.log(doc)
                        res.send(doc);
                    }
                })
            }
        })
    },
    /**
     * institute_id:"0000000004"
package_id:"0000000011"
student_id:"0000000329"
test_given_id:"0000000673"
test_id:"0000000047"
     */
    loadQuestions: function (req, res) {
        questionModel.findOne({ test_id: req.body.test_id }, function (err, docs) {
            console.log("docs" + (docs == null));
            if (err || !docs || (req.body.test_id != docs.test_id)) {
                // console.log(docs);

                res.status(500).json({ status: 'error', message: 'Test Does Not exist' + err, docs: '' });
            }
            else {
                console.log(req.body.test_id);
                console.log(docs);
                var test = new testGivenModel();
                test.data = docs;

                answerModel.findOne({ test_id: req.body.test_id }, function (err, docs) {
                    console.log(docs);
                    if (err || !docs || (req.body.test_id != docs.test_id)) {
                        res.status(500).json({ status: 'error', message: 'Test Does Not exist' + err, docs: '' });
                    }
                    else {
                        test.test_id = req.body.test_id;
                        test.test_given_id = req.body.test_given_id;
                        test.student_id = req.body.student_id;
                        test.package_id = req.body.package_id;
                        test.institute_id = req.body.institute_id;
                        test.actual_answer = docs.answer;
                        test.save(function (err, doc) {
                            if (err) {
                                console.log("err");
                                console.log(err.message);
                                res.status(502).json({ status: 'error', message: 'Database Error', docs: "doc" });
                            }
                            else {
                                console.log(doc)
                                // res.send(doc);
                                res.status(200).json({ status: 'success', message: 'success', docs: doc.data });
                            }
                        })
                    }
                })


            }
        })
    },
    // "test_given_id": this.test_given_id,
    //   "time_remaining": this.remaining_time
    update_time: function (req, res) {
        testGivenModel.findOne({ test_given_id: req.body.test_given_id }, function (err, docs) {
           if (err || !docs || (req.body.test_given_id != docs.test_given_id)) {
                console.log(docs);
                res.status(500).json({ status: 'error', message: 'database error', docs: '' });
            }
            else {
                console.log("docs test given");
                // console.log(docs);
                testsModel.findOne({ test_id: docs.data.test_id }, function (err, docs) {
                    // console.log(docs);
                    // console.log(req.body.time_remaining);
                    docs.status = 'INCOMPLETE';
                    docs.save(function (err, docs) {
                        if (err) {
                            res.status(500).json({ status: 'error', message: 'Database Error' + err, docs: '' });
                        }
                        else {
                            detailsModel.findOne({test_id:docs.data.test_id},function(err,docs){
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    docs.time_remaining=req.body.time_remaining;
                                    docs.save(function (err, docs) {
                                        if(err){
                                            console.log(err);
                                        }
                                        else{
                                            console.log("time success");
                                            console.log(docs);
                                        }
                                    })
                                }
                            })
                            starttestModel.findOne({ test_given_id: req.body.test_given_id }, function (err, docs) {
                                if (err) {
                                    res.status(500).json({ status: 'error', message: 'Error in updating remaining Time' + err, docs: '' });
                                }
                                else {
                                    console.log("updating remining time " + req.body.time_remaining);
                                                                     docs.time_remaining = req.body.time_remaining;
                                    docs.save(function (err, docs) {
                                        res.status(200).json({ status: 'success' });
                                    }
                                    )
                                }
                            })
                        }
                    });

                })

            }
        })
    },
    // answer_id:"0000002354"
    // current_qtime:"0000000584"
    // question_id:"0000000584"
    // student_id:"0000000329"
    // test_given_id:"0000000682"
    // test_id:"0000000046"
    saveAnswer: function (req, res) {

        testGivenModel.findOne({ test_given_id: req.body.test_given_id }, function (err, docs) {
            console.log(docs);

            if (err || !docs || (req.body.test_given_id != docs.test_given_id)) {
                console.log(docs);
                res.status(500).json({ status: 'error', message: 'User Does Not exist', docs: '' });
            }
            else {
                console.log(docs.data);

                console.log("docs test given");
                console.log(docs.student_id);
                for (i = 0; i < docs.data.questions.length; i++) {
                    if (req.body.question_id == docs.data.questions[i].question_id) {
                        console.log("index of question " + i);
                        if (docs.actual_answer[i] == req.body.answer_id) {
                            this.answer = "YES"
                        }
                        else {
                            this.answer = "No"
                        }
                        docs.data.questions[i].answer_given = 1;
                        console.log(docs.data.answer_given[i]);
                        docs.data.answer_given[i].option_id = req.body.answer_id;
                        docs.data.answer_given[i].is_correct = this.answer;

                        console.log("docs answer");
                        console.log(docs);
                        console.log(req.body.test_id);
                        console.log(docs);
                        docs.save(function (err, doc) {
                            if (err) {
                                res.status(500).json({ status: 'error', message: 'Database Error' + err, docs: '' });
                            }
                            else {
                                res.status(200).json({ status: 'success', docs: doc.data });
                                console.log(err);

                            }
                        });
                    }
                }

            }
        })
    },
    // student_id:"0000000329"
    // test_given_id:701  
    submit_test: function (req, res) {
        testGivenModel.findOne({ test_given_id: req.body.test_given_id }, function (err, docs) {
            if (err) {
                console.log(err);
                res.status(500).json({ status: 'error', message: 'Database Error' + err, docs: '' });

            } else {
                console.log(docs);
                console.log(req.body);
                var result = new resultModel();
                result.test_given_id = req.body.test_given_id;
                loginModel.findOne({ student_id: req.body.student_id }, function (err, docs) {
                    if (err) {
                        console.log('error in getting student ');
                    }
                    else {
                        result.student.first_name = docs.first_name;
                        result.student.student_id = docs.student_id;
                    }
                })
                var test_id = docs.data.test_id;
                console.log(test_id);
                testsModel.findOneAndUpdate({test_id:test_id},{$set:{"status":"RE-ATTEMPT"}})

                testsModel.findOne({ test_id: test_id }, function (err, docs) {
                        result.test.attempt = docs.attempts_remaining - 1,
                        result.test.duration = docs.duration,
                        result.test.name = docs.name,
                        result.test.passing_score = (docs.total_marks / 4),
                        result.test.show_result = 'IMIDIATE',
                        result.test.test_id = docs.test_id,
                        result.test.test_type = "Practice Test",
                        result.test.total_marks = docs.total_marks,
                        result.test.total_questions = (docs.total_marks / 4)

                        docs.status='RE-ATTEMPT';
                        docs.attempts_remaining=docs.attempts_remaining - 1;
                        docs.save(function(err,doc){
                            if(err){
                                console.log('err'+err);
                            }else{
                                console.log('doc'+doc);
                            }
                        })
                })
                testsModel.findOneAndUpdate({test_id:docs.data.test_id},{$set:{'attempts_remaining':result.test.attempt}})

                starttestModel.findOne({ test_given_id: req.body.test_given_id }, function (err, docs) {

                    console.log(docs);
                    result.test.start_time = docs.random;
                    result.test_time = new Date(docs.random);
                })

                var length = docs.data.questions.length;
                console.log(length);

                var total_attempted = 0;
                var wrong_answer = 0;
                var questions_left = 0;
                for (i = 0; i < length; i++) {

                    if (docs.data.answer_given[i].option_id != null) {
                        total_attempted++;
                    }
                    console.log();

                    if (docs.data.answer_given[i].is_correct == 'No') {
                        wrong_answer++;
                        console.log(wrong_answer);
                    }
                    if (docs.data.answer_given[i].is_correct == null) {
                        questions_left++;
                    }
                }
                    result.total_attempted = total_attempted,
                    result.wrong_answer = wrong_answer,
                    result.negative_marks = wrong_answer,
                    result.right_marks = (total_attempted - wrong_answer) * 4,
                    result.marks_obtained = result.right_marks - result.negative_marks,
                    console.log(result.marks_obtained);
                if (result.marks_obtained < length) {
                    result.passing_status = "Failed";
                } else {
                    result.passing_status = "Passed";
                }
                result.questions_left = questions_left;
                result.percentage = (result.marks_obtained / (length * 4)) * 100,
                result.save(function (err, doc) {
                        if (err) {
                            res.status(500).json({ status: 'error', message: 'error in result updation' });
                        }
                        else {
                            res.status(200).json({ status: 'success', message: 'success in result', docs: doc });
                        }
                    })

            }
        })
    },


}


module.exports = starttest;

/***
 * testGivenModel.find({},function(err, docs){
    console.log("docs");
    console.log(docs);
})
 */
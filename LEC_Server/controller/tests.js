var testsModel = require('../models/tests');
var loginModel = require('../models/login');
var userTestModel = require('../models/userTest');
var tests = {
    create: function (req, res) {
        console.log(req.body);
        // var user = new userModel();
        var test = new testsModel();
        test.attempts_allowed = req.body.attempts_allowed,
            test.attempts_remaining = req.body.attempts_remaining,
            test.duration = req.body.duration,
            test.name = req.body.name,
            test.sr_no = req.body.sr_no,
            test.status = req.body.status,
            test.subjects = req.body.subjects,
            test.test_filter_key = "KEYWORD-START",
            test.test_id = req.body.test_id,
            test.total_marks = req.body.total_marks

        console.log('************')
        test.save(function (err, doc) {
            if (err) {
                console.log("err");
                console.log(err.message);
                res.status(409).json({ status: 'error', message: 'you are already registered ', docs: '' });
            }
            else {
                res.status(200).json({ status: 'success', message: 'get Created Successfully', docs: doc });
            }
        })
    },
    getAll: function (req, res) {
        console.log(req.body.student_id)
        loginModel.findOne({ student_id: req.body.student_id }, function (err, docs) {
            // console.log(req.body.student_id !== docs.student_id);
            // console.log(req.body.student_id)
            // console.log(docs.student_id);
            // console.log(docs)

            if (err || !docs || (req.body.student_id != docs.student_id)) {

                console.log(docs);

                res.status(500).json({ status: 'error', message: 'User Does Not exist' + err, docs: '' });
            }
            else {
                testsModel.find(function (err,docs) {
                    console.log(docs);

                    if (err) {
                        res.status(500).json({ status: 'error', message: 'Database error' + err, docs: '' });
                    }
                    else {
                         res.status(200).json({ status: 'success', message: 'success' + err,docs:docs });
                    }
                });
            }

        })

    },
    getPracticeTests: function (req, res) {
        console.log(req.body.student_id)
        loginModel.findOne({ student_id: req.body.student_id }, function (err, docs) {

            if (err || !docs || (req.body.student_id != docs.student_id)) {
                console.log("error in docs");
                res.status(500).json({ status: 'error', message: 'User Does Not exist' + err, docs: '' });
            }
            else {
                console.log(req.body);
                userTestModel.findOne({ student_id: req.body.student_id }, function (err, docs) {
                    console.log(docs)
                    if(docs!=null){
                        if (req.body.student_id == docs.student_id) {
                            if (err) {
                                console.log("err");
                                console.log(err.message);
                                res.status(409).json({ status: 'error', message: err.message, docs: '' });
                            }
                            else {
                                res.status(200).json({ status: 'success', message: 'test already exist', docs: docs.practiceTests });
                            }
                        }
                    }
                     else {
                        var user = new userTestModel();
                        user.student_id = req.body.student_id;
                        user.institute_id = req.body.institute_id,
                            testsModel.find(function (err, doc) {
                                user.practiceTests = doc;
                                // console.log(doc);
                                console.log("inside test");
                                user.save(function (err, doc) {
                                    if (err) {
                                        console.log("err");
                                        console.log(err.message);
                                        res.status(409).json({ status: 'error', message: err.message, docs: '' });
                                    }
                                    else {
                                        res.status(200).json({ status: 'success', message: 'get Created Successfully', docs: doc.practiceTests });
                                    }
                                })
                            });
                        console.log(user);

                    }
                })

            }
        })
    }
}

module.exports = tests;
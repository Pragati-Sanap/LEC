var userModel = require('../models/user');
var loginModel = require('../models/login');

var users = {
    create: function (req, res) {
        console.log(req.body);
        var user = new loginModel();

            user.course_id = req.body.course_id,
            user.first_name = req.body.first_name,
            user.gender = req.body.gender,
            user.last_name = req.body.last_name,
            user.email_id = req.body.email_id,
            user.student_id = "0000000325",
            user.password = req.body.password
            user.package_id = "0000000011",
            user.institute_id = "0000000004"

        console.log('************')
        user.save(function (err, doc) {
            if (err) {
                console.log("err");
                console.log(err.message);
                res.status(409).json({ status: 'error', message: 'you are already registered ', docs: '' });
            }
            else {
                res.status(200).json({ status: 'success', message: 'You have been registered successfully', docs: doc });
            }
        })
    },
    getAll: function (req, res) {
        userModel.find(function (err, doc) {
            if (err) {
                res.status(500).json({ status: 'error', message: 'Database error' + err, docs: '' });
            }
            else {
                res.status(200).json({ status: 'success', message: 'success' + err, docs: doc });
            }
        });
    }
}

module.exports = users;
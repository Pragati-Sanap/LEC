var express = require('express');
var router = express.Router();
var login = require('./controller/login');
var courses = require('./controller/courses.js');
var tests = require('./controller/tests');
var test_details = require('./controller/test-details');
var starttest=require('./controller/starttest');
var router = express.Router();
path = require('path'),


router.get('/login/get_courses', courses.getAll);
router.post('/login/get_course', courses.create);

router.post('/login/register', login.create);
router.post('/login/dologin', login.Check);

router.post('/mytests/get_practice_tests', tests.getAll);
router.post('/mytests/getPracticeTests', tests.getPracticeTests);

router.post('/mytests/testdetails',test_details.create);

router.post('/taketest/starttest',starttest.starttest);

router.post('/taketest/createQuestions',starttest.createQuestions);
router.post('/taketest/loadQuestions',starttest.loadQuestions);

router.post('/taketest/saveAnswer',starttest.saveAnswer);

router.post('/taketest/createanswer',starttest.createanswer);
router.post('/taketest/update_time',starttest.update_time);
router.post('/taketest/submit_test',starttest.submit_test);

module.exports = router;
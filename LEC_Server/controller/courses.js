var courseModel=require('../models/courses');

var courses={
    create: function (req, res) {

        var course = new courseModel();
        course.course_id = req.body.course_id;
        course.course_name = req.body.course_name;
        console.log('************')
        course.save(function(err,doc){
            if(err){
                res.status(500).json({ status: 'error', message: 'Database error' + err, docs: '' });
            }
            else{
                res.json(doc);
                // res.status(200).json({ status: 'success', message: 'Document Added Successfully', docs: doc });
            }
        })
    },
    getAll: function (req, res) {

        courseModel.find(function (err, doc) {
            if (err) {
                res.status(500).json({ status: 'error', message: 'Database error' + err, docs: '' });
            }
            else {
                res.status(200).json({ status: 'success', message: 'success' + err, docs: doc });
            }
        });
    }
}

module.exports=courses; 
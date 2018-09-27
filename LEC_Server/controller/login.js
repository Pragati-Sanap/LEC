var loginModel = require('../models/login');
 jwt = require('jwt-simple');config=require('../config/config');


var login = {
    getAll: function(req, res) { 
       
        loginModel.find({},function(err, docs){
        if(err){
            res.status(500).json({status:   'error', message: 'Database Error' +err, docs: ''  });
        }else{
            
            res.status(200).json({status:   'success', docs: docs  });     
        }
        });
    },create: function (req, res) {
        console.log(req.body);
        var user = new loginModel();

            user.course_id = req.body.course_id,
            user.first_name = req.body.first_name,
            user.gender = req.body.gender,
            user.last_name = req.body.last_name,
            user.email_id = req.body.email_id,
            user.password = req.body.password
            user.package_id = '0000000011',
            user.institute_id = '0000000004'

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
     Check: function(req, res) { 
       console.log(req.body.email_id);
        loginModel.findOne({email_id: req.body.email_id},function(err, docs){
            console.log(docs);
          if(err || !docs || (req.body.password !== docs.password)){
              console.log(err);
            res.status(400).json({status:   'error', message: 'Invalid Error' +err, docs: docs  });
        }else{  
                  var payload = {
                        email: docs.email,
                    };

                    var token = jwt.encode(payload, config.secret);
                    res.status(200).json({status: 'success', docs: docs});  
        }
        });
    },
    
    delete: function(req, res) {
       loginModel.remove({_id: req.params.id}, function(err, docs){               
                         
        if(err){
            res.status(500).json({status:   'error', message: 'Database Error' +err, docs: ''  });
        }else{
            res.status(200).json({status:   'success', docs: docs  });     
        }
        });
    }    
};

module.exports = login;
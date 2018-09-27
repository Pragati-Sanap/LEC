var userModel = require('../models/login'),
    config = require('../config/config'),
    jwt = require('jwt-simple');
    // imageFile = "";
var users = {
    
         login: function(req,res){

 
            userModel.findOne({email: req.body.email},function(err,user){
                // console.log(req.body.password);
                console.log(user);
                if(err || !user){
                    res.status(401).json({"response":"Invalid email"});
                }else{
                    var payload = {email: user.email};
                    var token = jwt.encode(payload, config.secret);
                    res.status(200).json({'status':"successful login",'doc':user});
                }
            });
         },
         getOneByEmail: function(req,res){
            // console.log(req.body.email);
            empModel.findOne({email: req.body.email},function(err,user){
             
                if(err){
                    res.status(401).json({"response":"Invalid login"});
                }else{
                
                    res.status(200).json(user);
                }
            });
         }
        }

module.exports = users;

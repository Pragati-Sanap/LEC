var jwt = require('jwt-simple');
// var validateUser = require('../users/loginCtrl').validate;
var config = require('../config/config');
var userModel = require('../models/login');
var validate = {
    check: function(req,res,next){
    //    console.log("in the middleware");
        var token = req.body.token || req.headers['token'];
        //   console.log(token);
        var decoded = jwt.decode(token, config.secret);
       
        userModel.findOne(
            {email:decoded.email
            },
            function(err,user){
            if(err || !user){
                res.status(401).json({"response":"Invalid token"});
            }
            else{
           next();
            }
        });
    }
}

module.exports = validate;

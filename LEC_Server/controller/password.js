var passwordModel = require('../models/login');

var password = {
    getAll: function(req, res) { 
       
        passwordModel.find({},function(err, docs){
          //console.log(err);
          //  console.log(docs);
        if(err){
            res.status(500).json({status:   'error', message: 'Database Error' +err, docs: ''  });
        }else{
            res.status(200).json({status:   'success', docs: docs  });     
        }
        });
    },
    
    
    getOne: function(req, res) {
           passwordModel.findOne({email: req.body.email}, function(err, docs){
                                  //passwordModel.find({},function(err, docs){
               
             //  console.log(docs);
                         
        if(err){
            res.status(500).json({status:   'error', message: 'Database Error' +err, docs: ''  });
        }else{
            passwordModel.findByIdAndUpdate(docs._id, { $set: { password: req.body.password }},function (err, docs) {
                 if(err){
                res.status(500).json({status:   'error', message: 'Database Error' +err, docs: ''  });
                 }
                res.status(200).json({status:   'success', docs: docs  });
});
                 
        
        }
        });
        
        
//           userModel.findOne({email: req.body.email},function(err,user){
//                // console.log(req.body.password);
//                if(err || !user){
//                    res.status(401).json({"response":"Invalid email"});
//                }else{
//                    var payload = {email: user.email};
//                    var token = jwt.encode(payload, config.secret);
//                    res.status(200).json({'status':"successful login",'token':token});
//                }
//            });
    
    },
    create: function(req, res) {
        
        var emp = new passwordModel();
        //product.name = req.body.name;
        //product.price = req.body.price;
        
      //  console.log(product.name);
       // console.log(name);
        
       emp.save(function(err, docs){
                         
        if(err){
            res.status(500).json({status:   'error', message: 'Database Error' +err, docs: ''  });
        }else{
            res.status(200).json({status:   'Document added success', docs: docs  });     
        }
        });
    },
    
    update: function(req, res) {
        passwordModel
      passwordModel.findById(req.params.id, function(err, doc){
                         
        if(err)
            res.status(500).json({status:   'error', message: 'Database Error' +err, docs: ''  });
            
            doc.email = req.body.email;
            doc.password = req.body.password; 
            
          console.log(doc.email);
          console.log(doc.password);
            doc.save(function(err, docs){
                if(err){
                  res.status(500).json({status:   'error', message: 'Database Error' +err, docs: ''  });     
                } 
                else{
                        res.status(200).json({status: 'success', docs: docs });     
                    }
            });
          

        });
    },
    
    delete: function(req, res) {
       passwordModel.remove({_id: req.params.id}, function(err, docs){               
                         
        if(err){
            res.status(500).json({status:   'error', message: 'Database Error' +err, docs: ''  });
        }else{
            res.status(200).json({status:   'success', docs: docs  });     
        }
        });
    }    
};

module.exports = password;
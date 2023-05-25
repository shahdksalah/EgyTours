const User =require('../models/usersdb.js');
const{check,validationResult} =require('express-validator');
const updateUser=async(req, res) =>  {
    console.log("entered");
    const errors=validationResult(req);
  
     if(!errors.isEmpty()){
         const alert=errors.array();
         console.log(alert)
     }
     else{
      await User.findByIdAndUpdate(req.body.id,{Username:req.body.upuname,Email:req.body.upemail,PhoneNumber:req.body.upnumber
       ,Password:req.body.uppsw,ConfPassword:req.body.uppsw});
    }
  
  
  }

  const deleteUser=async(req,res)=>{
    console.log("entered");
    
         await User.findByIdAndDelete(req.body.id)
        .then(async result=>{
              var Users=await User.find();
              res.render("users",{users:Users});
        })
        .catch(err=>{
            console.log(err);
        })
    
    };

  module.exports={updateUser,deleteUser};
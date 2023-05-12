const express=require('express')
const router=express.Router();
const User= require('../models/usersdb.js');
const mongoose=require('mongoose');
var db = mongoose.connection;


router.get('/',function(req,res)
{
    res.render("index");
});

module.exports=router;

router.post('/success', (request, response) =>  {
    console.log("entered");
      const userdetails = new User({
          Username: request.body.unam,
          Email: request.body.email,
          PhoneNumber: request.body.number,
          Password: request.body.psw,
          ConfPassword: request.body.confpsw,
        });
      db.collection("users").insertOne(userdetails,(err,result)=>{
        if(err)
        {
         console.log(err);
        }
        else{
         console.log("saved");
         response.redirect('/');
        }
  
      
    })
  });
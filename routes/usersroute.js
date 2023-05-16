const express=require('express')
const router=express.Router()
const validate =require('../public/js/formsVal.js');
const User =require('../models/usersdb.js');
const mongoose =require('mongoose');
var db = mongoose.connection;
const bodyParser=require('body-parser');
const{check,validationResult} =require('express-validator');
const urlencodedParser=bodyParser.urlencoded({ extended: false });

router.get('/',function(req,res)
{
    res.render("users");
});

router.post('/',urlencodedParser,[
    check('unam','Username must be 3+ characters long')
    .exists()
    .isLength({min:3})
    ,
  
    check('email','Email is not valid')
    .isEmail()
    .normalizeEmail(),
    
    check('number','Invalid phone number')
    .isMobilePhone(),
  
    check('psw','Invalid Password')
    .exists()
    .isLength({min:6}),
  
    check('confpsw','Invalid Password')
    .exists()
    .isLength({min:6})
  
  ] ,(request, response) =>  {
    console.log("entered");
  
    const errors=validationResult(request)
    console.log(validate.register)
    if(!errors.isEmpty()){
        const alert=errors.array();
    }
    else if(validate.register==false)
       console.log("error");
   else{
      const userdetails = new User({
          Username: request.body.uname,
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
   }
    });

router.post('/success',async(request, response) =>  {

    console.log(request.body.search);
    var query=request.body.search;
    var Users=[];
    const user1=await User.find().where("Username").equals(query);
    Users=Array.from(user1);
    console.log(Users[0]);
    response.render("users",Users[0]==="undefined"?"":Users[0]);
    

    
  });

module.exports=router;
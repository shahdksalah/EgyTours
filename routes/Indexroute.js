const express=require('express')
const router=express.Router();
const User= require('../models/usersdb.js');
const Customer= require('../models/customersdb.js');
const Admin= require('../models/adminsdb.js');
const validate=require('../public/js/formsVal.js')
const mongoose=require('mongoose');
var db = mongoose.connection;
const bodyParser = require('body-parser');
const{check,validationResult}=require('express-validator');
const lodash=require('lodash');

const urlencodedParser=bodyParser.urlencoded({ extended: false });
let path=require('path');



router.get('/',function(req,res)
{
    res.render("index");
});

module.exports=router;



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
  if(!errors.isEmpty()){
      const alert=errors.array();
  }
  else if(request.body.psw!==request.body.confpsw)
     console.log("error");
 else{
    console.log("e");
    const userdetails = new User({
        Username: request.body.unam,
        Email: request.body.email,
        PhoneNumber: request.body.number,
        Password: request.body.psw,
        ConfPassword: request.body.confpsw,
        Type:request.body.type
      });
      if(request.body.type==="User"){
        const customerdetails = new Customer({
          Username: userdetails.Username,
          Email: userdetails.Email,
          PhoneNumber: userdetails.PhoneNumber,
          Password: userdetails.Password,
          ConfPassword:userdetails.ConfPassword
        });

        db.collection("users").insertOne(customerdetails,(err,result)=>{
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
      else if(request.body.type==="Admin"){
        const admindetails = new Admin({
          Username: userdetails.Username,
          Email: userdetails.Email,
          PhoneNumber: userdetails.PhoneNumber,
          Password: userdetails.Password,
          ConfPassword:userdetails.ConfPassword
        });

        db.collection("admins").insertOne(admindetails,(err,result)=>{
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
   
 }
  });


  router.get('/AddActivity',function(req,res)
{
    res.render("AddActivity");
});


router.post('/login',urlencodedParser,[
  check('usename','Username is empty')
  .exists(),
  check('password','password is empty')
  .exists()
],(request,response)=>{
  console.log("entered");
  let un=request.body.username;
  let pass=request.body.password;
  const errors=validationResult(request)
  db.collection('users').find({Username:un,Password:pass}).toArray((err, result) => {

    if (err) {
        console.log('The search errored');
    } else if (_.isEmpty(result)) {
        console.log('record not found')
    } else {
        console.log(result);
    };
});
  db.collection('admins').find({Username:un,Password:pass}).toArray((err, result) => {

    if (err) {
        console.log('The search errored');
    } else if (_.isEmpty(result)) {
        console.log('record not found')
    } else {
        console.log(result);
    };
  });
  if(!errors.isEmpty()){
      const alert=errors.array();
      for( i=0;i<errors.length;i++){
          console.log(errors[i]);
      }
  }
  else{
   
 
    console.log("fares")
   
    db.collection('admins').findOne({Username:un,Password:pass},function(err,result){
      if(err)
        console.log(err);
      else{
        console.log("admin logged in");
      }
    });

    
  
}

});





router.post('/submit',(request, response) =>  {
  console.log("entered");
      console.log(request.body);
      console.log(request.body.file);


    const activitydetails = new Activity({
        Name:request.body.Aname,
        Type:request.body.Atype,
        Picture:request.body.file,
        BriefDes:request.body.Abrief,
        DetailedDes:request.body.Adetails,
        Plan:request.body.Aplan,
        CancelDet:request.body.Acancel,
        Duration:request.body.Atime,
        PickupDet:request.body.Apickup,
        AvailableDate:request.body.Dates
      });

      const file=request.files;
     const filepath= path.join(__dirname,'uploads',`${request.files}`);
/*
     file.mv(filepath,err => {
      if(err) return response.status(500).send(err);
      console.log("success");
     })
*/
    db.collection("activities").insertOne(activitydetails,(err,result)=>{
      if(err)
      {
       console.log(err);
      }
       console.log("saved");
       response.render("food");

    
  })
});
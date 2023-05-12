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

router.post('/',urlencodedParser,[
  check('unam','Username must be 3+ characters long')
  .exists()
  .isLength({min:3})
  ,

  check('email','Email is not valid')
  .isEmail()
  .normalizeEmail()

] ,(request, response) =>  {
  console.log("entered");

  const errors=validationResult(request)
  if(!errors.isEmpty()){
      const alert=errors.array();
      response.render('index',{alert});
  }
 else{
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
 }
  });

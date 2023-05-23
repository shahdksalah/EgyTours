const express=require('express')
const router=express.Router()
const validate =require('../public/js/formsVal.js');
const User =require('../models/usersdb.js');
const mongoose =require('mongoose');
var db = mongoose.connection;
const bodyParser=require('body-parser');
const{check,validationResult} =require('express-validator');
const urlencodedParser=bodyParser.urlencoded({ extended: false });



router.get('/',async function(req,res)
{
    var Users=[];
    Users=await User.find();
    console.log(Users)
    res.render("users",{users:(Users==='undefined'?"":Users)});
});

router.post('/success',urlencodedParser,[
    check('uname','Username must be 3+ characters long')
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
   // console.log("entered");
  
    const errors=validationResult(request)
    console.log(validate.register)
    if(!errors.isEmpty()){
        const alert=errors.array();
    }
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

router.post('/',urlencodedParser,[
  check('upuname','Username must be 3+ characters long')
  .exists()
  .isLength({min:3})
  ,

  check('upemail','Email is not valid')
  .isEmail()
  .normalizeEmail(),
  
  check('upnumber','Invalid phone number')
  .isMobilePhone(),

  check('uppsw','Invalid Password')
  .exists()
  .isLength({min:6}),

] ,async(request, response) =>  {
  console.log("entered");
  console.log(request.body.upemail);
  

  const errors=validationResult(request)
  /*if(!errors.isEmpty()){
      const alert=errors.array();
  }
  else{*/
    
    console.log(request.body.id);
        //  db.users.updateOne({_id:request.body.id}, { $set: 
        //  {Username:request.body.userUpdated,Email:request.body.emailUpdated,PhoneNumber:request.body.phoneUpdated
        //  ,Password:request.body.pswUpdated,ConfPassword:request.body.pswUpdated}
     
        //  })

    await User.findByIdAndUpdate(request.body.id,{Username:request.body.upuname,Email:request.body.upemail,PhoneNumber:request.body.upnumber
     ,Password:request.body.uppsw,ConfPassword:request.body.uppsw});

  //}

});
module.exports=router;
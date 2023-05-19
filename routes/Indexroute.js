const express=require('express')
const router=express.Router();
const User= require('../models/usersdb.js');
const validate=require('../public/js/formsVal.js')
const mongoose=require('mongoose');
var db = mongoose.connection;
const bodyParser = require('body-parser');
const{check,validationResult}=require('express-validator');
const lodash=require('lodash');
const session=require('express-session');

const urlencodedParser=bodyParser.urlencoded({ extended: false });
let path=require('path');



router.get('/',function(req,res)
{
   res.render("index",{user:(!req.session.authenticated)?"":req.session.user});
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
    const userdetails = new User({
        Username: request.body.unam,
        Email: request.body.email,
        PhoneNumber: request.body.number,
        Password: request.body.psw,
        ConfPassword: request.body.confpsw,
        Type:request.body.type
      });
    
       userdetails.save()
       .then((result)=>{
         console.log('user added');
         response.redirect("/");
       });
       
 }
  });




router.post('/login',urlencodedParser,[
  check('usename','Username is empty')
  .exists(),
  check('password','password is empty')
  .exists()
],(request,response)=>{
  const errors=validationResult(request)
  console.log("entered");
  var query={Username:request.body.username,Password:request.body.password};
  User.find(query)
  .then(result=>{
     console.log(result[0]);
     request.session.user=result[0];
     request.session.authenticated=true;
     response.redirect("/");
  });
 
});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.user=null;
    res.clearCookie('user')
    req.session.destroy()
    console.log("destroyed")
    res.render("index",{user:""});
    console.log("redirected")
  } else {
    res.end()
  }
})






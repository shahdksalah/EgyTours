const express=require('express')
const router=express.Router();
const User= require('../models/usersdb.js');
const mongoose=require('mongoose');
var db = mongoose.connection;
const bodyParser = require('body-parser');
const{check,validationResult}=require('express-validator');

const urlencodedParser=bodyParser.urlencoded({ extended: false });

router.get('/',function(req,res)
{
    res.render("index");
});


router.get('/food',function(req,res)
{
    res.render("food");
});

router.get('/activities',function(req,res)
{
    res.render("activities");
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


  app.get('/AddActivity',function(req,res)
{
    res.render("AddActivity");
});



app.post('/submit',(request, response) =>  {
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

     file.mv(filepath,err => {
      if(err) return response.status(500).send(err);
      console.log("success");
     })
    db.collection("activities").insertOne(activitydetails,(err,result)=>{
      if(err)
      {
       console.log(err);
      }
       console.log("saved");
       response.render("food");

    
  })
});
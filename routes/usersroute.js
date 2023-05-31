const express=require('express')
const router=express.Router()
const validate =require('../public/js/formsVal.js');
const User =require('../models/usersdb.js');
const mongoose =require('mongoose');
var db = mongoose.connection;
const bodyParser=require('body-parser');
const{check,validationResult} =require('express-validator');
const urlencodedParser=bodyParser.urlencoded({ extended: false });
const {updateUser,deleteUser,toAdmin,toClient}=require('../controllers/usersController.js');
router.use(bodyParser.json());

router.use((req, res, next) => {
  if (req.session.user !== undefined && req.session.user.Type === 'admin') {
      next();
  }
  else {
      res.render('err', { err: 'You are not an Admin', user: (!req.session.authenticated) ? "" : req.session.user  })
  }
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

] ,updateUser);

router.get('/',getUsers);
router.post('/delete',deleteUser);
router.get("/toAdmin/:id", toAdmin);
router.get("/toClient/:id", toClient);
module.exports=router;


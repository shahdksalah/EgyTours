const express = require('express')
const router = express.Router();
const User = require('../models/usersdb.js');
const validate = require('../public/js/formsVal.js')
const mongoose = require('mongoose');
var db = mongoose.connection;
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const lodash = require('lodash');
const bcrypt = require("bcrypt");


const urlencodedParser = bodyParser.urlencoded({ extended: false });
let path = require('path');



router.get('/', function (req, res){
  res.render("index", { user: (!req.session.authenticated) ? "" : req.session.user });
});


router.post('/', urlencodedParser, [
  check('unam', 'Username must be 3+ characters long')
    .exists()
    .isLength({ min: 3 })
  ,

  check('email', 'Email is not valid')
    .isEmail()
    .normalizeEmail(),

  check('number', 'Invalid phone number')
    .isMobilePhone(),

  check('psw', 'Invalid Password')
    .exists()
    .isLength({ min: 6 }),

  check('confpsw', 'Invalid Password')
    .exists()
    .isLength({ min: 6 })


], (request, response) => {
  console.log("entered");
  let hashedPass;
  const saltRounds = 10;

  const errors = validationResult(request)
  if (!errors.isEmpty()) {
    const alert = errors.array();
  }
  else if (request.body.psw !== request.body.confpsw)
    console.log("error");
  else {
    bcrypt
  .hash(request.body.psw, saltRounds)
  .then(hash => {
    hashedPass=hash;

    console.log('Hash ', hashedPass)
    const userdetails = new User({
      Username: request.body.unam,
      Email: request.body.email,
      PhoneNumber: request.body.number,
      Password: hashedPass,
      ConfPassword: hashedPass,
      Type: request.body.type
    });

    userdetails.save()
      .then((result) => {
        console.log('user added');
        response.redirect("/");
      });
  })
  .catch(err => console.error(err.message))
 

  }
});




router.post('/login', urlencodedParser, [
  check('username', 'Username is empty')
    .exists(),
  check('password', 'password is empty')
    .exists()
], (request, response) => {
  const errors = validationResult(request)
  if (!errors.isEmpty()) {
      const alert = errors.array();
      console.log(alert[0]);
  }
  else{
  console.log("entered");
  var query = { Username: request.body.username};
  User.find(query)
    .then(result => {
    bcrypt
    .compare(request.body.password, result[0].Password)
    .then(res => {
      console.log(res) 
      if(res){
      console.log(result[0]);
      request.session.user = result[0];
      request.session.authenticated = true;
      response.redirect('back')
      }
    })
    .catch(err => console.error(err.message)) 

    });
  }
});

router.get('/signout', function (req, res) {

  req.session.destroy();
  console.log("destroyed");
  res.redirect("/");

})



module.exports = router;

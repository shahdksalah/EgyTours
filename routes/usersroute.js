const express = require('express')
const router = express.Router()
const validate = require('../public/js/formsVal.js');
const User = require('../models/usersdb.js');
const mongoose = require('mongoose');
var db = mongoose.connection;
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const { getUsers, updateUser, deleteUser, toAdmin, toClient,validateSignUp } = require('../controllers/usersController.js');
router.use(bodyParser.json());
const bcrypt = require("bcrypt");
const city = require("../models/addcitiesdb.js");

router.use((req, res, next) => {
  if (req.session.user !== undefined && req.session.user.Type === 'admin') {
    next();
  }
  else {
    res.render('err', { err: 'You are not an Admin', user: (!req.session.authenticated) ? "" : req.session.user })
  }

});


router.post("/success", validateSignUp(), async (req, res) => {
  var Users=await User.find();

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const alert = errors.array();
      console.log(alert);
      res.render('users', {users:(Users==='undefined'?"":Users),userUpdated:false,msg:"", alert: alert });
    }


    else {
      var type = "client";
      console.log("signing up");
      let hashedPass;
      const saltRounds = 10;
      bcrypt.hash(req.body.psw, saltRounds).then((hash) => {
        hashedPass = hash;
        console.log("Hash ", hashedPass);

        var user = new User({
          Username: req.body.uname,
          Email: req.body.email,
          PhoneNumber: req.body.number,
          Password: hashedPass,
          ConfPassword: hashedPass,
          Type: type,
        });
        user.save().then((result) => {
          console.log("user added");
          res.render("users", {users:(Users==='undefined'?"":Users),userUpdated:false,msg:"", alert: alert });
        });
      });
    }
  }
  catch (err) {
    console.log(err);
  }
});





router.post('/', urlencodedParser, [
  check('upuname', 'Username must be 3+ characters long')
    .exists()
    .isLength({ min: 3 })
  ,

  check('upemail', 'Email is not valid')
    .isEmail()
    .normalizeEmail(),

  check('upnumber', 'Invalid phone number')
    .isMobilePhone(),

  check('uppsw', 'Invalid Password')
    .exists()
    .isLength({ min: 6 }),

], updateUser);

router.get('/', getUsers);
router.post('/delete', deleteUser);
router.get("/toAdmin/:id", toAdmin);
router.get("/toClient/:id", toClient);
module.exports = router;


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
const city = require('../models/addcitiesdb.js');
const hotels = require('../models/hotel.schema.js');
const activities = require('../models/activity.schema.js');



const urlencodedParser = bodyParser.urlencoded({ extended: false });
let path = require('path');
router.use(bodyParser.json());


router.get('/', async function (req, res) {
  var array = [];
  array = await city.find();
  res.render("index", { user: (!req.session.authenticated) ? "" : req.session.user, cities: array });
});

router.post('/searchHotels', (req, res) => {
  var query = req.body.Name.trim();
  if (query) {
    hotels.find({ Name: { $regex: new RegExp(query + '.*', 'i') } }).exec()
      .then(result => {
        activities.find({ Name: { $regex: new RegExp(query + '.*', 'i') } }).exec()
          .then(resu => {
            var items = [];
            for (let index = 0; index < result.length; index++) {
              items.push(result[index]);
            }
            for (let index = 0; index < resu.length; index++) {
              items.push(resu[index]);
            }
            if (items.length > 0) {
              res.send(items);
            }
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }
  else {
    res.send("");
  }
});

router.get('/cities/:name', async function (req, res) {
  var disphotel = [];
  var dispactiv = [];
  var hotloc;
  var cityname;
  var cities1 = [];
  var Hotels = [];
  var activ = [];
  var url = req.params.name;

  Hotels = await hotels.find();
  activ = await activities.find();
  cities1 = await city.find({ "Name": url });

  Hotels.forEach((hotels1) => {
    hotloc = hotels1.Location;
    if (hotloc.includes(url)) {
      disphotel.push(hotels1);
    }
  })
  activ.forEach((activ1) => {
    cityname = activ1.Name;
    if (cityname.includes(url)) {
      dispactiv.push(activ1);
    }
  })

  res.render("cities", {
    user: (!req.session.authenticated) ? "" : req.session.user, msg: "",
    avtivities: activ, hotels: Hotels
  });
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
        hashedPass = hash;

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

const checkUN = (req, res) => {
  var query = { Username: req.body.Username };
  User.find(query)
    .then(result => {
      if (result.length > 0) {
        res.send('taken');
      }
      else {
        res.send('available');
      }
    })
    .catch(err => {
      console.log(err);
    });
}
router.post('/checkUN', checkUN);


router.post('/login', urlencodedParser, [
  check('username', 'Username is empty')
    .exists(),
  check('password', 'Password is empty')
    .exists()
], (request, response) => {
  const errors = validationResult(request)
  if (!errors.isEmpty()) {
    const alert = errors.array();
    console.log(alert[0]);
  }
  else {
    console.log("entered");
    var query = { Username: request.body.username };
    User.find(query)
      .then(result => {
        bcrypt
          .compare(request.body.password, result[0].Password)
          .then(res => {
            if (res) {
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

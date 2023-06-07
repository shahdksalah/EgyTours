const express = require("express");
const router = express.Router();
const User = require("../models/usersdb.js");
const bodyParser = require("body-parser");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const city = require("../models/addcitiesdb.js");
const hotels = require("../models/hotel.schema.js");
const activities = require("../models/activity.schema.js");

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const {
  validateLogin,
  checkUN,
  searchHandler,
  validateSignUp,
  UserSignUp
} = require("../controllers/index.controller.js");
router.use(bodyParser.json());

router.get("/", async function (req, res) {
  var array = [];
  array = await city.find();
  res.render("index", {
    user: !req.session.authenticated ? "" : req.session.user,
    cities: array,
    alerts: "",
  });
});

router.get("/cities/:name", async function (req, res) {
  var disphotel = [];
  var dispactiv = [];
  var hotloc;
  var cityname;
  var cities1;
  var Hotels = [];
  var activ = [];
  var url = req.params.name;

  Hotels = await hotels.find();
  activ = await activities.find();

  Hotels.forEach((hotels1) => {
    hotloc = hotels1.Location;
    if (hotloc.includes(url)) {
      disphotel.push(hotels1);
    }
  });
  activ.forEach((activ1) => {
    cityname = activ1.Name;
    if (cityname.includes(url)) {
      dispactiv.push(activ1);
    }
  });

  await city.find({ Name: url }).then((result) => {
    if (result.length > 0) {
      cities1 = result[0];
      res.render("cities", {
        user: !req.session.authenticated ? "" : req.session.user,
        alerts: "",
        activities: dispactiv,
        hotels: disphotel,
        city: cities1,
      });
    }
  });
});


router.post("/signup", validateSignUp(), UserSignUp);

router.post("/checkUN", checkUN);

router.post("/searchHandler", searchHandler);

router.post("/login", validateLogin);

router.get("/signout", function (req, res) {
  req.session.destroy();
  console.log("destroyed");
  res.redirect("/");
});

module.exports = router;

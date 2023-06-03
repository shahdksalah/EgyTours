const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const fileUpload = require('express-fileupload');

router.use(fileUpload());

router.use((req, res, next) => {
    if (req.session.user !== undefined && req.session.user.Type === 'admin') {
      next();
    }
    else {
      res.render('err', { err: 'You are not an Admin', user: (!req.session.authenticated) ? "" : req.session.user })
    }
  });


router.get('/', async function (req, res) {
    var Bookings = [];
    Bookings = await Booking.find();
    res.render("viewbookings", { bookings: (Bookings === 'undefined' ? "" : Bookings) });
});
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const fileUpload = require('express-fileupload');
const Booking= require('../models/bookingdb.js');
const User=require("../models/usersdb.js");
const Hotel= require('../models/hotel.schema.js');
const Activity=require("../models/activity.schema.js");

router.use(fileUpload());


const viewBookings= async (req, res) => {
    var Bookings = [];
    Bookings = await Booking.find();
    var Users = [];
    Users = await User.find();
    var Hotels = [];
    Hotels = await Hotel.find();
    var Activities = [];
    Activities = await Activity.find();
    res.render("viewbookings", { bookings: (Bookings === 'undefined' ? "" : Bookings) ,
     users:(Users === 'undefined' ? "" : Users), hotels:(Hotels === 'undefined' ? "" : Hotels),
     activities:(Activities === 'undefined' ? "" : Activities)});
}

module.exports = { viewBookings};
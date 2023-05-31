const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const Hotel = require('../models/hotel.schema.js');
const Activity =require('../models/activity.schema.js');

router.use((req, res, next) => {
    if (req.session.user !== undefined && req.session.user.Type === 'admin') {
        next();
    }
    else {
        res.render('err', { err: 'You are not an Admin', user: (!req.session.authenticated) ? "" : req.session.user })
    }
});

router.get('/', async function (req, res) {
    var Hotels=[];
    Hotels=await Hotel.find();
    var Activities=[];
    Activities=await Activity.find();
    

    var tophotelnames = [];
    var avghotelratings=[];
    var max1 = 1;
    var sum1 = 0;
    var avg1 = 0;

    for (var j = 0; j < Hotels.length; j++) {
        if (Hotels[j].Reviews.length !== 0) {
            sum1=0;
            for (var i = 0; i < Hotels[j].Reviews.length; i++) {
                sum1 = sum1 + parseInt(Hotels[j].Reviews[i].Rating);
            }
            avg1 = sum1 / Hotels[j].Reviews.length;
            if (avg1 >= 4) {
                avghotelratings.push(avg1);
                tophotelnames.push(Hotels[j].Name);
            }
            max1 = avg1;
        }
    }

    var topactivitynames = [];
    var avgactivityratings=[];
    var max2 = 1;
    var sum2 = 0;
    var avg2 = 0;

    for (var j = 0; j < Activities.length; j++) {
        if (Activities[j].Reviews.length !== 0) {
            sum2=0;
            for (var i = 0; i < Activities[j].Reviews.length; i++) {
                sum2 = sum2 + parseInt(Activities[j].Reviews[i].Rating);
            }
            avg2 = sum2 / Activities[j].Reviews.length;
            if (avg2 >= 4) {
                avgactivityratings.push(avg2);
                topactivitynames.push(Activities[j].Name);
            }
            max2 = avg2;
        }
    }


    res.render("AdminDashBoard",{Hotels:Hotels,Activities:Activities,tophotels:tophotelnames,
        hotelratings:avghotelratings,topactivities:topactivitynames,activityratings:avgactivityratings});

});


module.exports = router;
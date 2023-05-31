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
    

    var indices = [];
    var avgratings=[];
    var max = 1;
    var sum = 0;
    var avg = 0;

    for (var j = 0; j < Hotels.length; j++) {
        if (Hotels[j].Reviews.length !== 0) {
            sum=0;
            for (var i = 0; i < Hotels[j].Reviews.length; i++) {
                sum = sum + parseInt(Hotels[j].Reviews[i].Rating);
            }
            avg = sum / Hotels[j].Reviews.length;
            if (avg >= 4) {
                avgratings.push(avg);
                indices.push(Hotels[j].Name);
            }
            max = avg;
        }
    }


    res.render("AdminDashBoard",{Hotels:Hotels,tophotels:indices,ratings:avgratings});

});


module.exports = router;
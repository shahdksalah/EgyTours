const express = require('express')
const router = express.Router()
const Hotel = require('../models/hotel.schema.js');
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
    var Hotels = [];
    Hotels = await Hotel.find();
    res.render("edithotels", { hotels: (Hotels === 'undefined' ? "" : Hotels) });
});

router.get('/:name', async function (req, res) {
    var Hotels = [];
    var url = req.params.name;
    Hotels = await Hotel.find({ "Name": url });
    res.render("edithotel1", { hotel: (Hotels === 'undefined' ? "" : Hotels) });
});

router.post('/updated/:name', async function (req, res) {
    console.log("inside post");
    var caption = req.body.about.substring(0, 50) + "...";
    if (!req.files || Object.keys(req.files).length == 0) {

    }
    else {
        var filenames = Object.keys(req.files);
        var imgFile;
        var searchpath;
        filenames.forEach(file => {
            console.log(file);
            imgFile = req.files[file];
            searchpath = `${__dirname}/../public/images/Hotels/${file}`;
            imgFile.mv(searchpath);
        })
    }

    var types = [];

    var reqtypes = req.body.finaltypes.split(',');
    var reqprices = req.body.finalprices.split(',');
    var reqrooms = req.body.finalrooms.split(',');
    var reqcaps = req.body.finalcaps.split(',');
    for (var i = 0; i < reqtypes.length - 1; i++) {
        types[i] = {
            Name: reqtypes[i],
            Price: reqprices[i],
            Rooms: reqrooms[i],
            Capacity: reqcaps[i],
        }
    }


    var Hotels = [];
    var query = req.params.name;
    Hotels = await Hotel.findByIdAndUpdate(req.body.id, {
        Name: req.body.name,
        Location: req.body.location,
        About: req.body.about,
        Caption: caption,
        PropertyAmen: req.body.finalamens,
        RoomFeatures: req.body.finalfeats,
        RoomTypes: types,
    })
        .then(async result => {
            Hotels = await Hotel.find().where("Name").equals(query)
                .then(() => {
                    res.render("hotel1", { hotel1: (Hotels === 'undefined' ? "" : Hotels), user: (!req.session.authenticated) ? "" : req.session.user, msg: "" });
                })
        })




});

module.exports = router;    
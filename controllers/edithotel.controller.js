const express = require('express')
const router = express.Router()
const Hotel = require('../models/hotel.schema.js');
const fileUpload = require('express-fileupload');

router.use(fileUpload());

const updateHotel = async (req, res) => {
    var caption = req.body.about.substring(0, 70) + "...";
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
    var reqad = req.body.finaladults.split(',');
    var reqch = req.body.finalchild.split(',');

    await Hotel.findById(req.body.id)
    .then((result)=>{
        if(result){
            var prevbooked;
            var prev = result.RoomTypes.length;
        for (var i = 0; i < reqtypes.length - 1; i++) {
            if(i < prev){
                prevbooked = result.RoomTypes[i].RoomsBooked;
                console.log(prevbooked);
            }else{
                prevbooked = 0;
            }
            
            types[i] = {
                Name: reqtypes[i],
                Price: reqprices[i],
                Rooms: reqrooms[i],
                Capacity: {
                    Adults: reqad[i],
                    Children: reqch[i],
                },
                RoomsBooked: prevbooked,
            }
        }
        }
        
    })
    

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
            await Hotel.find().where("Name").equals(query)
                .then((result) => {
                    res.render("hotel1", { hotel1: (result === 'undefined' ? "" : result), user: (!req.session.authenticated) ? "" : req.session.user, msg: "Hotel Updated Successfully" });
                })
        })


}

module.exports = { updateHotel };
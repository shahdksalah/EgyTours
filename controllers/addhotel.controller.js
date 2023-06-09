const express = require('express')
const router = express.Router()
const Hotel = require('../models/hotel.schema.js');
const fileUpload = require('express-fileupload');
const { body, validationResult } = require('express-validator');

router.use(fileUpload());

const getAddHotel = async (req, res) => {
    res.render("AddHotel", { alert: undefined, img: "" });
}

const validateHotel = () => {
    return [
        body('name')
            .exists({ checkFalsy: true })
            .withMessage('Hotel name is required')
            .bail()
            .isString()
            .withMessage("Hotel name must be a string"),

        body('location')
            .exists({ checkFalsy: true })
            .withMessage('Location is required')
            .bail()
            .isString()
            .withMessage("Location must be a string"),


        body('about')
            .exists({ checkFalsy: true })
            .withMessage('Description is required')
            .bail()
            .isString()
            .withMessage("Description must be a string")
            .bail()
            .isLength({min:100})
            .withMessage("Description must be atleast 100 characters"),

        body('finalamens')
            .exists({ checkFalsy: true })
            .bail()
            .withMessage("Atleast 1 Amenity is required"),

        body('finalfeats')
            .exists({ checkFalsy: true })
            .bail()
            .withMessage("Atleast 1 Room Feature is required"),

        body('finaltypes')
            .exists({ checkFalsy: true })
            .withMessage("Atleast 1 Room Type is required"),

        body('finalrooms')
            .if(body('finaltypes').exists({ checkFalsy: true }))
            .exists({ checkFalsy: true })
            .withMessage("Number of rooms are required"),

        body('finalprices')
            .if(body('finaltypes').exists({ checkFalsy: true }))
            .exists({ checkFalsy: true })
            .withMessage("Room prices are required"),

        body('finaladults')
            .if(body('finaltypes').exists({ checkFalsy: true }))
            .exists({ checkFalsy: true })
            .withMessage("Adult capacity is required"),

        body('finalchild')
            .if(body('finaltypes').exists({ checkFalsy: true }))
            .exists({ checkFalsy: true })
            .withMessage("Children capacity is required"),


    ]
}

const addHotel = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const alert = errors.array();
            if (!req.files || req.files.imgs.length != 10) {
                res.render('AddHotel', { alert: alert, img: "You must upload 10 images" });
            }
            else {
                res.render('AddHotel', { alert: alert, img: "" });
            }
        }
        else {
            var imgFile;
            var uploadPath;
            var extension;
            var numOfImgs;

            numOfImgs = req.files.imgs.length;

            imgFile = req.files.imgs;
            var paths = [];
            for (var i = 0; i < numOfImgs; i++) {
                extension = imgFile[i].name.split('.')[1];
                picname = req.body.name.split(" ")[0];
                uploadPath = __dirname + '/../public/images/Hotels/' + picname + (i + 1) + '.' + extension;
                imgFile[i].mv(uploadPath);
                paths[i] = picname + (i + 1) + '.' + extension;
            }

            var types = [];

            var reqtypes = req.body.finaltypes.split(',');
            var reqprices = req.body.finalprices.split(',');
            var reqrooms = req.body.finalrooms.split(',');
            var reqad = req.body.finaladults.split(',');
            var reqch = req.body.finalchild.split(',');
            for (var i = 0; i < reqtypes.length - 1; i++) {
                types[i] = {
                    Name: reqtypes[i],
                    Price: reqprices[i],
                    Rooms: reqrooms[i],
                    Capacity:{
                        Adults: reqad[i],
                        Children: reqch[i],
                    },
                    RoomsBooked: 0,
                }
            }

            var caption = req.body.about.substring(0, 70) + "...";

            const hotel = new Hotel({
                Name: req.body.name,
                Location: req.body.location,
                Picture: paths,
                About: req.body.about,
                Caption: caption,
                PropertyAmen: req.body.finalamens,
                RoomFeatures: req.body.finalfeats,
                RoomTypes: types,
            })
            hotel.save()
                .then(result => {
                    console.log("hotel added");
                    res.redirect('/hotels')
                })
                .catch(err => {
                    console.log(err);
                })
        }



    }
    catch (err) {
        console.log(err);
    }

}
module.exports = { addHotel, getAddHotel, validateHotel };
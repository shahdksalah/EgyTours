const express=require('express')
const router=express.Router()
const Hotel = require('../models/addHoteldb.js');
const fileUpload = require('express-fileupload');

router.use(fileUpload());


router.get('/',function(req,res)
{
    res.render("AddHotel");
});

router.post('/', (req,res)=>{
    var imgFile;
    var uploadPath;
    var extension;
    var numOfImgs;
    if(!req.files || Object.keys(req.files).length===0){
        return res.status(400).send('No files were uploaded');
    }

    numOfImgs = req.files.imgs.length;
    imgFile = req.files.imgs;
    for(var i=0; i<numOfImgs; i++){
        extension = imgFile[i].name.split('.')[1];
        uploadPath =__dirname + '/../public/Images/Hotels/' + req.body.name + i + '.' +extension;
        imgFile[i].mv(uploadPath);
    }

    const hotel = new Hotel({
        Name:req.body.name,
        Location:req.body.location,
        Picture: req.files,
        About: req.body.about,
        PropertyAmen: req.body.amenities,
        RoomFeatures:req.body.roomfeatures,
        RoomTypes:req.body.roomtypes,
    })
    hotel.save()
        .then(result=>{
            /*console.log(result);*/
            res.redirect('/hotels')
        })
        .catch(err=>{
            console.log(err);
        })
})
module.exports=router;
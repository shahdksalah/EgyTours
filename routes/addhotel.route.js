const express = require('express')
const router = express.Router()
const Hotel = require('../models/hotel.schema.js');
const fileUpload = require('express-fileupload');

router.use(bodyParser.json());

router.use((req, res, next) => {
  if (req.session.user !== undefined && req.session.user.Type === 'admin') {
      next();
  }
  else {
      res.render('err', { err: 'You are not an Admin', user: (!req.session.authenticated) ? "" : req.session.user  })
  }
});

router.use(fileUpload());


router.get('/', function (req, res) {
    res.render("AddHotel");
});

router.post('/', (req, res) => {
    var imgFile;
    var uploadPath;
    var extension;
    var numOfImgs;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded');
    }

    numOfImgs = req.files.imgs.length;
    imgFile = req.files.imgs;
    var paths = []; 
    for (var i = 0; i < numOfImgs; i++) {
        extension = imgFile[i].name.split('.')[1];
        uploadPath = __dirname + '/../public/images/Hotels/' + req.body.name + (i + 1) + '.' + extension;
        imgFile[i].mv(uploadPath);
        paths[i] = req.body.name + (i + 1) + '.' + extension;
    }

    var types=[];
    
    var reqtypes = req.body.finaltypes.split(',');
    var reqprices = req.body.finalprices.split(',');
    for(var i=0; i<reqtypes.length-1;i++){
        types[i] ={
            Name: reqtypes[i],
            Price: reqprices[i],
        }
    }

    var caption = req.body.about.substring(0, 50) + "...";

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
            // console.log(result);
            res.redirect('/hotels')
        })
        .catch(err => {
            console.log(err);
        })
})
module.exports = router;
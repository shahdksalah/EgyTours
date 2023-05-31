const express=require('express')
const router=express.Router()
const fileupload=require("express-fileupload");
const path = require('path');   
const Cities = require('../models/addcitiesdb');
const Hotelss =require('../models/hotel.schema.js');
const Activityy =require('../models/activity.schema.js');
const bodyParser=require('body-parser');
const CityController=require('../controllers/addCitiesController.js');
router.use(fileupload());

router.use(bodyParser.json());

router.use((req, res, next) => {
  if (req.session.user !== undefined && req.session.user.Type === 'admin') {
      next();
  }
  else {
      res.render('err', { err: 'You are not an Admin', user: (!req.session.authenticated) ? "" : req.session.user  })
  }
});

 router.get('/',CityController.getActandHotels);
 router.post('/submit',CityController.postCities);


module.exports=router;
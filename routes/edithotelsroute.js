const express=require('express')
const router=express.Router()
const validate =require('../public/js/formsVal.js');
const Hotel =require('../models/addHoteldb.js');
const mongoose =require('mongoose');
var db = mongoose.connection;
const bodyParser=require('body-parser');
const{check,validationResult} =require('express-validator');
const urlencodedParser=bodyParser.urlencoded({ extended: false });

router.get('/',async function(req,res)
{
    var Hotels=[];
    Hotels=await Hotel.find();
    res.render("EditHotels",{hotels:(Hotels==='undefined'?"":Hotels)});
});

module.exports=router;
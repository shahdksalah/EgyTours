const express=require('express')
const router=express.Router()
const Hotel = require('../models/addHoteldb.js');


router.get('/', async function(req,res)
{
    var Hotels=[];
    Hotels=await Hotel.find();
    console.log(Hotels);
    res.render("hotels",{hotels:(Hotels==='undefined'?"":Hotels)});
});

module.exports=router;
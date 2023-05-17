const express=require('express')
const router=express.Router()
const Hotel = require('../models/addHoteldb.js');


router.get('/', async function(req,res)
{
    var Hotels=[];
    Hotels=await Hotel.find();
    res.render("hotels",{hotels:(Hotels==='undefined'?"":Hotels)});
});

router.get('/:name', async function(req,res){
    var Hotels=[];
    var url = req.params.name;
    Hotels=await Hotel.find({"Name":url});
    res.render("hotel1",{hotel1:(Hotels==='undefined'?"":Hotels)});
});

module.exports=router;
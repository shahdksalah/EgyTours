const express=require('express')
const router=express.Router()
const Hotel =require('../models/hotel.schema.js');


router.get('/',async function(req,res)
{
    var Hotels=[];
    Hotels=await Hotel.find();
    res.render("edithotels",{hotels:(Hotels==='undefined'?"":Hotels)});
});

router.get('/:name', async function(req,res){
    var Hotels=[];
    var url = req.params.name;
    Hotels=await Hotel.find({"Name":url});
    res.render("edithotel1",{hotel:(Hotels==='undefined'?"":Hotels)});
});


router.post('/updated/:name', async function(req,res){
    var hotel=[];
    var query = req.params.name;
    hotel=await Hotel.find().where("Name").equals(query);
    const newHotel = new Hotel({
        Name:req.body.name,
        Location:req.body.location,
        Rating:hotel.Rating,

    })
    if(hotel != undefined){
       
    }
    
    
});

module.exports=router;
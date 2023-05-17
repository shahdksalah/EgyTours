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

router.post('/:name',async function(req,res){
    var arr=[];
    var Hotels=[];
    var Hotel2=[];
    var query1=req.body.hotel;
    const hotel1=await Hotel.find().where("Name").equals(query1);
    Hotels=Array.from(hotel1);
    console.log(Hotels);
    console.log(hotel1);
    console.log(Hotels[0].Reviews[0]);

    for(var i =0;i<Hotels[0].Reviews.length;i++)
    {
        arr.push(Hotels[0].Reviews[i]);
    }

    arr.push(req.body.addrev);
    arr.push(req.body.rating);
    arr.push(new Date());

    const filter={Name:query1};
    const update={Reviews:arr};
    if(hotel1 !=='undefined')
    {
        const hotel2=await Hotel.findOneAndUpdate(filter,update);
        console.log(hotel2);
        res.render.reload;
    
    } 

});

module.exports=router;
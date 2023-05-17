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
    console.log(req.body.rating);
    console.log(req.body.addrev);
    console.log(req.params.name);

    var arr=[];
    arr[0]=req.body.addrev;
    arr[1]=req.body.rating;
    arr[2]=new Date();

    
    var Hotels=[];
    var query1=req.body.hotel;
    const hotel1=await Hotel.find().where("Name").equals(query1);
    Hotels=Array.from(hotel1);
    console.log(hotel1);
    const filter={Name:query1};
    const update={Reviews:arr};
    if(hotel1!=='undefined')
    {
        await Hotel.findOneAndUpdate(filter,update)
        .then(result =>
            {
                console.log(result);
            });
    
    }  

});

module.exports=router;
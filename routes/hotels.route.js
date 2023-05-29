const express=require('express')
const router=express.Router()
const Hotel = require('../models/hotel.schema.js');
const hotelController=require('../controllers/hotelsController.js')


router.get('/', async function(req,res)
{
    var Hotels=[];
    Hotels=await Hotel.find();
    res.render("hotels",{hotels:(Hotels==='undefined'?"":Hotels), user: (!req.session.authenticated) ? "" : req.session.user });
    
    
});

router.get('/:name', async function(req,res){
    var Hotels=[];
    var url = req.params.name; 
    Hotels=await Hotel.find({"Name":url});
    res.render("hotel1",{hotel1:(Hotels==='undefined'?"":Hotels), user: (!req.session.authenticated) ? "" : req.session.user });
});

router.post('/:name',async function(req,res){
    var arr=[];
    var Hotels=[];
    var query1=req.body.hotel;
    const hotel1=await Hotel.find().where("Name").equals(query1);
    Hotels=Array.from(hotel1);

    for(var i =0;i<Hotels[0].Reviews.length;i++)
    {
        arr.push(Hotels[0].Reviews[i]);
    }

    arr.push(new Date());
    arr.push(req.body.rating);
    arr.push(req.body.addrev);

    const filter={Name:query1};
    const update={Reviews:arr};
    if(hotel1 !=='undefined')
    {
        const hotel2=await Hotel.findOneAndUpdate(filter,update);
        console.log(hotel2);
        res.render("hotels");
    
    } 

});

router.post('/:name/add',hotelController.addToCart)


module.exports=router;
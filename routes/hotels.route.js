const express=require('express')
const router=express.Router()
const Hotel = require('../models/hotel.schema.js');
const hotelController=require('../controllers/hotelsController.js')


router.get('/', async function(req,res)
{
    var Hotels=[];
    Hotels=await Hotel.find();
    res.render("hotels",{hotels:(Hotels==='undefined'?"":Hotels), user: (!req.session.authenticated) ? "" : req.session.user, msg: ""  });
    
    
});

router.get('/:name', async function(req,res){
    var Hotels=[];
    var url = req.params.name; 
    Hotels=await Hotel.find({"Name":url});
    res.render("hotel1",{hotel1:(Hotels==='undefined'?"":Hotels), user: (!req.session.authenticated) ? "" : req.session.user, msg: ""  });
});

router.post('/:name', hotelController.postReview);

router.post('/:name/add',hotelController.addToCart)


module.exports=router;
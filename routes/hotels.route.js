const express=require('express')
const router=express.Router()
const Hotel = require('../models/hotel.schema.js');
const hotelController=require('../controllers/hotelsController.js')



router.get('/',hotelController.getHotels);

router.get('/:name', hotelController.getHotel1);

router.post('/:name', hotelController.postReview);
router.post('/:name/:id',hotelController.addToCart)


module.exports=router;
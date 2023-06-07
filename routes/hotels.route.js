const express = require('express')
const router = express.Router()
const Hotel = require('../models/hotel.schema.js');
const Activity = require('../models/activity.schema.js');
const User = require('../models/usersdb.js');
const hotelController = require('../controllers/hotelsController.js')



router.get('/', hotelController.getHotels);

router.get('/page=:id', hotelController.getHotelPage);

router.get('/browse/:name', hotelController.getHotel1);

router.post('/:name', hotelController.postReview);

router.post('/:name/submit', hotelController.postHotelAvail);

router.post('/:name/:id', hotelController.addToCart);

router.get('/add-to-wishlist/:name', hotelController.addToWishlist);





module.exports = router;
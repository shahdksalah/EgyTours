const express = require('express')
const router = express.Router()
const hotelController = require('../controllers/hotelsController.js')



router.get('/', hotelController.getHotels);

router.get('/page=:id', hotelController.getHotelPage);

router.get('/browse/:name', hotelController.getHotel1);

router.post('/browse/:name', hotelController.postReview);

router.post('/browse/:name/submit', hotelController.postHotelAvail);

router.post('/browse/:name/:id', hotelController.addToCart);

router.get('/add-to-wishlist/:name', hotelController.addToWishlist);





module.exports = router;
const express=require('express')
const router=express.Router();
const wishlistController=require('../controllers/wishlistController.js')


router.get('/', wishlistController.viewFavs);
router.get('/remove-hotel-wishlist/:id',wishlistController.removeHotel);
router.get('/remove-activity-wishlist/:id',wishlistController.removeActivity);
router.get('/clear',wishlistController.clearFavs);

module.exports=router;
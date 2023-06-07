const express=require('express')
const router=express.Router();
const wishlistController=require('../controllers/wishlistController.js')


router.get('/', wishlistController.viewFavs);
router.get('/remove-from-wishlist/:id',wishlistController.removeFromFavs);
router.get('/clear',wishlistController.clearFavs);

module.exports=router;
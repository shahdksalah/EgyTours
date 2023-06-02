const express=require('express')
const router=express.Router();
const cartController=require('../controllers/cartController.js')


router.get('/', cartController.viewCart);
router.post('/removeBooking',cartController.removeFromCart)

module.exports=router;
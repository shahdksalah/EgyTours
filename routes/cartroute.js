const express=require('express')
const router=express.Router();
const cartController=require('../controllers/cartController.js')


router.get('/', cartController.viewCart);
router.get('/:id',cartController.removeFromCart)
router.get('/clearCart',cartController.clearCart)

module.exports=router;
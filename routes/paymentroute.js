const express=require('express')
const router=express.Router();
const paymentController=require('../controllers/payment.controller.js')

router.get('/', paymentController.viewForm);
router.post('/payment',paymentController.pay)

module.exports=router;
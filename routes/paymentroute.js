const express=require('express')
const router=express.Router();
const paymentController=require('../controllers/payment.controller.js')

router.get('/', paymentController.viewForm);

module.exports=router;
const express=require('express')
const router=express.Router();
const paymentController=require('../controllers/payment.controller.js')
const { check, validationResult } = require('express-validator');

router.get('/', paymentController.viewForm);
router.post('/payment', urlencodedParser, [
    check('number', 'Card Number Required')
      .exists()
    ,
  
    check('expMonth', 'Expiry Month Required')
    .exists(),
    
  
    check('expDay', 'Expiry Day Required')
    .exists(),
  
    check('psw', 'Invalid Password')
      .exists()
      .isLength({ min: 6 }),
  
    check('confpsw', 'Invalid Password')
      .exists()
      .isLength({ min: 6 })
  
  
  ],paymentController.pay)

module.exports=router;
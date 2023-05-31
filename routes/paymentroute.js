const express=require('express')
const router=express.Router();
const paymentController=require('../controllers/payment.controller.js')
const { check} = require('express-validator');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', paymentController.viewForm);
router.post('/payment', urlencodedParser, [
    check('number', 'Card Number Required')
      .exists()
    ,
  
    check('expMonth', 'Expiry Month Required')
    .exists(),
    
  
    check('expDay', 'Expiry Day Required')
    .exists(),
  
    check('cvv', 'CVV Required')
      .exists()
      .isLength({ min: 6 }),
  
    check('name', 'Card Holder Name Required')
      .exists()
      .isLength({ min: 6 }) 
  
  ],paymentController.pay)

module.exports=router;
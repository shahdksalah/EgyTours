const express=require('express')
const router=express.Router();
const {viewForm, validateCard,pay}=require('../controllers/payment.controller.js')
const { check} = require('express-validator');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', viewForm);

router.post('/payment',validateCard(), pay)

module.exports=router;
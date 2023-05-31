const express = require('express')
const router = express.Router()
const Hotel = require('../models/hotel.schema.js');
const fileUpload = require('express-fileupload');
const bodyParser=require('body-parser');
router.use(bodyParser.json());
router.use(fileUpload());
const addhotelController=require('../controllers/addHotelController.js')

router.use((req, res, next) => {
  if (req.session.user !== undefined && req.session.user.Type === 'admin') {
      next();
  }
  else {
      res.render('err', { err: 'You are not an Admin', user: (!req.session.authenticated) ? "" : req.session.user  })
  }
});

router.get('/',addhotelController.getAddHotel);
router.get('/',addhotelController.postAddHotel);

module.exports = router;
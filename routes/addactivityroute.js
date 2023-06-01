const express=require('express')
const router=express.Router()
const Activity= require('../models/activity.schema.js');
const fileupload=require("express-fileupload");
const bodyParser=require('body-parser');
router.use(bodyParser.json());
router.use(fileupload());
const addactivityController=require('../controllers/addActivityController.js')

router.use((req, res, next) => {
  if (req.session.user !== undefined && req.session.user.Type === 'admin') {
      next();
  }
  else {
      res.render('err', { err: 'You are not an Admin', user: (!req.session.authenticated) ? "" : req.session.user  })
  }
});
 
router.get('/',addactivityController.getAddActivity);
router.post('/submit',addactivityController.postAddActivity);


module.exports=router;
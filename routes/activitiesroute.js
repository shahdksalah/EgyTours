const express = require('express')
const router = express.Router()
const Activity = require('../models/activity.schema.js');
const activityController=require('../controllers/activitiesController.js');


router.get('/', activityController.getActivity);

router.get('/:name',activityController.getActivity1);

router.get('/browse/page=:id',activityController.getActivitypage);

router.post('/:name', activityController.postReview);

router.post('/:name/submit',activityController.postActivityAvail);

router.post('/:name/:id',activityController.addToCart)

module.exports=router;


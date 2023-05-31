const express = require('express')
const router = express.Router()
const Activity = require('../models/activity.schema.js');
const activityController=require('../controllers/activitiesController.js');


router.get('/', activityController.getActivity);

router.get('/:name',activityController.getActivity1)

router.post('/:name', activityController.postActivityReviews);

router.post('/:name/submit',activityController.postActivityAvail);

module.exports=router;


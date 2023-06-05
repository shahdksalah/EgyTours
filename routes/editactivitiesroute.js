const express = require('express')
const router = express.Router()
const validate = require('../public/js/formsVal.js');
const Activity = require('../models/activity.schema.js');
const mongoose = require('mongoose');
var db = mongoose.connection;
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const activityController=require('../controllers/editactivity.controller.js');

router.use(bodyParser.json());


router.use((req, res, next) => {
    if (req.session.user !== undefined && req.session.user.Type === 'admin') {
        next();
    }
    else {
        res.render('err', { err: 'You are not an Admin', user: (!req.session.authenticated) ? "" : req.session.user })
    }
});

router.get('/',activityController.getActivities);
router.get('/:name',activityController.getActivitiesbyName);
router.get('/delete/:id',activityController.deleteActivity);
router.post('/updated/:name',activityController.updatedActivity);


module.exports = router;
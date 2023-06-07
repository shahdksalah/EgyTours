const express = require('express')
const router = express.Router()
const Activity = require('../models/activity.schema.js');
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const fileUpload = require('express-fileupload');
const activityController = require('../controllers/editactivity.controller.js');



router.use((req, res, next) => {
    if (req.session.user !== undefined && req.session.user.Type === 'admin') {
        next();
    }
    else {
        res.render('err', { err: 'You are not an Admin', user: (!req.session.authenticated) ? "" : req.session.user })
    }
});

router.get('/', activityController.getActivities);
router.get('/:name', activityController.getActivitiesbyName);
router.get('/delete/:id', activityController.deleteActivity);

router.use(fileUpload());

router.post('/updated/:name', activityController.updateActivity);


module.exports = router;
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const Hotel = require('../models/hotel.schema.js');
const Activity =require('../models/activity.schema.js');
const dashboard=require('../controllers/admindashboardController.js');

router.use((req, res, next) => {
    if (req.session.user !== undefined && req.session.user.Type === 'admin') {
        next();
    }
    else {
        res.render('err', { err: 'You are not an Admin', user: (!req.session.authenticated) ? "" : req.session.user })
    }
});

router.get('/',dashboard.getSummary);


module.exports = router;
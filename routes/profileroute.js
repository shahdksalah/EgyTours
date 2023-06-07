const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const User = require('../models/usersdb.js')
const bcrypt = require('bcrypt');
const profileCont = require('../controllers/profile.controller.js');


router.get('/', function (req, res) {
    res.render("profile", { user: (!req.session.authenticated) ? "" : req.session.user, success: "", alerts: undefined });
});



router.post('/update', profileCont.validateProfile(), profileCont.updateProfile)

module.exports = router;
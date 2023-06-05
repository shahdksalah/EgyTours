const city = require('../models/addcitiesdb.js');
const express = require('express')
const User = require('../models/usersdb.js');
const router = express.Router();
const hotels = require('../models/hotel.schema.js');
const activities = require('../models/activity.schema.js');
const bcrypt = require("bcrypt");
const { body, validationResult } = require('express-validator');



const checkUN = (req, res) => {
    if (req.body.Username !== "" && !/\s/.test(req.body.Username) && req.body.Username.length >= 5) {
        var query = { Username: req.body.Username };
        User.find(query)
            .then(result => {
                if (result.length > 0) {
                    res.send('taken');
                }
                else {
                    res.send('available');
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
    else if (/\s/.test(req.body.Username)) {
        res.send("invalid");
    }
    else if (req.body.Username.length < 5) {
        res.send('too short');
    }
    else {
        res.send("empty");
    }
}

const validateLogin = async (req, res) => {
    console.log("user: " + req.body.Username);
    console.log("pass: " + req.body.Password);
    var user = req.body.Username;
    var pass = req.body.Password;
    console.log("validating");
    if (req.body.Username === "" && req.body.Password === "") {
        res.send("up");
    }
    else if (/\s/.test(user) && /\s/.test(pass)) {
        res.send('upinvalid')
    }
    else if (/\s/.test(user)) {
        res.send('uinvalid');
    }
    else if (/\s/.test(pass)) {
        res.send('pinvalid');
    }
    else if (req.body.Username === "") {
        console.log("pass");
        res.send("u");
    }
    else if (req.body.Password === "") {
        res.send("p");
    }
    else {
        console.log("username and password valid - trying login");
        var query = { Username: req.body.Username };
        console.log(query);
        await User.find(query)
            .then(async result => {
                if (!result) res.send('not found');
                await bcrypt.compare(req.body.Password, result[0].Password)
                    .then(async resu => {
                        if (!resu) {
                            res.send("invalid");
                        }
                        else {
                            console.log("logged in sucessfully");
                            req.session.user = result[0];
                            req.session.authenticated = true;
                            var array = [];
                            array = await city.find();
                            res.redirect('back');
                            //res.render("index", { user: (!req.session.authenticated) ? "" : req.session.user, cities: array, alerts: "" });
                        }
                    })
                    .catch(err => console.log("1" + err));
            })
            .catch(err => console.log("2" + err));

    }
}

const searchHandler = async (req, res) => {
    var query = req.body.Name.trim();
    if (query) {
        hotels.find({ Name: { $regex: new RegExp(query + '.*', 'i') } }).exec()
            .then(result => {
                activities.find({ Name: { $regex: new RegExp(query + '.*', 'i') } }).exec()
                    .then(resu => {
                        var items = [];
                        for (let index = 0; index < result.length; index++) {
                            items.push(result[index]);
                        }
                        for (let index = 0; index < resu.length; index++) {
                            items.push(resu[index]);
                        }
                        if (items.length > 0) {
                            res.send(items);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            });
    }
    else {
        res.send("");
    }
}

const validateSignUp = () => {
    return [
        body('Username')
            .exists({ checkFalsy: true })
            .withMessage('Username cannot be blank')
            .bail()
            .isLength({ min: 5 })
            .withMessage('Username should be 5+ characters'),

        body('Email')
            .exists({ checkFalsy: true })
            .withMessage('Email cannot be empty')
            .bail()
            .isEmail()
            .withMessage('Email is invalid'),

        body('Number')
            .exists({ checkFalsy: true })
            .withMessage('Phone number cannot be blank')
            .bail()
            .isMobilePhone()
            .withMessage('Phone number is invalid'),

        body('Password')
            .exists({ checkFalsy: true })
            .withMessage('Password cannot be blank')
            .bail()
            .isLength({ min: 6 })
            .withMessage('Password must be 6+ characters'),

        body('PasswordConf')
            .exists({ checkFalsy: true })
            .withMessage('Password confirmation cannot be blank')
            .bail()
            .isLength({ min: 6 })
            .withMessage('Password confirmation must be 6+ characters')
            .bail()
            .custom((value, { req }) => value === req.body.psw)
            .withMessage("Passwords do not match"),
    ]


}


module.exports = { validateLogin, checkUN, searchHandler, validateSignUp };
const city = require('../models/addcitiesdb.js');
const express = require('express')
const User = require('../models/usersdb.js');
const router = express.Router();
const hotels = require('../models/hotel.schema.js');
const activities = require('../models/activity.schema.js');
const bcrypt = require("bcrypt");

const checkUN = (req, res) => {
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
                if(!result) res.send('not found');
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
                            res.render("index", { user: (!req.session.authenticated) ? "" : req.session.user, cities: array});
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

module.exports = { validateLogin, checkUN, searchHandler };
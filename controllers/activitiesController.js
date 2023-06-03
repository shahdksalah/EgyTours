const express = require('express')
const router = express.Router()
const Activity = require('../models/activity.schema.js');
const Cart = require('../models/cartdb.js');
const notifier = require('node-notifier');
const path = require('path');


const getActivity = async (req, res) => {
    var Activities = [];
    Activities = await Activity.find();
    res.render("activities", {
        activities: (Activities === 'undefined' ? "" : Activities),
        user: (!req.session.authenticated) ? "" : req.session.user, msg: "", revmsg: ""
    });
}

const getActivity1 = async (req, res) => {
    var Activities = [];
    var url = req.params.name;
    Activities = await Activity.find({ "Name": url });
    res.render("activity1", {
        activity1: (Activities === 'undefined' ? "" : Activities),
        user: (!req.session.authenticated) ? "" : req.session.user, msg: "", revmsg: ""
    });
}

const postReview = async (req, res) => {
    var Activities = [];
    var query1 = req.params.name;
    const activity1 = await Activity.find().where("Name").equals(query1);
    Activities = Array.from(activity1);
    if (req.session.authenticated) {
        allrevs = Activities[0].Reviews;

        const nowdate = new Date().toLocaleString('en-GB', {
            hour12: false,
        });
        var newrev = {
            Username: req.session.user.Username,
            Rating: req.body.rating,
            Comment: req.body.comment,
            Date: nowdate,
        }

        allrevs.push(newrev);

        const filter = { Name: query1 };
        const update = { Reviews: allrevs };

        await Activity.findOneAndUpdate(filter, update)
            .then(async result => {
                Activities = await Activity.find().where("Name").equals(query1)
                    .then(result => {
                        res.render("activity1", {
                            activity1: (Activities === 'undefined' ? "" : Activities),
                            user: (!req.session.authenticated) ? "" : req.session.user, msg: "", revmsg: "", num: ""
                        });
                    })

            })
            .catch(err => {
                console.log("update failed\n" + err);
            })


    }
    else {
        Activities = await Activity.find().where("Name").equals(query1)
            .then(() => {
                res.render("activity1", {
                    activity1: (Activities === 'undefined' ? "" : Activities),
                    user: (!req.session.authenticated) ? "" : req.session.user, msg: "", revmsg: "You must sign in to add a review"
                    , num: ""
                });
            }).catch(err => {
                console.log(err);
            })
    }
}

const postActivityAvail = async (req, res) => {

    var Activities = [];
    var url = req.params.name;
    Activities = await Activity.find({ "Name": url });

    var name = req.body.name2;
    var num = req.body.num;
    var date = req.body.days;
    var X = [];
    var compare = date;
    const x = await Activity.find().where("Name").equals(name);

    X = Array.from(x);
    console.log(X);

    var arr = [];
    var number;
    var ret;
    var found = "false";
    var found1 = "false";
    var found2 = "false";

    for (var s = 0; s < x[0].DatesDetails.length; s++) {
        var k = x[0].DatesDetails[s].date;
        console.log(k);

        if (date === k) {
            if (parseInt(num) + parseInt(x[0].DatesDetails[s].max) <= x[0].MaxParticipants) {
                var newnum = parseInt(x[0].DatesDetails[s].max) + parseInt(num);

                if (newnum < x[0].MaxParticipants) {
                    ret = date;
                    console.log(ret);
                    found = "true";
                    number = s;
                }
                else if (newnum === x[0].MaxParticipants) {
                    found1 = "true";
                    number = s;
                }
            }
            else {
                found2 = "true";
            }
        }
    }

    if (found === "true") {
        res.render("activity1", {
            activity1: (Activities === 'undefined' ? "" : Activities),
            user: (!req.session.authenticated) ? "" : req.session.user, msg: "Available", num: req.body.num,
            day: req.body.days, revmsg: ""
        });
    }

    else if (found1 === "true") {
        res.render("activity1", {
            activity1: (Activities === 'undefined' ? "" : Activities),
            user: (!req.session.authenticated) ? "" : req.session.user, msg: "Available", num: req.body.num, day: req.body.days
            , revmsg: ""
        });
    }

    else if (found2 === "true") {
        res.render("activity1", {
            activity1: (Activities === 'undefined' ? "" : Activities),
            user: (!req.session.authenticated) ? "" : req.session.user, msg: "Not Available", revmsg: ""
        });
    }

}

const addToCart = async (req, res) => {
    if (req.session.authenticated) {
        var activities = [];
        var p = (req.body.price * 1);
        var activ = {
            id: req.params.id,
            participants: req.body.participants,
            date: req.body.date,
            price: p
        }
        if (req.session.authenticated) {
            var query = { User: req.session.user._id };
            Cart.find(query)
                .then(async result => {
                    var crt = result[0];
                    if (crt) {
                        activities = result[0].Activities;
                        activities.push(activ);

                        await Cart.findByIdAndUpdate(result[0]._id, {
                            Activities: activities
                        })
                            .then(async result => {
                                let Act = [];
                                Act = await Activity.find();
                                res.render("activity1", {
                                    activity1: (Act === 'undefined' ? "" : Act),
                                    user: (!req.session.authenticated) ? "" : req.session.user, msg: "", revmsg: ""
                                });
                            })

                    }
                    else {
                        activities[0] = activ;
                        if (req.session.user) {
                            const cart = new Cart({
                                User: req.session.user._id,
                                Activities: activities,
                            });
                            cart.save()
                                .then(async result => {
                                    console.log("Activity added");
                                    let Act = [];
                                    Act = await Activity.find();
                                    res.render("activity1", {
                                        activity1: (Act === 'undefined' ? "" : Act),
                                        user: (!req.session.authenticated) ? "" : req.session.user, msg: "", revmsg: ""
                                    });
                                })
                        }
                    }
                })
        }
    }
    else{
        Act = await Activity.find();
        
        res.render("activity1", {
            activity1: (Act === 'undefined' ? "" : Act),
            user: (!req.session.authenticated) ? "" : req.session.user, msg: "", revmsg: ""
        });
        notifier.notify({
            title: 'Egy Tours',
            message: 'You must sign in to add your booking to cart',
            icon: path.join(__dirname, '/../public/images/homepage/logo.png'),
          });
    }
}

module.exports = { getActivity, getActivity1, postReview, postActivityAvail, addToCart };
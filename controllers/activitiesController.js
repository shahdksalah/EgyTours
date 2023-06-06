const express = require('express')
const router = express.Router()
const Activity = require('../models/activity.schema.js');
const Cart = require('../models/cartdb.js');
const notifier = require('node-notifier');
const path = require('path');


const getActivities = async (req, res) => {
    const actPerPage =4 ;
    var Activities = [];
    Activities = await Activity.find();
    // .skip(page * actPerPage).limit(actPerPage);
    var length=Math.ceil(Activities.length/actPerPage);
    res.render("activities", {
        activities: (Activities === 'undefined' ? "" : Activities),
        user: (!req.session.authenticated) ? "" : req.session.user, msg: "", length:length, page:0, end:actPerPage-1
    });
}

const getActivityPage = async (req, res) => {
    var Activities = [];
    var url = req.params.id;
    const actPerPage =4;
    Activities = await Activity.find();
    var length = Math.ceil(Activities.length/actPerPage);
    var now;
    var display;
    var end;
    if((url-1)!=0){
        now = url-1;
        display = actPerPage*now;
        if((Activities.length%actPerPage)>=1){
            end = display + Activities.length%actPerPage;
        }else{
            end = display + Activities.length%actPerPage+(actPerPage-1);
        }
    }
    else{
        now = 1;
        display = 0;
        end = actPerPage-1;
    }

    
    res.render("activities", {
        activities: (Activities === 'undefined' ? "" : Activities),
        user: (!req.session.authenticated) ? "" : req.session.user, msg: "", length:length, page:display, end:end});


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
    console.log("aentered");
    console.log(req.body.name2);
    console.log(req.body.num);
    console.log(req.body.days);
    var url = req.params.name;
    Activities = await Activity.find({ "Name": url });

    var name = req.body.name2;
    var num = req.body.num;
    var date = req.body.days;
    var X = [];
    const x = await Activity.find().where("Name").equals(name);

    X = Array.from(x);
    console.log(X);

    var found = "false";
    var found2 = "false";

    for (var s = 0; s < x[0].DatesDetails.length; s++) {
        var k = x[0].DatesDetails[s].date;
        console.log(k);

        if (date === k) {
            if (parseInt(num) + parseInt(x[0].DatesDetails[s].max) <= x[0].MaxParticipants) {
                var newnum = parseInt(x[0].DatesDetails[s].max) + parseInt(num);
                if (newnum <= x[0].MaxParticipants) {
                    found = "true";
                    number = s;
                }
            }
            else {
                found2 = "true";
            }
        }
    }

    if (found === "true") {
        res.send("Available");
    }

    else if (found2 === "true") {
        res.send("Not Available");
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

module.exports = { getActivities, getActivity1, postReview, postActivityAvail, addToCart,getActivityPage };
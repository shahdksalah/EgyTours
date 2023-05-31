const express = require('express')
const router = express.Router()
const Activity = require('../models/acitivity.schema.js');
const Cart = require('../models/cartdb.js');

const postReview = async (req, res) => {
    var Activites = [];
    var query1 = req.body.hotel;
    const activity1 = await Hotel.find().where("Name").equals(query1);
    Activites = Array.from(hotel1);
    if (req.session.authenticated) {
        allrevs = Hotels[0].Reviews;

        const nowdate = new Date().toLocaleString('en-GB', {
            hour12: false,
        });
        var newrev = {
            Rating: req.body.rating,
            Comment: req.body.comment,
            Date: nowdate,
        }

        allrevs.push(newrev);

        const filter = { Name: query1 };
        const update = { Reviews: allrevs };

        await Hotel.findOneAndUpdate(filter, update)
            .then(async result => {
                Hotels = await Hotel.find().where("Name").equals(query1)
                    .then(result => {
                        res.render("hotel1", {
                            hotel1: (Hotels === 'undefined' ? "" : Hotels),
                            user: (!req.session.authenticated) ? "" : req.session.user, msg: ""
                        });
                    })

            })
            .catch(err => {
                console.log("update failed\n" + err);
            })


    }
    else {
        Hotels = await Hotel.find().where("Name").equals(query1)
            .then(() => {
                res.render("hotel1", {
                    hotel1: (Hotels === 'undefined' ? "" : Hotels),
                    user: (!req.session.authenticated) ? "" : req.session.user, msg: "You must sign in to add a review"
                });
            }).catch(err => {
                console.log(err);
            })
    }
}

module.exports = { addToCart, postReview };
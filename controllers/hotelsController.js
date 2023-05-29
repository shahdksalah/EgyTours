const express = require('express')
const router = express.Router()
const Hotel = require('../models/hotel.schema.js');
const Cart = require('../models/cartdb.js');

const addToCart = async (req, res) => {
    console.log('Entered')
    const hotel = new Cart.hotelBooking(req.session.user.Username, req.body.checkIn, req.body.checkOut,
        req.body.adults, req.body.children, req.body.rooms);
    const cart = new Cart.Cart(req.session.user._id, hotel);
    cart.save()
        .then(result => {
            console.log("Hotel added");
            res.redirect('back')
        })
}

const postReview = async (req, res) => {
    var Hotels = [];
    var query1 = req.body.hotel;
    const hotel1 = await Hotel.find().where("Name").equals(query1);
    Hotels = Array.from(hotel1);
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
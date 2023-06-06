const express = require('express')
const router = express.Router()
const Hotel = require('../models/hotel.schema.js');
const Cart = require('../models/cartdb.js');
const moment = require('moment');

const getHotels = async (req, res) => {
    const page =req.query.p || 0;
    const actPerPage =3 ;
     
    var Hotels = [];
    Hotels = await Hotel.find();
    // .skip(page * actPerPage).limit(actPerPage);
    var Hotels1 = [];
    Hotels1 = await Hotel.find();
    var length=Math.ceil(Hotels1.length/actPerPage);
    res.render("hotels", {
        hotels: (Hotels === 'undefined' ? "" : Hotels),
        user: (!req.session.authenticated) ? "" : req.session.user, msg: "", length:length, page:0, end:actPerPage-1
    });
}

const getHotelPage = async (req, res) => {
    var Hotels = [];
    var url = req.params.id;
    const actPerPage =3;
    Hotels = await Hotel.find();
    var Hotels1 = [];
    Hotels1 = await Hotel.find();
    var length=Math.ceil(Hotels1.length/actPerPage);
    var now;
    var display;
    var end;
    if((url-1)!=0){
        now = url-1;
        display = actPerPage*now;
        if((Hotels1.length%actPerPage)>=1){
            end = display + Hotels1.length%actPerPage+1;
        }else{
            end = display + (Hotels1.length%actPerPage)+(actPerPage-1);
        }
    }
    else{
        now = 1;
        display = 0;
        end = actPerPage-1;
    }

    
    res.render("hotels", {
        hotels: (Hotels === 'undefined' ? "" : Hotels),
        user: (!req.session.authenticated) ? "" : req.session.user, msg: "", length:length, page:display, end:end});


}


const getHotel1 = async (req, res) => {
    var Hotels = [];
    var url = req.params.name;
    Hotels = await Hotel.find({ "Name": url });
    res.render("hotel1", { hotel1: (Hotels === 'undefined' ? "" : Hotels), user: (!req.session.authenticated) ? "" : req.session.user, msg: "" });
}


const addToCart = async (req, res) => {
    console.log('Entered')
    let days;
    let price;
    var date1 = moment(req.body.checkIn);
    var date2 = moment(req.body.checkOut);
    if (date1.isValid() && date2.isValid()) {
        days = date2.diff(date1, 'days')
    }

    var hotel = await Hotel.find().where("_id").equals(req.params.id)
        .then(result => {
            hotel = result[0];
            console.log(hotel);
            hotel.RoomTypes.forEach((room) => {
                if (room.Name === req.body.roomType) {
                    price = room.Price * req.body.rooms * days;
                }
            })
        })


    var hotels = [];

    var Hotell = {
        id: req.params.id,
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut,
        days: days,
        children: req.body.children,
        adults: req.body.adults,
        rooms: req.body.rooms,
        roomType: req.body.roomType,
        price: price,
        days: days,
    }
    if (req.session.authenticated) {
        var query = { User: req.session.user._id };
        Cart.find(query)
            .then(async result => {
                var crt = result[0];
                if (crt) {
                    hotels = result[0].Hotels;
                    hotels.push(Hotell);

                    await Cart.findByIdAndUpdate(result[0]._id, {
                        Hotels: hotels
                    })
                        .then(result => {
                            res.redirect('back');
                        })

                }
                else {
                    hotels[0] = Hotell;
                    if (req.session.user) {
                        const cart = new Cart({
                            User: req.session.user._id,
                            Hotels: hotels,
                        });
                        cart.save()
                            .then(result => {
                                console.log("Hotel added");
                                res.redirect('back')
                            })
                    }
                }
            })

    }



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
            Username: req.session.user.Username,
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

module.exports = { getHotels,getHotelPage, getHotel1, addToCart, postReview };
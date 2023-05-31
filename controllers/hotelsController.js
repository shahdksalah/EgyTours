const express = require('express')
const router = express.Router()
const Hotel = require('../models/hotel.schema.js');
const Cart = require('../models/cartdb.js');
const moment=require('moment')

const addToCart = async (req, res) => {
    console.log('Entered')
    let days;
    let price;
    var date1 = moment(req.body.checkIn);
    var date2 = moment(req.body.checkOut);
    if (date1.isValid() && date2.isValid()) {
        days=date2.diff(date1, 'days')
    }
    
     var hotel=await Hotel.find().where("_id").equals(req.params.id)
     .then(result=>{
        hotel=result[0];
        console.log(hotel);
        hotel.RoomTypes.forEach((room)=>{
            if(room.Name===req.body.roomType){
               price=room.Price*req.body.rooms*days;
            }
         })
     })
     

    var hotels=[];

    var Hotell={
        id:req.params.id,
        checkIn:req.body.checkIn,
        checkOut:req.body.checkOut,
        days:days,
        children:req.body.children,
        adults:req.body.adults,
        rooms:req.body.rooms,
        roomType:req.body.roomType,
        price:price,
    }
    
    var query = { Userid: req.session.user._id};
    Cart.find(query)
    .then( async result=>{
        var crt=result[0];
       if(crt){
        hotels=result[0].Hotels;
        hotels.push(Hotell);
        
        await Cart.findByIdAndUpdate(result[0]._id, {
            Hotels: hotels
        })
        .then(result=>{
            res.redirect('back');
        })

       }
       else{
          hotels[0]=Hotell;
          if(req.session.user){
            const cart= new Cart({
                Userid:req.session.user._id,
                Hotels:hotels,
            });
            cart.save()
            .then(result=>{
                console.log("Hotel added");
                res.redirect('back')
            })
        }
       }
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
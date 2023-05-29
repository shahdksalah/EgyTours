const express=require('express')
const router=express.Router()
const Hotel = require('../models/hotel.schema.js');
const Cart=require('../models/cartdb.js');

const addToCart=async(req,res)=>{
    let hotelsArray;
   const hotel= new Cart.hotelBooking(req.session.user.Username,req.body.checkIn,req.body.checkOut,
    req.body.adults,req.body.children,req.body.rooms);
    hotelsArray.push(hotel);
    const cart= new Cart.cart(req.session.user._id,hotel);
    cart.save()
    .then(result=>{
        console.log("Hotel added");
    })
}

module.exports={addToCart};
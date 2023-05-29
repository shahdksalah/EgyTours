const express = require('express')
const app = express()
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
app.use(express.urlencoded({extended:true}));

class hotelBooking{
    constructor(name,checkIn,checkOut,adults,children,rooms){
        this.name=name;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.adults = adults;
        this.children = children;
        this.rooms = rooms;
    }
}

const cartSchema=new Schema({
    Userid:{
        type:String,
        unique:true,
        trim:true,
        required:true,
    },
    hotels:{
        
    }
},{timestamp:true});

const Cart= mongoose.model('Cart',cartSchema);
module.exports={Cart,hotelBooking};
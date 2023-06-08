const express = require('express')
const app = express()
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
app.use(express.urlencoded({extended:true}));


const bookingSchema=new Schema({
    bookingNo:{
        type:Number,
        required:[true,'Booking number is required'],
        unique:true,
    },
    User:{
        type:String,
        required:[true,'User id is required'],
        trim:true,
    },
    Hotels:{
        type:Array,
    },
    Activities:{
        type:Array,
    }
},{timestamp:true});

const Bookings= mongoose.model('Bookings',bookingSchema);

module.exports=Bookings;
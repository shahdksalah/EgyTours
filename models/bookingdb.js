const express = require('express')
const app = express()
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
app.use(express.urlencoded({extended:true}));


const bookingSchema=new Schema({
    bookingNo:{
        type:Number,
        required:true,
        unique:true,
    },
    User:{
        type:String,
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
const express = require('express')
const app = express()
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
app.use(express.urlencoded({extended:true}));


const bookingSchema=new Schema({
    Userid:{
        type:String,
        trim:true,
        required:true,
    },
    Hotels:{
        type:Array,
    }
},{timestamp:true});

const Bookings= mongoose.model('Bookings',bookingSchema);

module.exports=Bookings;
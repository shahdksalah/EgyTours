const express = require('express')
const app = express()
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
app.use(express.urlencoded({extended:true}));


const HotelSchema = new Schema({
    Name:{
        type:String,
        trim:true,
        required:true,
    },
    Location:{
        type:String,
        trim:true,
        required:true,
    },
    Picture:{
        type:Array,
        required:true,
    },
    About:{
        type:String,
        trim:true,
        required:true,
    },
    Caption:{
        type:String,
        trim:true,
    },
    PropertyAmen:{
        type:String,
        trim:true,
        required:true,
    },
    RoomFeatures:{
        type:String,
        trim:true,
        required:true,
    },
    RoomTypes:{
        type:Array,
        required:true,
    },
    Reviews:{
        type:Array,
        required:false
    }
},{timestamp:true});

const Hotel= mongoose.model('Hotel',HotelSchema);
module.exports=Hotel;
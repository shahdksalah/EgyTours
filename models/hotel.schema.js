const express = require('express')
const app = express()
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
app.use(express.urlencoded({extended:true}));


const HotelSchema = new Schema({
    Name:{
        type:String,
        trim:true,
        required: [true,'Hotel name is required'],
        unique:true,
    },
    Location:{
        type:String,
        trim:true,
        required: [true,'Hotel location is required'],
    },
    Picture:{
        type:Array,
        required: [true,'Hotel pictures are required'],
    },
    About:{
        type:String,
        trim:true,
        required: [true,'Information about the hotel is required'],
    },
    Caption:{
        type:String,
        trim:true,
    },
    PropertyAmen:{
        type:String,
        trim:true,
        required: [true,'Property amentities are required'],
    },
    RoomFeatures:{
        type:String,
        trim:true,
        required: [true,'Room features are required'],
    },
    RoomTypes:{
        type:Array,
        required:[true,'Room Types are required'],
    },
    Reviews:{
        type:Array,
        required:false
    },
},{timestamp:true});

const Hotel= mongoose.model('Hotel',HotelSchema);
module.exports=Hotel;
const express = require('express')
const app = express()
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
app.use(express.urlencoded({extended:true}));

const Hotel = new Schema({
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
        data:Buffer,
        contentType:String
    },
    About:{
        type:String,
        trim:true,
        required:true,
    }
})
const express = require('express')
const app = express()
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
app.use(express.urlencoded({extended:true}));


const wishlistSchema=new Schema({
    User:{
        type:String,
        unique:true,
        trim:true,
        required:[true,'User id is required'],
    },
    Hotels:{
        type:Array,
    },
    Activities:{
        type:Array,
    }
},{timestamp:true});

const Wishlist= mongoose.model('Wishlist',wishlistSchema);

module.exports=Wishlist;
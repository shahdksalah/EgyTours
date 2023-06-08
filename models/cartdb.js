const express = require('express')
const app = express()
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
app.use(express.urlencoded({extended:true}));


const cartSchema=new Schema({
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

const Cart= mongoose.model('Cart',cartSchema);

module.exports=Cart;
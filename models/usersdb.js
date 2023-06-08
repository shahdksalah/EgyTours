const express = require('express')
const app = express()
const mongoose = require('mongoose');
const vaidator=require('validator');

const Schema = mongoose.Schema;
app.use(express.urlencoded({extended:true}));

const userSchema = new Schema ({
    Username:{
        type:String,
        unique:true,
        trim:true,
        required:[true,'Username is required'],
        minlength:[5,'Minimum length of username is five letters.']
    },
    Email:{
        type:String,
        validate:{
            validator:validator.isEmail,
            message:'this isnt a valid email'
        },
        required:[true,'Email is required'],
        trim:true
    },
    PhoneNumber:{
        type:String,
        required:[true,'Phone number is required'],
        trim:true
    },
    Password:{
        type:String,
        required:[true,'Password is required'],
        trim:true,
        min:[6,'Minimum length of password is six.']
    },
    ConfPassword:{
        type:String,
        required:[true,'Confirm Password is required'],
        trim:true,
        min:[6,'Minimum length of confirm password is six.']
    },
    Wishlist:{
        Hotels:{type:Array},
        Activities:{type:Array},
    },
    Type:{
        type:String,
        required:[true,'Type is required'],
        enum:['admin','client'],
        trim:true
    }

},{timestamp:true});

const User= mongoose.model('User',userSchema);
module.exports=User;
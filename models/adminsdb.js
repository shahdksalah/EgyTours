const express = require('express')
const app = express()
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
app.use(express.urlencoded({extended:true}));

const adminSchema = new Schema ({
    Username:{
        type:String,
        unique:true,
        trim:true,
        required:true,
        //min:4,
        //max:15
    },
    Email:{
        type:String,
        required:true,
        trim:true
    },
    PhoneNumber:{
        type:Number,
        required:true,
        trim:true
    },
    Password:{
        type:String,
        required:true,
        //minLength:8,
        //maxLength:16,
        trim:true
    },
    ConfPassword:{
        type:String,
        required:true,
        trim:true
    }

},{timestamp:true});

const Admin= mongoose.model('Admin',adminSchema);
module.exports=Admin;
const express = require('express')
const app = express()
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
app.use(express.urlencoded({extended:true}));

const userSchema = new Schema ({
    Username:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    PhoneNumber:{
        type:Number,
        required:true
    },
    Age:{
        type:Number,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    ConfPassword:{
        type:String,
        required:true
    },

},{timestamp:true});

const User= mongoose.model('User',userSchema);
module.exports=User;
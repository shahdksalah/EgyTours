const express = require('express')
const app = express()
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
app.use(express.urlencoded({extended:true}));

const userSchema = new Schema ({
    Username:{
        type:String,
        unique:true,
        trim:true,
        required:true,
    },
    Email:{
        type:String,
        required:true,
        trim:true
    },
    PhoneNumber:{
        type:String,
        required:true,
        trim:true
    },
    Password:{
        type:String,
        required:true,
        trim:true
    },
    ConfPassword:{
        type:String,
        required:true,
        trim:true
    },
    Type:{
        type:String,
        required:true,
        trim:true
    }

},{timestamp:true});

const User= mongoose.model('User',userSchema);
module.exports=User;
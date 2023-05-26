const express = require('express')
const app = express()
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
app.use(express.urlencoded({extended:true}));


const ActivitySchema = new Schema ({
    Name:{
        type:String,
        trim:true,
        required:true,
    },
    Header:{
        type:String,
        trim:true,
        required:true,
    },
    Days:{
        type:String,
        trim:true,
        required:true,
    },
    Type:{
        type:String,
        required:true,
        trim:true
    },
    Rate:{
        type:String,
        required:true
    },
    Picture:{
        type:Array,
        required:true
    },
    Advantage:{
        type:String,
        trim:true,
        required:true,
    },
    BriefDes:{
        type:String,
        required:true,
        trim:true
    },
    DetailedDes:{
        type:String,
        required:true,
        trim:true
    },
    Plan:{
        type:String,
        required:true,
        trim:true
    },
    CancelDet:{
        type:String,
        required:true,
        trim:true
    },
    Duration:{
        type:String,
        required:true,
        trim:true
    },
    PickupDet:
    {
        type:String,
        required:true,
        trim:true
    },
    Starttime:{
        type:String,
        required:true,
        trim:true
    },
    Endtime:{
        type:String,
        required:true,
        trim:true
    },
    Price:
    {
        type:Number,
        required:true,
        trim:true,
    },
    Reviews:{
        type:Array,
        required:false
    },
    DatesDetails:{
        type:Array,
        required:true,
    },
    MaxParticipants:{
        type:Number,
        required:true,
    }
},{timestamp:true});

const Activity= mongoose.model('Activity',ActivitySchema);
module.exports=Activity;
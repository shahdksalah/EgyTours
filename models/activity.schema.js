const express = require('express')
const app = express()
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
app.use(express.urlencoded({extended:true}));


const ActivitySchema = new Schema ({
    Name:{
        type:String,
        trim:true,
        required:[true,'Activity name is required'],
       },
    Header:{
        type:String,
        trim:true,
        required:[true,'Activity header is required'],
    },
    Type:{
        type:String,
        required:[true,'Activity type is required'],
        trim:true
    },
    Rate:{
        type:String,
        required:[true,'Activity Rate is required'],
    },
    Picture:{
        type:Array,
        required:[true,'Activity Pictures is required'],
    },
    Advantage:{
        type:String,
        trim:true,
        required:[true,'Activity Advantage is required'],
    },
    BriefDes:{
        type:String,
        required:[true,'Activity brief description is required'],
        trim:true
    },
    DetailedDes:{
        type:String,
        required:[true,'Activity detailed description is required'],
        trim:true
    },
    Plan:{
        type:String,
        required:[true,'Activity plan is required'],
        trim:true
    },
    CancelDet:{
        type:String,
        required:[true,'Activity cancellation details is required'],
        trim:true
    },
    Duration:{
        type:String,
        required:[true,'Activity duration is required'],
        trim:true
    },
    PickupDet:
    {
        type:String,
        required:[true,'Pickup details is required'],
        trim:true
    },
    Starttime:{
        type:String,
        required:[true,'Start time is required'],
        trim:true
    },
    Endtime:{
        type:String,
        required:[true,'End Time is required'],
        trim:true
    },
    Price:
    {
        type:Number,
        required:[true,'Price is required'],
        trim:true,
    },
    Reviews:{
        type:Array,
        required:false
    },
    DatesDetails:{
        type:Array,
        required:[true,'Dates is required'],
    },
    MaxParticipants:{
        type:Number,
        required:[true,'Max number of participants is required'],
        min:[1,'Minimum number of participants is one']
    }
},{timestamp:true});

const Activity= mongoose.model('Activity',ActivitySchema);
module.exports=Activity;
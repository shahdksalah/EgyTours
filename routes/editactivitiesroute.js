const express=require('express')
const router=express.Router()
const validate =require('../public/js/formsVal.js');
const Activity =require('../models/addActivitiesdb.js');
const mongoose =require('mongoose');
var db = mongoose.connection;
const bodyParser=require('body-parser');
const{check,validationResult} =require('express-validator');
const urlencodedParser=bodyParser.urlencoded({ extended: false });

router.get('/',async function(req,res)
{
    var Activities=[];
    Activities=await Activity.find();
    console.log(Activities)
    res.render("EditActivities",{activities:(Activities==='undefined'?"":Activities)});
});

module.exports=router;
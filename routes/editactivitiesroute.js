const express=require('express')
const router=express.Router()
const validate =require('../public/js/formsVal.js');
const Activity =require('../models/activity.schema.js');
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

router.get('/:name', async function(req,res){
    var Activities=[];
    var url = req.params.name;
    Activities=await Activity.find({"Name":url});
    res.render("editactivity1",{activity:(Activities==='undefined'?"":Activities)});
});

router.post('/updated/:name', async function(req,res){
    var activity=[];
    var query = req.params.name;
    activity=await Activity.find().where("Name").equals(query);
    
    if(activity != undefined){
       console.log(activity);
       res.render('activities');
    }
    
    
});

module.exports=router;
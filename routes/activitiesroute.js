const express=require('express')
const router=express.Router()
const Activity = require('../models/addActivitiesdb.js');

router.get('/',async function(req,res)
{
    var Activities=[];
    Activities=await Activity.find();
    res.render("activities",{activities:(Activities==='undefined'?"":Activities)});
});

router.get('/:name', async function(req,res){
    var Activities=[];
    var url = req.params.name;
    Activities=await Activity.find({"Name":url});
    res.render("activity1",{activity1:(Activities==='undefined'?"":Activities)});
});


module.exports=router;
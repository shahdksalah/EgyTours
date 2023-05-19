const express=require('express')
const router=express.Router()
const Activity = require('../models/addActivitiesdb.js');

router.get('/',function(req,res)
{
    res.render("activities");
});

module.exports=router;
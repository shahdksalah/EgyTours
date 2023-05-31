const express=require('express')
const router=express.Router()
const activity=require('../models/activity.schema')
const hotel=require('../models/hotel.schema')


    // router.get('/',async function(req,res)
    // {
    //     var Aarr=[];
    //     var Harr=[];
    //     Aarr=await activity.find();
    //     Harr=await hotel.find();
    //     res.render("cities",{ user: (!req.session.authenticated) ? "" : req.session.user ,activities1:Aarr , hotels:Harr});
    // });

module.exports=router;
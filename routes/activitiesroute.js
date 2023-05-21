const express=require('express')
const router=express.Router()
const Activity = require('../models/addActivitiesdb.js');

router.get('/',async function(req,res){
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

router.post('/:name',async function(req,res){
    var arr=[];
    var Activities=[];
    var Activity2=[];
    var query1=req.body.activity;
    const Activity1=await Activity.find().where("Name").equals(query1);
    Activities=Array.from(Activity1);
    console.log(Activities);
    console.log(Activity1);
    console.log(Activities[0].Reviews[0]);

    for(var i =0;i<Activities[0].Reviews.length;i++)
    {
        arr.push(Activities[0].Reviews[i]);
    }

    
    
    arr.push(new Date());
    arr.push(req.body.rating);
    arr.push(req.body.addrev);

    const filter={Name:query1};
    const update={Reviews:arr};
    if(Activity1 !=='undefined')
    {
        const Activity2=await Activity.findOneAndUpdate(filter,update);
        console.log(Activity2);
        res.render.reload;
    
    } 

});

module.exports=router;
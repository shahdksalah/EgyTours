const express=require('express')
const router=express.Router()
const Activity= require('../models/addActivitiesdb.js');
const fileupload=require("express-fileupload");
router.use(fileupload());
const mongoose=require('mongoose');
var db = mongoose.connection;

router.get('/',function(req,res)
{
    res.render("AddActivity");
});

router.post('/submit',(request, response) =>  {
    console.log("entered");


        var imgFile=[];
        var uploadPath;
        var num;
        //console.log(request.files);
        if(!request.files||Object.keys(request.files).length===0)
        {
            return response.status(400).send("no files uploaded");
        }
        console.log(request.files.imgs);
        num=request.files.imgs.length;
        console.log(num);
        imgFile=request.files.imgs;
        for(var i=0;i<num;i++){
        uploadPath=__dirname+"/../public/images"+request.body.Aname+i+'.jpg';
        imgFile[i].mv(uploadPath,(err)=>{
          console.log(err);
      })
        }
  
      const activitydetails = new Activity({
          Name:request.body.Aname,
          Type:request.body.Atype,
          Picture:request.body.imgs,
          BriefDes:request.body.Abrief,
          DetailedDes:request.body.Adetails,
          Plan:request.body.Aplan,
          CancelDet:request.body.Acancel,
          Duration:request.body.Atime,
          PickupDet:request.body.Apickup,
          AvailableDate:request.body.Dates
        });
      db.collection("activities").insertOne(activitydetails,(err,result)=>{
        if(err)
        {
         console.log(err);
        }
         console.log("saved");
         //response.render("food");
  
    }) 

  });

module.exports=router;
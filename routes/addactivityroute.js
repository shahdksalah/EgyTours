const express=require('express')
const router=express.Router()
const Activity= require('../models/addActivitiesdb.js');
const fileupload=require("express-fileupload");
router.use(fileupload());

router.get('/',function(req,res)
{
    res.render("AddActivity");
});

router.post('/submit',(request, response) =>  {
    console.log("entered");
        console.log(request.body);
        console.log(request.body.file);

        let imgFile;
        let uploadPath;
        console.log(request.files);
        if(!request.files||Object.keys(request.files).length===0)
        {
            return res.status(400).send("no files uploaded");
        }
        imgFile=req.files.file;
        uploadPath=__dirname+'/public/images'+request.body.Aname+' .png';

        imgFile.mv(uploadPath,function(err){
            return res.status(500).send(err);
        })
  
      const activitydetails = new Activity({
          Name:request.body.Aname,
          Type:request.body.Atype,
          Picture:request.body.file,
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
         response.render("food");
  
      
    })
  });

module.exports=router;
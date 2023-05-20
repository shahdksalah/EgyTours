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
  var imgFile;
  var uploadPath;
  var num;
  var ext;
  if(!request.files||Object.keys(request.files).length===0){
    return response.status(400).send("no files uploaded");
  }
  num=request.files.imgs.length;
  imgFile=request.files.imgs;
  for(var i=0;i<num;i++){
    ext = imgFile[i].name.split('.')[1];
    uploadPath=__dirname+'/../public/images/activities/'+ request.body.Atype + (i+1) + '.' + ext;
    imgFile[i].mv(uploadPath);
    paths[i]=req.body.name+(i+1)+'.'+ext;
  }
  
  const activitydetails = new Activity({
    Name:request.body.Aname,
    Header:request.body.Aheader,
    Days:request.body.Days,
    Type:request.body.Atype,
    Rate:request.body.rate,
    Picture:request.files,
    Advantage:request.body.adv,
    BriefDes:request.body.Abrief,
    DetailedDes:request.body.Adetails,
    Plan:request.body.Aplan,
    CancelDet:request.body.Acancel,
    Duration:request.body.Atime,
    PickupDet:request.body.Apickup,
    AvailableDate:request.body.Dates,
    Starttime:request.body.starttime,
    Endtime:request.body.endtime,
    Price:request.body.price
    });
    activitydetails.save()
      .then(result=>{
        console.log(result);
        response.redirect('/activities');
      })
      .catch(err=>{
        console.log(err);
      })

  });

module.exports=router;
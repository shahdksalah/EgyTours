const express=require('express')
const router=express.Router()
const Activity= require('../models/addActivitiesdb.js');
const Days=require('../models/addActivitiesdb.js');
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
  var paths = [];
  for(var i=0;i<num;i++){
    ext = imgFile[i].name.split('.')[1];
    uploadPath=__dirname+'/../public/images/activities/'+ request.body.Aname + (i+1) + '.' + ext;
    imgFile[i].mv(uploadPath);
    paths[i]=request.body.Aname+(i+1)+'.'+ext;
  }
  

  var date=request.body.Dates.length;
  var dates=request.body.Dates;
  var arr=[];
  var arr2=[];
  var count=0;
  for(var j=0;j<date;j++)
  {
    if(dates[j]===","){
      count++;
    }
  }
  console.log(count);
  for(var k =0;k<= count;k++)
  {
    arr.push(dates.split(',')[k]+" "+request.body.Aparticipants);
  }


  const activitydetails = new Activity({
    Name:request.body.Aname,
    Header:request.body.Aheader,
    Days:request.body.Days,
    Type:request.body.Atype,
    Rate:request.body.rate,
    Picture:paths,
    Advantage:request.body.adv,
    BriefDes:request.body.Abrief,
    DetailedDes:request.body.Adetails,
    Plan:request.body.Aplan,
    CancelDet:request.body.Acancel,
    Duration:request.body.Atime,
    PickupDet:request.body.Apickup,
    Starttime:request.body.starttime,
    Endtime:request.body.endtime,
    Price:request.body.price,
    DatesDetails:arr,
    MaxParticipants:request.body.Aparticipants
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
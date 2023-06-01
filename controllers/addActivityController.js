const express=require('express')
const router=express.Router()
const Activity= require('../models/activity.schema.js');
const fileupload=require("express-fileupload");
const bodyParser=require('body-parser');
router.use(bodyParser.json());
router.use(fileupload());


const getAddActivity = async (req, res) => {
    res.render("AddActivity");
}


const postAddActivity = async (req, res) => {
  console.log("entered");
  var imgFile;
  var uploadPath;
  var num;
  var ext;
  if(!req.files||Object.keys(req.files).length===0){
    return response.status(400).send("no files uploaded");
  }
  num=req.files.imgs.length;
  imgFile=req.files.imgs;
  var paths = [];
  for(var i=0;i<num;i++){
    ext = imgFile[i].name.split('.')[1];
    uploadPath=__dirname+'/../public/images/activities/'+ req.body.Aname + (i+1) + '.' + ext;
    imgFile[i].mv(uploadPath);
    paths[i]=req.body.Aname+(i+1)+'.'+ext;
  }
  

  var date=req.body.Dates.length;
  var dates=req.body.Dates;
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
    arr.push(dates.split(',')[k]+" "+ "0");
  }


  const activitydetails = new Activity({
    Name:req.body.Aname,
    Header:req.body.Aheader,
    Type:req.body.Atype,
    Rate:req.body.rate,
    Picture:paths,
    Advantage:req.body.adv,
    BriefDes:req.body.Abrief,
    DetailedDes:req.body.Adetails,
    Plan:req.body.Aplan,
    CancelDet:req.body.Acancel,
    Duration:req.body.Atime,
    PickupDet:req.body.Apickup,
    Starttime:req.body.starttime,
    Endtime:req.body.endtime,
    Price:req.body.price,
    DatesDetails:arr,
    MaxParticipants:req.body.Aparticipants
    });

    activitydetails.save()
      .then(result=>{
        console.log(result);
        res.redirect('/activities');
      })
      .catch(err=>{
        console.log(err);
      })



  }

  module.exports = { getAddActivity,postAddActivity };
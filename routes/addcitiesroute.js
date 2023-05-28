const express=require('express')
const router=express.Router()
const fileupload=require("express-fileupload");
const path = require('path');   
const Cities = require('../models/addcitiesdb');
const Hotelss =require('../models/hotel.schema.js');
const Activityy =require('../models/activity.schema.js');
const bodyParser=require('body-parser');

router.use(bodyParser.json());

router.use((req, res, next) => {
  if (req.session.user !== undefined && req.session.user.Type === 'admin') {
      next();
  }
  else {
      res.render('err', { err: 'You are not an Admin', user: (!req.session.authenticated) ? "" : req.session.user  })
  }
});

router.use(fileupload());


router.get('/',async function(req,res){
    var arr=[];
    arr=await Hotelss.find();
    var arr2=[];
    arr2=await Activityy.find();
    res.render("addcities",{hotels:arr,activities:arr2});
});


router.post('/submit',(request,response)=>{
    console.log("entered");
    var imgFile;
    var uploadPath;
    var ext;
    if(!request.files||Object.keys(request.files).length===0){
      return response.status(400).send("no files uploaded");
    }

    imgFile=request.files.imgs;
    var paths = [];
      ext = imgFile.name.split('.')[1];
      uploadPath=__dirname+'/../public/images/cities/'+ request.body.cityname+ (1) + '.' + ext;
      imgFile.mv(uploadPath);
      paths[0]=request.body.cityname+'.'+ext;

    console.log(request.body);
    const city=new Cities({
        Name:request.body.cityname,
        picture:paths[0],
        hotels:request.body.hotels,
        activities:request.body.activities1
    });

    city.save()
        .then(result=>{
            response.redirect('/addcities');
        })
        .catch(err=>{
            console.log(err);
        })      
});



module.exports=router;
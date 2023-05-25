const express=require('express')
const router=express.Router()
const fileupload=require("express-fileupload");
const path = require('path');   
const Cities = require('../models/addcitiesdb');


router.use(fileupload());


router.get('/',function(req,res)
{
    res.render("addcities");
});

router.post('/submit',(request,response)=>{
    console.log("entered");
    var imgFile;
    var uploadPath;
    var num;
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
    


    const city=new Cities({
        Name:request.body.cityname,
        picture:paths[0]
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
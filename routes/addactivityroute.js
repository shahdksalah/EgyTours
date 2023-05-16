const express=require('express')
const router=express.Router()
const Activity= require('./models/addActivitiesdb.js');
const fileupload=require("express-fileupload");
app.use(fileupload());

router.get('/',function(req,res)
{
    res.render("AddActivity");
});

router.post('/submit',(request, response) =>  {
    console.log("entered");
        console.log(request.body);
        console.log(request.body.file);
  
  
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
  
        const file=request.files;
       const filepath= path.join(__dirname,'uploads',`${request.files}`);
  /*
       file.mv(filepath,err => {
        if(err) return response.status(500).send(err);
        console.log("success");
       })
  */
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
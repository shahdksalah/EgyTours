const express=require('express')
const router=express.Router()
const validate =require('../public/js/formsVal.js');
const Activity =require('../models/activity.schema.js');
const mongoose =require('mongoose');
var db = mongoose.connection;
const bodyParser=require('body-parser');
const{check,validationResult} =require('express-validator');
const urlencodedParser=bodyParser.urlencoded({ extended: false });

router.use(bodyParser.json());

router.use((req, res, next) => {
  if (req.session.user !== undefined && req.session.user.Type === 'admin') {
      next();
  }
  else {
      res.render('err', { err: 'You are not an Admin', user: (!req.session.authenticated) ? "" : req.session.user  })
  }
});

router.get('/',async function(req,res)
{
    var Activities=[];
    Activities=await Activity.find();
    console.log(Activities)
    res.render("EditActivities",{activities:(Activities==='undefined'?"":Activities)});
});

router.get('/:name', async function(req,res){
    var Activities=[];
    var url = req.params.name;
    Activities=await Activity.find({"Name":url});
    res.render("editactivity1",{activity:(Activities==='undefined'?"":Activities)});
});

router.post('/updated/:name', async function(request,response){
    var activity=[];
    console.log(request.params.name);
    var query = request.params.name;
    activity=await Activity.find().where("Name").equals(query);

    var numofimgs=activity[0].Picture.length();
    var id=1;
    var arr=[];
    for(var i = 0;i< numofimgs;i++)
    {
        var name=request.body.img+id;
        console.log(name);
       arr.push(name);
    }


    const activitydetails = new Activity({
        Name:request.body.Cityname,
        Header:request.body.Activityname,
        Days:request.body.Days,
        Type:request.body.ActivityType,
        Rate:request.body.rate,
        //Picture:paths,
        Advantage:request.body.ActivityAdv,
        BriefDes:request.body.Activitybrief,
        DetailedDes:request.body.Activitydet,
        Plan:request.body.Activityplan,
        CancelDet:request.body.Activitycancel,
        Duration:request.body.Activitydur,
        PickupDet:request.body.Activitypickup,
        Starttime:request.body.Activitystart,
        Endtime:request.body.Activityend,
        Price:request.body.Activityprice,
        //DatesDetails:arr,
        MaxParticipants:request.body.Activitymax
        });

        if(activity != undefined){
            console.log(activity);
            res.render('activities');
         }
    
});



module.exports=router;
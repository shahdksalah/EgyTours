const express = require('express')
const router = express.Router()
const Activity= require('../models/activity.schema.js');
const fileUpload = require('express-fileupload');

router.use(fileUpload());

const getActivities = async (req, res) => {
    var Activities = [];
    Activities = await Activity.find();
    res.render("EditActivities", { activities: (Activities === 'undefined' ? "" : Activities) });
}

const getActivitiesbyName = async (req, res) => {
    var Activities = [];
    var url = req.params.name;
    Activities = await Activity.find({ "Name": url });
    res.render("editactivity1", { activity: (Activities === 'undefined' ? "" : Activities) });
}

const deleteActivity = async (req, res) => {
    var act = await Activity.findByIdAndDelete(req.params.id);
    if(act)
        res.redirect('back');
}

router.use(fileUpload());

const updatedActivity = async (req, res) => {


    var Activities = [];

    var query = req.params.name;
    Activities = await Activity.find().where("Name").equals(query);

    var date=req.body.alldates.length;
    var dates=req.body.alldates;
    console.log(dates);
    var arr=[];
    var arr2=[];
    var count=0;
    for(var j=0;j<date;j++)
    {
      if(dates[j]===","){
        count++;
      }
    }
    
    var m;
    var alldates=[];
    var begin=0;

    for(var k =0,j=0;k<count,j<Activities[0].DatesDetails.length;k++,j++)
    {
        var date1=Activities[0].DatesDetails[j].date;
        var date2=dates.split(",")[k];
      
      if( date1 === date2 )
      {
        var newdates = {
            date: date2,
            max:Activities[0].DatesDetails[j].max
          }
          alldates.push(newdates);
      }
      m = k;

    }

    for(var s=m+1;s<count;s++)
    {
        var newdates1 = {
            date: dates.split(",")[s],
            max:begin
          }
          alldates.push(newdates1);
    }

    for(var d=0;d<arr.length;d++)
    {
        console.log(arr[d]);
    }

    if (!req.files || Object.keys(req.files).length == 0) {
        console.log("hi");
    }
    else {

        var filenames = Object.keys(req.files);
        var imgFile;
        var searchpath;
        filenames.forEach(file => {
            console.log(file);
            imgFile = req.files[file];
            searchpath = `${__dirname}/../public/images/activities/${file}`;
            imgFile.mv(searchpath);
            console.log(searchpath);
        })
    }

    await Activity.findByIdAndUpdate(req.body.id, {
        Name: req.body.Cityname,
        Header: req.body.Activityname,
        Type: req.body.ActivityType,
        Rate: req.body.rate,
        Advantage: req.body.ActivityAdv,
        BriefDes: req.body.Activitybrief,
        DetailedDes: req.body.Activitydet,
        Plan: req.body.Activityplan,
        CancelDet: req.body.Activitycancel,
        Duration: req.body.Activitydur,
        PickupDet: req.body.Activitypickup,
        Starttime: req.body.Activitystart,
        Endtime: req.body.Activityend,
        Price: req.body.Activityprice,
        DatesDetails: alldates,
        MaxParticipants: req.body.Activitymax
    })

        .then(async result => {
            Activities = await Activity.find().where("Name").equals(query)
                .then(() => {
                    res.render("activity1", { activity1: (Activities === 'undefined' ? "" : Activities), user: (!req.session.authenticated) ? "" : req.session.user, msg: "" });
                })
        })

}

module.exports = { getActivities,getActivitiesbyName,deleteActivity,updatedActivity };
const express = require('express')
const router = express.Router()
const validate = require('../public/js/formsVal.js');
const Activity = require('../models/activity.schema.js');
const mongoose = require('mongoose');
var db = mongoose.connection;
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

router.use(bodyParser.json());


router.use((req, res, next) => {
    if (req.session.user !== undefined && req.session.user.Type === 'admin') {
        next();
    }
    else {
        res.render('err', { err: 'You are not an Admin', user: (!req.session.authenticated) ? "" : req.session.user })
    }
});

router.get('/', async function (req, res) {
    var Activities = [];
    Activities = await Activity.find();
    res.render("EditActivities", { activities: (Activities === 'undefined' ? "" : Activities) });
});

router.get('/:name', async function (req, res) {
    var Activities = [];
    var url = req.params.name;
    Activities = await Activity.find({ "Name": url });
    res.render("editactivity1", { activity: (Activities === 'undefined' ? "" : Activities) });
});

router.get('/delete/:id', async function(req,res){
    var act = await Activity.findByIdAndDelete(req.params.id);
    if(act)
        res.redirect('back');
})

router.post('/updated/:name', async function (req, res) {

    var date=req.body.alldates.length;
    var dates=req.body.alldates;
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
    for(var k =0;k<count;k++)
    {
      arr.push(dates.split(',')[k]+" "+ "0");
    }

    for(var s=0;s<arr.length;s++)
    {
        console.log(arr[s]);
    }
  

    var Activities = [];

    var query = req.params.name;
    Activities = await Activity.find().where("Name").equals(query);


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
        DatesDetails: arr,
        MaxParticipants: req.body.Activitymax
    })

        .then(async result => {
            Activities = await Activity.find().where("Name").equals(query)
                .then(() => {
                    res.render("activity1", { activity1: (Activities === 'undefined' ? "" : Activities), user: (!req.session.authenticated) ? "" : req.session.user, msg: "" });
                })
        })

});

module.exports = router;
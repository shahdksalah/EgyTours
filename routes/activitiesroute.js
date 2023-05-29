const express = require('express')
const router = express.Router()
const Activity = require('../models/activity.schema.js');

router.get('/', async function (req, res) {
    var Activities = [];
    Activities = await Activity.find();
    res.render("activities", { activities: (Activities === 'undefined' ? "" : Activities),
    user: (!req.session.authenticated) ? "" : req.session.user,msg:""});
});

router.get('/:name', async function (req, res) {
    var Activities = [];
    var url = req.params.name;
    Activities = await Activity.find({ "Name": url });
    res.render("activity1", { activity1: (Activities === 'undefined' ? "" : Activities),
    user: (!req.session.authenticated) ? "" : req.session.user,msg:"" });
});

router.post('/:name', async function (req, res) {
    var arr = [];
    var Activities = [];
    var Activity2 = [];
    var query1 = req.body.activity;
    const Activity1 = await Activity.find().where("Name").equals(query1);
    Activities = Array.from(Activity1);
    console.log(Activities);
    console.log(Activity1);
    console.log(Activities[0].Reviews[0]);

    for (var i = 0; i < Activities[0].Reviews.length; i++) {
        arr.push(Activities[0].Reviews[i]);
    }



    arr.push(new Date());
    arr.push(req.body.rating);
    arr.push(req.body.addrev);

    const filter = { Name: query1 };
    const update = { Reviews: arr };
    if (Activity1 !== 'undefined') {
        const Activity2 = await Activity.findOneAndUpdate(filter, update);
        console.log(Activity2);
        res.render.reload;

    }

});

router.post('/:name/submit', async function (req, res) {

    var Activities = [];
    var url = req.params.name;
    Activities = await Activity.find({ "Name": url });
   

    console.log(req.body.name2);
    var name = req.body.name2;
    var num = req.body.num;
    var date = req.body.days;
    console.log(date);
    console.log(num);
    var X = [];
    var compare = date + " " + num;
    const x = await Activity.find().where("Name").equals(name);

    X = Array.from(x);
    console.log(X);

    var arr = [];



    var number;
    var ret;
    var found = "false";
    var found1 = "false";
    var found2 = "false";

    for (var s = 0; s < x[0].DatesDetails.length; s++) {
        var k = x[0].DatesDetails[s].split(' ')[0];
        console.log(k);
        
        if (date === k) {
            console.log(x[0].DatesDetails[s].split(' ')[1]);
            console.log(num);
            console.log("number:");
            console.log( parseInt(num)+parseInt(x[0].DatesDetails[s].split(' ')[1]));
            console.log(x[0].MaxParticipants);
            if (parseInt(num)+parseInt(x[0].DatesDetails[s].split(' ')[1]) <= x[0].MaxParticipants) {
                var newnum = parseInt(x[0].DatesDetails[s].split(' ')[1] )+ parseInt(num);
                console.log(newnum);

                if (newnum < x[0].MaxParticipants) {
                    ret = date + " " + newnum;
                    ret.toString();
                    console.log(ret);
                    found = "true";
                    number = s;
                }
                else if(newnum === x[0].MaxParticipants)
                {
                    found1="true";
                    number=s;
                }
            }
            else{
                found2="true";
            }
        }
    }

    if (found === "true") {
        /*
        for (var i = 0; i < x[0].DatesDetails.length; i++) {
            if (i === number) {
                arr.push(ret);
            }
            else {
                arr.push(x[0].DatesDetails[i]);
            }
            console.log(arr[i]);
        }

        const filter = { Name: name };
        const update = { DatesDetails: arr };
       
        const Act = await Activity.findOneAndUpdate(filter, update);
        console.log(Act);
        //window.location.reload();
        */
        res.render("activity1",{activity1: (Activities === 'undefined' ? "" : Activities),
        user: (!req.session.authenticated) ? "" : req.session.user,msg:"Available"});
    }

    else if(found1 === "true")
    {
        /*
        for (var i = 0; i < x[0].DatesDetails.length; i++) {
            if (i !== number) {
                arr.push(x[0].DatesDetails[i]);
            }
            console.log(arr[i]);
        }
        const filter = { Name: name };
        const update = { DatesDetails: arr };
       
        const Act = await Activity.findOneAndUpdate(filter, update);
        console.log(Act);
        */
        res.render("activity1",{activity1: (Activities === 'undefined' ? "" : Activities),
        user: (!req.session.authenticated) ? "" : req.session.user,msg:"Available"});
       //window.location.reload();
    }

    else if(found2==="true")
    {
        //.location.reload();
        res.render("activity1",{activity1: (Activities === 'undefined' ? "" : Activities),
        user: (!req.session.authenticated) ? "" : req.session.user,msg:"Not Available"});
    }



});

module.exports=router;


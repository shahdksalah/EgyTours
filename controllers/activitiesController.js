const express = require('express')
const router = express.Router()
const Activity = require('../models/activity.schema.js');
const Cart = require('../models/cartdb.js');


const getActivity = async (req, res) => {
    var Activities = [];
    Activities = await Activity.find();
    res.render("activities", { activities: (Activities === 'undefined' ? "" : Activities),
    user: (!req.session.authenticated) ? "" : req.session.user,msg:""});
}

const getActivity1 = async (req, res) => {
    var Activities = [];
    var url = req.params.name;
    Activities = await Activity.find({ "Name": url });
    res.render("activity1", { activity1: (Activities === 'undefined' ? "" : Activities),
    user: (!req.session.authenticated) ? "" : req.session.user,msg:"" });
}

const postActivityReviews = async (req, res) => {
    var Activites = [];
    var query1 = req.body.hotel;
    const activity1 = await Hotel.find().where("Name").equals(query1);
    Activites = Array.from(hotel1);
    if (req.session.authenticated) {
        allrevs = Hotels[0].Reviews;

        const nowdate = new Date().toLocaleString('en-GB', {
            hour12: false,
        });
        var newrev = {
            Rating: req.body.rating,
            Comment: req.body.comment,
            Date: nowdate,
        }

        allrevs.push(newrev);

        const filter = { Name: query1 };
        const update = { Reviews: allrevs };

        await Hotel.findOneAndUpdate(filter, update)
            .then(async result => {
                Hotels = await Hotel.find().where("Name").equals(query1)
                    .then(result => {
                        res.render("hotel1", {
                            hotel1: (Hotels === 'undefined' ? "" : Hotels),
                            user: (!req.session.authenticated) ? "" : req.session.user, msg: ""
                        });
                    })

            })
            .catch(err => {
                console.log("update failed\n" + err);
            })


    }
    else {
        Hotels = await Hotel.find().where("Name").equals(query1)
            .then(() => {
                res.render("hotel1", {
                    hotel1: (Hotels === 'undefined' ? "" : Hotels),
                    user: (!req.session.authenticated) ? "" : req.session.user, msg: "You must sign in to add a review"
                });
            }).catch(err => {
                console.log(err);
            })
    }

}

const postActivityAvail = async (req, res) => {

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
        user: (!req.session.authenticated) ? "" : req.session.user,msg:"Available",num:req.body.num});
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
        user: (!req.session.authenticated) ? "" : req.session.user,msg:"Available",num:req.body.num});
       //window.location.reload();
    }

    else if(found2==="true")
    {
        //.location.reload();
        res.render("activity1",{activity1: (Activities === 'undefined' ? "" : Activities),
        user: (!req.session.authenticated) ? "" : req.session.user,msg:"Not Available"});
    }



}

module.exports = { getActivity,getActivity1,postActivityReviews,postActivityAvail };
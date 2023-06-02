const express = require('express')
const router = express.Router()
const Activity = require('../models/activity.schema.js');
const Cart = require('../models/cartdb.js');


const getActivity = async (req, res) => {
    var Activities = [];
    Activities = await Activity.find();
    res.render("activities", { activities: (Activities === 'undefined' ? "" : Activities),
    user: (!req.session.authenticated) ? "" : req.session.user,msg:"",revmsg:""});
}

const getActivity1 = async (req, res) => {
    var Activities = [];
    var url = req.params.name;
    Activities = await Activity.find({ "Name": url });
    res.render("activity1", { activity1: (Activities === 'undefined' ? "" : Activities),
    user: (!req.session.authenticated) ? "" : req.session.user,msg:"",revmsg:"" });
}

const postReview = async (req, res) => {
    var Activities = [];
    var query1 = req.params.name;
    const activity1 = await Activity.find().where("Name").equals(query1);
    Activities = Array.from(activity1);
    if (req.session.authenticated) {
        allrevs = Activities[0].Reviews;

        const nowdate = new Date().toLocaleString('en-GB', {
            hour12: false,
        });
        var newrev = {
            Username:req.session.user.Username,
            Rating: req.body.rating,
            Comment: req.body.comment,
            Date: nowdate,
        }

        allrevs.push(newrev);
        allrevs.push(newrev);

        const filter = { Name: query1 };
        const update = { Reviews: allrevs };

        await Activity.findOneAndUpdate(filter, update)
            .then(async result => {
                Activities = await Activity.find().where("Name").equals(query1)
                    .then(result => {
                        res.render("activity1", {
                            activity1: (Activities === 'undefined' ? "" : Activities),
                            user: (!req.session.authenticated) ? "" : req.session.user, msg: "",revmsg:"",num:""
                        });
                    })

            })
            .catch(err => {
                console.log("update failed\n" + err);
            })


    }
    else {
        Activities = await Activity.find().where("Name").equals(query1)
            .then(() => {
                res.render("activity1", {
                    activity1: (Activities === 'undefined' ? "" : Activities),
                    user: (!req.session.authenticated) ? "" : req.session.user,msg:"", revmsg: "You must sign in to add a review"
                ,num:""});
            }).catch(err => {
                console.log(err);
            })
    }
}

const postActivityAvail = async (req, res) => {

    var Activities = [];
    var url = req.params.name;
    Activities = await Activity.find({ "Name": url });
   

    var name = req.body.name2;
    var num = req.body.num;
    var date = req.body.days;
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
            // console.log(x[0].DatesDetails[s].split(' ')[1]);
            // console.log(num);
            // console.log("number:");
            // console.log( parseInt(num)+parseInt(x[0].DatesDetails[s].split(' ')[1]));
            // console.log(x[0].MaxParticipants);
            if (parseInt(num)+parseInt(x[0].DatesDetails[s].split(' ')[1]) <= x[0].MaxParticipants) {
                var newnum = parseInt(x[0].DatesDetails[s].split(' ')[1] )+ parseInt(num);
                //console.log(newnum);

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
        user: (!req.session.authenticated) ? "" : req.session.user,msg:"Available",num:req.body.num,
        day:req.body.days,revmsg:""});
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
        user: (!req.session.authenticated) ? "" : req.session.user,msg:"Available",num:req.body.num,day:req.body.days
        ,revmsg:""});
       //window.location.reload();
    }

    else if(found2==="true")
    {
        //.location.reload();
        res.render("activity1",{activity1: (Activities === 'undefined' ? "" : Activities),
        user: (!req.session.authenticated) ? "" : req.session.user,msg:"Not Available",revmsg:""});
    }



}

const addToCart = async (req, res) => {
    
    var activities=[];

    var activ={
        id:req.params.id,
        participants:req.body.participants,
        date:req.body.date
    }
    if(req.session.authenticated){
    var query = { User: req.session.user._id};
    Cart.find(query)
    .then( async result=>{
        var crt=result[0];
       if(crt){
        activities=result[0].Activities;
        activities.push(activ);
        
        await Cart.findByIdAndUpdate(result[0]._id, {
            Activities: activities
        })
        .then(result=>{
            res.redirect('back');
        })

       }
       else{
          activities[0]=activ;
          if(req.session.user){
            const cart= new Cart({
                User:req.session.user._id,
                Activities:activities,
            });
            cart.save()
            .then(async result=>{
                console.log("Activity added");
                let Activities = [];
                Activities = await Activity.find();
                res.render("activity1", { activity1: (Activities === 'undefined' ? "" : Activities),
                user: (!req.session.authenticated) ? "" : req.session.user,msg:"",revmsg:"" });
            })
        }
       }
    })

} 
}

module.exports = { getActivity,getActivity1,postReview,postActivityAvail,addToCart };
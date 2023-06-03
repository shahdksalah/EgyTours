const express = require('express')
const router = express.Router()
const Activity = require('../models/activity.schema.js');
const fileupload = require("express-fileupload");
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(fileupload());


const getAddActivity = async (req, res) => {
  res.render("AddActivity", { alert: undefined });
}

const validateActivity = () => {
  return [
      body('Aname')
          .exists({ checkFalsy: true })
          .withMessage('City name is required')
          .isString()
          .withMessage("City name must be a string"),
      
          body('Aheader')
          .exists({ checkFalsy: true })
          .withMessage('Header is required')
          .isString()
          .withMessage("Header must be a string"),

          body('Atype')
          .exists({ checkFalsy: true })
          .withMessage('Type is required')
          .isString()
          .withMessage("Type must be a string"),

          body('adv')
          .exists({ checkFalsy: true })
          .withMessage('Advantage is required')
          .isString()
          .withMessage("Advantage must be a string"),

          body('Abrief')
          .exists({ checkFalsy: true })
          .withMessage('Brief description is required')
          .isString()
          .withMessage("Brief description must be a string"),

          body('Adetails')
          .exists({ checkFalsy: true })
          .withMessage('Detailed description is required')
          .isString()
          .withMessage("Detailed description must be a string"),

          body('Aplan')
          .exists({ checkFalsy: true })
          .withMessage('plan is required')
          .isString()
          .withMessage("plan must be a string"),


          body('Acancel')
          .exists({ checkFalsy: true })
          .withMessage('Cancellation details is required')
          .isString()
          .withMessage("Cancellation details must be a string"),




  ]
}


const postAddActivity = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const alert = errors.array();
      res.render('addactivity', { alert });
    }
    else {
      var imgFile;
      var uploadPath;
      var num;
      var ext;
      if (!req.files || Object.keys(req.files).length === 0) {
        return response.status(400).send("no files uploaded");
      }
      num = req.files.imgs.length;
      imgFile = req.files.imgs;
      var paths = [];
      for (var i = 0; i < num; i++) {
        ext = imgFile[i].name.split('.')[1];
        uploadPath = __dirname + '/../public/images/activities/' + req.body.Aname + (i + 1) + '.' + ext;
        imgFile[i].mv(uploadPath);
        paths[i] = req.body.Aname + (i + 1) + '.' + ext;
      }



      var date = req.body.Dates.length;
      var dates = req.body.Dates;
      var count = 0;
      for (var j = 0; j < date; j++) {
        if (dates[j] === ",") {
          count++;
        }
      }

      var alldates = [];
      var begin = 0;
      for (var i = 0; i <= count; i++) {
        var newdates = {
          date: req.body.Dates.split(',')[i],
          max: begin
        }
        alldates.push(newdates);
      }

      const activitydetails = new Activity({
        Name: req.body.Aname,
        Header: req.body.Aheader,
        Type: req.body.Atype,
        Rate: req.body.rate,
        Picture: paths,
        Advantage: req.body.adv,
        BriefDes: req.body.Abrief,
        DetailedDes: req.body.Adetails,
        Plan: req.body.Aplan,
        CancelDet: req.body.Acancel,
        Duration: req.body.Atime,
        PickupDet: req.body.Apickup,
        Starttime: req.body.starttime,
        Endtime: req.body.endtime,
        Price: req.body.price,
        DatesDetails: alldates,
        MaxParticipants: req.body.Aparticipants
      });

      activitydetails.save()
        .then(result => {
          console.log(result);
          res.redirect('/activities');
        })
        .catch(err => {
          console.log(err);
        })
      }

    }
    catch (err) {
        console.log(err);
    }



    }

    module.exports = { getAddActivity, postAddActivity };
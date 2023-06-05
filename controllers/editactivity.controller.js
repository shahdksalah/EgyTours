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

module.exports = { getActivities,getActivitiesbyName,deleteActivity };
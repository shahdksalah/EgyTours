const express = require("express");
const router = express.Router();
const City = require("../models/addcitiesdb");
const fileUpload = require("express-fileupload");

router.use(fileUpload());

const getCities = async (req, res) => {
  var cities = [];
  cities = await City.find();
  res.render("editcities", { city: cities });
};

const updateCity = async (req, res) => {
  await City.findByIdAndUpdate(req.body.id, {
    Name: req.body.imgname,
  });
  res.redirect("editcities");
};

const deleteCity = async (req, res) => {
  var cit = await City.findByIdAndDelete(req.params.id);
  if (cit) res.redirect("editcities");
};

module.exports = { getCities, deleteCity, updateCity };

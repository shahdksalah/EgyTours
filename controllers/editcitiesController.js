const express = require("express");
const router = express.Router();
const City = require("../models/addcitiesdb");
const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");

router.use(fileUpload());

const getCities = async (req, res) => {
  var cities = [];
  cities = await City.find();
  res.render("EditCities", { city: cities });
};

const updateCity = async (req, res) => {
  let imgFile;
  let uploadPath;
  console.log(req.files);
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  imgFile = req.files.img;
  uploadPath = path.join(
    __dirname,
    "../public/images/cities" + req.body.id + path.extname(imgFile.name)
  );

  imgFile.mv(uploadPath, async function (err) {
    if (err) res.status(500).send(err);
    const city = await City.findByIdAndUpdate(req.body.id, {
      Name: req.body.imgname,
      picture: req.body.image + path.extname(imgFile.name),
    });
    city
      .save()
      .then((result) => {
        res.redirect("editcities");
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

const deleteCity = async (req, res) => {
  await City.findByIdAndDelete(req.params.id)
    .then((result) => {
      fs.unlink(
        path.join(__dirname, "../public/images/cities/" + req.params.pic),
        (err) => {
          if (err) {
            throw err;
          }
          res.redirect("back");
        }
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { getCities, deleteCity, updateCity };

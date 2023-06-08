const express = require("express");
const { trim } = require("lodash");
const app = express();
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
app.use(express.urlencoded({ extended: true }));

const CitySchema = new Schema(
  {
    Name: {
      type: String,
      trim: true,
      required:[true,'City Name is required'],
    },
    picture: {
      type: Array,
      required: [true,'Picture is required'],
      maxlength:[1,'Maximum number of pictures is one']
    },
  },
  { timestamp: true }
);
const Cities = mongoose.model("Cities", CitySchema);
module.exports = Cities;

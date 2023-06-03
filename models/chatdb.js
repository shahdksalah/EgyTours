const express = require("express");
const app = express();
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
app.use(express.urlencoded({ extended: true }));

const ChatSchema = new Schema(
  {
    senderName: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
    dateTime: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Chats = mongoose.model("Chats", ChatSchema);
module.exports = Chats;

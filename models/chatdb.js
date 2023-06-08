const express = require("express");
const app = express();
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
app.use(express.urlencoded({ extended: true }));

const ChatSchema = new Schema(
  {
    sender_id: {
      type: String,
      required:[true,'Sender id is required'],
    },
    receiver_id: {
      type: String,
      required:[true,'Receiver id is required'],
    },
    message: {
      type: String,
      required: [true,'Message is required'],
    },
    dateTime: {
      type: Date,
      required: [true,'Date is required'],
    },
  },
  { timestamps: true }
);

const Chats = mongoose.model("Chats", ChatSchema);
module.exports = Chats;

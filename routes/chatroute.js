const express = require("express");
const router = express.Router();
const Chat = require("../models/chatdb");



router.get("/", function (req, res) {
  res.render("chat1", {
    user: !req.session.authenticated ? "" : req.session.user,
  });
});

router.post("/submit", (req, res) => {
  const chat = new Chat({
    senderName: req.body.mydata.name,
    message: req.body.mydata.message,
  });
  chat
    .save()
    .then((result) => {
      response.redirect("/chat1");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;

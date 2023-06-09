const express = require("express");
const router = express.Router();
const Chat = require("../models/chatdb");
const chatController=require('../controllers/chatController.js');


router.get("/", async function (req, res) {
  var chats=await Chat.find();
  res.render("chat1", {
    user: !req.session.authenticated ? "" : req.session.user,chats:chats
  });
});

router.post('/save',chatController.saveChat);
router.post('chat/saveChat',chatController.sChat);



module.exports = router;

const express=require('express')
const router=express.Router();
const User = require('../models/usersdb.js');

router.get("/", async function (req, res) {
    var Users=[];
    var query = "client";
    Users= await User.find( { "Type": query });
    console.log(Users);
    res.render("chat", { users: (Users === 'undefined' ? "" : Users),
    user: !req.session.authenticated ? "" : req.session.user});
  });

module.exports=router;
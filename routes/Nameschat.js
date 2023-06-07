const express=require('express')
const router=express.Router();
const User = require('../models/usersdb.js');
const Chat = require("../models/chatdb");

router.get("/", async function (req, res) {
    var Users=[];
    var query = "client";
    Users= await User.find( { "Type": query });
    console.log(Users);
    res.render("chat", { users: (Users === 'undefined' ? "" : Users),
    user: !req.session.authenticated ? "" : req.session.user});
  });

  router.post('/saveChat',async(req,res)=>{
    try{
       console.log("nameschat")
        var chat=new Chat({
            sender_id:req.body.sender_id,
            receiver_id:req.body.receiver_id,
            message:req.body.message
        });

        var newChat=await chat.save();
        res.status(200).send({success:true,msg:'Chat inserted!',data:newChat});
    }
    catch(error){
        res.status(400).send({succes:false,msg:error.message});
    }
});

module.exports=router;
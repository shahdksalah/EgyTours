const Chat = require("../models/chatdb");

const saveChat=async(req,res)=>{
    try{
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
}

module.exports={saveChat};
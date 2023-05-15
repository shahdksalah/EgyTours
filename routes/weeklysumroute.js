const express=require('express')
const router=express.Router()


router.get('/',function(req,res)
{
    res.render("weeklysummary");
});

module.exports=router;
const express=require('express')
const router=express.Router()


router.get('/',function(req,res)
{
    res.render("hotels");
});

module.exports=router;
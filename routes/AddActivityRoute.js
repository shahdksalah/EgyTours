const express=require('express')
const router=express.Router()


router.get('/AddActivity',function(req,res)
{
    res.render("AddActivity");
});

module.exports=router;
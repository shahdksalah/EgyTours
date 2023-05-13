const express=require('express')
const router=express.Router()


router.get('/AddHotel',function(req,res)
{
    res.render("AddHotel");
});

module.exports=router;
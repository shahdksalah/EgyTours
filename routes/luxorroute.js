const express=require('express')
const router=express.Router()


router.get('/',function(req,res)
{
    res.render("luxor");
});

module.exports=router;
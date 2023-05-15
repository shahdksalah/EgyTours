const express=require('express')
const router=express.Router()


router.get('/',function(req,res)
{
    res.render("ourTeam1");
});

module.exports=router;
const express=require('express')
const router=express.Router()


router.get('/',function(req,res)
{
    res.render("AdminDashboard");

});


module.exports=router;
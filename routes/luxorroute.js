const express=require('express')
const router=express.Router()


router.get('/',function(req,res)
{
    res.render("luxor",{ user: (!req.session.authenticated) ? "" : req.session.user });
});

module.exports=router;
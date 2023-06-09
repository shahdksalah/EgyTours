const express=require('express')
const router=express.Router()


router.get('/',function(req,res)
{
    res.render("aboutus",{user: (!req.session.authenticated) ? "" : req.session.user});
});

module.exports=router;
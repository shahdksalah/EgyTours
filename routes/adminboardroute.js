const express=require('express')
const router=express.Router()
const bodyParser=require('body-parser');
router.use(bodyParser.json());

router.use((req, res, next) => {
  if (req.session.user !== undefined && req.session.user.Type === 'admin') {
      next();
  }
  else {
      res.render('err', { err: 'You are not an Admin', user: (!req.session.authenticated) ? "" : req.session.user  })
  }
});

router.get('/',function(req,res)
{
    res.render("AdminDashboard");

});


module.exports=router;
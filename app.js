const express=require('express');
const app=express();
const mongoose=require('mongoose');

const dbURI='mongodb+srv://mennaemam:menna-2003@project.mdtkzue.mongodb.net/';
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedToplogy:true});

app.set('view engine','ejs');
let path=require('path');
app.get('/',(req,res)=>{
    res.render('index');
});
app.listen(8080);

app.use(express.static(path.join(__dirname,'public')));  //All static assets in the public folder
const express=require('express');
const app=express();
app.set('view engine','ejs');
let path=require('path');
app.get('/',(req,res)=>{
    res.render('index');
});
app.listen(8080);

app.use(express.static(path.join(__dirname,'public')));
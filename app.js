const express=require('express');
const app=express();
const mongoose=require('mongoose');

const User= require('./models/usersdb.js');
const PORT=8080;
const indexRoute=require('./routes/Indexroute.js');


app.set('view engine','ejs');
let path=require('path');

app.use(express.static(path.join(__dirname,'public')));  //All static assets in the public folder


const dburl ='mongodb+srv://newuser:newuser123@cluster0.7xhafht.mongodb.net/Tours?retryWrites=true&w=majority';
mongoose.connect(dburl,{ useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(PORT))
.catch((err) => console.log(err))

app.use(express.urlencoded({ extended: true }));


app.use("/",indexRoute);


app.post('/success', (req, res) =>  {
  console.log("entered");
    const userdetails = new User({
        Username: req.body.uname,
        Email: req.body.email,
        PhoneNumber: req.body.number,
        Password: req.body.psw,
        ConfPassword: req.body.confpsw,
      });
    userdetails.save()
    .then((result)=>
    {
        console.log("saved");
        res.redirect('/');
    })
    .catch((err) =>
    {
      console.log(err);
    });
  });
    

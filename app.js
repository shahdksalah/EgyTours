const express=require('express');
const app=express();
const mongoose=require('mongoose');
var bodyParser=require("body-parser");
const {User}= require('./models/usersdb.js');
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
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/",indexRoute);


app.post('/', function(r, response) {
    const userdetails = new {User}({
        Username: r.body.uname,
        Email: r.body.email,
        PhoneNumber: r.body.number,
        Age: r.body.age,
        Password: r.body.psw,
        ConfPassword: r.body.confpsw,
      });
   
    userdetails.save()
    .then((result)=>
    {
        console.log("saved");
        response.redirect('/');
    })
    .catch((err)=>console.log(err));
    
    
  });

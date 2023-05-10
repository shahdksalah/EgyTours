const express=require('express');
const app=express();
const mongoose=require('mongoose');
const User= require('./models/usersdb.js');
const PORT=8080;
const indexRoute=require('./routes/Indexroute.js');
const bodyParser = require('body-parser');

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());


app.set('view engine','ejs');
let path=require('path');

app.use(express.static(path.join(__dirname,'public')));  //All static assets in the public folder


const dburl ='mongodb+srv://newuser:newuser123@cluster0.7xhafht.mongodb.net/Tours?retryWrites=true&w=majority';
mongoose.connect(dburl,{ useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(PORT))
.catch((err) => console.log(err))


app.use("/",indexRoute);


app.post('/success', (request, response) =>  {
  console.log("entered");
    const userdetails = new User({
        Username: request.body.unam,
        Email: request.body.email,
        PhoneNumber: request.body.number,
        Password: request.body.psw,
        ConfPassword: request.body.confpsw,
      });
    userdetails.save()
    .then((result)=>
    {
        console.log("saved");
        response.redirect('/');
    })
    .catch((err) =>
    {
      console.log(err);
    });
  });
    

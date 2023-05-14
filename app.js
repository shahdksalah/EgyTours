const express=require('express');
const app=express();
const mongoose=require('mongoose');
const User= require('./models/usersdb.js');
const PORT=8080;

const indexRoute=require('./routes/Indexroute.js');
//const addActivity=require('./routes/AddActivityRoute.js');
//const addHotel=require('./routes/AddHotelRoute.js');


const bodyParser = require('body-parser');
const{check,validationResult}=require('express-validator');
const fs=require('fs');

const Hotel = require('./models/addHoteldb.js');
const Activity= require('./models/addActivitiesdb.js');
var db = mongoose.connection;
var multer=require('multer');
const cors=require('cors');
const fileupload=require("express-fileupload");

app.use(cors());
app.use(fileupload());

const storage = multer.diskStorage({
  destination:function(req,file,callback){
    cb(null,__dirname+'uploads');
  },
  filename: function(req,file,cb){
    cb(null,Date.now()+'--'+file.originalname);
  }
});

const uploads = multer({storage:storage});

const urlencodedParser=bodyParser.urlencoded({ extended: false });

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());


app.set('view engine','ejs');
let path=require('path');


app.use(express.static(path.join(__dirname,'public')));  //All static assets in the public folder
console.log(__dirname);

const dburl ='mongodb+srv://newuser:newuser123@cluster0.7xhafht.mongodb.net/Tours?retryWrites=true&w=majority';
mongoose.connect(dburl,{ useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(PORT))
.catch((err) => console.log(err))


app.use("/",indexRoute);
app.use("/success",indexRoute);
app.use("/food",indexRoute);
app.use("/activities",indexRoute);
app.use("/AddActivity",indexRoute);
app.use("/AddHotel",indexRoute);
app.use("/hotels",indexRoute);
app.use("/activity1",indexRoute);
app.use("/luxor",indexRoute);

app.post("/AddHotel", (req,res)=>{
  console.log("entered");
  const hotel = new Hotel(req.body);
  console.log(hotel);
  hotel.save()
    .then((results)=>{
      res.redirect('/AddHotel');
    })
    .catch((err)=>{
      console.log(err);
    });
})

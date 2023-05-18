const express=require('express');
const app=express();
const mongoose=require('mongoose');
const User= require('./models/usersdb.js');
const session=require('express-session');
const PORT=8080;



const indexRoute=require('./routes/Indexroute.js');
const foodRoute=require('./routes/foodroute.js');
const activitiesRoute=require('./routes/activitiesroute.js');
const activity1Route=require('./routes/activity1route.js');
const hotelsRoute=require('./routes/hotelsroute.js');
const addActivityRoute=require('./routes/addactivityroute.js');
const addHotelRoute=require('./routes/addhotelroute.js');
const luxorRoute=require('./routes/luxorroute.js');
const editactivitiesRoute=require('./routes/editactivitiesroute.js');
const edithotelsRoute=require('./routes/edithotelsroute.js');
const adminboardRoute=require('./routes/adminboardroute.js');
const cartRoute=require('./routes/cartroute.js');
const aboutusRoute=require('./routes/aboutusroute.js');
const food1Route=require('./routes/restaurent1route.js');
const ourteamRoute=require('./routes/ourteamroute.js');
const tcRoute=require('./routes/T&Croute.js');
const profileRoute=require('./routes/profileroute.js');
const usersRoute=require('./routes/usersroute.js');
const weeklysummaryRoute=require('./routes/weeklysumroute.js');



const bodyParser = require('body-parser');
const{check,validationResult}=require('express-validator');
const fs=require('fs');
var db = mongoose.connection;



const urlencodedParser=bodyParser.urlencoded({ extended: false });

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('public'));
// app.use(session({
//     secret: 'this is my secret',
//     cookie:{
//         sameSite: 'strict',
//     }
// }));


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
app.use("/food",foodRoute);
app.use("/activities",activitiesRoute);
app.use("/activity1",activity1Route);
app.use("/hotels",hotelsRoute);
app.use("/addactivity",addActivityRoute);
app.use("/addhotel",addHotelRoute);
app.use("/luxor",luxorRoute);
app.use("/editactivities",editactivitiesRoute);
app.use("/edithotels",edithotelsRoute);
app.use("/adminboard",adminboardRoute);
app.use("/cart",cartRoute);
app.use("/aboutus",aboutusRoute);
app.use("/food1",food1Route);
app.use("/ourteam",ourteamRoute);
app.use("/terms",tcRoute);
app.use("/profile",profileRoute);
app.use("/users",usersRoute);
app.use("/weeklysummary",weeklysummaryRoute);







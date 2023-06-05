const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const PORT = 8080;

const indexRoute = require("./routes/Indexroute.js");
const foodRoute = require("./routes/foodroute.js");
const activitiesRoute = require("./routes/activitiesroute.js");
const hotelsRoute = require("./routes/hotels.route.js");
const addActivityRoute = require("./routes/addactivityroute.js");
const addHotelRoute = require("./routes/addhotel.route.js");
const citiesRoute = require("./routes/luxorroute.js");
const editactivitiesRoute = require("./routes/editactivitiesroute.js");
const edithotelsRoute = require("./routes/edithotels.route.js");
const adminboardRoute = require("./routes/adminboardroute.js");
const cartRoute = require("./routes/cartroute.js");
const aboutusRoute = require("./routes/aboutusroute.js");
const food1Route = require("./routes/restaurent1route.js");
const ourteamRoute = require("./routes/ourteamroute.js");
const tcRoute = require("./routes/T&Croute.js");
const profileRoute = require("./routes/profileroute.js");
const usersRoute = require("./routes/usersroute.js");
const weeklysummaryRoute = require("./routes/weeklysumroute.js");
const addcity = require("./routes/addcitiesroute.js");
const paymentRoute = require("./routes/paymentroute.js");
const confirmPaymentRoute = require("./routes/confirmPaymentroute.js");
const viewBookingsRoute = require("./routes/viewBookingsroute.js");
const chatRoute = require("./routes/chatroute.js");
const editCities = require("./routes/editcitiesroute.js");

const bodyParser = require("body-parser");

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(
  session({
    name: `daffyduck`,
    secret: "session",
    resave: false,
    saveUninitialized: false,
  })
);

app.set("view engine", "ejs");
let path = require("path");

app.use(express.static(path.join(__dirname, "public"))); //All static assets in the public folder
console.log(__dirname);

const dburl =
  "mongodb+srv://newuser:newuser123@cluster0.7xhafht.mongodb.net/Tours?retryWrites=true&w=majority";
mongoose
  .connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
  //   .then((result) => app.listen(PORT))
  .catch((err) => console.log(err));

const server = app.listen(PORT, () =>
  console.log(`server is running on port ${PORT}`)
);
const cors = require("cors");
app.use(cors({ origin: true }));
const io = require("socket.io")(server);
app.set('socketio', io);

app.use("/", indexRoute);

var usp=io.of('/user-namespace');
let sockesConnected = new Set();
usp.on("connection", onConnected);
function onConnected(socket) {
  console.log("user connected");
  console.log("new socket added", socket.id);
  sockesConnected.add(socket.id);

  socket.on("disconnect", () => {
    console.log("socket disconnected", socket.id);
    sockesConnected.delete(socket.id);
  });

  // socket.on("message", (data) => {
  //   socket.broadcast.emit("chat-message", data);
  // });
}


app.use("/activities", activitiesRoute);
app.use("/hotels", hotelsRoute);
app.use("/addactivity", addActivityRoute);
app.use("/addhotel", addHotelRoute);
app.use("/cities", citiesRoute);
app.use("/editactivities", editactivitiesRoute);
app.use("/edithotels", edithotelsRoute);
app.use("/adminboard", adminboardRoute);
app.use("/cart", cartRoute);
app.use("/paymentForm", paymentRoute);
app.use("/confirmpayment", confirmPaymentRoute);
app.use("/aboutus", aboutusRoute);
app.use("/food1", food1Route);
app.use("/ourteam", ourteamRoute);
app.use("/terms", tcRoute);
app.use("/profile", profileRoute);
app.use("/users", usersRoute);
app.use("/weeklysummary", weeklysummaryRoute);
app.use("/addcities", addcity);
app.use("/chat", chatRoute);
app.use("/editcities", editCities);
app.use("/viewbookings", viewBookingsRoute);

module.exports={io};

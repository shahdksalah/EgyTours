const Wishlist = require('../models/wishlistdb.js');
const Hotel = require('../models/hotel.schema.js');
const Activity = require('../models/activity.schema.js');

const viewFavs = async function (req, res) {
  var wishlist;
  var hotels = [];
  var activities = [];
  var length;
  var counter = 0;
  var cont = false;

  if (req.session.authenticated) {
    console.log("authenticated");
    res.render("wishlist", {
      user: (!req.session.authenticated) ? "" : req.session.user, msg:""
    })
  }
  else {
    res.render("wishlist", {
      user: (!req.session.authenticated) ? "" : req.session.user, msg:"Sign in to view your favourites"
    })
  }
}

const removeFromFavs = async (req, res) => {

  var hotels = [];
  var activities = [];
  var wishlist;
  var item = "";

  await Wishlist.find().where("User").equals(req.session.user._id)
    .then(async (result) => {
      if (result.length > 0) {
        cart = result[0];

        for (var j = 0; j < wishlist.Hotels.length; j++) {  //if removed booking is an hotel
          if (req.params.id - 1 != j) {
            hotels.push(wishlist.Hotels[j]);
          }
          else {
            item = "hotel"
            price = wishlist.Hotels[j].price;
          }
        }
        if (item == "hotel") {
          activities = wishlist.Activities;
          await Wishlist.findOneAndUpdate({ User: req.session.user._id }, { Hotels: hotels }, {
            new: true
          })
            .then(async () => {

              if (hotels.length === 0 && activities.length === 0) {
                console.log("Entered")
                await Wishlist.findByIdAndDelete(wishlist._id)
                  .then(() => {
                    console.log("delete hotel 0");
                    res.redirect('back')
                  });
              }
              else {
                console.log("delete hotel");
                res.redirect('back')
              }

            })
        }

        for (var k = 0; k < wishlist.Activities.length; k++) {
          if (req.params.id - wishlist.Hotels.length - 1 != k) {
            activities.push(wishlist.Activities[k]);
          }
          else {
            console.log("don't add");
            item = "activity";
            price = wishlist.Activities[k].price;
          }
        }

        if (item === "activity") {
          hotels = wishlist.Hotels;
          await Wishlist.findOneAndUpdate({ User: req.session.user._id }, { Activities: activities }, {
            new: true
          })
            .then(async () => {

              if (hotels.length === 0 && activities.length === 0) {
                console.log("Entered")
                await Wishlist.findByIdAndDelete(wishlist._id)
                  .then(() => {
                    console.log("delete activity 0");
                    res.redirect('back')
                  });
              }
              else {
                console.log("delete activity");
                res.redirect('back')
              }

            })
        }
      }
    })

}

const clearFavs = async (req, res) => {
  await Wishlist.findOneAndDelete().where("User").equals(req.session.user._id)
    .then(() => {
      res.render("wishlist", {
        user: (!req.session.authenticated) ? "" : req.session.user,
        wishlist: "", hotels: "", activities: ""
      })
    })
    .catch(err => {
      console.log(err);
    })
}

module.exports = { viewFavs, removeFromFavs, clearFavs };
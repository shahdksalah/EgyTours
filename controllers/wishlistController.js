const Wishlist = require('../models/wishlistdb.js');
const Hotel = require('../models/hotel.schema.js');
const Activity = require('../models/activity.schema.js');
const User = require('../models/usersdb.js');

const viewFavs = async function (req, res) {

  if (req.session.authenticated) {
    console.log("authenticated");
    res.render("wishlist", {
      user: (!req.session.authenticated) ? "" : req.session.user, msg: ""
    })
  }
  else {
    res.render("wishlist", {
      user: (!req.session.authenticated) ? "" : req.session.user, msg: "Sign in to view your favourites"
    })
  }
}

const removeFromFavs = async (req, res) => {
  var finalhotels = [];
  console.log("removing hotel from wishlist");
  await Hotel.findById(req.params.id)
    .then(async result => {
      await User.findById(req.session.user._id)
        .then(async resu => {
          resu.Wishlist.Hotels.forEach(hot => {
            if (hot.Name !== (result.Name)) {
              finalhotels.push(hot);
            }
          })
          await User.findByIdAndUpdate(req.session.user._id, {
            Wishlist: {
              Hotels: finalhotels,
            }
          })
            .then(async resss => {
              console.log("hotel deleted from wish list");
              req.session.user = resu;
              req.session.authenticated = true;
              console.log("session updated");
              if (req.session.authenticated) {
                await User.findById(req.session.user._id)
                  .then(async result => {
                    req.session.user = result;
                    req.session.authenticated = true;
                    console.log("session updated");
                    res.render("wishlist", {
                      user: (!req.session.authenticated) ? "" : req.session.user, msg: ""
                    })
                  })
              }
              else {
                res.render("wishlist", {
                  user: (!req.session.authenticated) ? "" : req.session.user, msg: "Sign in to view your favourites"
                })
              }

            })
        })
    })
}

const clearFavs = async (req, res) => {
  var hotels = [];
  await User.findByIdAndUpdate(req.session.user._id, {
    Wishlist: {
      Hotels: hotels,
    }
  })
    .then(async resu => {
      console.log("wishlist hotels empty");
      req.session.user = resu;
      req.session.authenticated = true;
      console.log("session updated");
      if (req.session.authenticated) {
        await User.findById(req.session.user._id)
          .then(async result => {
            req.session.user = result;
            req.session.authenticated = true;
            console.log("session updated");
            res.render("wishlist", {
              user: (!req.session.authenticated) ? "" : req.session.user, msg: ""
            })
          })
      }
      else {
        res.render("wishlist", {
          user: (!req.session.authenticated) ? "" : req.session.user, msg: "All favorites deleted"
        })
      }
    })
}

module.exports = { viewFavs, removeFromFavs, clearFavs };
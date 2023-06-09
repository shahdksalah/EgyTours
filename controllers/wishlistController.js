const Wishlist = require('../models/wishlistdb.js');
const Hotel = require('../models/hotel.schema.js');
const Activity = require('../models/activity.schema.js');
const User = require('../models/usersdb.js');

const viewFavs = async function (req, res) {
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

}

const removeHotel = async (req, res) => {
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
                    res.redirect('back');
                  })
              }
              else {
                res.redirect("back");
              }

            })
        })
    })
}

const removeActivity = async (req, res) => {
  var finalacts = [];
  console.log("removing activity from wishlist");
  await Activity.findById(req.params.id)
    .then(async result => {
      await User.findById(req.session.user._id)
        .then(async resu => {
          resu.Wishlist.Activities.forEach(act => {
            if (act.Name !== (result.Name)) {
              finalacts.push(act);
            }
          })
          var hotels = resu.Wishlist.Hotels;
          await User.findByIdAndUpdate(req.session.user._id, {
            Wishlist: {
              Hotels: hotels,
              Activities:finalacts,
            }
          })
            .then(async resss => {
              console.log("activity deleted from wish list");
              req.session.user = resu;
              req.session.authenticated = true;
              if (req.session.authenticated) {
                await User.findById(req.session.user._id)
                  .then(async result => {
                    req.session.user = result;
                    req.session.authenticated = true;
                    console.log("session updated");
                    res.redirect('back');
                  })
              }
              else {
                res.redirect("back");
              }

            })
        })
    })
}

const clearFavs = async (req, res) => {
  var hotels = [];
  var acts = [];
  await User.findByIdAndUpdate(req.session.user._id, {
    Wishlist: {
      Hotels: hotels,
      Activities: acts,
    }
  })
    .then(async resu => {
      console.log("wishlist is empty");
      req.session.user = resu;
      req.session.authenticated = true;
      if (req.session.authenticated) {
        await User.findById(req.session.user._id)
          .then(async result => {
            req.session.user = result;
            req.session.authenticated = true;
            console.log("session updated");
            res.redirect('back');
          })
      }
      else {
        res.redirect('back');
      }
    })
}

module.exports = { viewFavs, removeHotel, removeActivity, clearFavs };
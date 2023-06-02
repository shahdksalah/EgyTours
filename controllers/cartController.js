const Cart = require('../models/cartdb.js');
const Hotel = require('../models/hotel.schema.js');
const Activity = require('../models/activity.schema.js');

const viewCart = async function (req, res) {
  var empty = false;
  var cart;
  var hotels = [];
  var activities = [];
  var length;
  var counter = 0;
  if (req.session.authenticated) {    //user signed in
    console.log("authenticated")
    const promise1 = new Promise(async (resolve, reject) => {

      await Cart.find().where("User").equals(req.session.user._id)  //user has items in cart
        .then(result => {
          if (result.length !== 0) {
            cart = result[0];
            length = cart.Hotels.length + cart.Activities.length;
          }
          if (result.length > 0) {
            hasItems = true;
            resolve(
              cart.Hotels.forEach(async hotel => {

                await Hotel.find().where("_id").equals(hotel.id)
                  .then(resu => {
                    if (resu.length > 0) {
                      console.log("hotel added");
                      hotels.push(resu[0]);
                      counter++;

                      if (cart.Activities.length === 0) {   //don't go to promise1.then if no activities added in cart
                        res.render("cart", {
                          user: (!req.session.authenticated) ? "" : req.session.user,
                          cart: cart, hotels: hotels, activities: activities
                        });
                      }
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  })
              })

            )
          }
          else {
            resolve();   //cart.hotels is empty,complete promise1.then to see if cart.activities avail
          }
        })
        .catch(err => {
          console.log(err);
        })

    })

    promise1.then(() => {
      cart.Activities.forEach(async activity => {
        await Activity.find().where("_id").equals(activity.id)
          .then(resul => {
            if (resul.length > 0) {
              console.log("activity added");
              activities.push(resul[0]);
              counter++;
              if (counter === length) {    //every item in cart is added to its array, ready to display cart
                res.render("cart", {
                  user: (!req.session.authenticated) ? "" : req.session.user,
                  cart: cart, hotels: hotels, activities: activities
                });
              }
            }
          })
          .catch(err => {
            console.log(err);
          })
      })
    })
  }
  else {
    res.render("cart", {     //user not signed in
      user: (!req.session.authenticated) ? "" : req.session.user,
      cart: "", hotels: "", activities: ""
    })
  }
}

module.exports = { viewCart };
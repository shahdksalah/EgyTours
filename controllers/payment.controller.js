const Cart = require('../models/cartdb.js');
const Bookings = require('../models/bookingdb.js');
const Hotel = require('../models/hotel.schema.js');
const Activity = require('../models/activity.schema.js');
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');

const viewForm = async (req, res) => {

  let cart;
  let hotels = [];
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
            resolve(
              cart.Hotels.forEach(async hotel => {

                await Hotel.find().where("_id").equals(hotel.id)
                  .then(resu => {
                    if (resu.length > 0) {
                      console.log("hotel added");
                      hotels.push(resu[0]);
                      counter++;

                      if (activities != "") {
                        res.render("paymentForm", {
                          user: (!req.session.authenticated) ? "" : req.session.user,
                          cart: cart, hotels: hotels, activities: activities
                        });  //if promise.then is executed first
                      }

                      if (cart.Activities.length === 0) {   //don't go to promise1.then if no activities added in cart
                        res.render("paymentForm", {
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
                res.render("paymentForm", {
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

}

const pay = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
  }
  else {
    var totalPrice = 0;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'egyytourss@gmail.com',
        pass: 'rsxswraupskjwfym'
      }
    });

    var booking;
    var num = 0;
    var n;
    var d;
    var datesArr;
    var filter;
    var update;
    var emailText = "Your payment with the following details is confirmed\n";
    await Cart.find().where("User").equals(req.session.user._id)
      .then(async result => {
        
        if (result) {
          booking = result[0];
          if (booking.Hotels.length != 0) {
            booking.Hotels.forEach(async hotel => {
              var h;
              await Hotel.find().where("_id").equals(hotel.id)
                .then(async res => {
                  h = res[0];               //send an email with hotel booking details
                  emailText += ("Hotel: " + h.Name + "\n" + "From: " + hotel.checkIn + "  To: " + hotel.checkOut + "\n"
                    + "Room(s): " + hotel.rooms + "x " + hotel.roomType + "\n" + "Price: " + hotel.price + "\n\n");
                  totalPrice += hotel.price;
                })
            })
          }
          if (booking.Activities.length != 0) {
            booking.Activities.forEach(async activity => {
              var a;
              await Activity.find().where("_id").equals(activity.id)
                .then(async res => {
                  a = res[0];      //send an email with activity booking details
                  emailText += ("Activity Name: " + a.Name + "\n" + "Date: " + activity.date + "\n"
                    + "From: " + a.Starttime + "  To: " + a.Endtime
                    + "\n" + "Price: " + activity.price + "\n\n");
                  totalPrice += activity.price;

                  datesArr = a.DatesDetails;       //update remaining spots left in activities
                  for (var j = 0; j < datesArr.length; j++) {
                    d = datesArr[j].date;
                    if (d == activity.date) {
                      n = parseInt(datesArr[j].max);
                      n +=parseInt(activity.participants);
                      var newdates = {
                        date: d,
                        max:n
                      }
                      datesArr[j].push(newdates);
                      console.log(datesArr[j]);
                      filter = { Name: a.Name };
                      update = { DatesDetails: datesArr };
                    }
                  }
                })
            })
          }

          await Bookings.find()
            .then(resu => {
              if (resu.length > 0) {
                num = resu[resu.length - 1].bookingNo;
                num++;
              }
              const bookings = new Bookings({
                bookingNo: num,
                User: booking.User,
                Hotels: booking.Hotels,
                Activities: booking.Activities
              });
              bookings.save()
                .then(async () => {
                  console.log("Booking saved")
                  await Cart.findOneAndDelete().where("User").equals(req.session.user._id)
                    .then(async() => {
                      console.log("cart deleted");
                      emailText += "\nPayment Method: Credit Card";
                      const mailOptions = {
                        from: 'egyytourss@gmail.com',
                        to: req.session.user.Email,
                        subject: 'Booking Confirmed',
                        text: emailText
                      };

                      transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                        }
                      });

                      await Activity.findOneAndUpdate(filter, update)
                      .then(() => {
                        console.log("activity updated successfully");
                      })
                      .catch(err => {
                        console.log(err);
                      })

                      res.render("confirmPayment", { user: (!req.session.authenticated) ? "" : req.session.user, price: totalPrice, card: req.body.number })
                    })
                    .catch(err => {
                      console.log(err);
                    })
                })
                .catch(err => {
                  console.log(err);
                })
            })
        }
      })
      .catch(error => {
        console.log(error);
      })
  }
}

module.exports = { viewForm, pay };
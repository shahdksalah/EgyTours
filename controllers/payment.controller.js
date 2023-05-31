const Cart=require('../models/cartdb.js');
const Bookings=require('../models/bookingdb.js');
const Hotel = require('../models/hotel.schema.js');

const viewForm=async (req,res)=>{
    let cart;
    let hotels=[];
    if(req.session.authenticated){    //user signed in
        console.log("authenticated")
        await Cart.find().where("Userid").equals(req.session.user._id)  //user has items in cart
       .then( result=>{
            cart=result[0];
            var counter=0;
            var length=cart.Hotels.length;
            cart.Hotels.forEach( async hotel=>{
                
              await Hotel.find().where("_id").equals(hotel.id)
              .then(resu=>{
                console.log(1);
                   console.log("hotel added");
                   hotels.push(resu[0]);
                   counter++;
                   if(counter===length){
                    console.log("hotels:")
                        console.log(hotels);
                        res.render("paymentForm", {user: (!req.session.authenticated) ? "" : req.session.user,
                        cart:cart,hotels:hotels} );
                   }
              })
            })      
        })
}
}

const pay=async(req,res)=>{
    var booking;
    await Cart.find().where("Userid").equals(req.session.user._id)
    .then(result=>{
        if(result){
            booking=result[0];
            const bookings=new Bookings({
                Userid:booking.Userid,
                Hotels:booking.Hotels,
            });
            bookings.save()
            .then(async()=>{
                console.log("Booking saved")
                await Cart.findOneAndDelete().where("Userid").equals(req.session.user._id)
                .then(()=>{
                    console.log("cart deleted");
                    res.redirect('/');
                })
                .catch(err=>{
                    console.log(err);
                })
            })
            .catch(err=>{
                console.log(err);
            })
        }
    })
    .catch(error=>{
        console.log(error);
    })
}

module.exports={viewForm,pay};
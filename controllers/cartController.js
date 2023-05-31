const Cart=require('../models/cartdb.js');
const Hotel = require('../models/hotel.schema.js');

const viewCart=async function(req,res)
{
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
                        res.render("cart", {user: (!req.session.authenticated) ? "" : req.session.user,
                        cart:cart,hotels:hotels} );
                   }
              })
            })
            
       })
       .catch(err=>{    //user signed in but doesn't have items in cart
            res.render("cart", {user: (!req.session.authenticated) ? "" : req.session.user,
            cart:"",hotels:""} );
       })
    }
    else{   //user not signed in
        res.render("cart", {user: (!req.session.authenticated) ? "" : req.session.user,
            cart:"",hotels:""} );
    }
             
}

module.exports={viewCart};
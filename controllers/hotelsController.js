const express=require('express')
const router=express.Router();
const Cart=require('../models/cartdb.js');
const Hotell = require('../models/hotel.schema.js');
const moment=require('moment');

const addToCart=async(req,res)=>{
    console.log('Entered')
    let days;
    let price;
    var date1 = moment(req.body.checkIn);
    var date2 = moment(req.body.checkOut);
    if (date1.isValid() && date2.isValid()) {
        days=date2.diff(date1, 'days')
    }
    
     var hotel=await Hotell.find({"_id":req.params.id})
     .then(result=>{
        hotel=result[0];
        console.log(hotel);
        hotel.RoomTypes.forEach((room)=>{
            if(room.Name===req.body.roomType){
               price=room.Price*req.body.rooms*days;
            }
         })
     })
     


    var hotels=[];

    var Hotel={
        id:req.params.id,
        checkIn:req.body.checkIn,
        checkOut:req.body.checkOut,
        days:days,
        children:req.body.children,
        adults:req.body.adults,
        rooms:req.body.rooms,
        roomType:req.body.roomType,
        price:price,
    }
    
    var query = { Userid: req.session.user._id};
    Cart.find(query)
    .then( async result=>{
        var crt=result[0];
       if(crt){
        hotels=result[0].Hotels;
        hotels.push(Hotel);
        
        await Cart.findByIdAndUpdate(result[0]._id, {
            Hotels: hotels
        })
        .then(result=>{
            res.redirect('back');
        })

       }
       else{
          hotels[0]=Hotel;
          if(req.session.user){
            const cart= new Cart({
                Userid:req.session.user._id,
                Hotels:hotels,
            });
            cart.save()
            .then(result=>{
                console.log("Hotel added");
                res.redirect('back')
            })
        }
       }
    })
     

  
}

module.exports={addToCart};
const express=require('express')
const router=express.Router();
const Cart=require('../models/cartdb.js');

const addToCart=async(req,res)=>{
    console.log('Entered')
    


    var hotels=[];

    var Hotel={
        id:req.params.id,
        checkIn:req.body.checkIn,
        checkOut:req.body.checkOut,
        children:req.body.children,
        adults:req.body.adults,
        rooms:req.body.rooms,
        roomType:req.body.roomType,
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
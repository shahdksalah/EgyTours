const express = require('express')
const router = express.Router()
const Hotel = require('../models/hotel.schema.js');
const Activity = require('../models/activity.schema.js');
const User = require('../models/usersdb.js');
const hotelController = require('../controllers/hotelsController.js')



router.get('/', hotelController.getHotels);

router.get('/page=:id', hotelController.getHotelPage);

router.get('/browse/:name', hotelController.getHotel1);

router.post('/:name', hotelController.postReview);

router.post('/:name/submit', hotelController.postHotelAvail);

router.post('/:name/:id', hotelController.addToCart);

router.get('/add-to-wishlist/:name', async (req, res) => {

    await User.findById(req.session.user._id)
        .then(async result => {
            await Hotel.find({ "Name": req.params.name })
                .then(async resu => {
                    var hotelWish = {
                        HotelID: resu[0]._id,
                        Name: resu[0].Name,
                        Picture: resu[0].Picture[0],
                        Location: resu[0].Location,
                        Caption: resu[0].About.substring(0,70),
                    }
                    var hotels = result.Wishlist.Hotels;
                    hotels.push(hotelWish);
                    await User.findByIdAndUpdate(req.session.user._id, {
                        Wishlist: {
                            Hotels: hotels,
                        }

                    })
                        .then(async r => {
                            await Hotel.find({"Name": req.params.name})
                            .then(async re=>{
                                await User.findById(req.session.user._id)
                                .then((rr)=>{
                                    console.log("hotel added to wishlist");
                                    res.redirect('back');
                                })
                                
                            })
                            
                        })
                })
        })
})





module.exports = router;
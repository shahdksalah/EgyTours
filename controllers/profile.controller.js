const express = require('express')
const router = express.Router()
const User = require('../models/usersdb.js');
const {body, validationResult} = require('express-validator');


const validateProfile = () => {
    return [
        body('email')
            .exists({ checkFalsy: true })
            .withMessage("Email cannot be blank")
            .bail()
            .isEmail()
            .withMessage("Email is invalid"),

        body('phonenum')
            .exists({ checkFalsy: true })
            .withMessage("Phone Number cannot be blank")
            .bail()
            .isMobilePhone()
            .withMessage("Phone number is invalid"),

        body('password')
            .if(body('password').not().isEmpty())
            .exists({ checkFalsy: true })
            .withMessage("Password is invalid")
            .isLength({ min: 6 })
            .withMessage("Password must be 6+ characters"),

        body('confpassword')
            .if(body('password').not().isEmpty())
            .exists({ checkFalsy: true })
            .withMessage("You must confirm password")
            .bail()
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Passwords do not match");
                }
                else {
                    return true;
                }
            })
    ]
}

const updateProfile = async (req,res)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const alerts = errors.array();
            console.log(alerts);
            res.render('profile', { user: (!req.session.authenticated) ? "" : req.session.user, alerts: alerts, success: "" });
        }
        else {
            if (req.body.password !== "") {
                let hashedPass;
                const saltRounds = 10;
                bcrypt
                    .hash(req.body.password, saltRounds)
                    .then(async hash => {
                        hashedPass = hash;
                        await User.findByIdAndUpdate(req.body.id, {
                            Email: req.body.email,
                            PhoneNumber: req.body.phonenum,
                            Password: hashedPass,
                            ConfPassword: hashedPass,
                        })
                            .then(() => {
                                console.log("everything updated");
                                req.session.user.Email = req.body.email;
                                req.session.user.PhoneNumber = req.body.phonenum;
                                req.session.user.Password = hashedPass;
                                req.session.user.ConfPassword = hashedPass;
                                res.render('profile', {
                                    user: (!req.session.authenticated) ? "" : req.session.user,
                                    alerts: undefined,
                                    success: "Profile Updated Sucessfully"
                                });
                            })
                    })


            }
            else {
                await User.findByIdAndUpdate(req.body.id, {
                    Email: req.body.email,
                    PhoneNumber: req.body.phonenum,
                })
                    .then(() => {
                        console.log("email and phone num updated");
                        req.session.user.Email = req.body.email;
                        req.session.user.PhoneNumber = req.body.phonenum;
                        res.render('profile', {
                            user: (!req.session.authenticated) ? "" : req.session.user,
                            alerts: undefined,
                            success: "Profile Updated Sucessfully"
                        });

                    })


            }
        }



    }
    catch (err) {
        console.log(err);
    }

}

module.exports = {validateProfile, updateProfile};
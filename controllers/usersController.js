const User = require('../models/usersdb.js');
const bcrypt = require("bcrypt");
const { body, validationResult } = require('express-validator');

const getUsers = async (req, res) => {
    var Users=await User.find();
    console.log(Users);
    res.render("users",{users:(Users==='undefined'?"":Users),userUpdated:false,msg:"", alert: undefined});
}




const updateUser = async (req, res) => {
    console.log("entered");
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const alert = errors.array();
    }
    else {
        await User.findByIdAndUpdate(req.body.id, {
            Username: req.body.upuname,
            Email: req.body.upemail,
            PhoneNumber: req.body.upnumber,
            Password: req.body.uppsw,
            ConfPassword: req.body.uppsw
        })
            .then(async result => {
                var Users = await User.find();
                res.render("users", { users: Users, userUpdated: false, msg: "User Updated Successfully" , alert: undefined});
            })
            .catch(err => {
                console.log(err);
            })
    }


}

const deleteUser = async (req, res) => {
    console.log("entered");

    await User.findByIdAndDelete(req.body.id)
        .then(async result => {
            var Users = await User.find();
            res.render("users", { users: Users, userUpdated: false, msg: "" , alert: undefined});
        })
        .catch(err => {
            console.log(err);
        })

};

const toAdmin = async (req, res) => {
    User.findByIdAndUpdate(req.params.id, { Type: 'admin' })
        .then(async result => {
            var Users = await User.find();
            res.render("users", { users: Users, userUpdated: true, msg: "" , alert: undefined});
        })
        .catch(err => {
            console.log(err);
        });
};

const toClient = async (req, res) => {
    User.findByIdAndUpdate(req.params.id, { Type: 'client' })
        .then(async result => {
            var Users = await User.find();
            res.render("users", { users: Users, userUpdated: true, msg: "" , alert: undefined});
        })
        .catch(err => {
            console.log(err);
        });
};


const validateSignUp = () => {
    return [
        body('uname')
            .exists({ checkFalsy: true })
            .withMessage('Username cannot be blank')
            .bail()
            .isLength({ min: 5 })
            .withMessage('Username should be 5+ characters'),
  
        body('email')
            .exists({ checkFalsy: true })
            .withMessage('Email cannot be empty')
            .bail()
            .isEmail()
            .withMessage('Email is invalid'),
  
        body('number')
            .exists({ checkFalsy: true })
            .withMessage('Phone number cannot be blank')
            .bail()
            .isMobilePhone()
            .withMessage('Phone number is invalid'),
  
        body('psw')
            .exists({ checkFalsy: true })
            .withMessage('Password cannot be blank')
            .bail()
            .isLength({ min: 6 })
            .withMessage('Password must be 6+ characters'),
  
        body('confpsw')
            .exists({ checkFalsy: true })
            .withMessage('Password confirmation cannot be blank')
            .bail()
            .isLength({ min: 6 })
            .withMessage('Password confirmation must be 6+ characters')
            .bail()
            .custom((value, { req }) => value === req.body.psw)
            .withMessage("Passwords do not match"),
    ]
  }

module.exports = { getUsers,updateUser, deleteUser, toAdmin, toClient, validateSignUp };
const User = require('../models').User;
const bcrypt = require('bcryptjs'); 
require('dotenv').config();
const jwt = require('jsonwebtoken');


const renderSignUp = (req, res) => {
    res.render('signup.ejs')
}
const createUser = (req, res) => {
    bcrypt.genSalt(10, (err, salt) => {
        if(err) {
            return res.send(err);
        }
        bcrypt.hash(req.body.hashedpass, salt, (err, hashedPwd) => {
            if(err) {
                return res.send(err);
            }

            req.body.hashedpass = hashedPwd;
            console.log(req.body)
            User.create(req.body)
            .then(newUser => {
                console.log(req.body)
                const token = jwt.sign (
                    {
                        id: newUser.id,
                        username: newUser.username
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "10 days"
                    }
                );
                res.cookie("jwt", token);
                res.redirect(`/`);
            })
        })
    })


}

module.exports = {
    renderSignUp,
    createUser

}
const User = require('../models').User;
const bcrypt = require('bcryptjs'); 
require('dotenv').config();
const jwt = require('jsonwebtoken');


const renderSignUp = (req, res) => {
    res.render('auth/signup.ejs')
}

const renderLogin = (req, res) => {
    res.render('auth/login.ejs')
}

const renderProfile = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(user => {
        if(user) {
            bcrypt.compare(req.body.password, user.hashedpass, (err, match) => {
                if (match) {
                    const token = jwt.sign(
                        {
                            id: user.id,
                            username: user.username
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: '5 days'
                        }
                    );

                    res.cookie("jwt", token);
                    res.redirect('/profile')
                } else {
                    res.send('Incorrect password')
                }
            })
        }
    })
    
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
    renderLogin,
    renderProfile,
    createUser
}
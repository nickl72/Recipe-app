const User = require('../models').User;
const bcrypt = require('bcryptjs'); 
require('dotenv').config();
const jwt = require('jsonwebtoken');


const renderSignUp = (req, res) => {
    res.render('signup.ejs')
}

module.exports = {
    renderSignUp
}
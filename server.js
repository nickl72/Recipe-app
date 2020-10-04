require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
const routes = require('./routes');
const methodOverride = require('method-override');

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(cookieParser());

const verifyToken = (req, res, next) => {
    let token = req.cookies.jwt;
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
        if (err || !decodedUser) {
            return res.send('jwt error');
        } else {
            req.user = decodedUser
        }
        next();
    })
}

app.use('/auth', routes.auth);
app.use('/profile', verifyToken, routes.profile)
app.use('/', routes.recipe);


app.listen(process.env.PORT, () => {
    console.log(`${process.env.PORT}`)
})

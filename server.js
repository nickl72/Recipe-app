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
app.use(express.static('public'));

const verifyToken = (req, res, next) => {
    let token = req.cookies.jwt;
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
        if (err || !decodedUser) {
            req.user = {
                username: null,
                id: null
            }
        } else {
            req.user = decodedUser;
        }
        next();
    })
}

app.use('/auth', verifyToken, routes.auth);
app.use('/profile', verifyToken, routes.profile)
app.use('/review', verifyToken, routes.review)
app.use('/index', verifyToken, routes.recipe);

app.use((req, res, next) => {
   res.redirect('/index');
});

app.listen(process.env.PORT, () => {
    console.log(`${process.env.PORT}`)
})

require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
const routes = require('./routes');

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(cookieParser());

app.use('/', routes.recipe);


app.listen(process.env.PORT, () => {
    console.log(`${process.env.PORT}`)
})

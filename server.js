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

app.use('/auth', routes.auth);
app.use('/', routes.recipe);


app.listen(process.env.PORT, () => {
    console.log(`${process.env.PORT}`)
})

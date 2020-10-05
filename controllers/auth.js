const User = require('../models').User;
const Recipe = require('../models').Recipe;
const Direction = require('../models').Direction;
const Ingredient = require('../models').Ingredient;
const RecipeIngredient = require('../models').RecipeIngredient;
const bcrypt = require('bcryptjs'); 
require('dotenv').config();
const jwt = require('jsonwebtoken');
let counter = 0;

function recipeIngredientCreate (res, reqBody) {
    RecipeIngredient.create(reqBody)
    .then(newRecipeIngredient => {
        console.log("error here"+counter);
        counter+=1;
        res.redirect('/profile');   
                              
    })
}

function ingredientCreate (res, reqBody, name=reqBody.name, quantity=reqBody.quantity, units=reqBody.units) {
    reqBody.name = name;
    reqBody.quantity = quantity;
    reqBody.units = units;
    Ingredient.create(reqBody)
    .then(async newIngredient => {
        reqBody.ingredientId = newIngredient.id
        // console.log(reqBody)
        await recipeIngredientCreate(res, reqBody);
    })
    .catch( (err) => {
        console.log(reqBody)
        Ingredient.findOne(
            {
                where: {
                    name: reqBody.name
                } 
            }
        )
        .then( async existingIngredient => {
            reqBody.ingredientId = existingIngredient.id
                  console.log("error") // console.log(reqBody)
            await recipeIngredientCreate(res, reqBody);
        })             
    })
}

function directionCreate (res, reqBody, step_number=reqBody.step_number, step=reqBody.step) {
    reqBody.step = step;
    reqBody.step_number = step_number;
    Direction.create(reqBody)
    .then(newDirections => {
        // console.log(req.body)
        return;
    })

}


const renderSignUp = (req, res) => {
    res.render('auth/signup.ejs')
}

const renderLogin = (req, res) => {
    res.render('auth/login.ejs')
}

const renderNewRecipe = (req, res) => {
    res.render('auth/newrecipe.ejs')
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
            User.create(req.body)
            .then(newUser => {
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

const createNewRecipe = (req, res) => {
    Recipe.create(req.body)
    .then( async newRecipe => {
        console.log(req.body)
        req.body.recipeId = newRecipe.id
        const reqBody = {};
        Object.assign(reqBody, req.body)
        if(typeof(req.body.step)==="object") {
            for( let j=0; j < req.body.step.length; j++) {
                directionCreate(res, reqBody, req.body.step_number[j], req.body.step[j]);
            }
        } else {
            directionCreate(res, req.body);
        }
        
        if(typeof(req.body.name)==="object") {
            for( let i=0; i < req.body.name.length; i++) {
                Object.assign(reqBody, req.body)
                await ingredientCreate(res, reqBody, req.body.name[i], req.body.quantity[i], req.body.units[i]);                    
            }
        } else {
            ingredientCreate(res, reqBody);
        }
    })
}

module.exports = {
    renderSignUp,
    renderLogin,
    renderProfile,
    createUser,
    renderNewRecipe,
    createNewRecipe
}
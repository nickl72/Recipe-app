const User = require('../models').User;
const Recipe = require('../models').Recipe;
const Direction = require('../models').Direction;
const Ingredient = require('../models').Ingredient;
const RecipeIngredient = require('../models').RecipeIngredient;
const bcrypt = require('bcryptjs'); 
require('dotenv').config();
const jwt = require('jsonwebtoken');
let counter = 0;

async function recipeIngredientCreate(res, reqBody) {
    await RecipeIngredient.create(reqBody)
    .then(newRecipeIngredient => {
        console.log("error here"+counter);
        counter+=1;
        // res.redirect('/profile');                       
    })
}

async function ingredientCreate (res, reqBody, name=reqBody.name, quantity=reqBody.quantity, units=reqBody.units) {
    reqBody.name = name;
    reqBody.quantity = quantity;
    reqBody.units = units;
    // console.log("at function call");
    // console.log(reqBody);
    await Ingredient.create(reqBody)
    .then(newIngredient => {
        // console.log("in then");
        // console.log(reqBody);
        reqBody.ingredientId = newIngredient.id
        recipeIngredientCreate(res, reqBody);
        // return new Promise((resolve,reject) => {
        //     resolve();
        // })        
    })
    .catch( async (err) => {
        await Ingredient.findOne(
            {
                where: {
                    name: reqBody.name
                } 
            }
        )
        .then( async existingIngredient => {
            reqBody.ingredientId = existingIngredient.id
            console.log("in catch");
            console.log(reqBody)
            await recipeIngredientCreate(res, reqBody);
            return new Promise((resolve,reject) => {
                resolve();
            })           
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
    if(req.query.edit==='false') {
        res.render('auth/newrecipe.ejs' ,{
            edit: req.query.edit,
            recipe: {}
        })
    } else if( req.query.edit==='true') {
        Recipe.findByPk(parseInt(req.query.recipeid), {
            include: [
            {
                model: Ingredient,
                include: {
                    model: RecipeIngredient,
                    where: {recipeId: parseInt(req.query.recipeid)}
                }
            },
            {
                model: Direction
            }]
        })
        .then (editRecipe => {
            editRecipe.Ingredients.forEach(ingredient => {
                console.log(ingredient.RecipeIngredients)
            })
            res.render('auth/newrecipe.ejs' ,{
                edit: req.query.edit,
                recipe: editRecipe
            })
        })

    } else {
        res.return("error");
    }

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
    console.log(req.body)
    Recipe.create(req.body)
    .then( async newRecipe => {
        req.body.recipeId = newRecipe.id
        const reqBody = {};
        Object.assign(reqBody, req.body)
        if(typeof(req.body.step)==="object") {
            for( let j=0; j < req.body.step.length; j++) {
                await directionCreate(res, reqBody, req.body.step_number[j], req.body.step[j]);
            }
        } else {
            await directionCreate(res, req.body);
        }
        
        if(typeof(req.body.name)==="object") {
            for( let i=0; i < req.body.name.length; i++) {
                Object.assign(reqBody, req.body)
                await ingredientCreate(res, reqBody, req.body.name[i], req.body.quantity[i], req.body.units[i]);                    
            }
        } else {
            await ingredientCreate(res, reqBody);
        }
        res.redirect('/profile');
    })
}

const editRecipe = (req, res) => {
    // console.log(req.body)
    Recipe.update(req.body, {
        where: {id: req.params.index},
        returning: true
    })
    .then((updateRecipe) => {
        if(typeof(req.body.step)!=="object") {
            req.body.step = [req.body.step];
            console.log(`${req.body.step} made it to step`)
        } 
        if(typeof(req.body.step_number)!=="object") {
            req.body.step_number = [req.body.step_number]
            console.log(`${req.body.step_number} made it to step_number`)
        }
        if(typeof(req.body.directionId)!=="object") {
            req.body.directionId = [req.body.directionId]
            console.log(`${req.body.directionId} made it to directionId`)
        }
        console.log(req.body.directionId)
        req.body.step.forEach(async (step, i) => {
            console.log('In the for each')
        const temp = {step: step, step_number: req.body.step_number[i], recipeId: req.params.index}
        if(req.body.directionId.length > i) {
            temp.directionId = req.body.directionId[i]
        }
            console.log(req.body.directionId)
            console.log(req.body.directionId[i])
            console.log("temp= ",temp.directionId)
                await Direction.update(temp, {
                    where: {id: temp.directionId}
                })
                .then((updatedDirections) => {
                    console.log("Made it through the update")
                    return 
                })
                .catch( async (err)=> {
                    console.log("Made it to the catch")
                    await Direction.create(temp)
                    .then((createdDirection)=>{
                        return ;
                    })
                })
        })
        console.log('made it to the ingredient foreach')
        if(typeof(req.body.name)==="string") {
            req.body.name = [req.body.name];
            req.body.quantity = [req.body.quantity];
            req.body.units = [req.body.units];
            req.body.ingredientId = [req.body.ingredientId];
        }
        req.body.name.forEach(async (name, i) => {
        console.log('made it in the forEach')
        const tempIn = {name: name, quantity: req.body.quantity[i], units: req.body.units[i],
        recipeId: req.params.index, ingredientId: req.body.ingredientId[i]}
            await RecipeIngredient.update(tempIn, {
                where: {recipeId: tempIn.recipeId,
                        ingredientId: tempIn.ingredientId
                    }
            })
            .then((updatedRecipeIngredients) => {
                console.log(updatedRecipeIngredients);
                // return
                res.redirect(`/${req.params.index}`)
            })
            .catch(async (err)=> {
                await Ingredient.findOne(
                    {
                        where: {
                            name: tempIn.name
                        } 
                    }
                )
                .then(async foundIngredient => {
                    tempIn.ingredientId = foundIngredient.id
                    await RecipeIngredient.create(tempIn)
                    .then( (foundIngredient)=> {
                        return
                        // res.redirect(`/${req.params.index}`)
                    })

                })
                .catch(async (err)=> {
                    console.log("Made it here to the new ingredient")
                    Ingredient.create(tempIn)
                    .then(async foundIngredient => {
                        tempIn.ingredientId = foundIngredient.id
                        await RecipeIngredient.create(tempIn)
                        .then( (foundIngredient)=> {
                            return
   
                        })
                    })
                })
            })
        })
        res.redirect(`/${req.params.index}`)
    })
}

module.exports = {
    renderSignUp,
    renderLogin,
    renderProfile,
    createUser,
    renderNewRecipe,
    createNewRecipe,
    editRecipe
}
const User = require('../models').User;
const Recipe = require('../models').Recipe;
const Direction = require('../models').Direction;
const Ingredient = require('../models').Ingredient;
const RecipeIngredient = require('../models').RecipeIngredient;
const bcrypt = require('bcryptjs'); 
require('dotenv').config();
const jwt = require('jsonwebtoken');
let counter = 0;
const axios = require('axios').default;

async function recipeIngredientCreate(res, reqBody) {
    await RecipeIngredient.create(reqBody)
    .then(newRecipeIngredient => {
        counter+=1;
        // res.redirect('/profile');                       
    })
}

async function ingredientCreate (res, reqBody, name=reqBody.name, quantity=reqBody.quantity, units=reqBody.units) {
    reqBody.name = name;
    reqBody.quantity = quantity;
    reqBody.units = units;
    await Ingredient.create(reqBody)
    .then(newIngredient => {
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
        return;
    })

}


const renderSignUp = (req, res) => {
    res.render('auth/signup.ejs')
}

const renderLogin = (req, res) => {
    if (!req.query.login) {
        req.query.login = false
    }

    res.render('auth/login.ejs',{
        loginFailure: req.query.login
    })
}

const renderNewRecipe = (req, res) => {
    if(req.query.edit==='false'&&req.query.random!=="true") {
        res.render('auth/newrecipe.ejs' ,{
            edit: req.query.edit,
            user: req.user,
            recipe: {}
        })
    } else if( req.query.edit==='true'&&req.query.random!=="true") {
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
            })
            res.render('auth/newrecipe.ejs' ,{
                edit: req.query.edit,
                recipe: editRecipe,
                user: req.user
            })
        })

    } else if(req.query.edit==='false'&&req.query.random==="true") {
        const endPoint = "https://www.themealdb.com/api/json/v1/1/random.php";
        axios({url: endPoint, method: 'get'})
        .then((response) => {
            const rex = Object.entries(response.data.meals[0]);
            rex.splice(0,9)
            rex.splice(40,3)
            let name=[];
            let ingredients=[];
            console.log(rex)
            rex.forEach((ing, count) => {
                if((rex[count][1]!='' || rex[count][1])&&count<20) {
                    name.push(rex[count][1]) 
                }else if((rex[count][1]!='' || rex[count][1])&&count>=20){
                    ingredients.push(rex[count][1])
                }
            })
            console.log(ingredients)
            let quantity=[];
            let units=[];
            ingredients.forEach((measurment, count) => {
                if(measurment===null){
                    return
                } 
                let submeasure = measurment.split('')
                let unitstr='';
                let numstr='';
                if(submeasure.length>1) {
                    submeasure.forEach((sub, counter) => {
                    if(parseInt(sub) && (submeasure[counter+1]==='/' || submeasure[counter+1]==='.')) {
                        if(submeasure[counter+1]==='/') {
                            let fraction = parseInt(sub)/parseInt(submeasure[counter+2])
                            numstr+=fraction 
                        } else if (submeasure[counter-1]==='.' && parseInt(submeasure[counter+1])!="NaN") {
                            numstr+=(parseInt(sub)/10);
                        }
                    } else if (parseInt(sub) && parseInt(submeasure[counter+1])!="NaN" && (submeasure[counter-1]==='/' || submeasure[counter-1]==='.')) {
                        numstr+=parseInt(sub)
                    } else if(parseInt(sub) && parseInt(submeasure[counter+1])!="NaN"){
                        numstr+=parseInt(sub)
                    } else if(parseInt(sub)==0) {
                        numstr=numstr*10;
                    } else if (sub==='/' || sub==='.' || sub===' ') {

                    } else {
                        unitstr+=sub
                    }
                })
                    quantity.push(numstr)
                    units.push(unitstr);
                }
            })
            let quantitys = quantity.map(dummy => {
                if(dummy==='') {
                    return dummy=1;
                }
                return dummy;
            })
            let unitsSifted = units.map(dummy => {
                if(dummy==='') {
                    return dummy="each";
                }
                return dummy;
            })

            let step = response.data.meals[0].strInstructions.split('.')
            step.pop();//removes last '' that alwasy appears
            let randomMeal = {title: response.data.meals[0].strMeal, 
                image: response.data.meals[0].strMealThumb, 
                name: name, 
                quantity: quantitys,
                units: unitsSifted,
                step: step
            }
            console.log(randomMeal)
            res.render('auth/randomrecipe.ejs' ,{
                edit: "random",
                recipe: randomMeal,
                user: req.user
            })
        })
    }else {
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
        if(user !== null ) {
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
                    res.redirect('/auth/login?login=fail');
                }
            })
        } else {
            res.redirect('/auth/login?login=fail');
        }
        
    })
    .catch((err) => {
        res.redirect('/auth/login');
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
                res.redirect(`/profile`);
            })
        })
    })
}

const createNewRecipe = (req, res) => {
    console.log(req.body);
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
    Recipe.update(req.body, {
        where: {id: req.params.index},
        returning: true
    })
    .then(async (updateRecipe) => {
        if(typeof(req.body.step)!=="object") {
            req.body.step = [req.body.step];
        } 
        if(typeof(req.body.step_number)!=="object") {
            req.body.step_number = [req.body.step_number]
        }
        if(typeof(req.body.directionId)!=="object") {
            req.body.directionId = [req.body.directionId]
        }


        console.log('\n\n\nThis Runs First\n\n\n')
        req.body.step.forEach(async (step, i) => {
        const temp = {step: step, step_number: req.body.step_number[i], recipeId: req.params.index}
        if(req.body.directionId.length > i) {
            temp.directionId = req.body.directionId[i]
        }
                await Direction.update(temp, {
                    where: {id: temp.directionId}
                })
                .then((updatedDirections) => {
                    return 
                })
                .catch( async (err)=> {
                    await Direction.create(temp)
                    .then((createdDirection)=>{
                        return ;
                    })
                })
                console.log('\nThis is the end of the steps loop\n')
        })
        console.log('\n\nThis is after the steps for loop\n\n')

        if(typeof(req.body.name)==="string") {
            req.body.name = [req.body.name];
            req.body.quantity = [req.body.quantity];
            req.body.units = [req.body.units];
            req.body.ingredientId = [req.body.ingredientId];
        }



        req.body.name.forEach(async (name, i) => {
            console.log('\n\nthis is when the ingredients loops starts\n\n')
        const tempIn = {name: name, quantity: req.body.quantity[i], units: req.body.units[i],
        recipeId: req.params.index, ingredientId: req.body.ingredientId[i]}
            await RecipeIngredient.update(tempIn, {
                where: {recipeId: tempIn.recipeId,
                        ingredientId: tempIn.ingredientId
                    }
            })
            .then((updatedRecipeIngredients) => {
                return
                // res.redirect(`/index/${req.params.index}`)
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
                        // res.redirect(`/index/${req.params.index}`)
                    })

                })
                .catch(async (err)=> {
                    await Ingredient.create(tempIn)
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
        console.log('\n\nthis is when we should redirect\n\n')
        res.redirect(`/index/${req.params.index}`)
    })
}
const logout = (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/auth/login');
}
module.exports = {
    renderSignUp,
    renderLogin,
    renderProfile,
    createUser,
    renderNewRecipe,
    createNewRecipe,
    SaveRecipe,
    editRecipe,
    logout
}


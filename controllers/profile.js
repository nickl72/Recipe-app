const User = require('../models').User;
const Recipe = require('../models').Recipe;

const renderMyProfile = (req,res) => {
    if (req.user.username === null) {
        res.redirect('/auth/login');
    }
    
    User.findByPk(req.user.id, {
        attributes: ['name', 'id', 'email'],
        include: [{
            association: 'CreatedRecipes',
            model: Recipe,
            attributes: ['title', 'image', 'id']
        },
    {
        association: 'savedRecipes',
        model: Recipe,
        attributes: ['title', 'image', 'id']
    }]
    }
        )
    .then(user => {
    res.render('profile/profile.ejs', {
        user: user
    })
    })
    .catch(() => {
        res.redirect('/auth/login');
    })
}

const renderProfile = (req, res) => {
    User.findOne({
        where: {
            username: req.params.username
        },
        attributes: ['name', 'username'],
        include: [{
            association: 'CreatedRecipes',
            model: Recipe,
            attributes: ['title', 'image', 'id']
        },
    {
        association: 'savedRecipes',
        model: Recipe,
        attributes: ['title', 'image', 'id']
    }]
    })
        .then(foundUser => {
            res.render('profile/friend.ejs', {
                user: foundUser
            })
        })
        .catch((err) => {
            res.redirect('/index')
        })
}


module.exports = {
    renderMyProfile,
    renderProfile
}
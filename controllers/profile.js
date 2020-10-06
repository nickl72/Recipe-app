const User = require('../models').User;
const Recipe = require('../models').Recipe;

const renderMyProfile = (req,res) => {
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
}


module.exports = {
    renderMyProfile,
    renderProfile
}
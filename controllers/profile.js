const User = require('../models').User;
const Recipe = require('../models').Recipe;

const renderProfile = (req,res) => {
    User.findByPk(req.user.id, {
        attributes: ['name', 'id', 'email'],
        include: [{
            association: 'CreatedRecipes',
            model: Recipe,
            attributes: ['title', 'image']
        },
    {
        association: 'savedRecipes',
        model: Recipe,
        attributes: ['title', 'image']
    }]
    }
        )
    .then(user => {
    res.render('profile/profile.ejs', {
        user: user
    })
    })
}

module.exports = {
    renderProfile
}
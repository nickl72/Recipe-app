const User = require('../models').User;

const renderProfile = (req,res) => {
    User.findByPk(req.user.id, {
        attributes: ['name', 'id', 'email']
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
const User = require('../models').User;

const renderProfile = (req, res) => {
    res.render('profile/profile.ejs', {
        name: 'Test'
    })
}
module.exports = {
    renderProfile
}
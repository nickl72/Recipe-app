const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/signup', ctrl.auth.renderSignUp);
router.get('/login', ctrl.auth.renderLogin);
router.get('/profile', ctrl.auth.renderProfile);
router.get('/new', ctrl.auth.renderNewRecipe);
router.get('/logout', ctrl.auth.logout);


router.post('/createUser', ctrl.auth.createUser);
router.post('/newRecipe', ctrl.auth.createNewRecipe);

router.put('/:index', ctrl.auth.editRecipe)

module.exports = router;
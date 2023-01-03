const express = require('express')
const authController = require('../controllers/auth.controller')

const { validateSignup, validateLogin } = require('../validation/validate')

const authRouter = express.Router()

const passport = require('passport')
require('../auth/passport')


// authRouter.post('/login', validateLogin, passport.authenticate('login', { session: false }), authController.login)
authRouter.post('/login', authController.login)
authRouter.post('/signup', validateSignup, passport.authenticate('signup', { session: false }), authController.signup)


authRouter.get('/signup', (req, res, next) => {
    res.render('signup')
})

module.exports = authRouter
const express = require('express')
const authController = require('../controllers/auth.controller')

const { validateSignup, validateLogin } = require('../validation/validate')

const authRouter = express.Router()

authRouter.post('/login',validateLogin, authController.login)

authRouter.post('/logout', authController.logout)

authRouter.post('/signup', validateSignup, authController.signup)

authRouter.get('/signup', (req, res, next) => {
    res.render('signup', {
        docTitle: 'Signup',
        errorMessage: req.flash('error')
    })
})

authRouter.get('/reset', (req, res, next) => {
    res.render('reset', {
        docTitle: 'Reset Password',
        errorMessage: req.flash('error')
    })
})

authRouter.post('/reset', authController.reset)

module.exports = authRouter
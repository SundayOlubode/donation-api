const express = require('express')
const authController = require('../controllers/auth.controller')

const { validateSignup, validateLogin } = require('../validation/validate')

const authRouter = express.Router()

authRouter.post('/login', authController.login)

authRouter.post('/logout', authController.logout)

authRouter.post('/signup', validateSignup, authController.signup)

authRouter.get('/signup', (req, res, next) => {
    res.render('signup')
})

module.exports = authRouter
const express = require('express')
const adminController = require('../controllers/admin.controller')
const adminModel = require('../models/admin.model')

const { validateAdminLogin, validateAdminSignup } = require('../validation/validate')

const adminRoute = express.Router()

adminRoute.get('/login', (req, res, next) => {
    res.render('admin', {
        errorMessage: req.flash('error'),
        path: '/login',
        docTitle: 'Admin Login'
    })
})

adminRoute.get('/signup',  (req, res, next) => {
    res.render('admin', {
        errorMessage: req.flash('error'),
        path: '/signup',
        docTitle: 'Admin Signup'
    })
})

adminRoute.post('/login', validateAdminLogin, adminController.login)
adminRoute.post('/signup', validateAdminSignup, adminController.signup)

adminRoute.use((req, res, next) => {
    if (req.session.admin) {
        return next();
    }
    req.flash('error', 'Please Sign In')
    res.redirect('/admin/login')
})

adminRoute.get('/profile', adminController.getProfile)

adminRoute.post('/verify', adminController.verifyPayment)


module.exports = adminRoute
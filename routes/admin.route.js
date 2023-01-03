const express = require('express')
const admin = require('../controllers/admin.controller')

const adminRoute = express.Router()

adminRoute
    .route('/profile').get(admin.getAdminProfile)
adminRoute
    .route('/verify').post(admin.verifyPayment)


module.exports = adminRoute
const express = require('express')
const {
    getProfile,
    notifyAdmin
} = require('../controllers/donor.controller')

const donorRoute = express.Router()

//Validator
const { validateDonation } = require('../validation/validate')


donorRoute.get('/profile', getProfile)
donorRoute.post('/notify', validateDonation, notifyAdmin)

module.exports = { donorRoute }
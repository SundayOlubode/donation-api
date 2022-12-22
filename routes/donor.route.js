const express = require('express')
const {
    getProfile,
    notifyAdmin

} = require('../controllers/donor.controller')

//Validator
const { validateDonation } = require('../validation/validate')


const donorRoute = express.Router()

donorRoute.get('/profile', getProfile)
donorRoute.post('/notify', validateDonation, notifyAdmin)

module.exports = { donorRoute }
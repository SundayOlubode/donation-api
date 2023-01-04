const express = require('express')
const {
    getProfile,
    notifyAdmin
} = require('../controllers/donor.controller')
const donationModel = require('../models/user.model')
const donorRoute = express.Router()

//Validator
const { validateDonation } = require('../validation/validate')

donorRoute.get('/all', (req, res, next) => {
    donationModel.findById(req.user._id)
        .populate('donation')
        .then((donors) => {
            res.status(200).json({
                donors
            })
        }).catch((err) => {
            res.status(401).json({message: err.message})
        })
})

donorRoute.get('/profile', getProfile)
donorRoute.post('/notify', validateDonation, notifyAdmin)

module.exports = donorRoute 
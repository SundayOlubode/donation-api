const jwt = require('jsonwebtoken')
require('dotenv').config()
const donorModel = require('../models/user.model')
require('mongoose')


function generateJWT(user) {
    try {
        const payload = {
            _id: user._id,
            email: user.email,
            password: user.password,
            firstname: user.firstname,
            lastname: user.lastname
        }

        const token = jwt.sign(payload, 'shhh_secret')
        return token;

    } catch (error) { return error }
}

module.exports = {generateJWT
}
const { validate } = require('../models/admin.model');
const donorModel = require('../models/user.model')
const crypto = require('crypto')

exports.signup = (req, res) => {
    const user = req.body
    donorModel.create(user)
        .then((user) => {
            res.redirect('/')
        }).catch((error) => {
            console.log(error);
            res.redirect('/auth/signup')
        })
}

exports.login = async (req, res) => {
    const { email, password } = req.body

    donorModel.findOne({ email })
        .then(async (user) => {
            user.isValidPassword(password)
                .then((validate) => {
                    if (validate) {
                        req.session.user = user
                        return req.session.save((err) => {
                            if (err) console.log('Req session error: ', err);
                            res.redirect('/donor/profile')
                        })
                    }
                    req.flash('error', 'Incorrect Username or Password!')
                    res.redirect('/')
                }).catch(() => {
                    res.redirect('/')
                })
        }).catch((error) => {
            console.log(error);
            req.flash('error', 'User not found, Kindly Sign Up')
            res.redirect('/')
        })
}

exports.logout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) console.log(err);
        res.redirect('/')
    })
}

exports.reset = (req, res, next) => {

}
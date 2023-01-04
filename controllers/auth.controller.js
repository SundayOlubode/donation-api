const donorModel = require('../models/user.model')

exports.signup = (req, res) => {
    const user = req.body
    console.log(user);
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
                    if (!validate) {
                        res.redirect('/')
                    }
                }).catch((error) => {
                    console.log(error);
                    res.redirect('/')
                })

            req.session.user = user
            req.session.isLoggedIn = true

            return req.session.save((err) => {
                if (err) console.log('Req session error: ', err);
                res.redirect('/donor/profile')
            })
        }).catch((error) => {
            console.log(error);
            res.redirect('/')
        })
}

exports.logout = (req, res, next) => {
    req.session.destroy((err) => {
        if(err) console.log(err);
        res.redirect('/')
    })
}

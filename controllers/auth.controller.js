const donorModel = require('../models/user.model')
const { generateJWT } = require('../controllers/utils.controller')

exports.signup = (req, res) => {
    const { user } = req
    console.log(user);
    res.redirect(307, '/profile')
    // res.status(200).render('donorProfile', {
    //     donor: user,
    //     docTitle: user.firstname + user.firstname
    // })
}

exports.login = async (req, res) => {
    const { email, password } = req.body

    console.log('Email: ', email);

    donorModel.findOne({ email })
        .then(async (user) => {

            // console.log('User: ', user);

            const validate = await user.isValidPassword(password);
            if (!validate) { throw new Error('User not found!') }

            req.session.user = user

            const token = generateJWT(user)
            req.session.token = token

            return req.session.save((err) => {
                if(err) console.log('Req session error: ',err);
                // res.setHeader('Authorization', `Bearer ${token}`);
                res.redirect('/donor/profile')
            })
        }).catch((error) => {
            console.log(error);
            res.redirect('/auth/login')
        })
}

exports.register = (req, res) => {
    res.status(200).render('signup')
}

exports.profile = (req, res) => {
    const { user } = req
    console.log(user);
    // console.log(req);
    res.status(200).render('donorProfile', {
        donor: user,
        docTitle: user.firstname + user.firstname
    })
}
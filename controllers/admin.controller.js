const adminModel = require('../models/admin.model')
const donationModel = require('../models/donation.model')


exports.getProfile = (req, res, next) => {
    console.log('Here now!');

    const admin = req.session.admin

    console.log('Admin', admin);

    donationModel
        .find({ verified: false })
        .populate({ path: 'donor' })
        .then((donations) => {
            console.log(donations);
            res.render('adminProfile', {
                donations: donations,
                docTitle: 'Admin | Profile'
            })
        }).catch((error) => {
            res.redirect('/admin/login')
        })
}

exports.verifyPayment = (req, res, next) => {
    const donationId = req.query.id

    donationModel.findByIdAndUpdate(donationId, { verified: true })
        .then((donatiion) => {
            res.status(200).json({
                message: 'Verified!'
            })
        }).catch((error) => {
            error.httpStatusCode = 500
            next(error)
        })
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body

    console.log('Details: ', email, password);

    adminModel.findOne({ email })
        .then(async (admin) => {
            admin.isValidPassword(password)
                .then((validate) => {
                    if (validate) {
                        req.session.admin = admin
                        return req.session.save((err) => {
                            if (err) console.log('Req session error: ', err);
                            res.redirect('/admin/profile')
                        })
                    }
                    req.flash('error', 'Incorrect Username or Password!')
                    res.redirect('/admin/login')

                }).catch(() => {
                    res.redirect('/admin/login')
                })
        }).catch((error) => {
            console.log(error);
            req.flash('error', 'Admin not found, Kindly Sign Up')
            res.redirect('/admin/login')
        })
}

exports.signup = (req, res, next) => {
    const body = req.body

    adminModel.create(body)
        .then((admin) => {
            req.flash('adminSignup', 'You are nor an Admin /n Kindly Log in')
            res.redirect('/admin/login')
        })
}
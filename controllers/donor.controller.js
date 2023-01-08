const userModel = require('../models/user.model')
const donationModel = require('../models/donation.model')
const donorModel = require('../models/user.model')

exports.getProfile = (req, res, next) => {

    userModel.findById(req.session.user._id)
        .populate('donation')
        .then((user) => {
            const donations = user.donation
            res.render('donor/profile', {
                donor: user,
                donations: donations,
                docTitle: 'Profile'
            })

        }).catch((error) => {
            error.httpStatusCode = 404
            next(error)
        })

}

exports.notifyAdmin = (req, res, next) => {

    const { amount, date } = req.body
    donor = req.session.user._id

    donationModel.create({ amount: amount, date: date, donor: donor })
        .then(async (donation) => {

            const { _id } = donation._id

            const donor = await donorModel.findById(req.user._id)
            await donor.updateOne({ $push: { donation: { _id } } })

            // TODO: Nodemailer Notify Admin

            res.redirect('/donor/profile')
        }).catch((error) => {
            console.log('Here: ', error)
            error.httpStatusCode = 500
            next(error)
        })
}

exports.signup = (req, res) => {
    const { user } = req
    console.log(user);
    res.redirect(307, '/profile')
}

exports.login = (req, res) => {
    const { user } = req
    res.render('donor/profile', {
            donor: user.user
        })
}

exports.register = (req, res) => {
    res.status(200).render('signup')
}

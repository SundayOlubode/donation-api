const userModel = require('../models/user.model')
const donationModel = require('../models/donation.model')
const donorModel = require('../models/user.model')

exports.getProfile = (req, res, next) => {
    userModel.findById(req.user._id)
        .populate('donations.donation')
        .then((user) => {
            if (!user) { throw new Error('User not found!') }
            // res.status(200).json({ User: user })
            res.render('donorProfile', {
                donor: user,
                docTitle: user.firstname + ' ' + user.lastname
            })

        }).catch((error) => {
            error.httpStatusCode = 404
            next(error)
        })
}

exports.notifyAdmin = (req, res, next) => {

    const donationBody = req.body
    donationBody.donor = req.user._id

    donationModel.create(donationBody)
        .then(async (donation) => {

            const { _id } = donation._id

            const donor = await donorModel.findById(req.user._id)
            await donor.updateOne({ $push: { donations: { _id } } })

            // TODO: Nodemailer Notify Admin

            res.status(200).json({
                status: 'Success!',
                message: 'Kindly wait while admin verify your donation. Thanks!'
            })
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
    // res.status(200).render('donorProfile', {
    //     donor: user,
    //     docTitle: user.firstname + user.firstname
    // })
}

exports.login = (req, res) => {
    const { user } = req
    // console.log(req);
    res.setHeader('Authorization', `Bearer ${req.user.token}`)
        .render('donorProfile', {
            donor: user.user,
            docTitle: user.user.firstname + user.user.firstname
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
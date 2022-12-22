const userModel = require('../models/user.model')
const donationModel = require('../models/donation.model')
const donorModel = require('../models/user.model')

exports.getProfile = (req, res, next) => {
    userModel.findById(req.user._id)
        // .populate({path : '_id.donation', model: 'donorModel', populate: {path: '_id.donation'}})
        .then((user) => {
            if (!user) { throw new Error('User not found!') }
            res.status(200).json({ User: user })
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
    res.status(200).render('signup')
}

exports.login = (req, res) => {
    const { user } = req
    res.status(200).render('donorProfile', {
        donor: user.user,
        docTitle: user.user.firstname + ' Profile'
    })
}
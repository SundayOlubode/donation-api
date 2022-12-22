const adminModel = require('../models/admin.model')
const donationModel = require('../models/donation.model')


exports.getAdminProfile = (req, res, next) => {
    const { _id } = req.query
    adminModel.findById(_id)
        .then((admin) => {
            donationModel.find({verified : false}).populate({path: 'donor'})
                .then((donations) => {
                    res.status(200).json({
                        admin,
                        donations
                    })
                }).catch((error) => {
                    error.httpStatusCode = 500
                    next(error)
                })
        })

}

exports.verifyPayment = (req, res, next) => {
    const donationId = req.query.id

    donationModel.findByIdAndUpdate(donationId, {verified: true})
        .then((donatiion) => {
            res.status(200).json({
                message: 'Verified!'
            })
        }).catch((error) => {
            error.httpStatusCode = 500
            next(error)
        })
}


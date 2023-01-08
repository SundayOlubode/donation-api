const adminModel = require('../models/admin.model')
const donationModel = require('../models/donation.model')
const breakdownModel = require('../models/breakdown.model')

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

exports.getProfile = (req, res, next) => {
    const admin = req.session.admin

    donationModel
        .find({ verified: 'Pending' })
        .populate({ path: 'donor', select: 'firstname lastname' })
        .then((donations) => {
            breakdownModel
                .find()
                .then((breakdown) => {
                    let pendingDonations;
                    if (donations.length < 1) {
                        pendingDonation = null
                    }
                    pendingDonations = donations
                    res.render('admin/profile', {
                        errorMessage: req.flash('error'),
                        verifySuccess: req.flash('success'),
                        donations: pendingDonations,
                        docTitle: 'Admin | Profile',
                        path: '/breakdown',
                        breakdown: breakdown[0]
                    })
                })
        }).catch((error) => {
            res.redirect('/admin/login')
        })
}

exports.verifyPayment = (req, res, next) => {
    const donationId = req.params.id
    donationModel.findByIdAndUpdate(donationId, { verified: 'Verified' })
        .then((donation) => {
            breakdownModel
                .find()
                .then(async (breakdown) => {

                    breakdown[0].total += Number(donation.amount)
                    await breakdown[0].save()

                    req.flash('success', 'Verification Succesful!');
                    res.redirect('/admin/verify')
                }).catch(() => {
                    req.flash('error', 'Server Error, Please Try Again!');
                    res.redirect('/admin/verify')
                })
            //TODO: Notify Donor
        }).catch((error) => {
            req.flash('error', 'Verification failed, Try Again!')
            res.redirect('/admin/verify')
        })
}

exports.disburse = (req, res, next) => {
    const disbursedAmount = req.body.disbursed
    breakdownModel.findOne()
        .then(async (breakdown) => {
            breakdown.disbursed += Number(disbursedAmount)
            breakdown.balance = Number(breakdown.total) - Number(breakdown.disbursed)
            await breakdown.save()
            req.flash('success', 'Update Successfull!')
            res.redirect('/admin/profile')
        }).catch(() => {
            req.flash('error', 'Error, Please try again!')
            res.redirect('/admin/profile')
        })
}

exports.getVerify = (req, res, next) => {
    donationModel
        .find({ verified: 'Pending' })
        .sort({ date: -1 })
        .populate({ path: 'donor', select: 'firstname lastname' })
        .then((donations) => {
            let pendingDonations;
            if (donations.length < 1) {
                pendingDonation = null
            }
            pendingDonations = donations
            res.render('admin/verify', {
                errorMessage: req.flash('error'),
                verifySuccess: req.flash('success'),
                donations: pendingDonations,
                docTitle: 'Admin | Verify',
                path: '/verify'
            })

        }).catch((error) => {
            res.redirect('/admin/profile')
        })
}

exports.getDonations = (req, res, next) => {
    donationModel
        .find()
        .sort({ date: -1 })
        .populate({ path: 'donor', select: 'firstname lastname' })
        .then((donations) => {
            res.render('admin/donations', {
                errorMessage: req.flash('error'),
                verifySuccess: req.flash('success'),
                donations: donations,
                docTitle: 'Admin | Donations',
                path: '/verify'
            })
        }).catch((error) => {
            req.flash('error', 'Can\'t load donations. Try Again!')
            res.redirect('/admin/profile')
        })
}

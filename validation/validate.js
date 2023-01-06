const joi = require('joi')

const validator = (schema) => (req, res, next) => {
    const payload = req.body

    schema.validateAsync(payload)
        .then(() => {
            next()
        }).catch((error) => {
            req.flash('error', error.message )
            if(schema === userSignupSchema) res.redirect('/auth/signup')
            else if(schema === adminSignup) res.redirect('/admin/signup')
            else if(schema === adminLogin) res.redirect('/admin/login')
            else {
                res.redirect('/')
            }          
        })
}

const adminSignup = joi.object({
    email: joi.string()
        .email()
        .required(),
    password: joi.string()
        .min(4)
        .required(),
    firstname: joi.string()
        .min(2)
        .max(20)
        .required(),
    lastname: joi.string()
        .min(3)
        .max(30)
        .required()
})

const adminLogin = joi.object({
    email: joi.string()
        .email()
        .required(),
    password: joi.string()
        .min(4)
        .required()
})



// Users(Donor)

const userSignupSchema = joi.object({
    email: joi.string()
        .email()
        .required(),
    password: joi.string()
        .min(4)
        .required(),
    confirmPassword: joi.string()
        .min(4)
        .required(),
    firstname: joi.string()
        .min(2)
        .max(20)
        .required(),
    lastname: joi.string()
        .min(3)
        .max(30)
        .required()
})

const userLoginSchema = joi.object({
    email: joi.string()
        .email()
        .required(),
    password: joi.string()
        .min(4)
        .required(),
})


const donationSchema = joi.object({
    // TODO donationschema
    amount: joi.number()
        .required(),
    date: joi.date()
})



exports.validateAdminSignup = validator(adminSignup)
exports.validateAdminLogin = validator(adminLogin)
exports.validateSignup = validator(userSignupSchema)
exports.validateLogin = validator(userLoginSchema)
exports.validateDonation = validator(donationSchema)
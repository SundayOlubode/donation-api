const joi = require('joi')

const validator = (schema) => (req, res, next) => {
    const payload = req.body

    schema.validateAsync(payload, { abortEarly: false })
        .then(() => {
            next()
        }).catch((error) => {
            next(error)
        })
}

const adminSchema = joi.object({
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



exports.admin = validator(adminSchema)
exports.validateSignup = validator(userSignupSchema)
exports.validateLogin = validator(userLoginSchema)
exports.validateDonation = validator(donationSchema)
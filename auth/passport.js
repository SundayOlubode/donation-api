const passport = require('passport')
const passportJWT = require('passport-jwt')
const bcrypt = require('bcrypt')
const localpassport = require('passport-local')
const donorModel = require('../models/user.model')
const nodemailer = require('nodemailer')
const sendgridtransport = require('nodemailer-sendgrid-transport')

const { generateJWT } = require('../controllers/utils.controller')


const localStrategy = localpassport.Strategy
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt



passport.use(
    new JWTStrategy(
        {
            secretOrKey: 'shhh_secret',
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        }, async (token, done) => {
            if (!token) {
                console.log('Nah, bro');
                return done(null, false)
            }
            try {
                console.log('Cant do this');
                const user = { _id: token._id, email: token.email, fullname: token.fullname }
                if (!user) { return done(null, false) }
                return done(null, user)
            } catch (error) {
                done(error)
            }
        }
    )
)

passport.use(
    'login',
    new localStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            console.log('Authenticated!!!');
            // const user = await donorModel.findOne({ email })
            // if (!user) { return done(null, false, { message: 'User not found!' }) }
           
            // const validate = await user.isValidPassword(password);
            // if (!validate) { return done(null, false) }

            // const token = generateJWT(user)

            // console.log(token);
            done(null)
        } catch (error) {
            // use res here
            return done(error)
        }
    }
    )
)

passport.use(
    'signup',
    new localStrategy({
        usernameField: 'email',
        passwordField: 'password', passReqToCallback: true
    }, async (req, email, password, done) => {
        var user = req.body

        // if(!user.email || !user.password){throw new Error('Please provide Email and Password!')}
        await donorModel.create(user)
            .then((user) => {
                return done(null, user)
            }).catch((error) => {
                done(error)
            })
    }
    )
)

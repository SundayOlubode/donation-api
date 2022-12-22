// Express
const express = require('express')
const bodyparser = require('body-parser')
const rateLimit = require("express-rate-limit");

// Passport Midlleware
const passport = require('passport')
require('./auth/passport')

// ENV
require('dotenv').config()

//Mongoose
const database = require('./database/mongodb')

// Middlewares
const errorHandler = require('./controllers/errors.controller')

//Validator
const { validateSignup, validateLogin } = require('./validation/validate')

// Routes
const { donorRoute } = require('./routes/donor.route')

const { signup, login } = require('./controllers/donor.controller')
const { adminRoute } = require('./routes/admin.route')




const app = express()
const PORT = process.env.PORT


// Loggers
const logger = require('./logger/logger')
const httpLogger = require('./logger/httpLogger')

app.use(httpLogger)


// Configure limiter
const limiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes
    max: 30, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too many request from this user. Please try again after some mins',
    skipFailedRequests: true
})


//Connect tO database
database.connectDB()

//Middlewares
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(limiter)


app.use('/donor', passport.authenticate('jwt', { session: false }), donorRoute)
app.use('/admin', passport.authenticate('jwt', { session: false }), adminRoute)
app.use(errorHandler.get500Errors)

// app.set('view engine', 'pug')
// app.set('views', 'views')

// app.use(express.static('public'))

app.get('/', (req, res, next) => {
    res.status(200).send('CACSA UI')
})

app.post('/login', validateLogin, passport.authenticate('login', { session: false }), login)
app.post('/signup', validateSignup, passport.authenticate('signup', { session: false }), signup)


app.get('*', (req, res) => {
    res.status(404).send('<h1>Page not found!</h1>')
})


app.listen(PORT, () => {
    logger.info(`server listening on port ${PORT}...`);
})
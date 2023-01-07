// Express
const express = require('express')
const bodyparser = require('body-parser')
const rateLimit = require("express-rate-limit");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors')
const flash = require('connect-flash')
const csrf = require('csrf')

// // ENV
require('dotenv').config()

// //Mongoose
const database = require('./database/mongodb')

// Middlewares
const errorHandler = require('./controllers/errors.controller')

// Routes
const donorRoute = require('./routes/donor.route')
const adminRoute = require('./routes/admin.route')
const authRouter = require('./routes/auth.routes');
const donationModel = require('./models/donation.model');


const app = express()
const PORT = process.env.PORT



// // Loggers
// // const logger = require('./logger/logger')
// // const httpLogger = require('./logger/httpLogger');

// // app.use(httpLogger)


// Configure limiter
const limiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes
    max: 30, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too many request from this user. Please try again after some mins',
    skipFailedRequests: true
})


// //Connect tO database
database.connectDB()

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODBURL,
        collectionName: 'sessions'
    })
})
);


app.use(flash())

app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.static('views'))

//Middlewares
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(limiter)
// // app.use(cors)


app.use('/admin', adminRoute)

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    req.user = req.session.user
    next()
})

app.get('/', (req, res, next) => {
    console.log(req.session);
    res.status(200).render('index', {
        errorMessage: req.flash('error')
    })
})


app.use('/auth', authRouter)

app.use('/donor', donorRoute)



app.get('*', (req, res) => {
    res.status(404).send('<h1>Page not found!</h1>')
})

app.use(errorHandler.get500Errors)

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}...`);
})
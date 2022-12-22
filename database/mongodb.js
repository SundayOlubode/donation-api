const mongoose = require('mongoose')
require('dotenv').config()

const connectionUrl = process.env.MONGODBURL

const connectDB = () => {
    mongoose.connect(connectionUrl)
        .then(() => {
            console.log('Connected to database!');
        }).catch((err) => {
            console.log(err);
            res.status(500).json({
                message: 'Connection Error! Please refresh this page.'
            })
        })
}

module.exports = {connectDB}
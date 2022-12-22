const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')

const donorSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: [true, 'Email already exist!']
    },
    password: {
        type: String,
        required: [true, 'Password is required!']
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    donations: [{
        _id: {
            type: mongoose.Types.ObjectId,
            ref: 'donation'
        }
    }]
})


donorSchema.pre('save', async function (next) {

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

donorSchema.methods.isValidPassword = async function (password) {
    const compare = await bcrypt.compare(password, this.password)
    return compare;
}

const donorModel = mongoose.model('donor', donorSchema)
module.exports = donorModel;
const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')

const adminSchema = new Schema({
    email: {
        type: String,
        required : [true, 'Email is required!'], 
        unique: [true, 'Email already exist!']
    },
    password: {
        type: String,
        required : [true, 'Password is required!']
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    }
})


adminSchema.pre('save', async function (next) {

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

adminSchema.methods.isValidPassword = async function (password)  {
    const compare = await bcrypt.compare(password, this.password)  
    return compare;
}

const adminModel = mongoose.model('admin', adminSchema)
module.exports = adminModel;
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim: true
    },
    email : {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Emal is invalid')
            }
        }
    },
    password : {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if((!validator.isByteLength(value,{min:7})) || (value.toLowerCase().includes('password')))
            throw new Error('Password must be min 7 characters and should not be "password"')
        }
    },
    age : {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age mush be greater than Zero')
            }
        }
    },
    tokens: [{
       token: {
           type: String,
           required: true
       } 
    }]
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})

    if(!user){
        throw new Error('Unable to login! - Username and Password wrong!')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error ('Unable to login! - Username and Password wrong!')
    }

    return user
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'thisismycourse')

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
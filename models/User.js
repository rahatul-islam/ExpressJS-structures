//Name, Email, Password and Profile

const {
    Schema,
    model
} = require('mongoose')
const userSchema = newSchema({
    name: {
        type: String,
        trim: true,
        maxlenght: 30,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }
}, {
    timestamps: true
})

const User = model('User', userSchema)
module.exports = User
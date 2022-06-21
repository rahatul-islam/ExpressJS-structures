const bcrypt = require('bcrypt')

const User = require('../models/User')

exports.signupGetController = (req, res, next) => {
    res.render('pages/auth/signup', {
        title: 'Create a New Account'
    })
}

exports.signupPostController = async (req, res, next) => {
    let {
        username,
        email,
        password
    } = req.body


    try {
        let hashedPassword = await bcrypt.hash(password, 11)

        let user = new User({
            username,
            email,
            password: hashedPassword
        })

        let createdUser = await user.save()
        console.log('User Created Succesfully', createdUser)
        res.render('pages/auth/signup', {
            title: 'Create a New Account'
        })
    } catch (e) {
        console.log(e)
        next(e)
    }

}


exports.loginGetController = (req, res, next) => {
    res.render('pages/auth/login', {title:'Log in your account'})
}

exports.loginPostController = (req, res, next) => {

}

exports.logoutController = (req, res, next) => {

}
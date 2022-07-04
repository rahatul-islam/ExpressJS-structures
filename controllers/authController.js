const bcrypt=require('bcrypt')
const {
    validationResult
} = require('express-validator')

const User=require('../models/User')

const errorFormatter = require('../utils/validationErrorFormatter')

exports.signupGetController = (req, res, next) => {
    res.render('pages/auth/signup', {
        title: 'Create a New Account',
        error: {},
        value: {}
    })
}

exports.signupPostController = async (req, res, next) => {
    let {
        username,
        email,
        password
    } = req.body

    let errors = validationResult(req).formatWith(errorFormatter)
    if (!errors.isEmpty()) {
        return res.render('pages/auth/signup', {
            title: 'Create a New Account',
            error: errors.mapped(),
            value: {
                username,
                email,
                password
            }
        })
    }

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
            title: 'Create a New Account',
            error: {}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }

}

exports.loginGetController = (req, res, next) => {

    res.render('pages/auth/login', {
        title: 'Log in to your account',
        error: {}
    })
}

exports.loginPostController = async (req, res, next) => {
    let {
        email,
        password
    } = req.body

    let errors = validationResult(req).formatWith(errorFormatter)
    if (!errors.isEmpty()) {
        return res.render('pages/auth/login', {
            title: 'Log in to your account',
            error: errors.mapped()
        })
    }

    try {
        let user = await User.findOne({
            email
        })
        if (!user) {
            return res.json({
                messege: 'Invalid Credential'
            })
        }

        let match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.json({
                messege: 'Invalid Credential'
            })
        }


        console.log('Sucessfully Logged In')
        res.render('pages/auth/login', {
            title: 'Log in to your account',
            error: {}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

exports.logoutController = (req, res, next) => {

}
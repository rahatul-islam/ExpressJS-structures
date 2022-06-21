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
    res.render('pages/auth/login', {title:'Log in to your account'})
}

exports.loginPostController = async (req, res, next) => {
    let{email,password}=req.body

    try {
        let user = await User.findOne({email})
        if (!user) {
            return res.json({
                messege: 'Invalid Credential'
            })
        }

        let match= await bcrypt.compare(password, user.password)
        if (!match) {
            return res.json({
                messege:'Invalid Credential'
            })
        }

        console.log('Succesfully Logged in', user)
        res.render('/pages/auth/login', {title:'Log in to your account'})
    } catch (e) {
        console.log(e)
        next(e)
    }
}

exports.logoutController = (req, res, next) => {

}
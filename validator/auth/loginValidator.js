const {
    body
} = require('express-validator')


module.exports = [
    body('email')
    .not().isEmpty().withMessage('Email can not be Empty'),
    body('password')
    .not().isEmpty().withMessage('Password can not be Empty')
]
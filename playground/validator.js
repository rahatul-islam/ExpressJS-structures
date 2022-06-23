const router = require('express').Router()
const {
    check,
    validationResult
} = require('express-validator')

router.get('/validator', (req, res, next) => {
    res.render('playground/signup', {
        title: 'Validator playground'
    })
})

router.post('/validator',
    [
        check('username')
        .not()
        .isEmpty()
        .withMessage('Username can not be empty')
        .isLength({
            max: 15
        })
        .withMessage(`Username can not be greater than 15 Charecter`),
        check('email')
        .isEmail()
        .withMessage('Provide your valid Email')
    ],
    (req, res, next) => {
        let errors = validationResult(req)
        console.log(errors)
        res.render('playground/signup', {
            title: 'Validator playground'
        })
    })

module.exports = router
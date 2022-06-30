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
        .withMessage(`Username can not be greater than 15 Charecter`)
        .trim(),
        check('email')
        .isEmail()
        .withMessage('Provide your valid Email')
        .normalizeEmail(),
        check('password').custom(value => {
            if (value.length < 5) {
                throw new Error('Password must be greater than charecter 5')
            }
            return true
        }),
        check('confirmPassword').custom((value, {
            req
        }) => {
            if (value !== req.body.password) {
                throw new Error('Password Does not matched')
            }
            return true
        })
    ],
    (req, res, next) => {
        let errors = validationResult(req)

        const formatter = (error) => error.msg
        console.log(errors.isEmpty())
        console.log(errors.array())
        console.log(errors.mapped())

        console.log(errors.formatWith(formatter).mapped())
        console.log(req.body.username, req.body.email)
        res.render('playground/signup', {
            title: 'Validator playground'
        })
    })

module.exports = router
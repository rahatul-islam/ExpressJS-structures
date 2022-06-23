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
        .withMessage('Provide your valid Email'),
        check('password').custom(value => {
            if (value.length < 5) {
                throw new Error('Password must be greater than 5')
            }
            return true
        }),
        check('confirmPassword').custom((value,{req})=>{
            if (value !== req.body.password) {
                throw new Error('Password Does not match')
            }
            return true
        })
    ],
    (req, res, next) => {
        let errors = validationResult(req)

        const formatter=(error)=> error.msg
        console.log(errors.isEmpty())
        console.log(errors.array())
        console.log(errors.mapped())

        console.log(errors.formatWith(formatter).mapped())
        res.render('playground/signup', {
            title: 'Validator playground'
        })
    })

module.exports = router
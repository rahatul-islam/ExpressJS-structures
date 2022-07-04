const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const session=require('express-session')

//Import Routes
const authRoutes = require('./routes/authRoutes')


const app = express()

//setup View Engine
app.set('view engine', 'ejs')
app.set('views', 'views')


//Middleware Array
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({
        extended: true
    }),
    express.json(),
    session({
        secret:process.env.SECRET_KEY||'SECRET_KEY',
        resave:false,
        saveUninitialized:false
    })
]
app.use(middleware)

app.use('/auth', authRoutes)

app.get('/', (req, res) => {
    res.send('<h1>SERVER IS RUNNING</h1>')
})

const PORT = process.env.PORT || 9999
mongoose.connect(`mongodb+srv://admin:admin24@cluster0.iop1r.mongodb.net/test`, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('Database Connected')
        app.listen(PORT, () => {
            console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
        })

    })
    .catch(e => {
        return console.log(e)
    })
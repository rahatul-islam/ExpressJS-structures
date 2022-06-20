const express = require('express')
const morgan=require('morgan')
const mongoose=require('mongoose')

const app=express()

//static file
app.use(express.static('public'))
app.use('/css', express.static(__dirname+'public/css'))

//setup View Engine
app.set('view engine', 'ejs')
app.set('views', 'views')



//Middleware Array
const middleware=[
    morgan('dev'),
    express.urlencoded({extended:true}),
    express.json()
]
app.use(middleware)


// app.use(morgan('dev'))
// app.use(express.urlencoded({extended:true}))
// app.use(express.json())

// app.use('/')
app.get('/',(req,res)=>{

    res.render('pages/auth/signup', {title:'Create a New Account'})
    // res.send('<h1>SERVER IS RUNNING</h1>')
})

const PORT=process.env.PORT||8888

// mongoose.connect(`mongodb+srv://admin24:admin3024@cluster0.kjw7f.mongodb.net/test`)
// .then(() =>{
//     app.listen(PORT,()=>{
//         console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
//     })
    
// })
// .catch(e=>{
//     console.log(e)
// })


app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
})

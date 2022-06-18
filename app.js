const express = require('express')
const morgan=require('morgan')
const mongoose=require('mongoose')


const app=express()

app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// app.use('/')
app.get('/',(req,res)=>{
    // res.send('<h1>SERVER IS RUNNING</h1>')
})

const PORT=process.env.PORT||8888

mongoose.connect(`mongodb+srv://admin24:admin3024@cluster0.kjw7f.mongodb.net/test`)
.then(() =>{
    app.listen(PORT,()=>{
        console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
    })
    
})
.catch(e=>{
    console.log(e)
})


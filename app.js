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
app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
})

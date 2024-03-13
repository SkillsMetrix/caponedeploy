const express= require('express')
const connectDB= require('./config/dbConnection')
const dotenv= require('dotenv').config()

connectDB()
const app= express()


app.use(express.json())
app.use('/api/users',require('./routes/userRoutes'))
app.listen(4000,()=>{
    console.log('server is ready');
})
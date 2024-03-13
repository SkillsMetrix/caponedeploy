const asyncHandler= require('express-async-handler')
const User= require('../models/userModel')
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')
const registerUser=asyncHandler(async(req,res)=> {
    const {username,email,password} = req.body
    if(!username || !email || !password){
        res.status(400)
        throw new Error("All Fields are mandatory")
    }
    const userAvailable=await User.findOne({email})
    if(userAvailable){
        res.status(400)
        throw new Error("User already registered")
    }
    const hashedPassword=await bcrypt.hash(password,10)
    console.log('Hashed Password ' ,hashedPassword);
    const user=await User.create({
       username,email,password :hashedPassword
    })
    res.json({message :'user registered'})
 })

const loginUser=asyncHandler(async(req,res)=> {
    const {email,password} = req.body
    const user= await User.findOne({email})
    if(user && (await bcrypt.compare(password,user.password))){
        res.send('login success')
        const accessToken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            }
        },
        "123urt",
        {expiresIn:'1m'}
        )
        res.json({message:' Login success'})
        console.log(accessToken);
    }else{
    res.json({message:' Login failed'})
    }
})

const currentUser=asyncHandler((req,res)=> {
    res.json({message:'Current User Information'})
})

module.exports={registerUser,loginUser,currentUser}
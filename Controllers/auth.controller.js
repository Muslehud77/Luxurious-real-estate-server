import User from "../Models/user.model.js"
import bcryptjs from 'bcryptjs'
import { errorhandler } from "../utils/error.js"
import jwt from 'jsonwebtoken'


export const signup = async (req,res,next)=>{
   const {userName, email, password} = req.body
   const hashedPassword = bcryptjs.hashSync(password,10)
   const newUser = new User({userName,email,password:hashedPassword})

   try{
     await newUser.save()
    res.status(201).json('User created successfully!')
   }catch(err){
    next(err)
    
   }



   
}

export const signIn = async (req,res,next)=>{
   const {email, password} = req.body
   

   try{
    const validUser = await User.findOne({email})
   
    if(!validUser) return next(errorhandler(404, "User not found"))
    const validPassword = bcryptjs.compareSync(password, validUser.password)
    if(!validPassword) return next(errorhandler(404,"Wrong credentials")) 
    const {password:pass,...rest} = validUser._doc
    const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
  
    res.cookie('access_token',token,{httpOnly:true}).status(200).send(rest)
   }catch(err){
   
    next(err)
    
   }



   
}
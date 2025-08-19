import generateToken from "../config/token.js"
import User from "../model/user_model.js"
import bcrypt from 'bcryptjs';

export const signUp=async (req,res)=>{
    try {
        let {name,email,password}=req.body
        const existUser=await User.findOne({ email}).populate("listing")
        if(existUser){
            return res.status(400).json({message:"User already exists"})
        }
        const hashPassword=await bcrypt.hash(password,10)
        const user = await User.create({name,email,password:hashPassword })
        const toekn = await generateToken(user._id)
        res.cookie("token", toekn, {
            httpOnly: true,
            secure: process.env.NODE_ENVIRONMENT === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

       return res.status(201).json({message:"User created successfully",user})


        
    } catch (error) {
        return res.status(500).json({message:"SignUp Error",error: error.message})
        
    }
}


export const login=async (req,res)=>{
    try {
         let {email,password}=req.body
        const user=await User.findOne({ email}).populate("listing")
        if(!user){
            return res.status(400).json({message:"User is not exists"})
        }
        const isPasswordValid=await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid password"})
        }
        const token = await generateToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENVIRONMENT === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

       return res.status(201).json({message:"User login Successfully",user})
        
    } catch (error) {
         return res.status(500).json({message:"Login Error",error: error.message})
    }
}

export const logOut=async (req,res)=>{

    try {
        res.clearCookie("token");
        return res.status(200).json({message:"User logged out successfully"})
    } catch (error) {
        return res.status(500).json({message:"Logout Error",error: error.message})
    }
}

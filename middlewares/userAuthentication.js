import jwt from 'jsonwebtoken'
import { Users } from '../models/userModel.js';

export const isAuthenticate=async (req , res , next)=>{
    
    const token = req.cookies.token;

    if(!token) return res.status(400).json({
        message:'login first'
    })
    const decode = jwt.verify(token , process.env.JWT_SECRET)
    
    req.user = await Users.findById(decode._id, "-password");
    next();
}
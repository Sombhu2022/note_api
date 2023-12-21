import jwt from "jsonwebtoken";

export const sendCookic = (user , res , message , statusCode = 200)=>{
    const token = jwt.sign({ _id: user._id } , process.env.JWT_SECRET);
    res.status(statusCode)
       .cookie("token" , token , {
        maxAge: 10 * 60 * 60 * 1000 , //10 days
       })
       .json({
        success:true,
        message,
        "token": token
       })
}
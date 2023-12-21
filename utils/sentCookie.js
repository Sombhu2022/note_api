import jwt from "jsonwebtoken";

export const sendCookic = (user , res , message , statusCode = 200)=>{
    const token = jwt.sign({ _id: user._id } , process.env.JWT_SECRET);
    res.status(statusCode)
       .cookie("token" , token , {
       expires: new Date(Date.now() + 3600000),
       httpOnly: true, // Prevent JavaScript access for security
       })
       .json({
        success:true,
        message,
        "token": token
       })
}

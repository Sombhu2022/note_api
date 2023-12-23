import jwt from "jsonwebtoken";
import { Users } from "../models/userModel.js";

export const isAuthenticate = async (req, res, next) => {
  
  try {
    const token = req.cookies.token;
    if(!token) {
      return res.status(400).json({
        success:false,
        message: "login first",
      });
    }else{
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Users.findById(decode._id, "-password");
      next();
    }
   
  } catch (error) {
    res.status(400).json({
        error
      });
  }
};

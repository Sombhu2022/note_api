import jwt from "jsonwebtoken";
import { Users } from "../models/userModel.js";

export const isAuthenticate = async (req, res, next) => {
  console.log("isAuthenticate");
  const token = req.headers.token;
  console.log(token);
  try {
    if(!token) {
      console.log("token is not present");
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
    console.log(error);
    res.status(400).json({
        error
      });
  }
};

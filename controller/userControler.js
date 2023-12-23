import { Users } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { sendCookic } from "../utils/sentCookie.js";

export const createUser = async (req, res) => {
  try {
      const {name , email , password , dp} = req.body;
      
      let user =await  Users.findOne({email})
      if(user) return res.status(400).json({message:"email alrady exist"})
      
    const hashPassword =await bcrypt.hash(password , 10); //genarate hash password for encription password ..
   
    user = await Users.create({name , email , password:hashPassword , dp});

    sendCookic(user , res , "user created successfully" , 201);
   

  } catch (error) {
    res.status(400).json({
      message: "somthing error",
      error,
    });
    console.log(error);
  }
};

export const loginUser =async (req , res)=>{
   
    try {
        const {email , password } = req.body
        const user = await Users.findOne({email})
        
        if(!user) return res.status(400).json({message:"email or password not match"})

        const isMatch = await bcrypt.compare(password , user.password)

        if(!isMatch) return res.status(400).json({message:"email or password not match"})

        sendCookic(user , res , "user logoin successfully" , 201);

        
    } catch (error) {

        res.status(400).json({
            message:"somthing wrong!  user not login",
            error
        })
        
    }


}



export const allUser = async (req, res) => {
  try {
    const user = await Users.find({});
    res.status(200).json({
      message: "all users",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: "somthing error",
      error,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findById({ _id: id });
    res.status(200).json({
      message: "user fetched",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: "somthing error",
      error,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await Users.findByIdAndDelete({ _id: id });
    res.status(200).json({
      message: "user deleted",
    });
  } catch (error) {
    res.status(400).json({
      message: "somthing error",
      error,
    });
  }
};

export const logout = (req, res) => {
  try {
      res
          .status(200)
          .cookie("token", "" , {
              expires: new Date(Date.now()),
              httpOnly: true,
             sameSite: "None",
             secure:true,
          })
          .json({
              success: true,
              message: "Logout successfull",
          });

  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
}

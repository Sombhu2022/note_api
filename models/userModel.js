import mongoose from "mongoose"

const user = new  mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true ,
        unique:true,
        max:300,
    },
    password:{
        type:String,
        required:true ,
    },
    dp:{
       type:String,
       max:700, 
    },
    postAt:{
        type:Date,
        default:Date.now()
   },
  token:String

})

export const Users = mongoose.model('user',user)
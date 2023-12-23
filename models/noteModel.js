
import mongoose from 'mongoose'

const noteModel =new mongoose.Schema({
    note:{
        type:String,
        required:true,
        max:1000
    },
    subject:{
       type:String,
       required:true,
       max:200
    },
    user:{
      type:String ,
      required:true
    },
    postAt:{
         type:Date,
         default:Date.now()
    }
});

export const Notes= mongoose.model('note' , noteModel)
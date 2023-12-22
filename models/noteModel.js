
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
    postAt:{
         type:Date,
         default:Date.now()
    }
});

export const Notes= mongoose.model('note' , noteModel)

import mongoose from 'mongoose'

const noteModel =new mongoose.Schema({
    subject:{
        type:String,
        required:true,
        max:1000
    },
    title:{
       type:String,
       required:true,
       max:200
    },
    user:{
      type:mongoose.Schema.Types.ObjectId ,
      required:true
    },
    image:  {
      url: {
          type: String,
      },
      image_id: {
          type: String,
      },
    },
    postAt:{
         type:Date,
         default:Date.now()
    }
});

export const Notes= mongoose.model('note' , noteModel)
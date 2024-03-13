import mongoose from 'mongoose'

const userModel = new mongoose.Schema({
    name:{
        type:String,
        maxLength:60,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        maxLength:200
    },
    dp:  {
        url: {
            type: String,

        },
        image_id: {
            type: String,
        },

    },
    roal:{
        type:String,
        default:"user"
    },
    password:{
        type:String,
        minLength:[8 , "password must be 8 charecter or above"],
        required:true,
        select:false
    },
    createAt:{
        type:Date ,
        default:Date.now()
    }

})


export const Users = mongoose.model('user',userModel);
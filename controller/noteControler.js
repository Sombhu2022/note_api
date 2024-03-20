import { Notes } from "../models/noteModel.js";
import { v2 as cloudinary } from 'cloudinary';

export const getNotes = async (req, res) => {
  try {
    const {id}=req.user
    // console.log(id);

    const note = await Notes.find({user:id}).populate("user");

    if(!note) return res.status(200).json("no data are here.")

    // console.log(note);
    res.status(200).json({
      success: true,
      note,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    });
  }
};


export const getNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Notes.findById(id);

    res.status(200).json({
      success: true,
      note,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};


export const updateNote = async (req, res) => {
  try {

    const {title , subject} = req.body;
    const {id}=req.params
    // console.log(title , subject);
    await Notes.findByIdAndUpdate({ _id: id }, {
         title,
         subject,
    } , {
      new: true,
    });
    
    console.log(req.user);
    const note = await Notes.find({_id: req.user._id})

    res.status(200).json({
      success: true,
      note,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};


export const addNote = async (req, res) => {
  try {
    const { title , subject , image } = req.body;
    const { id }=req.user
    // console.log(id , req.body)

    let TempImage ; 

    if(image !== 'null'){
 
      const profilePic = await cloudinary.uploader.upload(image , {
        folder:"notebook"
    })
    // console.log(profilePic);
     TempImage = {
        url:profilePic.secure_url,
        image_id:profilePic.public_id,
    }
  }
  else{

    TempImage = {
      url:'',
      image_id:'',
  }
  
  }
    // console.log(title ,subject)
  const  data = await Notes.create({
      title,
      subject,
      user:id,
      image:TempImage
    });
  
  
  const note = await data.populate('user')
  res.status(200).json({
      note , 
      success: true,
      message: "add note",
    });


  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Can't add note",
    });
  }
};


export const deletNote = async (req, res) => {
  try {
    const { id } = req.params;
    

    const data = await Notes.findByIdAndDelete({ _id: id });
    console.log("delete",data);
    if(data.image.image_id){
      await cloudinary.uploader.destroy(data.image.image_id);
      console.log("image deleted");
    }
    console.log(req.user);
    const note = await Notes.find({user: req.user._id})

    res.status(200).json({
      success: true,
      message: "delete note",
      note
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "somthing else , try again",
    });
  }
};

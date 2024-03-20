import { Notes } from "../models/noteModel.js";
import { v2 as cloudinary } from 'cloudinary';

export const getNotes = async (req, res) => {
  try {
    const {id}=req.user
    console.log(id);

    const note = await Notes.find({user:id}).populate("user");

    if(!note) return res.status(200).json("no data are here.")

    console.log(note);
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

    const {note , subject} = req.body;
    const {id}=req.user

    const data = await Notes.findByIdAndUpdate({ _id: id }, {
         note,
         subject,
    } , {
      new: true,
    });

    res.status(200).json({
      success: true,
      data,
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

    let data ; 

    if(image !== 'null'){
      // console.log("if");
      const profilePic = await cloudinary.uploader.upload(image , {
        folder:"notebook"
    })
    // console.log(profilePic);
    const TempImage = {
        url:profilePic.secure_url,
        image_id:profilePic.public_id,
    }
    // console.log(title ,subject)
    data = await Notes.create({
      title,
      subject,
      user:id,
      image:TempImage
    });
  }
  
  else{
    // console.log("else");
    data = await Notes.create({
      title,
      subject,
      user:id,
    });
   console.log(data);
   
  }

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

    await Notes.findByIdAndDelete({ _id: id });
    res.status(200).json({
      success: true,
      message: "delete note",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "somthing else , try again",
    });
  }
};

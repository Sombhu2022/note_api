import { Notes } from "../models/noteModel.js";

export const getNotes = async (req, res) => {
  try {
    const {email , name , id}=req.user
    const note = await Notes.find({user:email});
    res.status(200).json({
      success: true,
      note,
      user:{name , id}
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
    const { id } = req.params;
    const {note , subject} = req.body;
    const {email}=req.user

    const data = await Notes.findByIdAndUpdate({ _id: id }, {
         note,
         subject,
         user:email,
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
    const { note, subject } = req.body;
    const {email}=req.user
    console.log(email)
   console.log(note ,subject)
    await Notes.create({
      note,
      subject,
      user:email,
    });

    res.status(200).json({
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

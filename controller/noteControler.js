import { Notes } from "../models/noteModel.js";


export const getNotes = async(req,res)=>{
    try {
        const note = await Notes.find({})
        res.status(200).json({
        success: true,
        note
      });
      
    } catch (error) {
        res.status(400).json({
            success: false,
            error:"sani"
          });
    }
}
export const getNote = async(req,res)=>{
    try {
        const {id}=req.params
        const note = await Notes.findById(id)
        
        res.status(200).json({
        success: true,
        note
      });
    } catch (error) {
        res.status(400).json({
            success: false,
            error
          });
    }
}
export const updateNote = async(req,res)=>{
    try {
        const {id}=req.params
        const data = req.body
        const note = await Notes.findByIdAndUpdate({_id:id} ,data , {new:true} )
        
        res.status(200).json({
        success: true,
        note
      });
    } catch (error) {
        res.status(400).json({
            success: false,
            error
          });
    }
}
export const addNote = async (req, res) => {
  try {
    const { note } = req.body;
 
    await Notes.create({
      note,
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

export const deletNote= async (req,res)=>{
    try {
        const {id} = req.params
       
        await Notes.findByIdAndDelete({_id:id})
        res.status(200).json({
            success: true,
            message: "delete note",
        })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "somthing else , try again",
        })
       
      
    }
}

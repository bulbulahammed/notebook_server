const Note = require('../models/noteModel');
const asyncHandler = require('express-async-handler');


const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({user: req.user._id})
  res.json(notes);
});

const createNote = asyncHandler(async(req,res)=>{
  const {title,content,category} = req.body;
  if(!title || !content || !category){
    res.status(400);
    throw new Error("Please Fill All The Fields");
  }else{
    const note = new Note({user: req.user._id, title,content,category});

   const createdNote = await note.save();

    res.status(201).json(createdNote);
  }
});

// Get Note By Id
 const getNoteById = asyncHandler(async(req,res)=>{
  const note = await Note.findById(req.params.id);
    if(note){
      res.json(note);
    }else{
      res.status(404).json({message: "No Note Found"})
    }
 });

//  Update Note
const updateNote = asyncHandler(async(req,res)=>{
  const {title,content,category} = req.body;
  const note = await Note.findById(req.params.id);

  if(note.user.toString() !== req.user._id.toString()){
    res.status(401);
    throw new Error("You Can't Update This Note");
  }
  if(note){
    note.title = title;
    note.content = content;
    note.category = category;

    const updatedNote  = await note.save();
    res.json(updatedNote);
  }else{
    res.status(404);
    throw new Error("Note Note Found");
  }
});

// DeleteNote API
const DeleteNote = asyncHandler(async(req,res)=>{
  const note = await Note.findById(req.params.id);
  if(note.user.toString() !== req.user._id.toString()){
    res.status(401);
    throw new Error("You Can't Delete This Note");
  }
  if(note){
    await note.remove();
    res.json({message: "Note Removed"});
  }else{
    res.status(404);
    throw new Error("Note Not Found");
  }
});

module.exports = {getNotes,createNote,getNoteById,updateNote,DeleteNote};


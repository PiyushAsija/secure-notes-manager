const express=require("express");
const Note=require("../models/Note");
const auth=require("../middleware/authMiddleware");

const router=express.Router();

//create
router.post("/",auth,async (req,res)=>{
    const note=await Note.create({
        userId:req.user,
        title:req.body.title,
        content:req.body.content
    });
    res.json(note);
});

//read (current logged in user's notes)
router.get("/", auth, async (req,res)=>{
    const notes=await Note.find({userId:req.user});
    res.json(notes);
});

//update
router.put("/:id", auth, async (req,res)=>{
    const note = await Note.findOneAndUpdate(
        {_id:req.params.id,userId:req.user},
        req.body,
        {new:true}
    );
    if(!note){
        return res.status(404).json({error:"Note not found"});
    }
    res.json(note);
});

//Delete
router.delete("/:id", auth, async (req,res)=>{
    const note = await Note.findOneAndDelete({_id:req.params.id, userId:req.user});

    if(!note){
        return res.status(404).json({error:"Note not found"});
    }
    res.json({message:"Deleted"});
});


module.exports=router;
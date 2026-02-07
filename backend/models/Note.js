const mongoose=require("mongoose");

const noteSchmema=new mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId, ref:"User"},
    title:String,
    content:String
});

module.exports=mongoose.model("Note",noteSchmema);
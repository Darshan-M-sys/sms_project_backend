const mongoose=require("mongoose");

const teacherProfileSchema= new mongoose.Schema({
teacherId:{type:mongoose.Schema.ObjectId, ref:"user"},
fullname:{type:String,required:true},
photo:{type:String},
email:{type:String,required:true},
phone:{type:String,},
department:{type:String},
qualification:{type:String},
experience:{type:String},
subjects:[String],
isActive:{type:Boolean,default:true}
},{timestamps:true});

const teacher= mongoose.model("teacher",teacherProfileSchema);

module.exports=teacher;


const express= require("express");
const teacherRouter= express.Router();
const isAuthenticated=require("../middlewares/isAuthenticated");
const isTeacherProfileCreator=require("../middlewares/isTeacherProfileCreator")
const fs=require("fs");
const path=require("path");
const multer=require("multer");
const teacher = require("../models/teacherProfile");
const user = require("../models/User");
const uploadDir = path.join(process.cwd(), "uploads");

// create uploads folder if not exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({ storage });
teacherRouter.post('/profile/:teacherId',isAuthenticated,isTeacherProfileCreator,upload.single("photo"),async(req,res)=>{
  try {
    const teacherId=req.params.teacherId;
    const existingUser= await user.findOne({_id:teacherId});
    const existingProfile= await teacher.findOne({teacherId:teacherId});
    if(existingProfile){
      return res.status(200).json({msg:"Teacher Profile already exists"})
    }
    const photo=req.file?"http://"+req.host+"/uploads/"+req.file.filename:null;
    const {fullname,phone,email,department,qualification,experience,subjects}=req.body;
   const subjectsArray=subjects.split(",").map(subject=>subject.trim());
     const data= await teacher.create({teacherId:teacherId,photo:photo,fullname:fullname,phone:phone,experience:experience,email:email,department:department,subjects:subjectsArray,qualification:qualification});
     existingUser.profileCreated=true;
     await existingUser.save();
    res.status(201).json({msg:"Teacher Profile",data:data});
  } catch (error) {
    console.log(error.message)
   res.status(500).json({msg:"Internal Server Error"}) 
  }
 })

 teacherRouter.get('/profile/:teacherId',isAuthenticated,isTeacherProfileCreator,async(req,res)=>{
  try {
    const teacherId=req.params.teacherId; 
    const profile= await teacher.findOne({teacherId:teacherId});
    if(!profile){
      return res.status(404).json({msg:"Teacher Profile not found"})
    }
    res.status(200).json({msg:"Teacher Profile",data:profile});
  }

    catch (error) {                         
    res.status(500).json({msg:"Internal Server Error"})
  }
 }) 


 teacherRouter.put('/profile/:teacherId',isAuthenticated,isTeacherProfileCreator,upload.single("photo"),async(req,res)=>{
  try {
    const teacherId=req.params.teacherId; 
    const existingProfile= await teacher.findOne({teacherId:teacherId});
    if(!existingProfile){
      return res.status(404).json({msg:"Teacher Profile not found"})
    } 
    const photo=req.file?"http://"+req.host+"/uploads/"+req.file.filename:existingProfile.photo;
    existingProfile.photo=photo|| existingProfile.photo;
    const {fullname,phone,email,department,qualification,experience,subjects}=req.body;
    existingProfile.fullname=fullname|| existingProfile.fullname;
    existingProfile.phone=phone|| existingProfile.phone;
    existingProfile.email=email|| existingProfile.email;
    existingProfile.department=department|| existingProfile.department;
    existingProfile.qualification=qualification|| existingProfile.qualification;
    existingProfile.experience=experience|| existingProfile.experience;
    existingProfile.subjects=subjects?subjects.split(",").map(subject=>subject.trim()):existingProfile.subjects;
     const data= await existingProfile.save();
     res.status(200).json({msg:"Teacher Profile Updated",data:data});
  } catch (error) {
    c
    res.status(500).json({msg:"Internal Server Error"}) 

  }
 }) 
module.exports=teacherRouter;
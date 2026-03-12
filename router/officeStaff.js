const express=require("express");
const officeStaffProfileRoute=express.Router();
const isAuthenticated=require("../middlewares/isAuthenticated")
const OfficeStaff=require("../models/officeStaff")
const isAdmin=require("../middlewares/isAdmin");
const upload = require("./uploadMiddleware");
const user = require("../models/User");

officeStaffProfileRoute.post("/profile/:staffId",isAuthenticated,isAdmin,upload.fields([
  {name:'profileImage',maxCount:1},
  {name:'idProof',maxCount:1}
]),async(req,res)=>{
  try {
    const officeStaffId=req.params.staffId;
    const profileImage=req.files?.profileImage?'http://'+req.host+'/uploads/'+req.files.profileImage[0].filename:null;
    const idProofFile=req.files?.idProof?'http://'+req.host+'/uploads/'+req.files.idProof[0].filename:null;
    const{fullName,gender,dateOfBirth,phoneNumber,email,street,city,state,pincode,department,designation,employeeType,joiningDate,aadhaarNumber,panNumber}=req.body;

    const staffCount=await OfficeStaff.countDocuments({})
    const staffId='STAFF'+(staffCount+1);
    const profileData=await OfficeStaff.create({staffId:staffId,userId:officeStaffId,
      fullName,gender,dateOfBirth,phoneNumber,email,street,city,state,pincode,department,designation,employeeType,joiningDate,aadhaarNumber,panNumber,idProofFile:idProofFile,profilePhoto:profileImage
    }) 
    const User= await user.findOne({_id:officeStaffId})
    user.profileCreated=true;
    await User.save();
    res.status(200).json({success:true,msg:"Office Staff Profile Created! "})
  } catch (error) {
    res.status(500).json({msg:"Internal Server Error!"})
  }
})

officeStaffProfileRoute.put('/profile/:profileId',isAuthenticated,isAdmin,upload.fields([{
  name:"profileImage",maxCount:1
},{
  name:"idProof",maxCount:1
}]),async(req,res)=>{
  try {
    const profileId=req.params.profileId;
    const profile=await OfficeStaff.findOne({_id:profileId});
    profile.personalInfo=profile.personalInfo || {};
    profile.address= profile.address || {};
    profile.jobDetails=profile.jobDetails || {};
    profile.documents= profile.documents || {}
    profile.personalInfo.fullName=req.body.fullName || profile.personalInfo.fullName;
    profile.personalInfo.profilePhoto=req.files?.profileImage?"http://"+req.host+"/uploads/"+req.files.profileImage[0].filename : profile.personalInfo.profilePhoto;

    profile.personalInfo.gender=req.body.gender || profile.personalInfo.gender;
    profile.personalInfo.email=req.body.email || profile.personalInfo.email;
    profile.personalInfo.dateOfBirth=req.body.dateOfBirth || profile.personalInfo.dateOfBirth;
    profile.personalInfo.phoneNumber=req.body.phoneNumber || profile.personalInfo.phoneNumber;
    profile.address.street=req.body.street || profile.address.street;
    profile.address.city=req.body.city || profile.address.city;
    profile.address.state=req.body.state || profile.address.state;
    profile.jobDetails.department=req.body.department || profile.jobDetails.department;
    profile.jobDetails.designation=req.body.designation || profile.jobDetails.designation;
    profile.jobDetails.employeeType=req.body.employeeType || profile.jobDetails.employeeType;
    profile.jobDetails.joiningDate=req.body.joiningDate || profile.jobDetails.joiningDate;
    profile.documents.aadhaarNumber=req.body.aadhaarNumber || profile.documents.aadhaarNumber;
    profile.documents.panNumber=req.body.panNumber || profile.documents.panNumber;
    profile.documents.idProofFile=req.files.idProof?"http://"+req.host+"/uploads/"+req.files.idProof[0].filename : profile.documents.idProofFile;


  await profile.save();
  res.status(200).json({success:true,msg:"Updated"})
  

  } catch (error) {
    res.status(500).json({msg:"Internal server Error"})
  }
})

officeStaffProfileRoute.get("/:profile_id",isAuthenticated,isAdmin,async()=>{
  try {
    const profileId=req.params.profile_id;
    const profileData= await OfficeStaff.findOne({_id:profileId});
    res.status(200).json({data:profileData})
  } catch (error) {
   res.status(500).json({msg:"Internal server error"}) 
  }
})


module.exports=officeStaffProfileRoute;
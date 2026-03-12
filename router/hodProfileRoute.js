const express= require('express');
const hodProfileRouter= express.Router();
const HodProfile= require('../models/hodProfile');
const path=require("path");

const adminProfile = require('../models/adminProfile');
const { default: Hod } = require('../models/hodProfile');
const upload = require('./uploadMiddleware');
const isHodProfileCreator=(req,res,next)=>{
      if(["admin","hod"].includes(req.session.role)){
        return next();
      }else{
        return res.status(403).json({error:"Forbidden"})
      }
};

const isAuthenticated=(req,res,next)=>{
  if(req.session && req.session.userSessionId){
    return next();
  }else{
    return res.status(401).json({error:"Unauthorized"})
  }
}


hodProfileRouter.post("/profile/:hodId",isAuthenticated,isHodProfileCreator,upload.single("photo"),async(req,res)=>{
try {
  const hodId = req.params.hodId;

const adminProfileData = await adminProfile.findOne({});
if(!adminProfileData){
  return res.status(404).json({error:"Admin Profile not found"})
}

  const existingProfile = await Hod.find({ hodId: hodId });
    
  if (existingProfile.length > 0) {
    return res.status(400).json({ error: "HOD Profile already exists" });
  }

  const {fullname,employeeId,dateOfBirth,gender,bloodGroup,phone,email,street,city,state,pincode,country,department,nationality,qualification,specialization,dateOfJoining,experience,designation,institution,role,from,to,subjectsHandling,officeRoomNumber,officeTimingsFrom,officeTimingsTo} = req.body;
  const photo = req.file ? "http://"+ req.host+"/uploads/"+ req.file.filename : null;
const hodProfile= await Hod.create({
  hodId,
  photo,
  fullname,
  employeeId,
  dateOfBirth,
  gender,
  bloodGroup,
  phone,
  email,
  address:{
  street,
  city,
  state,
  pincode,
  country},
  department,
  nationality,
  qualification,
  specialization,
  dateOfJoining,
  experience,
  previousExperience:[
    {
      institution,
      role,
      from,
      to
    }
  ],
  designation,
  subjectsHandling: subjectsHandling ? subjectsHandling.split(",") : [],
  officeRoomNumber: officeRoomNumber || null, 
  officeTimings: {
    from: officeTimingsFrom || null, 
    to: officeTimingsTo || null, 

  },
  reportingTo: adminProfileData._id
});
const hodUser= await user.findOne({_id:hodId});
hodUser.profileCreated=true;
await hodUser.save();

res.status(201).json({msg:"HOD Profile created successfully", data:hodProfile});
} catch (error) {
  console.error("Error creating HOD profile:", error.message);
  res.status(500).json({ error: error.message });
}
});


hodProfileRouter.get("/profile/:hodId",isAuthenticated,isHodProfileCreator,async(req,res)=>{
try {
  const hodId = req.params.hodId;
  const hodProfile = await Hod.findOne({ hodId });
  if (!hodProfile) {
    return res.status(404).json({ error: "HOD Profile not found" });
  }   
  res.status(200).json({ msg: "HOD Profile retrieved successfully", data: hodProfile });
} catch (error) {
  res.status(500).json({ error: error.message });
}
});

hodProfileRouter.put(
  "/profile/:hodId",
  isAuthenticated,
  isHodProfileCreator,
  upload.single("photo"),
  async (req, res) => {
    try {
      const hodId = req.params.hodId;

      const existingProfile = await Hod.findOne({ hodId });
      if (!existingProfile) {
        return res.status(404).json({ error: "HOD Profile not found" });
      }

      // =========================
      // Destructure Body Fields
      // =========================
      const {
        fullname,
        employeeId,
        dateOfBirth,
        gender,
        bloodGroup,
        phone,
        email,
        street,
        city,
        state,
        pincode,
        country,
        department,
        nationality,
        qualification,
        specialization,
        dateOfJoining,
        experience,
        designation,
        institution,
        role,
        from,
        to,
        subjectsHandling,
        officeRoomNumber,
        officeTimingsFrom,
        officeTimingsTo
      } = req.body;

      // =========================
      // Handle Photo Update
      // =========================
      let photoUrl = existingProfile.photo;

      if (req.file) {
        photoUrl =
          "http://" +
          req.get("host") +
          "/uploads/" +
          req.file.filename;
      }

      // =========================
      // Update Fields Safely
      // =========================
      existingProfile.fullname = fullname || existingProfile.fullname;
      existingProfile.employeeId = employeeId || existingProfile.employeeId;
      existingProfile.dateOfBirth = dateOfBirth || existingProfile.dateOfBirth;
      existingProfile.gender = gender || existingProfile.gender;
      existingProfile.bloodGroup = bloodGroup || existingProfile.bloodGroup;
      existingProfile.phone = phone || existingProfile.phone;
      existingProfile.email = email || existingProfile.email;
      existingProfile.department = department || existingProfile.department;
      existingProfile.nationality = nationality || existingProfile.nationality;
      existingProfile.qualification = qualification || existingProfile.qualification;
      existingProfile.specialization = specialization || existingProfile.specialization;
      existingProfile.dateOfJoining = dateOfJoining || existingProfile.dateOfJoining;
      existingProfile.experience = experience || existingProfile.experience;
      existingProfile.designation = designation || existingProfile.designation;
      existingProfile.photo = photoUrl;

      // =========================
      // Nested Address Update
      // =========================
      existingProfile.address = {
        street: street || existingProfile.address?.street,
        city: city || existingProfile.address?.city,
        state: state || existingProfile.address?.state,
        pincode: pincode || existingProfile.address?.pincode,
        country: country || existingProfile.address?.country,
      };

      // =========================
      // Subjects Handling (Array)
      // =========================
      if (subjectsHandling) {
        existingProfile.subjectsHandling = subjectsHandling.split(",");
      }

      // =========================
      // Office Timings
      // =========================
      existingProfile.officeRoomNumber =
        officeRoomNumber || existingProfile.officeRoomNumber;

      existingProfile.officeTimings = {
        from: officeTimingsFrom || existingProfile.officeTimings?.from,
        to: officeTimingsTo || existingProfile.officeTimings?.to,
      };

      // =========================
      // Previous Experience Update (Optional)
      // =========================
      if (institution && role && from && to) {
        existingProfile.previousExperience.push({
          institution,
          role,
          from,
          to,
        });
      }

      await existingProfile.save();
      res.status(200).json({
        msg: "HOD Profile updated successfully",
        data: existingProfile,
      });
    } catch (error) {
      console.error("Error updating HOD profile:", error.message);
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports=hodProfileRouter;
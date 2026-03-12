const express = require("express");
const adminProfileRoute = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const isAdmin = require("../middlewares/isAdmin");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const adminProfile = require("../models/adminProfile");

/* ---------------- MULTER SETUP ---------------- */

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

/* ---------------- ROUTE ---------------- */

adminProfileRoute.post(
  "/upload",
  isAuthenticated,
  isAdmin,
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "college", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const adminId = req.session.userSessionId;
     const existingProfile= await adminProfile.findOne({adminId:adminId});
     if(existingProfile){
      return res.status(200).json({message:"Profile already created"})
     }
      const profileImage =  
        (req.files?.profile) ? req.files.profile[0].  filename: null;

      const collegeImage =
        (req.files?.college) ? req.files.college[0].filename: null;
            console.log( req.files)

    
      const adminProfileData = await adminProfile.create({
        adminId,
       fullname:req.body.fullname,
       email:req.body.email,
       mobile_number:req.body.mobile_number,
        profile_photo: "http://" + req.host + "/uploads/" + profileImage,
        college: {
           college_name:req.body.college_name,
           college_code:req.body.college_code,
           college_email:req.body.college_email,
           college_mobile_number:req.body.college_mobile_number,
            started_year:req.body.started_year,
            address:{
               city: req.body.city,
    pin_code:req.body.pin_code,
    nationality:req.body.nationality,
    state:req.body.state,
    district:req.body.district,
    exact_location: req.body.exact_location,
            },
          college_logo: "http://" + req.host + "/uploads/" + collegeImage,
        }
      });
      
    console.log(req.body)
      res.status(201).json({
        message: "Profile created successfully",
        data:adminProfileData 
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
);



adminProfileRoute.put(
  "/upload/update",
  isAuthenticated,
  isAdmin,
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "college", maxCount: 1 }
    
  ]),
  async (req, res) => {
    try {
      const adminId = req.session.userSessionId;

       const profileImage =
       ( req.files?.profile) ? req.files.profile[0].  filename: null;

      const collegeImage =
        (req.files?.college )? req.files.college[0].filename: null;
            console.log( req.files)
     
      const  existingProfile= await adminProfile.findOne({adminId:adminId});
      if(!existingProfile){
        return res.status(404).json({msg:"Profile Not Found"})
      }
       existingProfile.fullname=req.body.fullname || existingProfile.fullname,
       existingProfile. email=req.body. email || existingProfile. email,
       existingProfile. mobile_number=req.body. mobile_number|| existingProfile. mobile_number,
       existingProfile. profile_photo=req.files?.profile? "http://" + req.host + "/uploads/" + profileImage : existingProfile.profile_photo
    existingProfile.college.college_name=req.body.college_name ||existingProfile.college.college_name
    existingProfile.college. college_code=req.body. college_code ||existingProfile.college. college_code
    existingProfile.college.  college_mobile_number=req.body.  college_mobile_number ||existingProfile.college.  college_mobile_number
    existingProfile.college.started_year=req.body.  started_year ||existingProfile.college.started_year
    existingProfile.college.email=req.body.email ||existingProfile.college.email
    existingProfile.college.  college_logo= req.files?.college?  "http://" + req.host + "/uploads/" + collegeImage :existingProfile.college?.college_logo
    existingProfile.college.address. city =req.body.   city ||existingProfile.college.address. city
    existingProfile.college.address. pin_code =req.body. pin_code ||existingProfile.college.address.  pin_code
    existingProfile.college.address.nationality =req.body.nationality||existingProfile.college.address. nationality
    existingProfile.college.address.state =req.body.state||existingProfile.college.address. state
    existingProfile.college.address.district =req.body.district||existingProfile.college.address. district
    existingProfile.college.address.exact_location =req.body.exact_location||existingProfile.college.address. exact_location
    await existingProfile.save();
      res.status(201).json({
        message: "Profile Updated  successfully",
        data:existingProfile 
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
);
adminProfileRoute.get('/profile',isAuthenticated,isAdmin,async(req,res)=>{
  try {
     const adminId= req.session.userSessionId;
     const profileData= await adminProfile.findOne({adminId:adminId}).populate("adminId");
     res.status(200).json({data:profileData})
  } catch (error) {
    res.status(500).json({msg:"Internal server error"})
  }
})
module.exports = adminProfileRoute;

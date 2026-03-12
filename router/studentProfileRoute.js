const express= require('express');
const studentProfileRoute= express.Router();
const isStudentRegister=require("../middlewares/isStudentRegister")

const isAuthenticated= require("../middlewares/isAuthenticated")
const user= require("../models/User");
const Student = require('../models/studentProfile');
const upload = require('./uploadMiddleware');


studentProfileRoute.post("/profile/:studentId",isAuthenticated,isStudentRegister,upload.fields([{name:"photo",maxCount:1},{name:"marksCard1",maxCount:2},{name:"marksCard2",maxCount:1}]),async(req,res)=>{
  try {
    const photo= (req.files?.photo)?"http://" + req.host + "/uploads/" + req.files.photo[0].filename :null;
    const tenthMarksCard= (req.files?.marksCard1)?"http://" + req.host + "/uploads/" + req.files.marksCard1[0].filename :null;
    const twelfthMarksCard= (req.files?.marksCard2)?"http://" + req.host + "/uploads/" + req.files.marksCard2[0].filename :null;

   const studentId=req.params.studentId;
   const StudentUser= await  user.findOne({_id:studentId});
   const existingProfile= await Student.findOne({studentId:studentId});
   if(existingProfile){
    return res.status(200).json({msg:"Profile Is already Created!"})
   }
   const rollNumber= req.body.rollNumber|| StudentUser.userId;
   const registrationNumber= req.body.registrationNumber || StudentUser.userId;

   const {
    firstName,
    middleName,
    lastName,
    gender,
    dateOfBirth,
    bloodGroup,
    category,
    nationality,
    religion,
    mobile,
    alternativeMobile,
    email,
    parentMobile,
    village,
    city,
    state,
    pinCode,
    country,
    course,
    department,
    year,
    semester,
    section,
    admissionDate,
    admissionType,
    totalYearFee,
    semFee,
  tenthPercentage,
  twelfthPercentage,
fatherName,
motherName,
fatherOccupation,
motherOccupation,
guardianContact
   }=req.body


   const  data= await Student(
   {
     studentId:studentId,
rollNumber:rollNumber,
registrationNumber:registrationNumber,
firstName:firstName,
middleName:middleName,
lastName:lastName,
gender:gender,
dateOfBirth:dateOfBirth,
bloodGroup:bloodGroup,
category:category,
nationality:nationality,
religion:religion,
photo:photo,
contact:{
  mobile:mobile,
  alternativeMobile:alternativeMobile,
  email:email,
  parentMobile:parentMobile,
  address:{
village:village,
city:city,
state:state,
pinCode:pinCode,
country:country,
  }
},
academicInfo:{
  course:course,
  department:department,
  year:year,
  semester:semester,
  section:section,
  admissionDate:admissionDate,
  admissionType:admissionType,
  fee:{
    totalYearFee:totalYearFee,
    semFee:semFee
  },
  previousQualification:{
    tenthPercentage:tenthPercentage,
    twelfthPercentage:twelfthPercentage,
    tenthMarksCard:tenthMarksCard,
    twelfthMarksCard:twelfthMarksCard,

  }
}
,guardianDetails:{
  fatherName:fatherName,
  motherName:motherName,
  fatherOccupation:fatherOccupation,
  motherOccupation:motherOccupation,
  guardianContact:guardianContact,
}
   })
  await data.save()

   StudentUser.profileCreated=true;
    await  StudentUser.save()
  res.status(200).json({data:data});
  } catch (error) {
  console.error("ERROR:", error);
  res.status(500).json({msg:"Internal Server Error", error: error.message})
}
})

studentProfileRoute.get(
  "/datas/:id",
  isAuthenticated,
  isStudentRegister,
  async (req, res) => {
    try {
      const id = req.params.id;

      const data = await Student.findOne({ studentId: id });
      if (!data) {
        return res.status(404).json({ msg: "Student not found" });
      }

      res.json({ msg: "Success", data:data });
    } catch (error) {
      res.status(500).json({ msg: "Internal Server Error!" });
    }
  }
);


studentProfileRoute.put(
  "/update/:id",
  isAuthenticated,
  isStudentRegister,
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "marksCard1", maxCount: 1 },
    { name: "marksCard2", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const studentId = req.params.id;

      const existingProfile = await Student.findOne({ studentId });

      if (!existingProfile) {
        return res.status(404).json({ msg: "Profile Not Found!" });
      }


      const photo = req.files?.photo
        ? `${req.protocol}://${req.get("host")}/uploads/${req.files.photo[0].filename}`
        : null;

      const tenthMarksCard = req.files?.marksCard1
        ? `${req.protocol}://${req.get("host")}/uploads/${req.files.marksCard1[0].filename}`
        : null;

      const twelfthMarksCard = req.files?.marksCard2
        ? `${req.protocol}://${req.get("host")}/uploads/${req.files.marksCard2[0].filename}`
        : null;



      existingProfile.contact = existingProfile.contact || {};
      existingProfile.contact.address =
        existingProfile.contact.address || {};

      existingProfile.academicInfo =
        existingProfile.academicInfo || {};

      existingProfile.academicInfo.fee =
        existingProfile.academicInfo.fee || {};

      existingProfile.academicInfo.previousQualification =
        existingProfile.academicInfo.previousQualification || {};

      existingProfile.guardianDetails =
        existingProfile.guardianDetails || {};

      existingProfile.firstName =
        req.body.firstName || existingProfile.firstName;

      existingProfile.middleName =
        req.body.middleName || existingProfile.middleName;

      existingProfile.lastName =
        req.body.lastName || existingProfile.lastName;

      existingProfile.gender =
        req.body.gender || existingProfile.gender;

      existingProfile.dateOfBirth =
        req.body.dateOfBirth || existingProfile.dateOfBirth;

      existingProfile.religion =
        req.body.religion || existingProfile.religion;

      existingProfile.nationality =
        req.body.nationality || existingProfile.nationality;

      existingProfile.bloodGroup =
        req.body.bloodGroup || existingProfile.bloodGroup;

      existingProfile.category =
        req.body.category || existingProfile.category;

      existingProfile.photo =
        photo || existingProfile.photo;


      existingProfile.contact.mobile =
        req.body.mobile || existingProfile.contact.mobile;

      existingProfile.contact.alternativeMobile =
        req.body.alternativeMobile ||
        existingProfile.contact.alternativeMobile;

      existingProfile.contact.email =
        req.body.email || existingProfile.contact.email;

      existingProfile.contact.parentMobile =
        req.body.parentMobile ||
        existingProfile.contact.parentMobile;

      existingProfile.contact.address.village =
        req.body.village ||
        existingProfile.contact.address.village;

      existingProfile.contact.address.city =
        req.body.city ||
        existingProfile.contact.address.city;

      existingProfile.contact.address.state =
        req.body.state ||
        existingProfile.contact.address.state;

      existingProfile.contact.address.pinCode =
        req.body.pinCode ||
        existingProfile.contact.address.pinCode;

      existingProfile.contact.address.country =
        req.body.country ||
        existingProfile.contact.address.country;


      existingProfile.academicInfo.course =
        req.body.course ||
        existingProfile.academicInfo.course;

      existingProfile.academicInfo.department =
        req.body.department ||
        existingProfile.academicInfo.department;

      existingProfile.academicInfo.year =
        req.body.year ||
        existingProfile.academicInfo.year;

      existingProfile.academicInfo.semester =
        req.body.semester ||
        existingProfile.academicInfo.semester;

      existingProfile.academicInfo.section =
        req.body.section ||
        existingProfile.academicInfo.section;

      existingProfile.academicInfo.admissionDate =
        req.body.admissionDate ||
        existingProfile.academicInfo.admissionDate;

      existingProfile.academicInfo.admissionType =
        req.body.admissionType ||
        existingProfile.academicInfo.admissionType;

      existingProfile.academicInfo.fee.totalYearFee =
        req.body.totalYearFee ||
        existingProfile.academicInfo.fee.totalYearFee;

      existingProfile.academicInfo.fee.semFee =
        req.body.semFee ||
        existingProfile.academicInfo.fee.semFee;

      existingProfile.academicInfo.previousQualification.tenthPercentage =
        req.body.tenthPercentage ||
        existingProfile.academicInfo.previousQualification.tenthPercentage;

      existingProfile.academicInfo.previousQualification.twelfthPercentage =
        req.body.twelfthPercentage ||
        existingProfile.academicInfo.previousQualification.twelfthPercentage;

      existingProfile.academicInfo.previousQualification.tenthMarksCard =
        tenthMarksCard ||
        existingProfile.academicInfo.previousQualification.tenthMarksCard;

      existingProfile.academicInfo.previousQualification.twelfthMarksCard =
        twelfthMarksCard ||
        existingProfile.academicInfo.previousQualification.twelfthMarksCard;


      existingProfile.guardianDetails.fatherName =
        req.body.fatherName ||
        existingProfile.guardianDetails.fatherName;

      existingProfile.guardianDetails.motherName =
        req.body.motherName ||
        existingProfile.guardianDetails.motherName;

      existingProfile.guardianDetails.fatherOccupation =
        req.body.fatherOccupation ||
        existingProfile.guardianDetails.fatherOccupation;

      existingProfile.guardianDetails.motherOccupation =
        req.body.motherOccupation ||
        existingProfile.guardianDetails.motherOccupation;

      existingProfile.guardianDetails.guardianContact =
        req.body.guardianContact ||
        existingProfile.guardianDetails.guardianContact;

      

      await existingProfile.save();

      res.status(200).json({
        success:true,
        msg: "Profile Updated Successfully!",
        data: existingProfile,
      });

    } catch (error) {
      console.error("UPDATE ERROR:", error);
      res.status(500).json({
        msg: "Internal Server Error",
        error: error.message,
      });
    }
  }
);

module.exports=studentProfileRoute;
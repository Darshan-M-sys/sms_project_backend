const express = require("express");
const user = require("../models/User");
const userRoute = express.Router();
const bcrypt= require("bcryptjs")
const isAuthenticated= require("../middlewares/isAuthenticated")
const isHODRegister=require("../middlewares/isHODRegister")
const nodemailer = require("nodemailer")
// principal Register 


const isStudentRegister=require("../middlewares/isStudentRegister")

userRoute.post("/student/register",isAuthenticated,isStudentRegister,async (req, res) => {
try {

  const { userId, email, phone_number, password, role } = req.body;
  

  const email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email_pattern.test(email)) {
    return res.status(200).json({ msg: "Wrong Email Pattern" });
  }

  const userid_pattern = /^[U]\d{2}[A-Z]{2}\d{2}[S]\d{4}$/;
  if (!userid_pattern.test(userId)) {
    return res
      .status(200)
      .json({ msg: "UserId must include only alphabets & numbers" });
  }
  const password_pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!password_pattern.test(password)) {
    return res.status(200).json({
      msg: "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character",
    });
  }
  const salt= await bcrypt.genSalt(10);
  const hashPassword= await bcrypt.hash(password,salt)
  const existing_user = await user.findOne({ $or: [{ userId }, { email }] });
  if (existing_user) {
    return res
      .status(200)
      .json({ msg: "The userId or Email already exists" });
  }
  const data = await user.create({
    userId,
    email,
    phone_number,
    role,
    password:hashPassword,
  });
 
  res.status(201).json({ msg: "Student Registered Successfully!", data,success:true });
} catch (error) {
  console.error(error);
  res.status(500).json({ msg: "Internal Server Error" });
}
})
// HOD Register


userRoute.post("/hod/register",isAuthenticated,isHODRegister,async (req, res) => {
try {
  const { userId, email, phone_number, password, role } = req.body;
  if(role==="admin" || role==="principal" || role==="student" || role==="officeStaff" || role==="teacher" ){
    return res.status(200).json({msg:"Unauthorized Access"})
  }
  const email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email_pattern.test(email)) {
    return res.status(200).json({ msg: "Wrong Email Pattern" });
  }

  const userid_pattern = /^[U]\d{2}[A-Z]{2}\d{2}[H]\d{4}$/;
  if (!userid_pattern.test(userId)) {
    return res
      .status(200)
      .json({ msg: "UserId must include only alphabets & numbers" });
  }
  const password_pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!password_pattern.test(password)) {
    return res.status(200).json({
      msg: "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character",
    });
  }
  const salt= await bcrypt.genSalt(10);
  const hashPassword= await bcrypt.hash(password,salt)
  const existing_user = await user.findOne({ $or: [{ userId }, { email }] });
  if (existing_user) {
    return res
      .status(200)
      .json({ msg: "The userId or Email already exists" });
  }
  const data = await user.create({
    userId,
    email,
    phone_number,
    role,
    password:hashPassword,
  });
 
  res.status(201).json({ msg: " Registered Successfully!", data,success:true });
} catch (error) {
  console.error(error);
  res.status(500).json({ msg: "Internal Server Error" });
}
});



 // office Staff Register
 
userRoute.post("/officestaff/register",isAuthenticated,isHODRegister,async (req, res) => {
try {
  const { userId, email, phone_number, password, role } = req.body;
  if(role==="admin" || role==="principal" || role==="student" || role==="hod" || role==="teacher" ){
    return res.status(200).json({msg:"Unauthorized Access"})
  } 
  const email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email_pattern.test(email)) {
    return res.status(200).json({ msg: "Wrong Email Pattern" });
  }

  const userid_pattern = /^[U]\d{2}[A-Z]{2}\d{2}[O]\d{4}$/;
  if (!userid_pattern.test(userId)) {
    return res
      .status(200)
      .json({ msg: "UserId must include only alphabets & numbers" });
  }
  const password_pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!password_pattern.test(password)) {
    return res.status(200).json({
      msg: "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character",
    });
  }
  const salt= await bcrypt.genSalt(10);
  const hashPassword= await bcrypt.hash(password,salt)
  const existing_user = await user.findOne({ $or: [{ userId }, { email }] });
  if (existing_user) {
    return res
      .status(200)
      .json({ msg: "The userId or Email already exists" });
  }
  const data = await user.create({
    userId,
    email,
    phone_number,
    role,
    password:hashPassword,
  });
 
  res.status(201).json({ msg: "Office Staff Registered Successfully!", data,success:true });
} catch (error) {
  console.error(error);
  res.status(500).json({ msg: "Internal Server Error" });
}
});


// Teacher Register
userRoute.post("/teacher/register",isAuthenticated,isHODRegister,async (req, res) => {
try {
  const { userId, email, phone_number, password, role } = req.body;
  if(role==="admin" || role==="principal" || role==="student" || role==="hod" || role==="officeStaff" ){
    return res.status(200).json({msg:"Unauthorized Access"})
  } 
  const email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email_pattern.test(email)) {
    return res.status(200).json({ msg: "Wrong Email Pattern" });
  }

  const userid_pattern = /^[U]\d{2}[A-Z]{2}\d{2}[T]\d{4}$/;
  if (!userid_pattern.test(userId)) {
    return res
      .status(200)
      .json({ msg: "UserId must include only alphabets & numbers" });
  }
  const password_pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!password_pattern.test(password)) {
    return res.status(200).json({
      msg: "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character",
    });
  }
  const salt= await bcrypt.genSalt(10);
  const hashPassword= await bcrypt.hash(password,salt)
  const existing_user = await user.findOne({ $or: [{ userId }, { email }] });
  if (existing_user) {
    return res
      .status(200)
      .json({ msg: "The userId or Email already exists" });
  }
  const data = await user.create({
    userId,
    email,
    phone_number,
    role,
    password:hashPassword,
  });
 
  res.status(201).json({ msg: "Teacher Registered Successfully!", data,success:true });
} catch (error) {
  console.error(error);
  res.status(500).json({ msg: "Internal Server Error" });
}
});

// Login 
userRoute.post("/login",async(req,res)=>{
try {
    const{userId,password,role}=req.body
    const existing_user=  await user.findOne({userId:userId,role:role});
    if(!existing_user){
    return res.status(200).json({msg:"User Not Found",success:false})
    }
  const is_match=await bcrypt.compare(password,existing_user.password) 
    if(!is_match){
    return res.status(200).json({msg:"Invalid Credentials!",success:false})
    }
    req.session.userSessionId=existing_user._id;
    req.session.userId=existing_user.userId;
    req.session.email=existing_user.email;
    req.session.role= existing_user.role;
    res.status(200).json({msg:"Login Successful!",success:true,type:"success"})
} catch (error) {
    res.status(500).json({msg:"Internal Server Error"})
}
})
// GET auth 
userRoute.get("/data",isAuthenticated,async(req,res)=>{
try {
  const userId= req.session.userSessionId;
if(!userId){
  res.status(401).json({msg:"Authentication is require"})
}
  const userData= await user.findOne({_id:userId});
  res.status(200).json({success:true,data:userData})
} catch (error) {
    res.status(500).json({msg:"Internal Server Error"})
}
});

userRoute.get("/datas/:role",isAuthenticated,isStudentRegister,async(req,res)=>{
  try {
    const userRole= req.params.role;
    const userData= await  user.find({role:userRole});
    res.status(200).json({data:userData});
  } catch (error) {
    res.status(500).json({msg:"Internal Server Error!"})
  }
})

userRoute.delete("/delete/:userId",isAuthenticated,isStudentRegister,async(req,res)=>{
  try {
    const userId=req.params.userId;
     await user.findByIdAndDelete({_id:userId});
    res.status(200).json({msg:"Deleted Success",success:true})
  } catch (error) {
    res.status(500).json({msg:"Internal Server Error"})
  }
})

userRoute.post("/forget/password", async (req, res) => {
  try {
    const { userId } = req.body;

    const existingUser = await user.findOne({ userId:userId });
    if (!existingUser) {
      return res.status(404).json({ msg: "UserID not registered"});
    }


    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    existingUser.resetOtp = otp;
    existingUser.resetOtpExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    await existingUser.save();

    const transporter = nodemailer.createTransport({
       service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS, 
      },
      tls: {
        rejectUnauthorized: false 
      }
    });

    await transporter.sendMail({
      from: `"College Management System" <${process.env.EMAIL}>`,
      to:  existingUser.email,
      subject: "College  Management System Password Reset OTP",
      html: `
        <h3>Your OTP is: ${otp}</h3>
        <p>Valid for 10 minutes</p>
      `,
      tls: {
    rejectUnauthorized: false
  }});

    res.json({  msg: "OTP sent to email" , success:true ,type:"success"});

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" ,type:"error" });
  }
});

userRoute.post("/verify-otp",async(req,res)=>{
  try {
    const{userId ,otp}=req.body;
    const registeredUserId= await user.findOne({userId:userId});
    if(!registeredUserId){
      return res.status(404).json({msg:"email Not found",type:"info"});
    }
  const verified= await user.findOne({userId:userId,resetOtp:otp,resetOtpExpire:{$gt:Date.now()}});
     
    if(verified){
      return res.status(200).json({msg:"Verified",success:true,type:"success"})
     }
     else{
      return res.status(200).json({msg:"Invalid otp or otp expired",type:"warning"})
  }
 } catch (error) {
    res.status(500).json({msg:"Internal Server error",type:"error"})
 }
})


userRoute.post("/reset_password", async (req, res) => {
  try {
    const { userId, otp, password } = req.body;

    // 1. Find user with valid OTP
    const ExistingUser = await user.findOne({
      userId,
      resetOtp: otp,
      resetOtpExpire: { $gt: Date.now() }
    });

    if (!ExistingUser) {
      return res.status(200).json({
        msg: "Invalid OTP or OTP expired",type:"warning"
      });
    }
    // 2. Password validation
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordPattern.test(password)) {
      return res.status(200).json({
        msg: "Password must be 8+ chars, include uppercase, lowercase, number & symbol",type:"info"
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);
    ExistingUser.password = hashPass;
    ExistingUser.resetOtp = undefined;
    ExistingUser.resetOtpExpire = undefined;

    await ExistingUser.save();

 
    res.status(200).json({
      msg: "Password reset successfully", type:"success",success:true
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal Server Error",type:"error"
    });
  }
});


userRoute.post("/logout", (req, res) => {
  req.session.destroy
  ((err) => {
    if (err) {
      return res.status(500).json({
        msg: "Logout failed",type:"error"
      });
    }

    res.clearCookie("connect.sid"); // default session cookie name

    res.status(200).json({
      msg: "Logged out successfully",type:"success"
    });
  });
});

module.exports = userRoute;

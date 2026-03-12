const mongoose=require("mongoose");
const userSchema= new mongoose.Schema({
  userId: {
  type: String,
  required: true,
  unique: true,
  trim: true},
  email:{type:String, required:true,unique:true},
  phone_number:{type:Number, required:true},
  password:{type:String,required:true},
  profileCreated:{type:Boolean,default:false},
  role:{type:String,enum:["admin","student","teacher","officeStaff","hod","principal"], default:"student"},resetOtp:{type:String},
  resetOtpExpire: Date
})
const user= mongoose.model("user", userSchema);
module.exports= user;

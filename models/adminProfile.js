const mongoose= require("mongoose");
const adminProfileSchema= new mongoose.Schema({
adminId:{type:mongoose.Schema.ObjectId, ref:"user",required:true},
fullname:{type:String,required:true},
email:{type:String,required:true},
mobile_number:{type:Number},
profile_photo:{type:String},
college:{
   college_name:{type:String},
   college_code:{type:String},
   college_email:{type:String},
   college_mobile_number:{type:Number},
   address:{
    city:{type:String},
    pin_code:{type:String},
    nationality:{type:String},
    state:{type:String},
    district:{type:String},
    exact_location:{type:String},

   },
   college_logo:{type:String},
   started_year:{type:String},
}
});

const adminProfile = mongoose.model("adminProfile",adminProfileSchema)

module.exports= adminProfile;
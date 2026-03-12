const mongoose = require("mongoose");

const officeStaffSchema = new mongoose.Schema({
  userId:{
 type:mongoose.Schema.ObjectId,ref:"User"
  },
  staffId: {
    type: String,
    required: true,
    unique: true
  },

  personalInfo: {
    fullName: {
      type: String,
      required: true
    },
    profilePhoto: {
      type: String
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"]
    },
    dateOfBirth: {
      type: Date
    },
    phoneNumber: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    }
  },

  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },

  jobDetails: {
    department: {
      type: String,
      required: true
    },
    designation: {
      type: String
    },
    employeeType: {
      type: String,
      enum: ["Permanent", "Contract", "Temporary"]
    },
    joiningDate: {
      type: Date
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active"
    }
  },

  documents: {
    aadhaarNumber: String,
    panNumber: String,
    idProofFile: String
  }
}, {
  timestamps: true
});

const OfficeStaff = mongoose.model("OfficeStaff", officeStaffSchema);
module.exports=OfficeStaff;
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    rollNumber: {
      type: String,
      unique: true,
      required: true,
    },

    registrationNumber: {
      type: String,
      unique: true,
      required: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    middleName: {
      type: String,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    dateOfBirth: {
      type: String,
    },

    bloodGroup: {
      type: String,
    },

    category: {
      type: String,
    },

    nationality: {
      type: String,
      default: "Indian",
    },

    religion: {
      type: String,
    },

    photo: {
      type: String,
    },

    contact: {
      mobile: { type: String },
      alternativeMobile: { type: String },
      email: { type: String },
      parentMobile: { type: String },

      address: {
        village: { type: String },
        city: { type: String },
        state: { type: String },
        pinCode: { type: String },
        country: { type: String, default: "India" },
      },
    },

    academicInfo: {
      course: { type: String, required: true },
      department: { type: String, required: true },
      year: { type: String },
      semester: { type: String },
      section: { type: String, default: "A" },

      admissionDate: {
        type: String,
        default: Date.now,
      },

      admissionType: { type: String },

      fee: {
        totalYearFee: { type:String },
        semFee: { type: String },
      },

      previousQualification: {
        tenthPercentage: { type: String },
        twelfthPercentage: { type: String },
        tenthMarksCard: { type: String },
        twelfthMarksCard: { type: String },
      },
    },

    guardianDetails: {
      fatherName: { type: String },
      motherName: { type: String },
      fatherOccupation: { type: String },
      motherOccupation: { type: String },
      guardianContact: { type: String },
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

module.exports=Student;
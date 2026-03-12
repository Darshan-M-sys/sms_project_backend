import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const hodSchema = new mongoose.Schema(
  {
    hodId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },

    photo: {
      type: String, // store Cloudinary / image URL
      default: "",
    },

    employeeId: {
      type: String,
      required: true,
      unique: true,
    },

    dateOfBirth: {
      type: Date,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    bloodGroup: {
      type: String,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    address: {
      street: String,
      city: String,
      state: String,
      pinCode: String,
      country: String,
    },

    nationality: String,

    // =========================
    // PROFESSIONAL INFORMATION
    // =========================
    department: {
      type: String,
      required: true,
    },

    qualification: {
      type: String,
      required: true,
    },

    specialization: String,

    dateOfJoining: {
      type: Date,
      required: true,
    },

    experience: {
      type: Number, // in years
      default: 0,
    },

    designation: {
      type: String,
      default: "HOD",
    },

    previousExperience: [
      {
        institution: String,
        role: String,
        from: Date,
        to: Date,
      },
    ],

    subjectsHandling: [
      {
        type: String,
      },
    ],

    researchArea: [
      {
        type: String,
      },
    ],

    officeRoomNumber: String,
    officeTimings: {
      from: String,
      to: String,
    },

    reportingTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "adminProfile", // Principal or Director
    },

    departmentStaff: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
      },
    ],

    totalStudents: {
      type: Number,
      default: 0,
    },

    // =========================
    // ACADEMIC CONTRIBUTIONS
    // =========================
    researchPapers: [
      {
        title: String,
        journal: String,
        year: Number,
      },
    ],

    booksPublished: [
      {
        title: String,
        publisher: String,
        year: Number,
      },
    ],

    conferencesAttended: [
      {
        name: String,
        location: String,
        year: Number,
      },
    ],

    awards: [
      {
        title: String,
        year: Number,
        description: String,
      },
    ],

    projectsGuided: [
      {
        title: String,
        year: Number,
        description: String,
      },
    ],

    workshopsConducted: [
      {
        title: String,
        date: Date,
        description: String,
      },
    ],

    // =========================
    // AUTH & SYSTEM FIELDS
    // =========================
 
      isActive: {
        type: Boolean,
        default: true,
      },
  },
  { timestamps: true }
);


const Hod = mongoose.model("Hod", hodSchema);

export default Hod;
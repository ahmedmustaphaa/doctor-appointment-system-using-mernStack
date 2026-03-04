import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import { Doctor } from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
export const AddDoctor = async (req, res) => {
  try {
    const {
      name,  email, password,specialty,degree,about,fees,experience,address,
    } = req.body;

    if (!name || !email || !password || !specialty) {
      return res.status(400).json({
        success: false,
        message: "Name, Email, Password and Specialty are required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: "Doctor already exists with this email",
      });
    }
    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "doctors",
      });
      imageUrl = result.secure_url;
    }

    console.log(req.file);

    const hashedPassword = await bcrypt.hash(password, 10);
    const doctor = await Doctor.create({
      name,
      email,
      password: hashedPassword,
      specialty,
      degree: degree || "",
      about: about || "",
      fees: fees || 0,
      experience: experience || "",
      address: address || "",
      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Doctor added successfully",
      doctor,
    });

  } catch (error) {
    console.error("AddDoctor Error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};



export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { email, password },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.json({
        success: true,
        message: "Login successful",
        token
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });

  } catch (error) {
    console.error("LoginAdmin Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().select("-password").sort({createdAt:-1});    
    res.json({
      success: true,
      doctors,
    });
  } 
  catch (error) {   
    console.error("GetDoctors Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }     
};        
export const DoctorList=async(req,res)=>{
  try{

    const doctoors=await Doctor.find().select("-password -email").sort({createdAt:-1});
    res.json({
      success: true,
      doctors: doctoors,
    });

  }catch(error){  
    console.error("DoctorList Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  } 
}

export const getDoctorById = async (req, res) => {
  try {
    const { docId } = req.params;
     

    const doctor = await Doctor.findById(docId);

    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    // related doctors
    const relatedDoctors = await Doctor.find({
      speciality: doctor.speciality,
      _id: { $ne: doctor._id }
    }).limit(4);

    res.json({
      success: true,
      doctor,
      relatedDoctors
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
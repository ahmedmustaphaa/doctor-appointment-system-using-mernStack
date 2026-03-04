import jwt from 'jsonwebtoken';
import {User} from '../models/User.js'
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { Doctor } from '../models/doctorModel.js';
dotenv.config();
import{v2 as cloudinary} from 'cloudinary'
import { Appointment } from '../models/Appointment.js';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// ===========================
// REGISTER
// ===========================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1️⃣ validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    // 2️⃣ check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3️⃣ hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ create & save user
    const user = await User.create({ name, email, password: hashedPassword });

    // 5️⃣ generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "10d" }
    );

    // 6️⃣ send response (بدون باسورد)
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ validation
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    // 2️⃣ check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3️⃣ compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 4️⃣ generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "10d" }
    );

    // 5️⃣ send response (بدون باسورد)
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getProfile = async (req, res) => {
  try {
    const userId = req.userId; // 🔹 خد الـ ID من middleware مباشرة


    const userData = await User.findById(userId).select("-password");

    if (!userData) return res.status(404).json({ message: "User not found" });

    res.json({ success: true, userData });
  } catch (error) {
    console.error("Error getting user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const updateProfileData=async(req,res)=>{
  try{
    const userId=req.userId
    const {name,email,address,dob,phone,gender}=req.body;
    const imageFile=req.file
    if(imageFile){
      const uploadImage=await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'});
      const imageUrl=uploadImage.secure_url;
      await User.findByIdAndUpdate(userId,{image:imageUrl})
    }
    res.json({success:true,message:"profile Updated"})
    await User.findByIdAndUpdate(userId,{name,email,address,dob,phone,gender})
  }catch (error) {
    console.error("Error getting user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
}




// دالة حجز موعد
export const bookAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { slotTime, slotDate, doctorId } = req.body;

    if (!slotTime || !slotDate || !doctorId) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // 🔹 جلب الدكتور مع استبعاد الباسورد
    const doctor = await Doctor.findById(doctorId).select("-password");
    if (!doctor) return res.status(404).json({ success: false, message: "Doctor not found" });

    if (!doctor.available) {
      return res.status(400).json({ success: false, message: "Doctor not available" });
    }

    // 🔹 التأكد من عدم حجز الوقت مسبقًا
    let slots_booked = doctor.slots_booked || {};

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.status(400).json({ success: false, message: "Slot not available" });
      }
      slots_booked[slotDate].push(slotTime);
    } else {
      slots_booked[slotDate] = [slotTime];
    }

    // 🔹 تحديث الدكتور بالslots_booked الجديدة
    doctor.slots_booked = slots_booked;
    await doctor.save();

    // 🔹 جلب بيانات المستخدم
    const userData = await User.findById(userId).select("-password");

    // 🔹 إنشاء الحجز في جدول Appointments
    const appointment = await Appointment.create({
      userId,
      doctorId,
      slotDate,
      slotTime,
      userData: {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
      },
      doctorData: {
        name: doctor.name,
        speciality: doctor.specialty,
        image: doctor.image,
        amount: doctor.fees,
      },
      amount: doctor.fees,
      cancelled: false,
      payment: false,
      isCompleted: false,
    });

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment,
      doctorSlots: doctor.slots_booked, // 🔹 نرجع المواعيد بعد التحديث
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    const userId = req.userId;
    const userAppointments = await Appointment.find({ userId }).sort({ slotDate: 1, slotTime: 1 });
    res.status(200).json({
      success: true,
      appointments: userAppointments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const cancelAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) return res.status(404).json({ success: false, message: "Appointment not found" });
    
    if (appointment.userId.toString() !== userId) return res.status(403).json({ success: false, message: "Not authorized" });

    // إذا كان ملغي بالفعل، أرسل نجاح لأن الهدف تحقق (لتجنب تعليق الفرونت إيند)
    if (appointment.cancelled) {
      return res.json({ success: true, message: "Appointment already cancelled" });
    }

    const doctor = await Doctor.findById(appointment.doctorId);
    if (doctor && doctor.slots_booked && doctor.slots_booked[appointment.slotDate]) {
      doctor.slots_booked[appointment.slotDate] = doctor.slots_booked[appointment.slotDate].filter(
        (time) => time !== appointment.slotTime
      );

      if (doctor.slots_booked[appointment.slotDate].length === 0) {
        delete doctor.slots_booked[appointment.slotDate];
      }
      
      doctor.markModified('slots_booked'); // ضمان حفظ التغييرات في الـ Object
      await doctor.save();
    }

    appointment.cancelled = true;
    await appointment.save();

    res.json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const paymentStripe = async (req, res) => {
    try {
        const { appointmentId } = req.body; // استلم رقم الحجز
        const userId = req.userId; // المعرف من الـ middleware

        // 1. جلب بيانات الموعد من الداتا بيز للتأكد من السعر
        const appointmentData = await Appointment.findById(appointmentId);
        
        if (!appointmentData || appointmentData.cancelled) {
            return res.status(404).json({ success: false, message: "Appointment not found or cancelled" });
        }

        // 2. التأكد إن اللي بيدفع هو صاحب الموعد
        if (appointmentData.userId.toString() !== userId) {
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }

        // 3. إنشاء "نية دفع" مع إضافة بيانات الحجز
        const paymentIntent = await stripe.paymentIntents.create({
            amount: appointmentData.amount * 100, // السعر من الداتا بيز مباشرة أضمن
            currency: 'usd', 
            payment_method_types: ['card'],
            metadata: { 
                appointmentId: appointmentId.toString(), // ربط الفلوس بالحجز
                userId: userId.toString()
            },
        });

        // 4. الرد بالـ clientSecret
        res.json({
            success: true,
            clientSecret: paymentIntent.client_secret,
            appointmentId // رجعه للفرونت عشان تستخدمه هناك
        });

    } catch (error) {
        console.error("Stripe Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const verifyStripe = async (req, res) => {
    try {
        const { appointmentId, success } = req.body;

        if (success === "true" || success === true) {
            // تحديث حالة الدفع في الداتا بيز
            await Appointment.findByIdAndUpdate(appointmentId, { payment: true });
            res.json({ success: true, message: "Payment updated in database" });
        } else {
            res.json({ success: false, message: "Payment failed" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};
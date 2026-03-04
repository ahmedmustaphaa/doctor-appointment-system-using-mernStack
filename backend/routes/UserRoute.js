import express from "express";
import { registerUser,loginUser, getProfile, updateProfileData, bookAppointment, getMyAppointments, cancelAppointment, paymentStripe, verifyStripe } from "../controllers/Authrization.js";
import { authMiddleware } from "../middleware/Auth.js";
import { upload } from "../middleware/multer.js";
const  userRouter=express.Router();

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/get-profile",authMiddleware,getProfile)
userRouter.post("/book-appointment",authMiddleware,bookAppointment)
userRouter.get("/get-appointment",authMiddleware, getMyAppointments);
userRouter.post("/update-profile",authMiddleware,upload.single('image'),updateProfileData)
userRouter.delete(
  "/cancel-appointment/:appointmentId",
  authMiddleware, // للتأكد إن المستخدم متسجل دخول
  cancelAppointment
);
export default userRouter; 

userRouter.post('/payment-stripe', authMiddleware, paymentStripe);

// راوت التأكيد بعد نجاح الدفع (تحديث الداتا بيز)
userRouter.post('/verify-stripe', authMiddleware, verifyStripe);
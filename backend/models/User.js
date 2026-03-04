import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String  },                        // عنوان المستخدم
  image: { type: String },                          // رابط الصورة
  gender: { type: String,default:"not selected " }, // نوع الجنس
  dob: { type: Date },                              // تاريخ الميلاد
  phone: { type: String }                           // رقم الهاتف
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);

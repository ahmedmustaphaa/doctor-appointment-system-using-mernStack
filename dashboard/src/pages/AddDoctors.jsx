import React, { useState } from "react";
import axiosInstance from "../pai/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Lock, Award, Briefcase, MapPin, 
  DollarSign, Stethoscope, FileText, Upload, Camera, Sparkles
} from "lucide-react";

const initialDoctorData = {
  name: "", email: "", password: "", image: null,
  specialty: "General physician", degree: "",
  about: "", experience: 0, address: "", fees: 0,
};

function AddDoctors() {
  const [doctorData, setDoctorData] = useState(initialDoctorData);
  const [isUploading, setIsUploading] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData((prev) => ({
      ...prev,
      [name]: name === "experience" || name === "fees" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDoctorData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      const formData = new FormData();
      Object.entries(doctorData).forEach(([key, value]) => {
        if (value !== null) formData.append(key, value);
      });

      await axiosInstance.post("/admin/addDoctor", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("تم إضافة الطبيب بنجاح! 🚀");
      setDoctorData(initialDoctorData);
    } catch (error) {
      toast.error(error.response?.data?.message || "حدث خطأ ما");
    } finally {
      setIsUploading(false);
    }
  };

  const inputFields = [
    { name: "name", type: "text", placeholder: "اسم الطبيب", icon: User },
    { name: "email", type: "email", placeholder: "البريد الإلكتروني", icon: Mail },
    { name: "password", type: "password", placeholder: "كلمة المرور", icon: Lock },
    { name: "degree", type: "text", placeholder: "الدرجة العلمية", icon: Award },
    { name: "experience", type: "number", placeholder: "سنوات الخبرة", icon: Briefcase },
    { name: "address", type: "text", placeholder: "العنوان", icon: MapPin },
    { name: "fees", type: "number", placeholder: "قيمة الكشف ($)", icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] p-3 md:p-8 lg:p-10 font-['Cairo'] pb-32 md:pb-10">
      <ToastContainer theme="colored" position="bottom-right" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8"
      >
        {/* Right Side: Advanced Form (Order 1 on Mobile) */}
        <div className="order-1 lg:order-2 lg:col-span-8 bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] border border-slate-100">
          <div className="mb-8 md:mb-12">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-600 rounded-lg text-white">
                    <Sparkles size={20} />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">إضافة طبيب جديد</h2>
            </div>
            <p className="text-slate-400 font-bold text-xs md:text-sm">قم بتعبئة البيانات بدقة لإنشاء الملف الشخصي للطبيب</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            {/* Image Upload Zone */}
            <div className="relative">
              <label className="group flex flex-col items-center justify-center w-full h-32 md:h-40 border-2 border-dashed border-slate-200 rounded-[1.5rem] md:rounded-[2rem] cursor-pointer hover:bg-blue-50/50 hover:border-blue-400 transition-all duration-300">
                <div className="flex flex-col items-center justify-center">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl mb-2 group-hover:scale-110 transition-transform">
                    <Upload size={20} />
                  </div>
                  <p className="text-xs md:text-sm font-black text-slate-600">ارفع صورة الطبيب</p>
                </div>
                <input type="file" onChange={handleFileChange} className="hidden" />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {inputFields.map((field) => (
                <div key={field.name} className="space-y-1.5 md:space-y-2">
                  <label className="text-[10px] md:text-xs font-black text-slate-400 mr-2 uppercase tracking-tighter">{field.placeholder}</label>
                  <div className="relative group">
                    <field.icon className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={16} />
                    <input
                      type={field.type}
                      name={field.name}
                      value={doctorData[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required={field.name === "name" || field.name === "email"}
                      className="w-full bg-slate-50/50 border border-slate-100 rounded-xl md:rounded-2xl py-3.5 md:py-4 pr-11 pl-4 text-sm font-bold outline-none focus:bg-white focus:border-blue-500/50 transition-all"
                    />
                  </div>
                </div>
              ))}

              <div className="space-y-1.5 md:space-y-2">
                <label className="text-[10px] md:text-xs font-black text-slate-400 mr-2 uppercase tracking-tighter">التخصص</label>
                <div className="relative">
                  <Stethoscope className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                  <select
                    name="specialty"
                    value={doctorData.specialty}
                    onChange={handleChange}
                    className="w-full bg-slate-50/50 border border-slate-100 rounded-xl md:rounded-2xl py-3.5 md:py-4 pr-11 pl-4 text-sm font-bold outline-none appearance-none focus:bg-white focus:border-blue-500/50 transition-all"
                  >
                    {["General physician", "Gynecologist", "Dermatologist", "Neurologist", "Pediatricians"].map(opt => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 md:space-y-2">
              <label className="text-[10px] md:text-xs font-black text-slate-400 mr-2 uppercase tracking-tighter">نبذة عن الطبيب</label>
              <div className="relative">
                <FileText className="absolute right-4 top-4 text-slate-300" size={16} />
                <textarea
                  name="about"
                  value={doctorData.about}
                  onChange={handleChange}
                  placeholder="اكتب هنا مسيرة الطبيب..."
                  className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl md:rounded-3xl py-4 pr-11 pl-4 text-sm font-bold outline-none focus:bg-white focus:border-blue-500/50 h-28 md:h-32 resize-none transition-all"
                />
              </div>
            </div>

            <button
              disabled={isUploading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 md:py-5 rounded-2xl md:rounded-[2rem] shadow-xl shadow-blue-200 flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50"
            >
              {isUploading ? "جاري الحفظ..." : "تأكيد وإضافة الطبيب"}
              {!isUploading && <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity }}>🚀</motion.span>}
            </button>
          </form>
        </div>

        {/* Left Side: Preview Card (Order 2 on Mobile - Sticky on Desktop) */}
        <div className="order-2 lg:order-1 lg:col-span-4">
          <div className="lg:sticky lg:top-10 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-900 rounded-[2rem] md:rounded-[3rem] p-6 md:p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50"></div>
            
            <h2 className="text-lg font-black mb-6 md:mb-10 border-b border-white/10 pb-4 tracking-tight flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                معاينة الحساب
            </h2>
            
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border-4 border-white/10 shadow-2xl transition-transform duration-500">
                  {doctorData.image ? (
                    <img src={URL.createObjectURL(doctorData.image)} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center text-4xl opacity-50">👨‍⚕️</div>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-blue-500 p-2.5 rounded-xl shadow-lg border-2 border-slate-900">
                  <Camera size={16} />
                </div>
              </div>

              <div className="mt-6 md:mt-8 text-center space-y-2">
                <h3 className="text-xl md:text-2xl font-black truncate max-w-full px-4">{doctorData.name || "اسم الطبيب"}</h3>
                <span className="inline-block px-3 py-0.5 bg-blue-500/20 rounded-lg text-blue-300 text-[10px] font-black uppercase tracking-widest border border-blue-500/30">
                  {doctorData.specialty}
                </span>
                <p className="text-slate-400 text-xs font-bold pt-1 truncate px-4">
                   {doctorData.degree || "المؤهل العلمي غير محدد"}
                </p>
              </div>

              <div className="w-full grid grid-cols-2 gap-3 md:gap-4 mt-8 md:mt-10">
                <div className="bg-white/5 p-3 md:p-4 rounded-2xl md:rounded-3xl border border-white/5 text-center backdrop-blur-sm">
                   <p className="text-[9px] md:text-[10px] text-slate-500 uppercase font-black tracking-widest">الخبرة</p>
                   <p className="text-base md:text-lg font-black">{doctorData.experience} سنة</p>
                </div>
                <div className="bg-white/5 p-3 md:p-4 rounded-2xl md:rounded-3xl border border-white/5 text-center backdrop-blur-sm">
                   <p className="text-[9px] md:text-[10px] text-slate-500 uppercase font-black tracking-widest">الكشف</p>
                   <p className="text-base md:text-lg font-black font-sans">${doctorData.fees}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default AddDoctors;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./pai/axios";
import { ShareDashData } from "../context/Appcontext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
import { motion } from "framer-motion";
// استيراد الأيقونات من Lucide
import { Mail, Lock, Loader2, ShieldCheck, ArrowRight } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setAtoken } = ShareDashData();
  const incookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    const token = incookies.get("token");
    if (token) setAtoken(token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/admin/login", { email, password });
      if (data.success) {
        setAtoken(data.token);
        incookies.set("token", data.token, { path: "/" });
        toast.success("تم الدخول بنجاح.. جاري التحويل");
        setTimeout(() => {
          setLoading(false);
          navigate("/dashboard");
        }, 1500);
      } else {
        throw new Error(data.message || "بيانات الدخول غير صحيحة");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "حدث خطأ في الاتصال");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden font-['Cairo']">
      
      {/* Abstract Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <ToastContainer theme="dark" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[440px] z-10 p-4"
      >
        <div className="bg-[#0f1115] border border-white/5 rounded-[3rem] p-8 md:p-12 shadow-2xl relative">
          
          {/* Logo Section */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 rotate-3 hover:rotate-0 transition-transform duration-300 shadow-xl shadow-blue-600/20">
              <ShieldCheck size={32} color="white" strokeWidth={2.5} />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">بوابة المدير</h1>
            <p className="text-slate-500 text-xs mt-2 font-bold uppercase tracking-widest">Admin Authorization</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mr-2">البريد الإلكتروني</label>
              <div className="relative group">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 pr-12 pl-4 text-white text-sm outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-700"
                  placeholder="name@admin.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mr-2">كلمة المرور</label>
              <div className="relative group">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 pr-12 pl-4 text-white text-sm outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-700"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              disabled={loading}
              className="group relative w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 overflow-hidden disabled:opacity-50 active:scale-95 shadow-lg shadow-blue-900/20"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <span>تسجيل الدخول</span>
                  <ArrowRight size={18} className="group-hover:translate-x-[-4px] transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Bottom Link */}
          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <span className="text-[10px] text-slate-600 font-bold tracking-widest uppercase">Protected by Advanced Security</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
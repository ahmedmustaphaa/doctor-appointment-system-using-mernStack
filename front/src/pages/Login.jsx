import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
// هتحتاج تسطب دي: npm install @tabler/icons-react
import { IconMail, IconLock, IconUser, IconArrowRight, IconLoader2, IconStethoscope } from "@tabler/icons-react";
import axiosInstance from "../../api/axios";
import { useShareContext } from "../context/AppContext";

// التحقق من البيانات - Schema (نفس المنطق)
const loginSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

const registerSchema = z.object({
  name: z.string().min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setToken } = useShareContext();

  const schema = isRegister ? registerSchema : loginSchema;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const endpoint = isRegister ? "/user/register" : "/user/login";
      const { data } = await axiosInstance.post(endpoint, formData);
      
      if (data.token) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
      }
      reset();
    } catch (error) {
      alert(error.response?.data?.message || "حدث خطأ ما");
    } finally {
      setIsLoading(false);
    }
  };

  // Variants للانيميشن بتاع الفورم
  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.1 } },
    exit: { opacity: 0, x: -20 }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex bg-[#0F172A] font-sans selection:bg-cyan-500/20 antialiased overflow-hidden">
      
      {/* ----------------- الجانب الأيسر: البصري (The Visual Side) ----------------- */}
      <div className="relative hidden lg:flex lg:w-1/2 items-center justify-center p-12 overflow-hidden">
        {/* خلفية تفاعلية (Abstract 3D Shape pattern) */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dotPattern" patternUnits="userSpaceOnUse" width="32" height="32">
                <circle cx="1" cy="1" r="1" fill="#94A3B8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dotPattern)" />
          </svg>
        </div>
        
        {/* عنصر بصري متحرك (Advanced 3D-like Effect) */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 w-full max-w-lg aspect-square"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur-[120px] opacity-30 animate-pulse" />
          <div className="relative bg-[#1E293B]/50 backdrop-blur-3xl border border-slate-700/50 rounded-full w-full h-full flex items-center justify-center p-16 shadow-[0_0_100px_rgba(6,182,212,0.15)]">
            <IconStethoscope className="w-full h-full text-cyan-400 opacity-90" strokeWidth={1} />
          </div>
        </motion.div>

        {/* تيكست إضافي فخم */}
        <div className="absolute bottom-16 left-16 z-20 max-w-sm">
          <h1 className="text-4xl font-extrabold text-white leading-tight tracking-tighter">
            مستقبل الرعاية الطبية، <span className="text-cyan-400">بين يديك.</span>
          </h1>
          <p className="text-slate-400 mt-4 text-lg font-medium">
            منصة ذكية لإدارة المواعيد، مصممة بدقة لتعزيز كفاءة عيادتك وتجربة مرضاك.
          </p>
        </div>
      </div>

      {/* ----------------- الجانب الأيمن: الوظيفي (The Form Side) ----------------- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-20 bg-white rounded-l-[40px] shadow-[-20px_0_60px_rgba(0,0,0,0.1)] z-10">
        <div className="w-full max-w-md">
          
          {/* الـ Header */}
          <div className="mb-12">
            <motion.div layout className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-cyan-500/10 rounded-xl">
                  <IconStethoscope className="w-8 h-8 text-cyan-600" />
                </div>
                <span className="text-2xl font-bold text-slate-950 tracking-tight">Medico<span className="text-cyan-600">Book</span></span>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={isRegister ? "reg-title" : "log-title"}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-4xl font-extrabold text-slate-950 tracking-tighter leading-tight">
                  {isRegister ? "ابدأ رحلتك الرقمية" : "مرحباً بك مجدداً دكتور"}
                </h2>
                <p className="text-slate-600 mt-3 text-lg font-medium">
                  {isRegister ? "أنشئ حسابك للوصول إلى أدوات الإدارة المتقدمة." : "سجل دخولك لمتابعة جدول مواعيدك ومرضاك."}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ================== Form ================== */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence mode="popLayout">
              {isRegister && (
                <motion.div
                  key="name-input"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="relative group"
                >
                  <IconUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-600 w-5 h-5 transition-colors" />
                  <input
                    {...register("name")}
                    placeholder="الاسم الكامل للدكتور"
                    className="w-full pl-12 pr-4 py-4.5 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all outline-none text-slate-900 placeholder:text-slate-400 font-medium text-lg shadow-sm"
                  />
                  {errors.name && <p className="text-rose-600 text-sm mt-1.5 ml-2 font-medium">{errors.name.message}</p>}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div variants={itemVariants} className="relative group">
              <IconMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-600 w-5 h-5 transition-colors" />
              <input
                {...register("email")}
                placeholder="البريد الإلكتروني المهني"
                className="w-full pl-12 pr-4 py-4.5 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all outline-none text-slate-900 placeholder:text-slate-400 font-medium text-lg shadow-sm"
              />
              {errors.email && <p className="text-rose-600 text-sm mt-1.5 ml-2 font-medium">{errors.email.message}</p>}
            </motion.div>

            <motion.div variants={itemVariants} className="relative group">
              <IconLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-600 w-5 h-5 transition-colors" />
              <input
                type="password"
                {...register("password")}
                placeholder="كلمة المرور"
                className="w-full pl-12 pr-4 py-4.5 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all outline-none text-slate-900 placeholder:text-slate-400 font-medium text-lg shadow-sm"
              />
              {errors.password && <p className="text-rose-600 text-sm mt-1.5 ml-2 font-medium">{errors.password.message}</p>}
            </motion.div>

            {!isRegister && (
                <div className="flex justify-end ml-2">
                    <button type="button" className="text-cyan-700 font-semibold hover:text-cyan-800 transition">نسيت كلمة المرور؟</button>
                </div>
            )}

            <motion.button
              variants={itemVariants}
              whileHover={{ y: -2 }}
              whileTap={{ y: 1 }}
              disabled={isLoading}
              type="submit"
              className="w-full bg-slate-950 hover:bg-slate-800 text-white py-4.5 rounded-2xl font-bold shadow-lg shadow-slate-950/10 transition-all flex items-center justify-center gap-3 group text-lg"
            >
              {isLoading ? (
                <IconLoader2 className="w-6 h-6 animate-spin text-cyan-400" />
              ) : (
                <>
                  {isRegister ? "إنشاء حساب الطبيب" : "دخول آمن للوحة التحكم"}
                  <IconArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-cyan-400" />
                </>
              )}
            </motion.button>
          </form>

          {/* ================== Switch ================== */}
          <div className="mt-12 text-center">
            <p className="text-slate-600 font-medium text-lg">
              {isRegister ? "لديك حساب بالفعل؟" : "ليس لديك حساب طبيب؟"}
              <button
                onClick={() => {
                  setIsRegister(!isRegister);
                  reset();
                }}
                className="text-cyan-700 font-bold ml-2 hover:underline decoration-2 underline-offset-4"
              >
                {isRegister ? "تسجيل دخول" : "ابدأ الآن مجاناً"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
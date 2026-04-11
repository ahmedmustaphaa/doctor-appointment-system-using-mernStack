import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { motion } from "framer-motion";

function BookAppointment() {
  return (
    <section dir="rtl" className="relative w-[92%] max-w-7xl mx-auto py-20 bg-[#fafdfc] overflow-hidden">
      
      {/* 1. زينة خلفية (Abstract Glow) - عشان البانر الأبيض يبان */}
      <div className="absolute top-0 right-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.03)_0%,_transparent_70%)] pointer-events-none" />

      {/* 2. حاوية البانر الـ Glassmorphism */}
      <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center bg-white/70 backdrop-blur-2xl p-12 md:p-20 rounded-[3rem] border border-white shadow-[0_30px_60px_rgba(0,0,0,0.05)] overflow-hidden">
        
        {/* المحتوى النصي - Right (عربي) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-right flex flex-col items-start gap-8"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cyan-100/50 rounded-xl">
               <img src={assets.verified_icon} className="w-6 h-6" alt="verified" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">Medico<span className="text-cyan-600">Book</span></span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-slate-950 leading-[1.15] mb-4">
            نخبة الأطباء <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 underline decoration-cyan-300 underline-offset-8">
               بانتظار حجوزاتك
            </span>
          </h2>

          <div className="flex flex-col gap-5 border-r-4 border-cyan-400 pr-5">
            <p className="text-slate-600 font-medium text-xl">
                احجز موعدك الآن مع أكثر من <span className="text-blue-600 font-black">100 طبيب موثوق</span> ومعتمد في كافة التخصصات.
            </p>
            <p className="text-slate-400 font-medium text-sm">
                * جميع الأطباء لدينا مراجَعون وحاصلون على تقييمات عالية.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 px-12 py-5 bg-slate-950 hover:bg-slate-800 text-white rounded-full font-black text-lg shadow-2xl shadow-slate-950/20 transition-all flex items-center gap-3 group"
          >
             ابدأ الحجز الآن مجاناً 
            <span className="text-lg group-hover:translate-x-[-5px] transition-transform">←</span>
          </motion.button>
        </motion.div>

        {/* 3. صورة الدكتور - متناسقة ومنظمة (Left) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, x: -50 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center md:justify-end"
        >
           {/* Glow Effect behind Doctor */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-full blur-3xl animate-pulse opacity-10" />

          <img
            src={assets.appointment_img} // تأكد إنك مستخدم صورة لدكتور باصص لليوزر، ومقصوصة بشكل "ستوديو"
            alt="Doctor"
            className="
              relative 
              z-10
              rounded-[2rem] 
              border-[12px] 
              border-white
              shadow-2xl
              shadow-slate-900/10
              h-[400px] 
              md:h-[500px]
              object-cover 
              w-full 
              max-w-md
              md:absolute
              md:bottom-[-60px]
              md:left-10
            "
          />
        </motion.div>
      </div>
    </section>
  );
}

export default BookAppointment;
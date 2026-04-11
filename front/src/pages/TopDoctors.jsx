import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useShareContext } from "../context/AppContext";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

function TopDoctors() {
  const { doctorlist } = useShareContext();
  const navigate = useNavigate();

  return (
    <motion.section
      dir="rtl" // لضمان الاتجاه العربي
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="py-24 w-[92%] max-w-7xl mx-auto"
    >
      {/* ===== Header العربي ===== */}
      <motion.div variants={fadeUp} className="text-center mb-20 relative">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
          نخبة <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">الأطباء</span> المتاحين
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-l from-blue-600 to-cyan-400 mx-auto mt-6 rounded-full" />
        <p className="text-slate-500 mt-6 text-lg font-medium max-w-2xl mx-auto">
          تصفح قائمة الأطباء الموثوقين واحجز موعدك فوراً مع أفضل الكفاءات الطبية.
        </p>
      </motion.div>

      {/* ===== Cards Grid ===== */}
      <motion.div
        variants={sectionVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {doctorlist?.slice(0, 8).map((item, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            whileHover={{ y: -12 }}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              window.scrollTo(0, 0);
            }}
            className="group relative bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_25px_50px_rgba(6,182,212,0.1)] transition-all duration-500 cursor-pointer"
          >
            {/* Availability Badge - Top Left */}
            <div className="absolute top-5 left-5 z-20">
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm ${
                item.available ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-rose-50 text-rose-600 border border-rose-100"
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${item.available ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`}></span>
                {item.available ? "متاح الآن" : "غير متاح"}
              </div>
            </div>

            {/* ===== Image Section ===== */}
            <div className="relative pt-10 pb-6 flex justify-center bg-gradient-to-b from-blue-50/50 to-transparent">
               {/* خلفية جمالية خلف الصورة */}
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.05)_0%,_transparent_70%)]" />
              
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* ===== Content ===== */}
            <div className="p-8 text-center">
              <h4 className="text-slate-900 font-bold text-xl group-hover:text-blue-600 transition-colors duration-300">
                {item.name}
              </h4>

              <p className="text-blue-500 font-bold text-xs mt-2 uppercase tracking-widest">
                {item.specialty}
              </p>

              {/* Stats - الخبرة والسعر */}
              <div className="flex justify-center gap-3 mt-6">
                <div className="flex flex-col bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100 group-hover:bg-blue-50 transition-colors">
                  <span className="text-[10px] text-slate-400 font-bold">الخبرة</span>
                  <span className="text-sm font-black text-slate-700">{item.experience} سنوات</span>
                </div>
                <div className="flex flex-col bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100 group-hover:bg-cyan-50 transition-colors">
                  <span className="text-[10px] text-slate-400 font-bold">الكشف</span>
                  <span className="text-sm font-black text-slate-700">{item.fees} جنيه</span>
                </div>
              </div>

              {/* About - Hidden by default, shows on hover or subtle reveal */}
              <p className="text-slate-400 text-xs mt-6 leading-relaxed line-clamp-2 font-medium">
                {item.about}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ===== Explore More Button ===== */}
      <motion.div variants={fadeUp} className="flex justify-center mt-20">
        <Link
          to="/doctors"
          onClick={() => window.scrollTo(0, 0)}
          className="group relative inline-flex items-center gap-3 px-12 py-5 bg-slate-950 text-white rounded-full font-black text-sm shadow-2xl hover:bg-blue-600 transition-all duration-300 overflow-hidden"
        >
          <span className="relative z-10">استكشف المزيد من الأطباء</span>
          <span className="text-xl group-hover:translate-x-[-5px] transition-transform duration-300">←</span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      </motion.div>
    </motion.section>
  );
}

export default TopDoctors;
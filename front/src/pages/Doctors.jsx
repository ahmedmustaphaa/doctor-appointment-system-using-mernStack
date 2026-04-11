import React, { useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doctors } from "../assets/assets_frontend/assets";
import { useShareContext } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

// خريطة الهوية البصرية (ألوان وأيقونات)
const specialtyMap = {
  "General physician": { name: "طبيب عام", theme: "#3b82f6", bg: "bg-blue-50" },
  "Gynecologist": { name: "أمراض نساء", theme: "#ec4899", bg: "bg-pink-50" },
  "Dermatologist": { name: "جلدية", theme: "#f59e0b", bg: "bg-amber-50" },
  "Pediatricians": { name: "أطفال", theme: "#10b981", bg: "bg-emerald-50" },
  "Neurologist": { name: "مخ وأعصاب", theme: "#8b5cf6", bg: "bg-violet-50" },
  "Gastroenterologist": { name: "باطنة", theme: "#06b6d4", bg: "bg-cyan-50" },
};

function Doctors() {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const { doctorlist } = useShareContext();

  const specialities = useMemo(() => {
    return [...new Set(doctors.map((doc) => doc.speciality))];
  }, []);

  const filteredDoctors = speciality
    ? doctorlist.filter((doc) => doc.specialty.toLowerCase() === speciality.toLowerCase())
    : doctorlist;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [speciality]);

  return (
    <div dir="rtl" className="bg-[#fcfdfe] min-h-screen py-10 lg:py-20 font-['Cairo']">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header - Minimalist Style */}
        <div className="mb-16">
           <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-5xl font-black text-slate-900"
           >
             {speciality ? specialtyMap[speciality]?.name : "استكشف النخبة"}
           </motion.h1>
           <p className="text-slate-400 mt-3 font-bold">احجز موعدك مع أفضل الكفاءات الطبية في ثوانٍ.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar - Floating Pills Style */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="lg:sticky lg:top-24 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-4 scrollbar-hide">
              <button
                onClick={() => navigate("/doctors")}
                className={`px-6 py-4 rounded-2xl text-xs font-black transition-all duration-500 whitespace-nowrap ${
                  !speciality ? "bg-slate-950 text-white shadow-xl scale-105" : "bg-white text-slate-400 border border-slate-100 hover:border-blue-200"
                }`}
              >
                الكل
              </button>
              {specialities.map((item) => (
                <button
                  key={item}
                  onClick={() => navigate(`/doctors/${item}`)}
                  className={`px-6 py-4 rounded-2xl text-xs font-black transition-all duration-500 whitespace-nowrap ${
                    speciality === item 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-100 scale-105" 
                    : "bg-white text-slate-400 border border-slate-100 hover:border-blue-200"
                  }`}
                >
                  {specialtyMap[item]?.name || item}
                </button>
              ))}
            </div>
          </aside>

          {/* Main Grid - Aura Cards */}
          <main className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              <AnimatePresence mode="popLayout">
                {filteredDoctors.map((doc, index) => (
                  <motion.div
                    key={doc._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group relative bg-white rounded-[2.5rem] p-4 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 border border-slate-50"
                  >
                    {/* Image Area - Curved with Floating Badge */}
                    <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-slate-50 mb-6">
                      <img src={doc.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={doc.name} />
                      <div className="absolute bottom-4 right-4 left-4">
                        <div className="bg-white/80 backdrop-blur-md p-3 rounded-2xl flex justify-between items-center">
                          <span className="text-[10px] font-black text-slate-900">د. {doc.name}</span>
                          <div className={`w-2 h-2 rounded-full ${doc.available ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></div>
                        </div>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="px-2">
                      <div className="flex items-center justify-between mb-6">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${specialtyMap[doc.specialty]?.bg || 'bg-slate-50'} text-slate-600`}>
                          {specialtyMap[doc.specialty]?.name || doc.specialty}
                        </span>
                        <div className="flex items-center gap-1 text-amber-500 font-black text-[10px]">
                          ⭐ 4.9
                        </div>
                      </div>

                      {/* Stats Row */}
                      <div className="flex items-center gap-4 mb-8">
                        <div className="flex-1">
                          <p className="text-[9px] font-bold text-slate-300 uppercase">الخبرة</p>
                          <p className="text-xs font-black text-slate-700">{doc.experience} سنة</p>
                        </div>
                        <div className="w-px h-8 bg-slate-100"></div>
                        <div className="flex-1">
                          <p className="text-[9px] font-bold text-slate-300 uppercase">الكشف</p>
                          <p className="text-xs font-black text-slate-700">{doc.fees} ج.م</p>
                        </div>
                      </div>

                      {/* Floating Action Button Style */}
                      <button 
                        onClick={() => navigate(`/appointment/${doc._id}`)}
                        className="w-full py-4 rounded-2xl bg-slate-900 text-white text-xs font-black hover:bg-blue-600 transition-all duration-300 shadow-lg shadow-slate-100 hover:shadow-blue-100 active:scale-95"
                      >
                        حجز سريع
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Doctors;
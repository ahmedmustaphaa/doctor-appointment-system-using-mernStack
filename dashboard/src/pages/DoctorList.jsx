import React, { useEffect, useState } from "react";
import axiosInstance from "../pai/axios";
import Cookies from "universal-cookie";
import { motion, AnimatePresence } from "framer-motion";
import { UserCheck, UserX, GraduationCap, Clock, DollarSign, Mail, ExternalLink } from "lucide-react";

function DoctorList() {
  const [doctorsList, setDoctorsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const cookies = new Cookies();
  const token = cookies.get("token");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axiosInstance.get("/admin/getDoctors", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctorsList(data.doctors);
      } catch (error) {
        console.error("Error fetching doctors:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const toggleAvailability = async (id) => {
    try {
      await axiosInstance.post('/adminRoute/change-available', { id });
      setDoctorsList((prev) =>
        prev.map((doc) => (doc._id === id ? { ...doc, available: !doc.available } : doc))
      );
    } catch (error) {
      console.error("Error changing availability:", error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
        <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">جاري التحميل</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-[#fcfcfd] min-h-screen font-['Cairo'] pb-32 md:pb-8">
      
      {/* Header Section - Stacked on Mobile */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">إدارة الأطباء</h2>
          <p className="text-slate-400 text-xs md:text-sm mt-1 font-bold">تحكم في ظهور الأطباء وبياناتهم الشخصية</p>
        </div>
        <div className="self-start md:self-center bg-blue-50 px-4 py-2 rounded-2xl flex items-center gap-2 border border-blue-100/50">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
            <span className="text-blue-600 text-[10px] md:text-xs font-black uppercase tracking-wider">{doctorsList.length} طبيب مسجل</span>
        </div>
      </div>

      {/* Grid: 1 col on mobile, 2 on tablet, 3-4 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        <AnimatePresence mode="popLayout">
          {doctorsList.map((doc, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx * 0.03 }}
              key={doc._id}
              className="group bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_-12px_rgba(59,130,246,0.12)] transition-all duration-500 overflow-hidden flex flex-col"
            >
              {/* Image Section - Responsive Height */}
              <div className="relative h-56 md:h-64 overflow-hidden">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Availability Badge */}
                <div className={`absolute top-4 right-4 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-2 border shadow-sm ${
                  doc.available ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-700" : "bg-rose-500/20 border-rose-500/30 text-rose-700"
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${doc.available ? "bg-emerald-500" : "bg-rose-500"}`} />
                  <span className="text-[10px] font-black uppercase tracking-widest leading-none">
                    {doc.available ? "متاح" : "غير متاح"}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5 md:p-6 flex flex-col flex-1">
                <div className="text-center mb-6">
                  <h3 className="text-lg md:text-xl font-black text-slate-800 line-clamp-1">
                    {doc.name}
                  </h3>
                  <div className="mt-2">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-lg border border-blue-100/50">
                      {doc.specialty}
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-6">
                  <div className="flex items-center gap-2 text-slate-500 min-w-0">
                    <GraduationCap size={14} className="text-slate-300 flex-shrink-0" />
                    <span className="text-[10px] md:text-xs font-bold truncate">{doc.degree}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Clock size={14} className="text-slate-300 flex-shrink-0" />
                    <span className="text-[10px] md:text-xs font-bold whitespace-nowrap">{doc.experience} سنة خبرة</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <DollarSign size={14} className="text-slate-300 flex-shrink-0" />
                    <span className="text-[10px] md:text-xs font-black font-sans text-slate-700">${doc.fees}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Mail size={14} className="text-slate-300 flex-shrink-0" />
                    <span className="text-[9px] md:text-[10px] font-black uppercase">Admin</span>
                  </div>
                </div>

                <p className="text-[11px] md:text-xs text-slate-400 leading-relaxed line-clamp-2 italic mb-6">
                  {doc.about || "لا يوجد وصف مختصر لهذا الطبيب حالياً."}
                </p>

                {/* Footer Actions - Sticks to bottom */}
                <div className="mt-auto pt-5 border-t border-slate-50 flex items-center justify-between">
                  <div 
                    onClick={() => toggleAvailability(doc._id)}
                    className="flex items-center gap-3 cursor-pointer group/toggle"
                  >
                    <div className={`w-10 h-5 md:w-11 md:h-6 rounded-full relative transition-colors duration-300 ${doc.available ? "bg-blue-600" : "bg-slate-200"}`}>
                      <div className={`absolute top-1 left-1 bg-white w-3 h-3 md:w-4 md:h-4 rounded-full transition-transform duration-300 ${doc.available ? "translate-x-5" : "translate-x-0"}`} />
                    </div>
                    <span className="text-[10px] font-black text-slate-500 group-hover/toggle:text-slate-800 uppercase tracking-tighter transition-colors">التوفر</span>
                  </div>

                  <button className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-xl transition-all active:scale-90">
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default DoctorList;
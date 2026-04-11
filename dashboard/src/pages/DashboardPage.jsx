import React, { useEffect, useState } from "react";
import { Users, CalendarCheck, User, X, Activity, ArrowUpRight, Search, Download } from "lucide-react";
import axiosInstance from "../pai/axios";
import { motion, AnimatePresence } from "framer-motion";

function DashboardPage() {
  const [dashData, setDashData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getDashData = async () => {
    try {
      const { data } = await axiosInstance.get('/adminRoute/dashboard-data');
      if (data.success) setDashData(data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { getDashData(); }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
        <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] animate-pulse">جاري جلب البيانات</p>
      </div>
    );
  }

  const statsCards = [
    { name: "الأطباء", value: dashData?.doctor || 0, icon: Users, gradient: "from-blue-600 to-indigo-600", shadow: "shadow-blue-200" },
    { name: "المواعيد", value: dashData?.appointment || 0, icon: CalendarCheck, gradient: "from-orange-500 to-amber-600", shadow: "shadow-orange-200" },
    { name: "المرضى", value: dashData?.user || 0, icon: User, gradient: "from-emerald-500 to-teal-600", shadow: "shadow-emerald-200" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="p-4 md:p-8 font-['Cairo'] bg-[#fcfcfd] min-h-screen pb-24 md:pb-8"
    >
      {/* Header Section - Adaptive Stack */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">نظرة عامة</h1>
          <p className="text-slate-400 text-xs md:text-sm mt-1 font-bold">مرحباً بك في لوحة تحكم النظام</p>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
            <button className="flex-1 sm:flex-none bg-white p-3 md:p-4 rounded-2xl border border-slate-100 shadow-sm text-slate-500 hover:text-blue-600 transition-all active:scale-95">
                <Search size={20} />
            </button>
            <button className="flex-1 sm:flex-none bg-blue-600 text-white px-5 md:px-8 py-3 md:py-4 rounded-2xl text-xs md:text-sm font-black shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-2">
                <Download size={16} />
                <span>التقرير</span>
            </button>
        </div>
      </div>

      {/* Stats Grid - Responsive Column Logic */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-10">
        {statsCards.map((card, idx) => (
          <motion.div 
            whileHover={{ y: -5 }}
            key={idx}
            className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-slate-50 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] flex items-center justify-between group"
          >
            <div className="flex items-center gap-4 md:gap-6">
              <div className={`p-4 md:p-5 rounded-2xl md:rounded-3xl bg-gradient-to-br ${card.gradient} text-white shadow-xl ${card.shadow} group-hover:scale-110 transition-transform duration-500`}>
                <card.icon size={24} className="md:w-7 md:h-7" />
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-black text-slate-900 leading-none">{card.value}</p>
                <p className="text-slate-400 text-[10px] md:text-xs font-black uppercase tracking-widest mt-2">{card.name}</p>
              </div>
            </div>
            <div className="hidden sm:flex text-emerald-500 bg-emerald-50 p-2 rounded-full">
                <ArrowUpRight size={16} strokeWidth={3} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Latest Appointments - Responsive Container */}
      <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-50 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="p-6 md:p-8 border-b border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <Activity size={20} strokeWidth={2.5} />
            </div>
            <h3 className="text-slate-900 font-black text-lg md:text-xl">أحدث المواعيد</h3>
          </div>
          <button className="text-blue-600 text-xs md:text-sm font-black hover:bg-blue-50 px-4 py-2 rounded-xl transition-colors">مشاهدة الكل</button>
        </div>

        <div className="p-2 md:p-4">
          <ul className="space-y-2 md:space-y-3">
            <AnimatePresence>
              {dashData?.latestAppointment?.map((item, index) => (
                <motion.li 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={item._id || index} 
                  className="flex items-center justify-between p-3 md:p-5 hover:bg-slate-50 rounded-2xl md:rounded-[2rem] transition-all group"
                >
                  <div className="flex items-center gap-3 md:gap-5 min-w-0">
                    <div className="relative flex-shrink-0">
                      <img 
                        src={item.docData?.image || item.doctorData?.image || "https://via.placeholder.com/100"} 
                        alt="doctor" 
                        className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl object-cover bg-slate-100 ring-2 ring-white shadow-sm" 
                      />
                      <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="min-w-0">
                      <p className="font-black text-slate-900 text-sm md:text-base truncate">{item.docData?.name || "طبيب غير معروف"}</p>
                      <p className="text-slate-500 text-[10px] md:text-xs font-bold mt-0.5 truncate uppercase tracking-tighter">
                        المريض: <span className="text-blue-600">{item.userData?.name}</span>
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className="bg-slate-100 text-slate-600 text-[9px] md:text-[10px] font-black px-2 py-0.5 rounded-lg uppercase tracking-wider">{item.slotDate}</span>
                        <span className="bg-blue-50 text-blue-600 text-[9px] md:text-[10px] font-black px-2 py-0.5 rounded-lg">{item.slotTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl md:rounded-2xl transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
                    title="إلغاء الموعد"
                  >
                    <X size={18} strokeWidth={2.5} />
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>

            {(!dashData?.latestAppointment?.length) && (
              <div className="flex flex-col items-center justify-center py-16 text-slate-300">
                  <CalendarCheck size={48} className="opacity-20 mb-3" />
                  <p className="font-bold text-sm">لا يوجد مواعيد حالياً</p>
              </div>
            )}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default DashboardPage;
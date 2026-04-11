import React, { useState } from "react";
import { assets } from "../../../front/src/assets/assets_frontend/assets";
import { LayoutDashboard, UserPlus, Calendar, Users, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function Sidebar() {
  const location = useLocation();
  
  const links = [
    { name: "Dashboard", to: '/dashboard', icon: LayoutDashboard },
    { name: "Add Doctor", to: '/dashboard/adddoctor', icon: UserPlus },
    { name: "Appointments", to: '/dashboard/appointments', icon: Calendar },
    { name: "Doctor List", to: '/dashboard/doctorlist', icon: Users },
  ];

  return (
    <div className="relative font-['Cairo']">
      {/* Container الرئيسي: 
        - في الجوال: Dock طاير في الأسفل
        - في الديسكتوب: Sidebar فخم ومنفصل عن الحواف
      */}
      <div className="
        fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] h-20 bg-slate-900/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl z-50 flex items-center px-4 border border-white/10
        md:relative md:translate-x-0 md:left-0 md:top-6 md:ml-6 md:w-[280px] md:h-[calc(100vh-48px)] md:flex-col md:p-8 md:bg-white md:border md:border-slate-100 md:rounded-[3rem] md:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)]
        transition-all duration-500
      ">
        
        {/* Profile Section - Premium Look (يختفي في الجوال) */}
        <div className="hidden md:flex flex-col items-center w-full mb-12">
          <div className="relative group">
            {/* Ring Animation */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600 to-indigo-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative w-24 h-24 rounded-full p-1 bg-white border border-slate-100 shadow-xl">
              <img
                src={assets.appointment_img}
                alt="Doctor"
                className="w-full h-full object-cover rounded-full"
              />
              {/* Online Indicator */}
              <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full"></div>
            </div>
          </div>
          
          <div className="mt-5 text-center">
            <h2 className="text-xl font-black text-slate-800 tracking-tighter leading-none">د. مارتن ديو</h2>
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mt-2">Super Admin</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="w-full">
          <ul className="flex flex-row md:flex-col w-full justify-around md:justify-start gap-2 md:gap-4">
            {links.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <li key={link.name} className="relative w-full">
                  <Link
                    to={link.to}
                    className={`
                      relative z-10 flex flex-col md:flex-row items-center gap-3 p-3 md:px-5 md:py-4 rounded-2xl md:rounded-3xl transition-all duration-500 group
                      ${isActive ? "text-white md:text-blue-600" : "text-slate-400 hover:text-slate-600"}
                    `}
                  >
                    <link.icon 
                      size={22} 
                      strokeWidth={isActive ? 2.5 : 2} 
                      className={`transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} 
                    />
                    <span className={`text-[10px] md:text-sm font-black tracking-tight ${!isActive && 'hidden md:block'}`}>
                      {link.name}
                    </span>

                    {/* Active Background - Desktop (Shadow & Light) */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeNav"
                        className="absolute inset-0 bg-blue-50 hidden md:block rounded-3xl -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    
                    {/* Active Dot - Mobile */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeDot"
                        className="absolute -top-1 w-1 h-1 bg-blue-400 rounded-full md:hidden"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Section - Settings or Stats (يظهر في الديسكتوب فقط) */}
        <div className="hidden md:flex mt-auto w-full pt-8 border-t border-slate-50 flex-col gap-4">
            <button className="flex items-center gap-4 px-5 py-4 text-slate-400 font-black text-sm hover:bg-slate-50 rounded-[2rem] transition-all group">
               <Settings size={20} className="group-hover:rotate-45 transition-transform duration-500" />
               <span>الاعدادات</span>
            </button>
            
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-[2rem] shadow-xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
               <p className="text-[10px] font-black text-slate-500 uppercase mb-2">حالة النظام</p>
               <div className="flex items-center justify-between">
                  <span className="text-white font-black text-xs">مستقر</span>
                  <ActivityIndicator />
               </div>
            </div>
        </div>
      </div>
    </div>
  );
}

// مكون صغير للأنيميشن بتاع حالة النظام
const ActivityIndicator = () => (
  <div className="flex gap-1 items-end h-3">
    {[0.4, 0.7, 0.3, 0.9].map((h, i) => (
      <motion.div
        key={i}
        animate={{ height: [`${h*100}%`, "100%", `${h*100}%`] }}
        transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
        className="w-[2px] bg-blue-500 rounded-full"
      />
    ))}
  </div>
);

export default Sidebar;
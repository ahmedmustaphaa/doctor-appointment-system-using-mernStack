import React from 'react';
import { assets } from '../../../front/src/assets/assets_admin/assets';
import { motion } from 'framer-motion';
import { LogOut, Bell, Search, ChevronDown } from 'lucide-react';

function Navbar() {
  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className='sticky top-4 z-50 px-6'
    >
      <div className='max-w-7xl mx-auto bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-[2rem] py-3 px-6 flex justify-between items-center'>
        
        {/* Left Section: Logo & Brand */}
        <div className='flex items-center gap-8'>
          <img 
            src={assets.admin_logo} 
            className='w-28 md:w-32 hover:scale-105 transition-transform cursor-pointer' 
            alt="Admin Logo" 
          />
          
          {/* Vertical Divider */}
          <div className='hidden md:block w-px h-6 bg-slate-200'></div>
          
          {/* Status Indicator */}
          <div className='hidden md:flex items-center gap-2'>
            <div className='w-2 h-2 bg-emerald-500 rounded-full animate-pulse'></div>
            <span className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>Admin Panel v2.0</span>
          </div>
        </div>

        {/* Right Section: Actions & Profile */}
        <div className='flex items-center gap-3 md:gap-6'>
          
          {/* Quick Actions */}
          <div className='hidden sm:flex items-center gap-2'>
            <button className='p-2.5 text-slate-400 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition-all'>
              <Search size={20} strokeWidth={2.5} />
            </button>
            <button className='p-2.5 text-slate-400 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition-all relative'>
              <Bell size={20} strokeWidth={2.5} />
              <span className='absolute top-2 right-2 w-2 h-2 bg-rose-500 border-2 border-white rounded-full'></span>
            </button>
          </div>

          {/* User Profile Menu */}
          <div className='flex items-center gap-3 pl-2 border-r border-slate-100 mr-2'>
            <div className='hidden md:block text-right'>
              <p className='text-xs font-black text-slate-900 leading-tight'>Ahmed Admin</p>
              <p className='text-[10px] font-bold text-blue-500'>Super Admin</p>
            </div>
            
            <div className='relative group'>
              <div className='w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-400 p-0.5 shadow-lg shadow-blue-100 cursor-pointer'>
                <div className='w-full h-full bg-white rounded-[10px] flex items-center justify-center overflow-hidden'>
                  <img src="https://ui-avatars.com/api/?name=Ahmed&background=random" alt="Admin" />
                </div>
              </div>
              
              {/* Dropdown Hover */}
              <div className='absolute left-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0'>
                <div className='bg-white border border-slate-100 shadow-2xl rounded-2xl p-2 min-w-[160px]'>
                  <button className='w-full flex items-center gap-3 px-4 py-3 text-rose-500 hover:bg-rose-50 rounded-xl transition-all text-xs font-black'>
                    <LogOut size={16} strokeWidth={3} />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </motion.div>
  );
}

export default Navbar;
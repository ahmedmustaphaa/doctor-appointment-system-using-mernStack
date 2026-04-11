import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  IconHome, IconStethoscope, IconInfoCircle, 
  IconPhone, IconUserCircle, IconLogout, IconPlus, IconMenu2, IconX 
} from '@tabler/icons-react';
import { useShareContext } from '../context/AppContext';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // حالة فتح القائمة في الموبايل
  const location = useLocation();
  const { token, setToken } = useShareContext();
  const nav = useNavigate();
  const { scrollY } = useScroll();

  // انيميشن السكرول للـ Desktop
  const width = useTransform(scrollY, [0, 100], ["94%", "70%"]);
  const backgroundColor = useTransform(scrollY, [0, 100], ["rgba(15, 23, 42, 0.5)", "rgba(15, 23, 42, 0.9)"]);

  const links = [
    { name: 'الرئيسية', path: '/', icon: <IconHome size={22}/> },
    { name: 'الأطباء', path: '/doctors', icon: <IconStethoscope size={22}/> },
    { name: 'عنا', path: '/about', icon: <IconInfoCircle size={22}/> },
    { name: 'تواصل', path: '/contact', icon: <IconPhone size={22}/> },
  ];

  const logOut = () => {
    localStorage.removeItem('token');
    setToken(null);
    nav('/login');
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* --- Main Navbar --- */}
      <div className="fixed top-4 left-0 w-full flex justify-center z-[100] px-4 pointer-events-none">
        <motion.nav
          style={{ width: window.innerWidth > 768 ? width : "95%", backgroundColor }}
          className="pointer-events-auto backdrop-blur-2xl border border-white/10 shadow-2xl rounded-[2.5rem] flex items-center justify-between px-3 py-2 transition-all duration-500 overflow-hidden"
        >
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 group ml-2 lg:ml-4">
            <div className="w-10 h-10 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <IconStethoscope className="text-white w-6 h-6" />
            </div>
            <span className="text-white font-black text-xl hidden sm:block">MED<span className="text-cyan-400">IC</span></span>
          </Link>

          {/* Desktop Links (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5">
            {links.map((link) => {
              const isActive = link.path === location.pathname;
              return (
                <Link key={link.path} to={link.path}>
                  <motion.div className={`relative px-5 py-2.5 rounded-full text-sm font-bold transition-colors ${!isActive ? 'text-white' : 'text-[green] hover:text-white'}`}>
                    <span className="relative z-10">{link.name}</span>
                    {isActive && (
                      <motion.div layoutId="active-pill" className="absolute inset-0 bg-cyan-500/20 border border-cyan-500/30 rounded-full" transition={{ type: "spring", bounce: 0.3, duration: 0.6 }} />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Right Section (Auth + Toggle) */}
          <div className="flex items-center gap-2 lg:gap-4 mr-2">
            {token && (
              <div className="w-10 h-10 rounded-full border-2 border-cyan-500/50 p-0.5 hidden sm:block">
                <img src="https://ui-avatars.com/api/?name=Ahmed&background=06b6d4&color=fff" className="w-full h-full rounded-full" alt="user" />
              </div>
            )}
            
            {!token && (
              <Link to="/login" className="hidden sm:block">
                <button className="bg-cyan-500 text-slate-950 px-6 py-2 rounded-full font-black text-xs uppercase tracking-wider">دخول</button>
              </Link>
            )}

            {/* Mobile Menu Toggle Button (Visible ONLY on Mobile) */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden w-11 h-11 flex items-center justify-center bg-white/10 text-white rounded-full active:scale-90 transition-transform"
            >
              <IconMenu2 size={24} />
            </button>
          </div>
        </motion.nav>
      </div>

      {/* --- Mobile Responsive Sidebar (The Missing Piece) --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Background Blur Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[110] md:hidden"
            />

            {/* Side Drawer Content */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[80%] bg-slate-900 z-[120] md:hidden p-8 flex flex-col shadow-2xl border-l border-white/10"
              dir="rtl"
            >
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-2">
                   <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center"><IconStethoscope size={18} className="text-white"/></div>
                   <span className="text-white font-black text-2xl">MEDIC</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 bg-white/5 p-2 rounded-full"><IconX size={24}/></button>
              </div>

              {/* Mobile Links List */}
              <nav className="flex flex-col gap-3">
                {links.map((link) => (
                  <Link 
                    key={link.path} 
                    to={link.path} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-4 p-5 rounded-3xl font-bold text-lg transition-all ${
                      location.pathname === link.path ? 'bg-cyan-500 text-slate-950' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {link.icon} {link.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile Auth Button */}
              <div className="mt-auto">
                {token ? (
                  <button onClick={logOut} className="w-full flex items-center justify-center gap-3 p-5 bg-rose-500/10 text-rose-400 rounded-[2rem] font-bold border border-rose-500/20 active:scale-95 transition-all">
                    <IconLogout /> تسجيل خروج
                  </button>
                ) : (
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full p-5 bg-cyan-500 text-slate-950 rounded-[2rem] font-black text-xl shadow-xl shadow-cyan-500/20 active:scale-95 transition-all">دخول العيادة</button>
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
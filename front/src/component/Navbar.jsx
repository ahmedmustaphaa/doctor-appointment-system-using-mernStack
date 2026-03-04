import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { assets } from '../assets/assets_admin/assets';
import { useShareContext } from '../context/AppContext';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { token, setToken } = useShareContext();
  const nav = useNavigate();

  const links = [
    { name: 'home', path: '/' },
    { name: 'all doctors', path: '/doctors' },
    { name: 'about', path: '/about' },
    { name: 'contact', path: '/contact' },
  ];

  const logOut = () => {
    localStorage.removeItem('token');
    setToken(null);
    nav('/login');
  };

  useEffect(() => {
    if (!token) nav('/login');
  }, [token]);

  return (
    <motion.nav
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed w-full bg-[#F2FCF4] z-50 px-4 md:px-12 gap-2 lg:px-16 py-4 flex items-center justify-between shadow-sm"
    >
      <Link to="/">
        <img src={assets.admin_logo} alt="Logo" className="w-24 md:w-36 lg:w-40" />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 border border-gray-200 px-4 py-2 rounded-full">
        {links.map((link, idx) => {
          const isActive = link.path === location.pathname;
          return (
            <Link
              key={idx}
              to={link.path}
              className="relative px-6 py-2 font-semibold capitalize text-gray-600 hover:text-blue-600 transition-colors"
            >
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-[#6ED7D6] rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              {link.name}
            </Link>
          );
        })}
      </div>

      {/* Desktop Profile */}
      <div className="hidden md:flex items-center relative">
        {token && (
          <div className="relative flex items-center gap-2 group cursor-pointer">
            <img
              src={assets.doctor_icon}
              alt="Doctor"
              className="w-10 h-10 rounded-full border border-gray-200"
            />
            <ChevronDown className="text-gray-500" />
            {/* Dropdown menu */}
            <div className="absolute right-0 w-44 rounded-md top-full mt-2 bg-white shadow-lg z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <Link
                to="/my-profile"
                className="block text-gray-700 px-4 py-2 hover:bg-gray-100"
              >
                Profile
              </Link>
              <Link
                to="/my-appointment"
                className="block text-gray-700 px-4 py-2 hover:bg-gray-100"
              >
                My Appointment
              </Link>
              <p
                onClick={logOut}
                className="text-gray-700 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </p>
            </div>
          </div>
        )}
        {!token && (
          <Link to="/login">
            <button className="px-2 md:px-6 py-2 text-white bg-blue-600 rounded-full text-sm hover:bg-blue-700 transition">
              Create Account
            </button>
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <motion.div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <motion.div
        className={`absolute top-0 right-0 h-[100vh] w-3/5 bg-white shadow-md flex flex-col md:hidden z-50 transform transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setMobileMenuOpen(false)}>
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <div className="flex flex-col flex-1">
          {links.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              className={`px-6 py-4 border-b border-gray-100 font-semibold capitalize ${
                link.path === location.pathname ? 'text-blue-600' : 'text-gray-700'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {token && (
            <div className="mt-6 border-t border-gray-100">
              <Link
                to="/my-profile"
                className="block px-6 py-4 text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/my-appointment"
                className="block px-6 py-4 text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Appointment
              </Link>
              <p
                onClick={() => { logOut(); setMobileMenuOpen(false); }}
                className="block px-6 py-4 text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </p>
            </div>
          )}

          {!token && (
            <Link
              to="/login"
              className="mt-6 mx-6 py-3 text-center text-white bg-blue-600 rounded-full hover:bg-blue-700 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Create Account
            </Link>
          )}
        </div>
      </motion.div>
    </motion.nav>
  );
}

export default Navbar;
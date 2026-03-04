import React, { useState } from "react";
import { assets } from "../../../front/src/assets/assets_frontend/assets";
import { Home, UserPlus, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";

function Sidebar() {
  const links = [
    { name: "Dashboard", to:'', icon: <Home size={20} /> },
    { name: "Add Doctor", to:'/dashboard/adddoctor', icon: <UserPlus size={20} /> },
    { name: "Appointments", to:'/dashboard/appointments', icon: <Calendar size={20} /> },
    { name: "Doctor List", to:'/dashboard/doctorlist', icon: <Users size={20} /> },
  ];

  // state لتحديد الرابط النشط
  const [activeLink, setActiveLink] = useState("Dashboard");

  return (
    <div className="md:w-[280px] bg-[#F7F7F7] min-h-screen p-6 flex flex-col items-center shadow-lg">
      {/* Profile Circle */}
      <div className=" hidden md:block relative w-[140px] h-[140px] rounded-full bg-gradient-to-b from-[#3767CC] to-[#C7D1EE] flex items-center justify-center mb-4">
        <img
          src={assets.appointment_img}
          alt="Doctor"
          className="w-[120px] h-[120px] object-cover rounded-full border-4 border-white shadow-md"
        />
      </div>

      {/* Name & Degrees */}
      <h2 className="text-xl font-semibold text-[#1F2A44]  hidden md:block">Dr. Martin Deo</h2>
      <p className="text-sm text-gray-500 mt-1 text-center hidden md:block">
        MBBS, FCPS, MD (Medicine)
      </p>

      <div className="w-16 h-[2px] bg-[#3767CC] mt-3 mb-6 rounded-full hidden md:block"></div>

      {/* Sidebar Links */}
      <ul className="w-full space-y-3 mt-4">
        {links.map((link) => (
          <Link
          to={link.to}
            key={link.name}
            onClick={() => setActiveLink(link.name)}
            className={`
              flex items-center hover:text-[#3767CC] gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ease-in-out
              ${
                activeLink === link.name
                  ? "text-[#3767CC] "
                  : "text-gray-700 "
              }`}
          >
            <span
              className={`transition-colors duration-300 `}
            >
              {link.icon}
            </span>
            <span className="font-medium hidden md:block">{link.name}</span>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;

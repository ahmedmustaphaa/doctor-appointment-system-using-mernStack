import React from "react";
import { assets } from "../assets/assets_frontend/assets";

function Footer() {
  return (
    <footer className="bg-[#0b0f1a] text-gray-300 mt-32">
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <img src={assets.logo} alt="logo" className="w-10" />
            <h2 className="text-white text-2xl font-bold">DocBook</h2>
          </div>
          <p className="text-gray-400 leading-relaxed">
            Book appointments with trusted doctors, clinics, and hospitals.
            Your health, our priority.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-5">
            Company
          </h4>
          <ul className="space-y-3">
            {["About Us", "Careers", "Blog", "Press"].map((item) => (
              <li
                key={item}
                className="hover:text-white cursor-pointer transition"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-5">
            Services
          </h4>
          <ul className="space-y-3">
            {["Find Doctors", "Book Appointment", "Online Consultation", "Emergency"].map(
              (item) => (
                <li
                  key={item}
                  className="hover:text-white cursor-pointer transition"
                >
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-5">
            Contact
          </h4>
          <ul className="space-y-3 text-gray-400">
            <li>📍 Cairo, Egypt</li>
            <li>📞 +20 123 456 789</li>
            <li>✉️ support@docbook.com</li>
          </ul>

          {/* Social */}
          <div className="flex gap-4 mt-6">
            {["facebook", "twitter", "linkedin", "instagram"].map((social) => (
              <div
                key={social}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#5f6fff] transition cursor-pointer"
              >
                <img
                  src={assets[social]}
                  alt={social}
                  className="w-5"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} DocBook. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

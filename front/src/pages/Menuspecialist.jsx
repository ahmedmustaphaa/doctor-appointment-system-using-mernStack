import React from "react";
import { specialityData } from "../assets/assets_frontend/assets";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Menuspecialist() {
  return (
    <section className="w-[90%] max-w-7xl mx-auto py-20">
      
      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
          Find by Speciality
        </h1>

        <p className="text-gray-500 mt-4 text-lg">
          Browse trusted doctors easily and book your appointment in seconds.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {specialityData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            <Link
              to={`/doctors/${item.speciality}`}
              onClick={() => window.scrollTo(0, 0)}
              className="group relative bg-white/70 backdrop-blur-xl border border-gray-200 rounded-3xl p-6 flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
            >
              
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

              <div className="relative z-10">
                <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full shadow-md group-hover:scale-110 transition duration-500">
                  <img
                    src={item.image}
                    alt={item.speciality}
                    className="w-12 h-12 object-contain"
                  />
                </div>

                <h2 className="mt-5 text-gray-700 font-semibold text-lg group-hover:text-blue-600 transition">
                  {item.speciality}
                </h2>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Menuspecialist;
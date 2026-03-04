import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useShareContext } from "../context/AppContext";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

function TopDoctors() {
  const { doctorlist } = useShareContext();
  console.log(doctorlist)
  const navigate = useNavigate();

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="mt-24 w-[92%] max-w-7xl mx-auto"
    >
      {/* ===== Header ===== */}
      <motion.div variants={fadeUp} className="text-center mb-14">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
          Top Doctors to Book
        </h1>
        <p className="text-gray-500 mt-4 text-lg">
          Browse our trusted doctors and book your appointment instantly.
        </p>
      </motion.div>

      {/* ===== Cards Grid ===== */}
      <motion.div
        variants={sectionVariants}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        {doctorlist?.slice(0, 8).map((item, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            whileHover={{ y: -12 }}
            transition={{ type: "spring", stiffness: 180 }}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              window.scrollTo(0, 0);
            }}
            className="group relative bg-white/70 backdrop-blur-xl border border-gray-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
          >
            {/* Hover Gradient Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

            {/* ===== Image Section ===== */}
            <div className="relative flex justify-center items-center p-6 bg-gradient-to-br from-[#eef2ff] to-[#f0f9ff]">
              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md group-hover:scale-105 transition duration-500"
              />

              {/* Availability Badge */}
              <div
                className={`absolute top-4 right-4 px-3 py-1 text-xs rounded-full font-medium shadow ${
                  item.available
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {item.available ? "Available" : "Busy"}
              </div>
            </div>

            {/* ===== Content ===== */}
            <div className="relative z-10 p-6 text-center">
              <h4 className="text-gray-800 font-semibold text-lg group-hover:text-blue-600 transition">
                {item.name}
              </h4>

              <p className="text-sm text-gray-500 mt-1">
                {item.specialty}
              </p>

              {/* Experience + Fees */}
              <div className="flex justify-center gap-4 mt-4 text-sm text-gray-600">
                <span className="bg-blue-50 px-3 py-1 rounded-full">
                  {item.experience} yrs exp
                </span>
                <span className="bg-green-50 px-3 py-1 rounded-full">
                  ${item.fees} fee
                </span>
              </div>

              {/* About */}
              <p className="text-xs text-gray-400 mt-4 line-clamp-2">
                {item.about}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ===== Button ===== */}
      <motion.div variants={fadeUp} className="flex justify-center mt-16">
        <Link
          to="/doctors"
          onClick={() => window.scrollTo(0, 0)}
          className="px-10 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-medium shadow-lg hover:shadow-xl hover:scale-105 transition duration-300"
        >
          Explore More Doctors
        </Link>
      </motion.div>
    </motion.section>
  );
}

export default TopDoctors;
import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function About() {
  return (
    <div className="w-[90%] max-w-7xl mx-auto py-16">
      
      {/* Title */}
      <motion.h1
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center text-4xl md:text-5xl text-[#155DFC] font-black"
      >
        About Us
      </motion.h1>

      {/* About Content */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col md:flex-row gap-16 mt-14 items-center"
      >
        {/* Image */}
        <motion.img
          variants={fadeUp}
          src={assets.about_image}
          alt="about"
          className="w-full md:w-[380px] rounded-2xl shadow-2xl object-cover"
        />

        {/* Text */}
        <motion.div
          variants={fadeUp}
          className="space-y-8 text-gray-600 leading-relaxed"
        >
          <p>
            Welcome to <span className="font-semibold text-gray-800">Prescripto</span>, your trusted partner in managing your healthcare needs conveniently and efficiently. We simplify doctor appointments and health record management so you can focus on what truly matters — your well-being.
          </p>

          <p>
            Prescripto is committed to excellence in healthcare technology. We continuously enhance our platform by integrating modern solutions that improve user experience and deliver reliable, secure healthcare services.
          </p>

          <p>
            Our vision is to create a seamless healthcare experience for everyone by bridging the gap between patients and healthcare providers, ensuring fast, easy, and trusted access to medical care.
          </p>
        </motion.div>
      </motion.div>

      {/* Why Choose Us */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-24"
      >
        <motion.h2
          variants={fadeUp}
          className="text-3xl font-bold text-gray-800 mb-12"
        >
          <span className="text-gray-400 font-normal">Why</span> Choose Us
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          
          {/* Card */}
          {[
            {
              title: "Trusted Doctors",
              desc: "Access a wide network of verified and experienced doctors across multiple specialties.",
              icon: "🩺",
            },
            {
              title: "Easy Appointments",
              desc: "Book appointments in seconds with a simple, intuitive, and user-friendly interface.",
              icon: "📅",
            },
            {
              title: "Secure Platform",
              desc: "Your data is protected with advanced security and privacy-first architecture.",
              icon: "🔒",
            },
            {
              title: "24/7 Support",
              desc: "Our support team is always available to assist you whenever you need help.",
              icon: "💬",
            },
            {
              title: "Modern Technology",
              desc: "Built with the latest technologies to ensure speed, reliability, and scalability.",
              icon: "⚡",
            },
            {
              title: "Patient-Centered Care",
              desc: "Designed around patient needs to deliver a smooth and stress-free experience.",
              icon: "❤️",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className="bg-[#EEF6F6] rounded-2xl shadow-lg p-8 transition-all"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default About;

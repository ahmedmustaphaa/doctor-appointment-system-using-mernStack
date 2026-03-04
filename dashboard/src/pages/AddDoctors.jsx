import React, { useState } from "react";
import axiosInstance from "../pai/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
import { motion } from "framer-motion";

const initialDoctorData = {
  name: "",
  email: "",
  password: "",
  image: null,
  specialty: "General physician",
  degree: "",
  about: "",
  experience: 0,
  address: "",
  fees: 0,
};

function AddDoctors() {
  const [doctorData, setDoctorData] = useState(initialDoctorData);
  const cookies = new Cookies();
  const token = cookies.get("token");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDoctorData((prev) => ({
      ...prev,
      [name]:
        name === "experience" || name === "fees"
          ? Number(value)
          : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDoctorData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.entries(doctorData).forEach(([key, value]) => {
        if (value !== null) formData.append(key, value);
      });

      await axiosInstance.post("/admin/addDoctor", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Doctor added successfully 🚀");
      setDoctorData(initialDoctorData);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex items-center justify-center px-4 py-16">
      <ToastContainer position="top-right" autoClose={3000} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden grid md:grid-cols-2"
      >
        {/* Left Side Preview */}
        <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-12">
          <h2 className="text-3xl font-bold mb-6">Doctor Preview</h2>

          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl mb-6">
            {doctorData.image ? (
              <img
                src={URL.createObjectURL(doctorData.image)}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-white/20 flex items-center justify-center text-5xl">
                👨‍⚕️
              </div>
            )}
          </div>

          <h3 className="text-xl font-semibold">
            {doctorData.name || "Doctor Name"}
          </h3>
          <p className="opacity-80">
            {doctorData.specialty}
          </p>
          <p className="mt-2 text-sm opacity-70">
            {doctorData.degree || "Degree"}
          </p>
        </div>

        {/* Right Side Form */}
        <div className="p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Add New Doctor
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="flex items-center justify-center border-2 border-dashed border-indigo-300 rounded-2xl h-32 cursor-pointer hover:bg-indigo-50 hover:border-indigo-500 transition">
                <span className="text-gray-500">
                  Click to Upload Doctor Image
                </span>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Inputs */}
            {[
              { name: "name", type: "text", placeholder: "Doctor Name", required: true },
              { name: "email", type: "email", placeholder: "Email", required: true },
              { name: "password", type: "password", placeholder: "Password", required: true },
              { name: "degree", type: "text", placeholder: "Degree" },
              { name: "experience", type: "number", placeholder: "Experience (Years)" },
              { name: "address", type: "text", placeholder: "Address" },
              { name: "fees", type: "number", placeholder: "Fees ($)" },
            ].map((field) => (
              <input
                key={field.name}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={doctorData[field.name]}
                onChange={handleChange}
                required={field.required || false}
                className="p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              />
            ))}

            {/* Specialty */}
            <select
              name="specialty"
              value={doctorData.specialty}
              onChange={handleChange}
              className="p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              {[
                "General physician",
                "Gynecologist",
                "Dermatologist",
                "Neurologist",
                "Pediatricians",
              ].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>

            {/* About */}
            <textarea
              name="about"
              placeholder="About Doctor"
              value={doctorData.about}
              onChange={handleChange}
              className="md:col-span-2 p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none h-28 resize-none"
            />

            {/* Submit */}
            <button
              type="submit"
              className="md:col-span-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:scale-105 transition-transform"
            >
              Add Doctor 🚀
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default AddDoctors;
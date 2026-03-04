import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../../api/axios";
import { useShareContext } from "../context/AppContext";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const { setToken } = useShareContext();

  const schema = isRegister ? registerSchema : loginSchema;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });


  const onSubmit = async (formData) => {
    try {
      const endpoint = isRegister ? "/user/register" : "/user/login";

      const { data } = await axiosInstance.post(endpoint, formData);
            
      if (data.token) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
      }

    

      reset();
      console.log("Success:", data);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eef2ff] to-[#e0e7ff] px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={isRegister ? "register" : "login"}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.4 }}
          className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800">
            {isRegister ? "Create Account" : "Welcome Back"}
          </h2>

          <p className="text-gray-500 text-center mt-2">
            {isRegister ? "Sign up to get started" : "Login to your account"}
          </p>

          {/* ================== Form ================== */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-10">
            {isRegister && (
              <div>
                <input
                  {...register("name")}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:border-[#155DFC]"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
            )}

            <div>
              <input
                {...register("email")}
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:border-[#155DFC]"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="password"
                {...register("password")}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:border-[#155DFC]"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#155DFC] text-white py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              {isRegister ? "Create Account" : "Login"}
            </button>
          </form>

          {/* ================== Switch ================== */}
          <p className="text-center text-gray-500 mt-8">
            {isRegister ? "Already have an account?" : "Don’t have an account?"}
            <span
              onClick={() => setIsRegister(!isRegister)}
              className="text-[#155DFC] font-semibold cursor-pointer ml-1"
            >
              {isRegister ? "Login" : "Register"}
            </span>
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Login;
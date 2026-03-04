import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./pai/axios";
import { ShareDashData } from "../context/Appcontext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
import { useEffect } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { atoken, setAtoken } = ShareDashData();
  const incookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
  setAtoken(incookies.get("token"));
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  setLoading(true);
try {
  const { data } = await axiosInstance.post("/admin/login", { email, password });
  if (data.success) {
    setAtoken(data.token);
    incookies.set("token", data.token, { path: "/" });
    toast.success("Login successful! Redirecting...");
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1000);
  } else {
    throw new Error(data.message || "Login failed");
  }
} catch (error) {
  toast.error(error.response?.data?.message || error.message || "An error occurred");
  setLoading(false); // هنا المفروض يتحول false
}

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Sign in</h1>
        <p className="text-sm text-gray-500 mb-6">Enter your credentials to continue</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-gray-900 text-white py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition"
          >
            {loading ? <p className="animate-pulse">Signing in...</p> : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

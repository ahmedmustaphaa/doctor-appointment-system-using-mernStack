import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import { useShareContext } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Myappointment = () => {
  const { token } = useShareContext();
  const [appointments, setAppointments] = useState([]);

  const [clientSecret, setClientSecret] = useState("");
  const [paymentId, setPaymentId] = useState(null);

  // 🔥 Notification State
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const getAppointments = async () => {
    try {
      const { data } = await axiosInstance.get("/user/get-appointment", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        const activeAppointments = data.appointments.filter(
          (app) => !app.cancelled
        );
        setAppointments(activeAppointments);
      }
    } catch (error) {
      showNotification("Failed to fetch appointments", "error");
    }
  };

  useEffect(() => {
    if (token) getAppointments();
  }, [token]);

  const handlePay = async (appointmentId) => {
    try {
      const { data } = await axiosInstance.post(
        "/user/payment-stripe",
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setClientSecret(data.clientSecret);
        setPaymentId(appointmentId);
      }
    } catch (error) {
      showNotification("Payment initialization failed", "error");
    }
  };

  const handleCancel = async (id) => {
    try {
      const { data } = await axiosInstance.delete(
        `/user/cancel-appointment/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setAppointments((prev) => prev.filter((app) => app._id !== id));
        showNotification("Appointment cancelled successfully");
      }
    } catch (error) {
      showNotification("Failed to cancel appointment", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-16 px-6 relative">

      {/* 🔥 Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className={`fixed top-0 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full shadow-xl text-white font-semibold z-50 ${
              notification.type === "error"
                ? "bg-red-500"
                : "bg-green-500"
            }`}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-extrabold text-gray-900 mb-14 text-center tracking-tight"
        >
          My Appointments
        </motion.h1>

        {appointments.length === 0 && (
          <div className="text-center bg-white p-12 rounded-3xl shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">
              No appointments yet
            </h3>
            <p className="text-gray-400 mt-2">
              Book your first consultation now 🚀
            </p>
          </div>
        )}

        <div className="grid gap-10">
          <AnimatePresence>
            {appointments.map((app) => (
              <motion.div
                key={app._id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="backdrop-blur-lg bg-white/70 border border-white/40 rounded-3xl shadow-2xl p-8 flex flex-col md:flex-row justify-between items-center gap-8 hover:scale-[1.01] transition"
              >
                {/* Doctor Info */}
                <div className="flex items-center gap-6">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={app.doctorData.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {app.doctorData.name}
                    </h2>

                    <p className="text-indigo-600 font-semibold mt-1">
                      {app.doctorData.speciality}
                    </p>

                    <p className="text-gray-500 mt-2">
                      📅 {app.slotDate} | ⏰ {app.slotTime}
                    </p>

                    <p className="text-gray-700 font-semibold mt-2">
                      ${app.doctorData.amount}
                    </p>

                    {/* Status */}
                    <span
                      className={`inline-block mt-3 px-4 py-1 text-sm rounded-full font-semibold ${
                        app.payment
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {app.payment ? "Paid" : "Pending Payment"}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-4 w-full md:w-auto md:min-w-[220px]">
                  {!app.payment && paymentId !== app._id && (
                    <button
                      onClick={() => handlePay(app._id)}
                      className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-indigo-400/40 transition"
                    >
                      Pay ${app.doctorData.amount}
                    </button>
                  )}

                  {paymentId === app._id && clientSecret && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                      <PaymentForm
                        appointmentId={app._id}
                        setPaymentId={setPaymentId}
                        getAppointments={getAppointments}
                      />
                    </Elements>
                  )}

                  {!app.payment && paymentId !== app._id && (
                    <button
                      onClick={() => handleCancel(app._id)}
                      className="border border-gray-300 py-3 rounded-xl font-medium hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Myappointment;
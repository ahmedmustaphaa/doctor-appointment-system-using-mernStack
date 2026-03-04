import React from 'react';
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axiosInstance from '../../api/axios';
import { useShareContext } from "../context/AppContext";

const PaymentForm = ({ appointmentId, setPaymentId, getAppointments }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { token } = useShareContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin + "/my-appointment" },
      redirect: "if_required",
    });

    if (!error && paymentIntent.status === "succeeded") {
      try {
        await axiosInstance.post("/user/verify-stripe", 
          { appointmentId, success: true }, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPaymentId(null);
        getAppointments();
      } catch (err) {
        console.log("Error verifying payment", err);
      }
    } else if (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 p-4 border rounded-2xl bg-gray-50">
      <PaymentElement />
      <button disabled={!stripe} className="w-full bg-indigo-600 text-white py-2 rounded-xl mt-4 font-bold shadow-md hover:bg-indigo-700 transition">
        Confirm & Pay Now
      </button>
      <button type="button" onClick={() => setPaymentId(null)} className="w-full text-gray-400 text-sm mt-2 hover:text-gray-600 transition">
        Cancel
      </button>
    </form>
  );
};

export default PaymentForm;
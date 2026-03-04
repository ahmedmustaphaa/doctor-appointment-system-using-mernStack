import React, { useState } from "react";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";

function Contact() {
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
  "service_ybkx41n",
  "template_suuao7c",
  e.target,
  "lKfwc-TknvygU-xUi"
)

      .then(() => {
        toast.success("Message sent successfully 🚀");
        e.target.reset();
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to send message ❌");
        setLoading(false);
      });
  };

  return (
    <div className="w-[90%] max-w-7xl mx-auto py-20">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#155DFC]">
          Contact Us
        </h1>
        <p className="text-gray-500 mt-4">
          Have questions or need support? Our team is here to help you.  
          Reach out and we’ll get back to you as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Left */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Get in Touch
            </h3>
            <p className="text-gray-500">
              Whether you have a question about appointments, doctors, or
              anything else, our team is ready to answer all your questions.
            </p>
          </div>

          <div className="space-y-4 text-gray-600">
            <p>📍 Cairo, Egypt</p>
            <p>📞 +20 123 456 789</p>
            <p>✉️ support@prescripto.com</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-10">
          <form onSubmit={sendEmail} className="space-y-6">
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#155DFC]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#155DFC]"
              />
            </div>

            {/* Subject */}
            <input type="hidden" name="title" value="Contact Form Message" />

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Message
              </label>
              <textarea
                name="message"
                rows="5"
                required
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#155DFC]"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold transition
                ${loading 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-[#155DFC] text-white hover:bg-blue-700"
                }`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;

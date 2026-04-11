import React, { useState } from "react";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

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
        toast.success("تم إرسال الرسالة بنجاح 🚀");
        e.target.reset();
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("فشل إرسال الرسالة ❌");
        setLoading(false);
      });
  };

  return (
    <div dir="rtl" className="bg-[#fafdfc] min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
            تواصل <span className="text-blue-600">معنا</span>
          </h1>
          <p className="text-slate-500 mt-6 text-lg font-medium">
            لديك استفسار؟ فريقنا متاح دائماً لمساعدتك في الحصول على أفضل تجربة طبية رقمية.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="bg-white/70 backdrop-blur-xl border border-slate-100 rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/40">
              <h3 className="text-2xl font-black text-slate-900 mb-6 border-r-4 border-blue-600 pr-4">
                معلومات التواصل
              </h3>
              
              <div className="space-y-6">
                {[
                  { icon: "📍", title: "موقعنا", detail: "القاهرة، جمهورية مصر العربية" },
                  { icon: "📞", title: "رقم الهاتف", detail: "+20 123 456 789" },
                  { icon: "✉️", title: "البريد الإلكتروني", detail: "support@prescripto.com" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-xl group-hover:bg-blue-600 group-hover:rotate-12 transition-all duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 mb-1">{item.title}</p>
                      <p className="text-slate-700 font-black">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social or Extra Card */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
               <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-600 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
               <h4 className="text-xl font-bold mb-2">دعم فني 24/7</h4>
               <p className="text-slate-400 text-sm leading-relaxed">فريقنا جاهز للرد على حالات الطوارئ والاستفسارات التقنية في أي وقت.</p>
            </div>
          </motion.div>

          {/* Right Side: Glass Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7"
          >
            <div className="bg-white border border-slate-100 rounded-[3rem] shadow-2xl shadow-blue-100/50 p-8 md:p-12 relative">
              <form onSubmit={sendEmail} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700 mr-2">الاسم الكامل</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="أحمد علي..."
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:bg-white transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700 mr-2">البريد الإلكتروني</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="example@mail.com"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:bg-white transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-700 mr-2">الموضوع</label>
                  <input
                    type="text"
                    name="title"
                    defaultValue="رسالة جديدة من الموقع"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:bg-white transition-all font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-700 mr-2">رسالتك</label>
                  <textarea
                    name="message"
                    rows="5"
                    required
                    placeholder="كيف يمكننا مساعدتك اليوم؟"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:bg-white transition-all font-medium resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-5 rounded-2xl font-black text-lg transition-all shadow-xl
                    ${loading 
                      ? "bg-slate-200 text-slate-400 cursor-not-allowed" 
                      : "bg-blue-600 text-white hover:bg-slate-900 hover:shadow-blue-200 active:scale-[0.98]"
                    }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      جاري الإرسال...
                    </span>
                  ) : "إرسال الرسالة الآن"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
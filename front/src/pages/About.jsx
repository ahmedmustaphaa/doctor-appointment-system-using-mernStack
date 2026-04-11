import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { motion } from "framer-motion";

// أنميشن الحاويات لتنسيق ظهور الأبناء بتتابع
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // الفارق الزمني بين كل كارت والتاني
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function About() {
  const benefits = [
    { title: "أطباء موثوقون", desc: "شبكة واسعة من الأطباء المعتمدين ذوي الخبرة في مختلف التخصصات.", icon: "🩺" },
    { title: "حجز سهل", desc: "احجز موعدك في ثوانٍ معدودة واجهة بسيطة وسهلة الاستخدام.", icon: "📅" },
    { title: "منصة آمنة", desc: "بياناتك محمية بأحدث تقنيات التشفير والخصوصية العالمية.", icon: "🔒" },
    { title: "دعم 24/7", desc: "فريقنا متواجد دائماً للإجابة على استفساراتك في أي وقت.", icon: "💬" },
    { title: "تقنية حديثة", desc: "نستخدم أحدث التقنيات لضمان سرعة وموثوقية الخدمة.", icon: "⚡" },
    { title: "رعاية شاملة", desc: "تم تصميم المنصة لتضع احتياجات المريض في المقام الأول.", icon: "❤️" },
  ];

  return (
    <div dir="rtl" className="bg-[#fafdfc] min-h-screen py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-black text-slate-900">
            عن <span className="text-blue-600 italic">ميديك</span>
          </h1>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {/* About Content - Hero Style */}
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-32">
          {/* Image with Decorative Backdrop */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative lg:w-1/2"
          >
            <div className="absolute -inset-4 bg-blue-100 rounded-[3rem] -rotate-3 blur-sm"></div>
            <img
              src={assets.about_image}
              alt="about medic"
              className="relative w-full rounded-[2.5rem] shadow-2xl object-cover border-8 border-white"
            />
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl border border-slate-50 hidden md:block">
              <p className="text-blue-600 font-black text-2xl">+100</p>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">طبيب موثوق</p>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 space-y-8"
          >
            <h2 className="text-3xl font-black text-slate-800 leading-tight">
              نحن نغير الطريقة التي تدير بها <span className="text-blue-600">صحتك</span>
            </h2>
            <div className="space-y-6 text-slate-500 text-lg leading-relaxed font-medium">
              <p>
                مرحباً بك في <span className="text-slate-900 font-black">MEDIC</span>، شريكك الموثوق في إدارة احتياجاتك الصحية بكل سهولة ويسر. نحن نبسط عملية حجز المواعيد وإدارة السجلات الطبية.
              </p>
              <p className="p-6 bg-white rounded-3xl border-r-4 border-blue-600 shadow-sm italic">
                "رؤيتنا هي خلق تجربة صحية سلسة للجميع من خلال سد الفجوة بين المرضى ومقدمي الرعاية."
              </p>
              <p>
                نحن ملتزمون بالتميز، ونعمل باستمرار على تطوير منصتنا لتقديم حلول ذكية تضمن لك رعاية طبية سريعة وموثوقة.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Why Choose Us - Staggered Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 variants={itemVariants} className="text-4xl font-black text-slate-900 mb-16">
            لماذا <span className="text-blue-600">تختارنا؟</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.08)" }}
                className="group relative bg-white border border-slate-100 rounded-[2.5rem] p-10 transition-all duration-300 overflow-hidden"
              >
                {/* Hover Background Accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-4xl mb-8 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-500">
                  {item.icon}
                </div>
                
                <h3 className="text-xl font-black text-slate-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
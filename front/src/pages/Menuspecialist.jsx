import React from "react";
import { specialityData } from "../assets/assets_frontend/assets";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Menuspecialist() {
  return (
    <section dir="rtl" className="relative w-full py-28 bg-[#fafdfc] overflow-hidden">
      
      {/* عناصر خلفية ناعمة متناسقة مع الهيدر */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-50/60 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-50/60 rounded-full blur-[80px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* هيدر متناسق وأنيق */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 mb-4 rounded-full bg-blue-100/50 border border-blue-200"
          >
            <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em]">رعاية تثق بها</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            استكشف <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">التخصصات</span> الطبية
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-l from-blue-600 to-cyan-400 mx-auto rounded-full mb-8" />
        </div>

        {/* الكروت: ستايل "الألواح العائمة" باللون الأبيض الفاخر */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialityData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Link
                to={`/doctors/${item.speciality}`}
                onClick={() => window.scrollTo(0, 0)}
                className="group relative block"
              >
                {/* جسم الكارت: أبيض، بحدود خفيفة، وظل عميق عند الهوفر */}
                <div className="relative bg-white/70 backdrop-blur-xl border border-slate-100 rounded-[2.5rem] p-10 flex flex-col items-center shadow-[0_15px_40px_rgba(0,0,0,0.02)] group-hover:shadow-[0_30px_60px_rgba(6,182,212,0.12)] group-hover:border-blue-100 transition-all duration-500 overflow-hidden">
                  
                  {/* تأثير الضوء الداخلي (Inner Glow) */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-[2] transition-transform duration-700" />

                  {/* حاوية الأيقونة - زاوية (Modern Radius) */}
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-blue-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-24 h-24 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center group-hover:bg-white group-hover:shadow-md group-hover:-rotate-6 transition-all duration-500">
                      <img
                        src={item.image}
                        alt={item.speciality}
                        className="w-14 h-14 object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* المحتوى */}
                  <h3 className="text-2xl font-black text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {item.speciality}
                  </h3>
                  <p className="text-slate-500 text-center text-sm font-medium leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    احجز موعدك الآن مع أفضل أطباء {item.speciality} المعتمدين لدينا.
                  </p>

                  {/* سهم الانتقال */}
                  <div className="mt-2 flex items-center justify-center w-12 h-12 rounded-full bg-slate-50 group-hover:bg-blue-600 text-slate-400 group-hover:text-white transition-all duration-500">
                    <span className="text-xl">←</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Menuspecialist;
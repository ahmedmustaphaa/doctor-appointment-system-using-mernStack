import React from "react";
import { assets } from "../assets/assets_frontend/assets";

function Footer() {
  return (
    <footer dir="rtl" className="relative mt-32 border-t border-slate-100 bg-white/50 backdrop-blur-3xl overflow-hidden">
      
      {/* عناصر ديكورية خفيفة في الخلفية */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-blue-50/50 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-80 h-80 bg-cyan-50/50 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">

          {/* البراند - الهوية */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl shadow-lg shadow-blue-200">
                <img src={assets.logo} alt="logo" className="w-8 brightness-0 invert" />
              </div>
              <h2 className="text-slate-900 text-2xl font-black tracking-tighter">
                Medic<span className="text-cyan-600">.</span>
              </h2>
            </div>
            <p className="text-slate-500 font-medium leading-loose text-lg">
              نحن نعيد تعريف الرعاية الطبية في مصر من خلال حلول ذكية تربطك بأمهر الأطباء في ثوانٍ.
            </p>
          </div>

          {/* روابط سريعة */}
          <div>
            <h4 className="text-slate-900 font-black text-lg mb-8 relative inline-block">
              الشركة
              <span className="absolute -bottom-2 right-0 w-8 h-1 bg-cyan-400 rounded-full"></span>
            </h4>
            <ul className="space-y-4 font-bold text-slate-500">
              {["عن المنصة", "فرص العمل", "المدونة الطبية", "الخصوصية"].map((item) => (
                <li key={item} className="hover:text-blue-600 cursor-pointer transition-all duration-300 hover:translate-x-[-5px]">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* خدماتنا */}
          <div>
            <h4 className="text-slate-900 font-black text-lg mb-8 relative inline-block">
              الخدمات
              <span className="absolute -bottom-2 right-0 w-8 h-1 bg-blue-500 rounded-full"></span>
            </h4>
            <ul className="space-y-4 font-bold text-slate-500">
              {["البحث عن دكتور", "حجز موعد", "استشارات عن بعد", "حالات الطوارئ"].map((item) => (
                <li key={item} className="hover:text-cyan-600 cursor-pointer transition-all duration-300 hover:translate-x-[-5px]">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* التواصل */}
          <div>
            <h4 className="text-slate-900 font-black text-lg mb-8 relative inline-block">
              تواصل معنا
              <span className="absolute -bottom-2 right-0 w-8 h-1 bg-slate-900 rounded-full"></span>
            </h4>
            <ul className="space-y-5 text-slate-600 font-bold">
              <li className="flex items-center gap-4 group">
                <span className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">📍</span>
                <span className="text-sm">القاهرة، مصر</span>
              </li>
              <li className="flex items-center gap-4 group">
                <span className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-cyan-50 transition-colors">📞</span>
                <span className="text-sm" dir="ltr">+20 123 456 789</span>
              </li>
              <li className="flex items-center gap-4 group">
                <span className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">✉️</span>
                <span className="text-sm">support@medic.com</span>
              </li>
            </ul>

            {/* السوشيال ميديا بتصميم "شيك" */}
            <div className="flex gap-3 mt-10">
              {["facebook", "twitter", "linkedin", "instagram"].map((social) => (
                <div
                  key={social}
                  className="w-11 h-11 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center hover:bg-slate-950 hover:border-slate-950 transition-all duration-500 cursor-pointer group hover:-translate-y-2"
                >
                  <img src={assets[social]} alt={social} className="w-5 group-hover:brightness-0 group-hover:invert transition-all" />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* الخط السفلي الأخير */}
        <div className="border-t border-slate-100 pt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-400 font-bold text-xs uppercase tracking-widest">
          <p>© {new Date().getFullYear()} MEDIC. جميع الحقوق محفوظة.</p>
          <div className="flex gap-8">
            <span className="hover:text-slate-900 cursor-pointer">الشروط</span>
            <span className="hover:text-slate-900 cursor-pointer">سياسة الملفات</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
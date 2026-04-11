import { motion, useScroll, useTransform } from "framer-motion";
import { Search, ShieldCheck, Activity, FileText, Sparkles, ArrowRight, Star } from "lucide-react";

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-[#fafdfc] selection:bg-teal-200">
      
      {/* ----------------- عمارة الخلفية (Background Architecture) ----------------- */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-teal-200/40 to-transparent rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-emerald-100/30 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

        {/* ----------------- الجانب الأيسر (Content) ----------------- */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 shadow-sm"
          >
            <Sparkles className="text-teal-600 w-4 h-4 animate-bounce" />
            <span className="text-xs font-black uppercase tracking-widest text-teal-800">
              Future of Healthcare 2.0
            </span>
          </motion.div>

          <h1 className="text-6xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter">
            Next-Gen <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">Dental Doctors</span> <br />
            Experience.
          </h1>

          <p className="text-slate-600 max-w-lg mb-12 text-xl font-medium leading-relaxed">
            لست مجرد عيادة أسنان، نحن منصة رقمية متكاملة مدعومة بالذكاء الاصطناعي لتوفير أدق تشخيص وأسرع خدمة طبية.
          </p>

          {/* Search Bar - Ultra Modern */}
          <div className="group flex items-center bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-2 max-w-xl border border-slate-100 focus-within:ring-4 focus-within:ring-teal-500/10 transition-all duration-500">
            <div className="flex items-center flex-1 px-4">
               <Search className="text-slate-400 group-focus-within:text-teal-600 transition-colors" size={24} />
               <input
                 type="text"
                 placeholder="ابحث عن دكتور أو تخصص..."
                 className="w-full px-4 py-4 outline-none text-lg bg-transparent text-slate-800 placeholder:text-slate-400 font-medium"
               />
            </div>
            <button className="bg-slate-900 hover:bg-teal-600 text-white px-10 py-4 rounded-[1.8rem] text-lg font-bold transition-all shadow-lg hover:shadow-teal-200">
              بحث
            </button>
          </div>

          {/* Social Proof */}
          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-4">
              {[1,2,3,4].map(i => (
                <img key={i} className="w-12 h-12 rounded-full border-4 border-white object-cover" src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
              ))}
            </div>
            <div>
              <div className="flex text-amber-400">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-sm font-bold text-slate-800">+10k مستخدم يثق بنا</p>
            </div>
          </div>
        </motion.div>

        {/* ----------------- الجانب الأيمن (Visual Piece) ----------------- */}
        <motion.div
          style={{ y: y1 }}
          className="relative lg:h-[700px] flex items-center justify-center"
        >
          {/* Main Image Container */}
          <div className="relative z-10 w-full max-w-lg">
            <motion.div
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{ repeat: Infinity, duration: 6 }}
              className="relative rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.12)] border-[12px] border-white"
            >
              <img 
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop" 
                alt="AI Doctor" 
                className="w-full h-[550px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 to-transparent" />
            </motion.div>

            {/* Floating Card 1: AI Result */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 bg-white/90 backdrop-blur-2xl p-6 rounded-[2rem] shadow-2xl border border-white flex gap-4 items-center"
            >
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white">
                <Activity size={24} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold">دقة التشخيص</p>
                <p className="text-xl font-black text-slate-900">99.8%</p>
              </div>
            </motion.div>

            {/* Floating Card 2: Support */}
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-10 -left-12 bg-slate-900/95 backdrop-blur-xl p-6 rounded-[2rem] shadow-2xl border border-slate-800 flex gap-4 items-center text-white"
            >
              <div className="w-12 h-12 bg-teal-400 rounded-2xl flex items-center justify-center text-slate-900">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-xs text-teal-300 font-bold">دعم فني ذكي</p>
                <p className="text-lg font-bold italic">24/7 AI-Bot</p>
              </div>
            </motion.div>
          </div>

          {/* Animated Background Circles */}
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <div className="w-[120%] h-[120%] border border-teal-100 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute w-[80%] h-[80%] border border-teal-50 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
          </div>
        </motion.div>
      </div>

      {/* ----------------- Bento Features Section ----------------- */}
      <div className="max-w-7xl mx-auto px-6 mt-32">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: ShieldCheck, title: "أمان سحابي كامل", color: "bg-blue-500", desc: "تشفير بياناتك بأحدث تقنيات الـ Blockchain الطبية." },
            { icon: FileText, title: "تقارير ذكية فموية", color: "bg-teal-500", desc: "تحليل صور الأشعة بالذكاء الاصطناعي في ثوانٍ." },
            { icon: Activity, title: "متابعة حية للمريض", color: "bg-emerald-500", desc: "نظام تنبيهات ذكي لمتابعة حالة المريض بعد العلاج." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-white border border-slate-100 p-10 rounded-[3rem] hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)] transition-all duration-500 overflow-hidden"
            >
              <div className={`w-16 h-16 ${item.color} text-white rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-teal-100`}>
                <item.icon size={30} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              <div className="mt-6 flex items-center text-teal-600 font-bold gap-2 cursor-pointer group-hover:gap-4 transition-all">
                اقرأ المزيد <ArrowRight size={18} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
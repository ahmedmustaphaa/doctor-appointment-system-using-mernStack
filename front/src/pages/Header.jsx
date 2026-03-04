import { motion } from "framer-motion";
import { Search, ShieldCheck, Activity, FileText } from "lucide-react";

export default function Header() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f6fbf9] via-white to-teal-50">

      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-200 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-200 rounded-full blur-3xl opacity-20 -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block mb-5 text-sm text-teal-700 bg-teal-100 px-4 py-1 rounded-full">
            AI-powered healthcare
          </span>

          <h1 className="text-5xl md:text-6xl font-bold text-teal-700 leading-tight mb-6">
            Smarter Dental Care <br /> Powered by AI
          </h1>

          <p className="text-gray-600 max-w-lg mb-10 text-lg">
            We are an AI-driven dental clinic committed to transforming oral
            healthcare through innovation, expertise, and compassion.
          </p>

          {/* SEARCH BAR */}
          <div className="flex items-center bg-white rounded-full shadow-xl p-2 max-w-lg border border-gray-100 hover:shadow-2xl transition">
            <Search className="ml-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search doctors or treatments"
              className="flex-1 px-4 py-3 outline-none text-sm bg-transparent"
            />
            <button className="bg-teal-600 hover:bg-teal-700 transition text-white px-6 py-3 rounded-full text-sm font-medium">
              Search
            </button>
          </div>

          {/* CTA */}
          <div className="flex gap-4 mt-8">
            <button className="bg-teal-600 hover:bg-teal-700 transition text-white px-6 py-3 rounded-full shadow-lg">
              Book Appointment
            </button>
            <button className="border border-teal-600 text-teal-700 px-6 py-3 rounded-full hover:bg-teal-50 transition">
              Explore Doctors
            </button>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative flex justify-center"
        >

          {/* Abstract Floating Shape */}
          <div className="absolute top-16 right-10 w-96 h-96 bg-teal-300 rounded-full blur-3xl opacity-30"></div>

          <motion.img
            animate={{ y: [0, 25, 0] }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
            src="https://plus.unsplash.com/premium_photo-1661764878654-3d0fc2eefcca?w=600&auto=format&fit=crop&q=80"
            alt="Doctor"
            className="relative rounded-[30px] h-[380px] object-cover w-full max-w-md shadow-2xl border border-white/40"
          />

          {/* Floating Support Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 -left-2 md:-left-10 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-4 flex items-center gap-4 border border-white/40"
          >
            <img
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=200&q=80"
              alt="Doctor"
              className="w-14 h-14  rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-gray-800">
                24/7 Support for Clinics
              </p>
              <p className="text-xs text-gray-500">
                AI medical assistance
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* FEATURES */}
      <div className="max-w-6xl mx-auto px-6 pb-24 grid md:grid-cols-3 gap-8">
        {[{
          icon: ShieldCheck,
          title: "Cloud-based AI-Powered",
          desc: "Advanced systems ensure secure, precise treatments.",
        },
        {
          icon: FileText,
          title: "Smart Health Reports",
          desc: "AI-generated summaries and insights.",
        },
        {
          icon: Activity,
          title: "Continuous Monitoring",
          desc: "Real-time tracking powered by AI algorithms.",
        }].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="bg-white/60 backdrop-blur-2xl rounded-3xl shadow-xl border border-white/40 p-8 hover:scale-105 hover:shadow-2xl transition duration-300"
          >
            <item.icon className="text-teal-600 mb-5" size={32} />
            <h3 className="font-semibold text-lg mb-3">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
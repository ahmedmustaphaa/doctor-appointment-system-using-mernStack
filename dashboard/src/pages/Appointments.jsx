import React, { useEffect, useState } from "react";
import axiosInstance from "../pai/axios";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { motion, AnimatePresence } from "framer-motion";
import { User, Wallet, Clock, CheckCircle, XCircle, Search } from "lucide-react";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllAppointments = async () => {
    try {
      const { data } = await axiosInstance.get("/adminRoute/get-appointment");
      if (data.success) setAppointments(data.appointments);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllAppointments();
  }, []);

  const columns = [
    {
      header: "المريض",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-xs">
            {row.original.userData?.name?.charAt(0) || <User size={16} />}
          </div>
          <div className="flex flex-col">
            <span className="font-black text-slate-800 text-sm truncate max-w-[120px]">{row.original.userData?.name}</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{row.original.slotDate}</span>
          </div>
        </div>
      ),
    },
    {
      header: "الطبيب",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img src={row.original.docData?.image || row.original.doctorData?.image} className="w-10 h-10 rounded-xl object-cover ring-2 ring-slate-50" />
          <span className="font-bold text-slate-700 text-sm">{row.original.docData?.name || row.original.doctorData?.name}</span>
        </div>
      ),
    },
    {
      header: "الرسوم",
      cell: ({ row }) => (
        <div className="flex flex-col">
            <span className="font-black text-slate-900 text-sm">${row.original.amount}</span>
            <span className="text-[10px] text-slate-400 font-bold">{row.original.slotTime}</span>
        </div>
      ),
    },
    {
      header: "الحالة",
      cell: ({ row }) => (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
          row.original.payment ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-rose-50 text-rose-500 border border-rose-100"
        }`}>
          {row.original.payment ? <CheckCircle size={12} /> : <XCircle size={12} />}
          {row.original.payment ? "مدفوع" : "غير مدفوع"}
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: appointments,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
        <div className="w-10 h-10 border-4 border-blue-600/10 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">جاري جلب المواعيد</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-[#fcfcfd] min-h-screen font-['Cairo'] pb-24 md:pb-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 flex justify-between items-center">
        <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">سجل المواعيد</h1>
            <p className="text-slate-400 text-xs md:text-sm font-bold mt-1">إدارة ومتابعة كافة الحجوزات المسجلة</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Desktop Table View - Hidden on Mobile */}
        <div className="hidden md:block bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] overflow-hidden">
          <table className="w-full text-right">
            <thead className="bg-slate-50/50 uppercase text-[11px] font-black text-slate-400 border-b border-slate-50">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((h) => (
                    <th key={h.id} className="px-8 py-5 text-right">
                      {flexRender(h.column.columnDef.header, h.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-slate-50">
              {table.getRowModel().rows.map((row) => (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={row.id}
                  className="hover:bg-blue-50/30 transition-all group"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-8 py-5">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View - Shown only on Mobile */}
        <div className="md:hidden space-y-4">
          <AnimatePresence>
            {appointments.map((app, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={app._id || idx}
                className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <img src={app.docData?.image || app.doctorData?.image} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-50" />
                        <div>
                            <p className="font-black text-slate-900 text-sm">{app.docData?.name || app.doctorData?.name}</p>
                            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-tighter">طبيب متخصص</p>
                        </div>
                    </div>
                    <div className={`px-3 py-1 rounded-xl text-[9px] font-black ${
                        app.payment ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-500"
                    }`}>
                        {app.payment ? "PAID" : "UNPAID"}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest text-right">المريض</span>
                        <span className="text-xs font-bold text-slate-700">{app.userData?.name}</span>
                    </div>
                    <div className="flex flex-col gap-1 text-left">
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">التكلفة</span>
                        <span className="text-xs font-black text-slate-900">${app.amount}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 text-slate-500">
                        <Clock size={14} />
                        <span className="text-[10px] font-bold">{app.slotDate} | {app.slotTime}</span>
                    </div>
                    <button className="text-blue-600 text-[10px] font-black uppercase tracking-widest hover:underline">التفاصيل</button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {appointments.length === 0 && (
          <div className="py-20 text-center bg-white rounded-[2.5rem] border border-slate-100">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-200">
                <Search size={32} />
            </div>
            <p className="text-slate-400 font-bold">لم يتم العثور على أي مواعيد مسجلة</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;